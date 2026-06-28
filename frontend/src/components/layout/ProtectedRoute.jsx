/**
 * ProtectedRoute
 * --------------
 * Currently passes children through unconditionally.
 * When auth is live, uncomment the redirect logic below.
 *
 * Usage:
 *   <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
 */

import React from 'react'
// import { Navigate, useLocation } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  // ── Uncomment when auth is ready ──────────────────────
  // const { isAuthenticated, authLoading } = useAuth()
  // const location = useLocation()
  //
  // if (authLoading) return <div style={{ padding: '4rem', textAlign: 'center' }}>Loading…</div>
  // if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />
  // ──────────────────────────────────────────────────────

  return children
}
