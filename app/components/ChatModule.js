'use client'

import { useState, useRef, useEffect } from 'react'
import { marked } from 'marked'
import { Bot, Trash2, Send } from 'lucide-react'

export default function ChatModule({ initialQuery = null }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const messagesContainerRef = useRef(null)
  const initialQueryRef = useRef(null)

  const starterQuestions = [
    'Faça um breve resumo do currículo',
    'Conte sobre o case do Outback Delivery (R$21M)',
    'Como o Leonardo usa IA no marketing?',
    'Qual o case de CRM/Lifecycle?',
  ]

  const greetingMessage = {
    id: 1,
    text: '👋 Olá! Sou o **Agente de IA do Leonardo Dibe**.\n\nPosso responder perguntas sobre os 19+ anos de experiência dele em **Growth, CRM, Performance Media e IA**. Posso detalhar os 5 cases reais com números, falar das empresas (Mastercard, Braza, Outback, Accor) ou sobre as habilidades.\n\nResponderei no idioma da sua pergunta — português ou inglês. 🇧🇷 🇺🇸',
    sender: 'assistant',
    timestamp: new Date().toISOString(),
  }

  useEffect(() => {
    const savedChat = typeof window !== 'undefined' ? localStorage.getItem('leonardoChat') : null
    if (savedChat) {
      try {
        const parsed = JSON.parse(savedChat)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed)
        } else {
          setMessages([greetingMessage])
        }
      } catch {
        setMessages([greetingMessage])
      }
    } else {
      setMessages([greetingMessage])
    }
    setInitialized(true)
  }, [])

  // Send initial query passed via props (e.g., from search bar or quick action)
  useEffect(() => {
    if (initialized && initialQuery && initialQueryRef.current !== initialQuery) {
      initialQueryRef.current = initialQuery
      sendMessageWithText(initialQuery)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery, initialized])

  useEffect(() => {
    if (initialized && messages.length > 0) {
      localStorage.setItem('leonardoChat', JSON.stringify(messages))
    }
  }, [messages, initialized])

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [messages, loading])

  const handleStarterQuestion = (question) => setInput(question)

  const sendMessageWithText = async (text) => {
    if (!text.trim()) return

    const userMessage = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    }

    const currentHistory = messages
    setMessages((prev) => [...prev, userMessage])
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: currentHistory }),
      })

      const data = await response.json()

      const reply = data.error
        ? `Desculpe, ocorreu um erro: ${data.error}`
        : data.message

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: reply,
          sender: 'assistant',
          timestamp: new Date().toISOString(),
        },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: 'Desculpe, encontrei um erro. Tente novamente.',
          sender: 'assistant',
          timestamp: new Date().toISOString(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text) return
    setInput('')
    await sendMessageWithText(text)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearChat = () => {
    localStorage.removeItem('leonardoChat')
    setMessages([greetingMessage])
  }

  return (
    <div className="chat-module">
      <div className="chat-module-header">
        <div className="chat-module-title-wrap">
          <div className="chat-module-icon-box">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="chat-module-title">Agente de IA do Leonardo</h3>
            <p className="chat-module-sub">Powered by Claude</p>
          </div>
        </div>
        <button className="chat-clear-btn" onClick={clearChat} title="Limpar conversa">
          <Trash2 size={14} />
          <span>Limpar</span>
        </button>
      </div>

      {messages.length <= 1 && (
        <div className="starter-chips">
          {starterQuestions.map((q, idx) => (
            <button
              key={idx}
              className="starter-chip"
              onClick={() => handleStarterQuestion(q)}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <div className="chat-messages" ref={messagesContainerRef}>
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-bubble-row ${msg.sender}`}>
            <div className={`chat-avatar ${msg.sender}`}>
              {msg.sender === 'assistant' ? <Bot size={18} /> : 'LD'}
            </div>
            <div className={`chat-bubble ${msg.sender}`}>
              {msg.sender === 'assistant' ? (
                <div
                  className="markdown-content"
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(msg.text, { breaks: true }),
                  }}
                />
              ) : (
                msg.text
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="chat-bubble-row assistant">
            <div className="chat-avatar assistant">
              <Bot size={18} />
            </div>
            <div className="chat-bubble assistant">
              <div className="chat-typing">
                <div className="chat-typing-dot"></div>
                <div className="chat-typing-dot"></div>
                <div className="chat-typing-dot"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Pergunte sobre cases, experiência, IA..."
          disabled={loading}
          className="chat-input"
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="chat-send-btn"
          title="Enviar"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}
