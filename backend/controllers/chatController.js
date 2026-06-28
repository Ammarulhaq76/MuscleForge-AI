const ChatLog                        = require('../models/ChatLog')
const { getModel, CHAT_GUARD_PROMPT } = require('../config/gemini')

/**
 * POST /api/chat/message
 *
 * Flow:
 *  1. Receive user message + conversation history
 *  2. Send through CHAT_GUARD_PROMPT (topic filter + responder in one call)
 *  3. Parse JSON response — if off_topic, block; else return the reply
 *  4. Persist the exchange to ChatLog
 */
const sendMessage = async (req, res, next) => {
  try {
    const { message, muscleGroup, conversationHistory = [] } = req.body

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required.' })
    }

    /* ── Build conversation context for the model ── */
    const contextLines = conversationHistory
      .slice(-6) // keep last 3 turns
      .map((m) => `${m.role === 'user' ? 'User' : 'Trainer'}: ${m.content}`)
      .join('\n')

    const fullPrompt = `${CHAT_GUARD_PROMPT}

${contextLines ? `Recent conversation:\n${contextLines}\n` : ''}Current muscle group context: ${muscleGroup || 'General fitness'}

User message: ${message.trim()}`

    const model  = getModel()
    const result = await model.generateContent(fullPrompt)
    const raw    = result.response.text().trim()

    /* ── Parse JSON from model ── */
    let parsed
    try {
      const clean = raw.replace(/```json|```/g, '').trim()
      parsed = JSON.parse(clean)
    } catch {
      // If model returned non-JSON text, treat as on-topic reply
      parsed = { off_topic: false, reply: raw }
    }

    const offTopic = Boolean(parsed.off_topic)
    const reply    = parsed.reply || 'Sorry, I could not generate a response.'

    /* ── Persist to MongoDB ── */
    await ChatLog.findOneAndUpdate(
      { muscleGroup, userId: req.user?._id || null },
      {
        $push: {
          messages: {
            $each: [
              { role: 'user',      content: message.trim(), offTopic: false },
              { role: 'assistant', content: reply,          offTopic },
            ],
          },
        },
      },
      { upsert: true, new: true }
    )

    res.json({ success: true, reply, offTopic })
  } catch (err) {
    next(err)
  }
}

module.exports = { sendMessage }
