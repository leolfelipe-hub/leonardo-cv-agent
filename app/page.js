'use client'

import { useState, useRef, useEffect } from 'react'
import { marked } from 'marked'
import LoginForm from './components/LoginForm'
import Tabs from './components/Tabs'
import Timeline from './components/Timeline'
import CaseExplorer from './components/CaseExplorer'
import ExpertiseRadar from './components/ExpertiseRadar'

export default function Home() {
  const [authenticated, setAuthenticated] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(null)
  const [activeTab, setActiveTab] = useState('chat')
  const messagesEndRef = useRef(null)

  const starterQuestions = [
    "Faça um breve resumo do currículo",
    "Conte-me sobre um case de CRM/Lifecycle",
    "Mostre um case de mídia paga",
    "Qual é a expertise em IA?",
  ]

  const initializeChat = () => {
    setMessages([
      {
        id: 1,
        text: "Olá! Sou o Assistente de IA do Leonardo Dibe. Faça-me qualquer pergunta sobre sua experiência, habilidades ou background. Você pode escrever em português ou inglês — responderei no mesmo idioma! 🇧🇷 🇺🇸",
        sender: 'assistant',
        timestamp: new Date().toISOString(),
      },
    ])
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  // Check if already authenticated on mount
  useEffect(() => {
    const auth = localStorage.getItem('authenticated')
    if (auth === 'true') {
      setAuthenticated(true)
    }
  }, [])

  // Initialize chat when authenticated
  useEffect(() => {
    if (authenticated && messages.length === 0) {
      initializeChat()
    }
  }, [authenticated])

  // Save messages to localStorage
  useEffect(() => {
    if (authenticated && messages.length > 0) {
      localStorage.setItem('leonardoChat', JSON.stringify(messages))
    }
  }, [messages, authenticated])

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  if (!authenticated) {
    return <LoginForm onLoginSuccess={() => setAuthenticated(true)} />
  }

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const formatTime = (isoString) => {
    const date = new Date(isoString)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const handleStarterQuestion = (question) => {
    setInput(question)
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString(),
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
            timestamp: new Date().toISOString(),
          },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: data.message,
            sender: 'assistant',
            timestamp: new Date().toISOString(),
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
          timestamp: new Date().toISOString(),
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
    <div className="app-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="avatar-circle">LD</div>

          <h2 className="sidebar-name">Leonardo Dibe</h2>
          <p className="sidebar-title">Senior Marketing Manager</p>

          <div className="expertise-tags">
            <span className="tag">Growth</span>
            <span className="tag">CRM</span>
            <span className="tag">AI</span>
          </div>

          <div className="sidebar-divider"></div>

          <div className="sidebar-section">
            <h4>Experiência</h4>
            <p>19+ anos em Growth Marketing, CRM e automação com IA</p>
          </div>

          <div className="sidebar-section">
            <h4>Principais Habilidades</h4>
            <ul className="skills-list">
              <li>🚀 Growth Marketing</li>
              <li>📊 Mídia Paga On & Off</li>
              <li>👥 CRM & Gestão de Ciclo de Vida</li>
              <li>🤖 Automação com IA</li>
            </ul>
          </div>

          <div className="sidebar-divider"></div>

          <div className="sidebar-section contact">
            <h4>Entrar em Contato</h4>
            <a href="mailto:leo.lfelipe@gmail.com" className="contact-link">
              📧 Email
            </a>
            <a href="https://linkedin.com/in/leonardodibe" className="contact-link" target="_blank" rel="noopener noreferrer">
              🔗 LinkedIn
            </a>
            <a href="tel:+5511982976543" className="contact-link">
              📱 Telefone
            </a>
          </div>

          <div className="sidebar-divider"></div>

          <div className="sidebar-section">
            <h4>Download Currículo</h4>
            <div className="cv-buttons">
              <a href="/CV-PT.pdf" download="Leonardo_Dibe_CV_PT.pdf" className="cv-btn">
                📄 Português
              </a>
              <a href="/CV-EN.pdf" download="Leonardo_Dibe_CV_EN.pdf" className="cv-btn">
                📄 English
              </a>
            </div>
          </div>

          <div className="sidebar-divider"></div>

          <div className="cta-section">
            <h4>Vamos Conversar?</h4>
            <a href="https://wa.me/5511982976543?text=Olá%20Leonardo!%20Gostaria%20de%20conversar%20com%20você." target="_blank" rel="noopener noreferrer" className="cta-button">
              💬 Mensagem no WhatsApp
            </a>
          </div>

          <button className="clear-chat-btn" onClick={() => {
            localStorage.removeItem('leonardoChat')
            initializeChat()
          }}>
            Limpar Histórico
          </button>

          <button className="logout-btn" onClick={() => {
            localStorage.removeItem('authenticated')
            localStorage.removeItem('leonardoChat')
            setAuthenticated(false)
          }}>
            🚪 Sair
          </button>
        </div>
      </div>

      {/* Main Area */}
      <div className="main-wrapper">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'chat' && (
        <div className="chat-wrapper">
        <div className="chat-header">
          <h1>Assistente de IA do Leonardo</h1>
          <p>Faça qualquer pergunta sobre a carreira, habilidades e conquistas do Leonardo</p>
        </div>

        {messages.length === 1 && (
          <div className="starter-questions">
            <p className="starter-label">Try asking:</p>
            <div className="questions-grid">
              {starterQuestions.map((question, idx) => (
                <button
                  key={idx}
                  className="starter-btn"
                  onClick={() => handleStarterQuestion(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-card ${msg.sender}-message`}>
              <div className="message-avatar">
                {msg.sender === 'assistant' ? '🤖' : '👤'}
              </div>
              <div className="message-wrapper">
                <div className="message-content">
                  {msg.sender === 'assistant' ? (
                    <div
                      className="markdown-content"
                      dangerouslySetInnerHTML={{
                        __html: marked(msg.text, { breaks: true }),
                      }}
                    />
                  ) : (
                    msg.text
                  )}
                </div>
                <div className="message-footer">
                  <span className="message-time">{formatTime(msg.timestamp)}</span>
                  {msg.sender === 'assistant' && (
                    <button
                      className="copy-btn"
                      onClick={() => copyToClipboard(msg.text, msg.id)}
                      title="Copy message"
                    >
                      {copied === msg.id ? '✓ Copied' : '📋 Copy'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="message-card assistant-message">
              <div className="message-avatar">🤖</div>
              <div className="loading">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
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
            placeholder="Pergunte sobre experiência, habilidades ou conquistas do Leonardo..."
            disabled={loading}
            className="chat-input"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="send-button"
          >
            {loading ? '...' : '→'}
          </button>
        </div>
        </div>
        )}

        {activeTab === 'timeline' && <Timeline />}
        {activeTab === 'cases' && <CaseExplorer />}
        {activeTab === 'expertise' && <ExpertiseRadar />}
      </div>
    </div>
  )
}
