const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  role:     { type: String, enum: ['user', 'assistant'], required: true },
  content:  { type: String, required: true },
  offTopic: { type: Boolean, default: false },
}, { _id: false })

const chatLogSchema = new mongoose.Schema(
  {
    muscleGroup: { type: String, required: true },
    messages:    [messageSchema],
    workoutId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workout',
      default: null,
    },
    /* Link to user once auth is live */
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('ChatLog', chatLogSchema)
