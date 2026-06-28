import React from 'react'

const variants = {
  primary: {
    background: '#10b981', color: '#fff', border: 'none',
    boxShadow: '0 4px 14px rgba(16,185,129,0.30)',
  },
  secondary: {
    background: '#fff', color: '#374151',
    border: '0.5px solid rgba(0,0,0,0.14)', boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  danger: {
    background: '#fee2e2', color: '#b91c1c', border: '0.5px solid #fca5a5',
  },
  ghost: {
    background: 'transparent', color: '#6b7280', border: 'none', boxShadow: 'none',
  },
}

export default function Button({
  children, variant = 'primary', size = 'md',
  loading = false, disabled = false, fullWidth = false,
  onClick, style = {}, type = 'button',
}) {
  const pad = size === 'sm' ? '7px 14px' : size === 'lg' ? '13px 28px' : '10px 20px'
  const fs  = size === 'sm' ? '13px' : size === 'lg' ? '15px' : '14px'
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
        padding: pad, borderRadius: '10px', fontSize: fs, fontWeight: 600,
        width: fullWidth ? '100%' : undefined,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.55 : 1,
        transition: 'all 0.18s',
        ...variants[variant],
        ...style,
      }}
    >
      {loading && (
        <span style={{
          width: 15, height: 15, flexShrink: 0,
          border: '2px solid rgba(255,255,255,0.35)',
          borderTopColor: variant === 'primary' ? '#fff' : '#10b981',
          borderRadius: '50%', animation: 'spin 0.7s linear infinite',
          display: 'inline-block',
        }} />
      )}
      {children}
    </button>
  )
}
