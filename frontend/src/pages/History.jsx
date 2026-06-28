import React, { useEffect, useState } from 'react'
import { getWorkoutHistory } from '../api'
import Card from '../components/ui/Card'

export default function History() {
  const [history, setHistory]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    getWorkoutHistory()
      .then((d) => setHistory(d.history || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      <h1 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '6px' }}>
        📋 Workout History
      </h1>
      <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '1.5rem' }}>
        All your previously generated workout plans, saved automatically.
      </p>

      {loading && (
        <Card>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{ height: 13, borderRadius: 6, background: '#f3f4f6', marginBottom: 12, width: `${70 + i * 7}%`, animation: 'shimmer 1.3s ease infinite', animationDelay: `${i * 0.1}s` }} />
          ))}
        </Card>
      )}

      {error && (
        <div style={{ background: '#fef2f2', border: '0.5px solid #fca5a5', color: '#b91c1c', padding: '14px 18px', borderRadius: '12px', fontSize: '14px' }}>
          {error}
        </div>
      )}

      {!loading && !error && history.length === 0 && (
        <Card style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
          <div style={{ fontSize: '44px', marginBottom: '14px' }}>🏋️</div>
          <p style={{ fontSize: '16px', fontWeight: 600, color: '#374151', marginBottom: '5px' }}>No workouts yet</p>
          <p style={{ fontSize: '14px', color: '#9ca3af' }}>Generate your first plan on the Workout tab.</p>
        </Card>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {history.map((item, i) => (
          <Card key={item._id || i} style={{ padding: 0, overflow: 'hidden' }}>
            <button
              onClick={() => setExpanded(expanded === i ? null : i)}
              style={{
                width: '100%', padding: '15px 20px', background: 'transparent', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: 40, height: 40, background: '#ecfdf5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                  💪
                </div>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827' }}>{item.muscleGroup}</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                    {new Date(item.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
                  </div>
                </div>
              </div>
              <span style={{ color: '#9ca3af', fontSize: '20px', transform: expanded === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>▾</span>
            </button>

            {expanded === i && (
              <div style={{ padding: '0 20px 18px', borderTop: '0.5px solid rgba(0,0,0,0.07)' }}>
                <pre style={{ fontSize: '13px', color: '#374151', whiteSpace: 'pre-wrap', lineHeight: 1.75, marginTop: '14px', fontFamily: 'Inter, sans-serif' }}>
                  {item.workoutPlan}
                </pre>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
