'use client'

import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Leonardo Dibe's AI Assistant. Ask me anything about his experience, skills, or background. For example: 'What is Leonardo's experience with AI?' or 'Tell me about his achievements'",
      sender: 'assistant',
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          history: messages,
        }),
      })

      const data = await response.json()

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: `Error: ${data.error}`,
            sender: 'assistant',
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: data.message,
            sender: 'assistant',
          },
        ])
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: 'Sorry, I encountered an error. Please try again.',
          sender: 'assistant',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="chat-container">
      <div className="flex items-center justify-center p-4 bg-primary text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Leonardo Dibe</h1>
          <p className="text-sm text-gray-200">Senior Marketing Manager | Growth • CRM • AI</p>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}-message`}>
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="loading">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me about Leonardo's experience..."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>
          Send
        </button>
      </div>
    </div>
  )
}
