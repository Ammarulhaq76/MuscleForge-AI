/**
 * Signup Page
 * -----------
 * Pre-built and ready. To activate:
 *   1. Add the route in App.jsx:  <Route path="/signup" element={<Signup />} />
 *   2. Implement AuthContext.signup() to call POST /api/auth/signup
 *   3. On success, store the JWT and redirect the user
 */

import React, { useState } from 'react'
import { Link /* , useNavigate */ } from 'react-router-dom'
import { toast } from 'react-hot-toast'
// import { useAuth } from '../context/AuthContext'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function Signup() {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [loading, setLoading]   = useState(false)
  // const { signup } = useAuth()
  // const navigate   = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !password) { toast.error('Please fill in all fields.'); return }
    if (password !== confirm)         { toast.error('Passwords do not match.'); return }
    if (password.length < 6)         { toast.error('Password must be at least 6 characters.'); return }
    setLoading(true)
    try {
      // await signup(name, email, password)
      // navigate('/')
      toast.success('Account created! (auth not yet wired)')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span style={{ fontSize: '40px' }}>💪</span>
          <h1 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em', marginTop: '10px', marginBottom: '6px' }}>
            Create your account
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>Start training smarter with AI</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Input
              label="Full name"
              placeholder="Alex Johnson"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon="👤"
              required
            />
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon="📧"
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon="🔒"
              required
            />
            <Input
              label="Confirm password"
              type="password"
              placeholder="Repeat your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              icon="🔒"
              required
            />
            <Button type="submit" fullWidth size="lg" loading={loading}>
              Create Account 🚀
            </Button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#6b7280', marginTop: '1.25rem' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#059669', fontWeight: 600 }}>Sign in</Link>
          </p>
        </Card>
      </div>
    </div>
  )
}
