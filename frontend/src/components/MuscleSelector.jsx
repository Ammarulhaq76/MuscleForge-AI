import React from 'react'
import Card from './ui/Card'

const REGIONS = [
  { id: 'Upper Body',  emoji: '💪', desc: 'Chest, back, arms & shoulders' },
  { id: 'Lower Body',  emoji: '🦵', desc: 'Quads, hamstrings, glutes & calves' },
  { id: 'Full Body',   emoji: '⚡', desc: 'Complete compound session' },
  { id: 'Core',        emoji: '🎯', desc: 'Abs, obliques & lower back' },
]

const MUSCLES = [
  { id: 'Chest',      emoji: '🫁' },
  { id: 'Back',       emoji: '🔙' },
  { id: 'Shoulders',  emoji: '🤸' },
  { id: 'Biceps',     emoji: '💪' },
  { id: 'Triceps',    emoji: '🦾' },
  { id: 'Quads',      emoji: '🦵' },
  { id: 'Hamstrings', emoji: '🏃' },
  { id: 'Glutes',     emoji: '🍑' },
  { id: 'Calves',     emoji: '🧗' },
  { id: 'Abs',        emoji: '⬛' },
  { id: 'Forearms',   emoji: '✊' },
  { id: 'Traps',      emoji: '🔺' },
]

export default function MuscleSelector({ selected, onSelect }) {
  return (
    <Card>
      <p style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px' }}>
        Train by body region
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px' }}>
        {REGIONS.map((r) => {
          const active = selected === r.id
          return (
            <button
              key={r.id}
              onClick={() => onSelect(r.id)}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: '5px', padding: '14px 8px', textAlign: 'center',
                border: `1.5px solid ${active ? '#10b981' : 'rgba(0,0,0,0.08)'}`,
                borderRadius: '14px',
                background: active ? '#ecfdf5' : '#fafafa',
                boxShadow: active ? '0 0 0 3px rgba(16,185,129,0.14)' : 'none',
                cursor: 'pointer', transition: 'all 0.18s',
              }}
            >
              <span style={{ fontSize: '26px', lineHeight: 1 }}>{r.emoji}</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: active ? '#047857' : '#1f2937' }}>{r.id}</span>
              <span style={{ fontSize: '11px', color: active ? '#059669' : '#9ca3af', lineHeight: 1.3 }}>{r.desc}</span>
            </button>
          )
        })}
      </div>

      {/* Divider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '1.2rem 0', color: '#9ca3af', fontSize: '12px' }}>
        <div style={{ flex: 1, height: '0.5px', background: 'rgba(0,0,0,0.08)' }} />
        <span>or pick a specific muscle</span>
        <div style={{ flex: 1, height: '0.5px', background: 'rgba(0,0,0,0.08)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(118px,1fr))', gap: '8px' }}>
        {MUSCLES.map((m) => {
          const active = selected === m.id
          return (
            <button
              key={m.id}
              onClick={() => onSelect(m.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '9px 12px',
                border: `1.5px solid ${active ? '#10b981' : 'rgba(0,0,0,0.08)'}`,
                borderRadius: '9px',
                background: active ? '#ecfdf5' : '#fafafa',
                fontSize: '13px', fontWeight: active ? 700 : 500,
                color: active ? '#047857' : '#374151',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              <span>{m.emoji}</span><span>{m.id}</span>
            </button>
          )
        })}
      </div>
    </Card>
  )
}
