import client from './client'

/* ── Workout ──────────────────────────────────────────── */
export const generateWorkout = (muscleGroup) =>
  client.post('/workout/generate', { muscleGroup }).then((r) => r.data)

export const getWorkoutHistory = () =>
  client.get('/workout/history').then((r) => r.data)

export const deleteWorkout = (id) =>
  client.delete(`/workout/${id}`).then((r) => r.data)

/* ── Chat ─────────────────────────────────────────────── */
export const sendChatMessage = (message, muscleGroup, conversationHistory = []) =>
  client.post('/chat/message', { message, muscleGroup, conversationHistory }).then((r) => r.data)

/* ── Auth (stubs — implement when ready) ─────────────── */
export const authLogin  = (email, password) =>
  client.post('/auth/login', { email, password }).then((r) => r.data)

export const authSignup = (name, email, password) =>
  client.post('/auth/signup', { name, email, password }).then((r) => r.data)
