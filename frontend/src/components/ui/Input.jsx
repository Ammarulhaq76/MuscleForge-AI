import React, { useState } from 'react'

export default function Input({
  label, type = 'text', placeholder, value,
  onChange, error, hint, icon, required = false,
  style = {},
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', ...style }}>
      {label && (
        <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>
          {label}{required && <span style={{ color: '#ef4444', marginLeft: '3px' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        {icon && (
          <span style={{
            position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
            fontSize: '16px', pointerEvents: 'none', userSelect: 'none',
          }}>
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            padding: icon ? '10px 12px 10px 38px' : '10px 14px',
            border: `0.5px solid ${error ? '#fca5a5' : focused ? '#10b981' : 'rgba(0,0,0,0.14)'}`,
            borderRadius: '10px', fontSize: '14px',
            background: error ? '#fef2f2' : '#fafafa',
            color: '#111827', outline: 'none',
            transition: 'border-color 0.15s, background 0.15s',
            boxShadow: focused ? '0 0 0 3px rgba(16,185,129,0.12)' : 'none',
          }}
        />
      </div>
      {error && <p style={{ fontSize: '12px', color: '#b91c1c' }}>{error}</p>}
      {hint && !error && <p style={{ fontSize: '12px', color: '#9ca3af' }}>{hint}</p>}
    </div>
  )
}
