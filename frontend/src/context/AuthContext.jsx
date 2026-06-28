/**
 * AuthContext
 * -----------
 * Currently ships as a stub so the app works without login.
 * When you're ready to add authentication:
 *   1. Install jwt-decode:  npm i jwt-decode
 *   2. Implement login() / signup() / logout() to call your /api/auth endpoints
 *   3. Store the JWT in localStorage and attach it via axios interceptor in api/client.js
 *   4. Wrap <ProtectedRoute> around pages that need auth
 *
 * The shape of `user` is intentionally forward-compatible:
 *   { _id, name, email, token }
 */

import React, { createContext, useContext, useState, useCallback } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Replace `null` with the result of reading a stored token when auth is ready
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(false)

  /* ── Stub methods ─────────────────────────────── */

  const login = useCallback(async (/* email, password */) => {
    // TODO: call POST /api/auth/login, save JWT, setUser(decoded)
    throw new Error('Auth not yet implemented')
  }, [])

  const signup = useCallback(async (/* name, email, password */) => {
    // TODO: call POST /api/auth/signup, save JWT, setUser(decoded)
    throw new Error('Auth not yet implemented')
  }, [])

  const logout = useCallback(() => {
    // TODO: clear localStorage token, reset axios header
    setUser(null)
  }, [])

  const isAuthenticated = Boolean(user)

  return (
    <AuthContext.Provider value={{ user, authLoading, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
