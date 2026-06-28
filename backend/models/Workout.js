const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema(
  {
    muscleGroup: {
      type: String, required: true, trim: true,
    },
    workoutPlan: {
      type: String, required: true,
    },
    /*
     * userId — link workouts to users once auth is live.
     * Currently optional (null = anonymous session).
     */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
)

workoutSchema.index({ createdAt: -1 })
workoutSchema.index({ userId: 1, createdAt: -1 })

module.exports = mongoose.model('Workout', workoutSchema)
