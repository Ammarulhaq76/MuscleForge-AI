/**
 * api/client.js
 * Central axios instance.
 * When auth is added:
 *   – The request interceptor below will automatically attach the JWT
 *     from localStorage to every request.
 *   – The response interceptor handles 401 → redirect to /login.
 */

import axios from 'axios'

const client = axios.create({
  baseURL: '/api',
  timeout: 40000,
  headers: { 'Content-Type': 'application/json' },
})

/* ── Request interceptor (JWT attach — ready for auth) ── */
client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fitai_token') // set this on login
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (err) => Promise.reject(err)
)

/* ── Response interceptor ──────────────────────────────── */
client.interceptors.response.use(
  (res) => res,
  (err) => {
    const status  = err.response?.status
    const message = err.response?.data?.message || 'Something went wrong. Please try again.'

    // When auth is live: redirect to login on 401
    if (status === 401) {
      localStorage.removeItem('fitai_token')
      // window.location.href = '/login'  // ← uncomment when auth is ready
    }

    return Promise.reject(new Error(message))
  }
)

export default client
