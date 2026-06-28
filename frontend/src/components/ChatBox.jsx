import React, { useState, useRef, useEffect } from 'react'
import { sendChatMessage } from '../api'
import Card from './ui/Card'
import Button from './ui/Button'

export default function ChatBox({ muscleGroup }) {
  const [messages, setMessages]   = useState([])
  const [input, setInput]         = useState('')
  const [loading, setLoading]     = useState(false)
  const bottomRef                 = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  const send = async () => {
    const q = input.trim()
    if (!q || loading) return
    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: q }])
    setLoading(true)
    try {
      const history = messages.map(({ role, content }) => ({ role, content }))
      const data    = await sendChatMessage(q, muscleGroup, history)
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply, offTopic: data.offTopic }])
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: err.message, error: true }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      {/* Header */}
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
          Ask Your AI Trainer
        </p>
        <p style={{ fontSize: '13px', color: '#6b7280' }}>
          Ask about exercise form, reps, nutrition or recovery. Off-topic questions are blocked.
        </p>
      </div>

      {/* Messages */}
      {messages.length > 0 && (
        <div style={{ maxHeight: '340px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px', paddingRight: '4px' }}>
          {messages.map((m, i) => {
            if (m.role === 'user') return (
              <div key={i} className="anim-fade-up" style={{ alignSelf: 'flex-end', background: '#10b981', color: '#fff', padding: '10px 15px', borderRadius: '16px 16px 4px 16px', fontSize: '13px', maxWidth: '80%', lineHeight: 1.65 }}>
                {m.content}
              </div>
            )
            if (m.offTopic) return (
              <div key={i} className="anim-fade-up" style={{ alignSelf: 'flex-start', background: '#fffbeb', border: '0.5px solid #fcd34d', color: '#92400e', padding: '10px 15px', borderRadius: '4px 16px 16px 16px', fontSize: '13px', maxWidth: '84%', lineHeight: 1.65 }}>
                ⚠️ {m.content}
              </div>
            )
            if (m.error) return (
              <div key={i} className="anim-fade-up" style={{ alignSelf: 'flex-start', background: '#fef2f2', border: '0.5px solid #fca5a5', color: '#b91c1c', padding: '10px 15px', borderRadius: '4px 16px 16px 16px', fontSize: '13px', maxWidth: '84%', lineHeight: 1.65 }}>
                ❌ {m.content}
              </div>
            )
            return (
              <div key={i} className="anim-fade-up" style={{ alignSelf: 'flex-start', background: '#f3f4f6', color: '#111827', padding: '10px 15px', borderRadius: '4px 16px 16px 16px', fontSize: '13px', maxWidth: '84%', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                {m.content}
              </div>
            )
          })}
          {loading && (
            <div style={{ alignSelf: 'flex-start', background: '#f3f4f6', padding: '11px 15px', borderRadius: '4px 16px 16px 16px', display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', color: '#6b7280' }}>
              <span style={{ width: 14, height: 14, border: '2px solid rgba(0,0,0,0.1)', borderTopColor: '#10b981', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
              Thinking…
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Input row */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder={`Ask about ${muscleGroup || 'your workout'}, form, nutrition…`}
          style={{
            flex: 1, padding: '10px 14px',
            border: '0.5px solid rgba(0,0,0,0.14)',
            borderRadius: '10px', fontSize: '14px',
            background: '#fafafa', color: '#111827', outline: 'none',
            transition: 'border-color 0.15s',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#10b981')}
          onBlur={(e)  => (e.target.style.borderColor = 'rgba(0,0,0,0.14)')}
        />
        <Button onClick={send} loading={loading} disabled={!input.trim()}>
          ↑ Send
        </Button>
      </div>
    </Card>
  )
}
