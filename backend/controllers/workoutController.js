const Workout               = require('../models/Workout')
const { getModel, WORKOUT_PROMPT } = require('../config/gemini')

const VALID_GROUPS = [
  'Upper Body','Lower Body','Full Body','Core',
  'Chest','Back','Shoulders','Biceps','Triceps',
  'Quads','Hamstrings','Glutes','Calves','Abs','Forearms','Traps',
]

/**
 * POST /api/workout/generate
 */
const generateWorkout = async (req, res, next) => {
  try {
    const { muscleGroup } = req.body

    if (!muscleGroup || !VALID_GROUPS.includes(muscleGroup)) {
      return res.status(400).json({ success: false, message: 'Invalid muscle group selected.' })
    }

    const model  = getModel()
    const prompt = `${WORKOUT_PROMPT}\n\nCreate a complete workout plan for: ${muscleGroup}`
    const result = await model.generateContent(prompt)
    const plan   = result.response.text()

    const workout = await Workout.create({
      muscleGroup,
      workoutPlan: plan,
      userId: req.user?._id || null, // null until auth is active
    })

    res.status(201).json({
      success: true,
      workout: plan,
      workoutId: workout._id,
    })
  } catch (err) {
    next(err)
  }
}

/**
 * GET /api/workout/history
 */
const getWorkoutHistory = async (req, res, next) => {
  try {
    const filter = req.user ? { userId: req.user._id } : {}
    const history = await Workout.find(filter)
      .sort({ createdAt: -1 })
      .limit(50)
      .select('-__v')
    res.json({ success: true, history })
  } catch (err) {
    next(err)
  }
}

/**
 * DELETE /api/workout/:id
 */
const deleteWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findById(req.params.id)
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Workout not found.' })
    }
    await workout.deleteOne()
    res.json({ success: true, message: 'Workout deleted.' })
  } catch (err) {
    next(err)
  }
}

module.exports = { generateWorkout, getWorkoutHistory, deleteWorkout }
