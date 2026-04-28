'use client'

import { useState } from 'react'

export default function LoginForm({ onLoginSuccess }) {
  const [mode, setMode] = useState('have-code')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmitCode = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('authenticated', 'true')
        localStorage.setItem('userEmail', email)
        onLoginSuccess()
      } else {
        setError(data.message || 'Código inválido')
      }
    } catch (err) {
      setError('Erro na conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleRequestToken = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/request-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess('Código enviado para seu email! Verifique sua caixa de entrada.')
        setEmail('')
      } else {
        setError(data.error || 'Erro ao solicitar código')
      }
    } catch (err) {
      setError('Erro na conexão. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Assistente de IA do Leonardo</h1>
          <p>Seu Currículo e Companheiro de Carreira</p>
        </div>

        <div className="login-tabs">
          <button
            className={`tab-btn ${mode === 'have-code' ? 'active' : ''}`}
            onClick={() => {
              setMode('have-code')
              setError('')
              setSuccess('')
            }}
            disabled={loading}
          >
            Já tenho o código
          </button>
          <button
            className={`tab-btn ${mode === 'request-code' ? 'active' : ''}`}
            onClick={() => {
              setMode('request-code')
              setError('')
              setSuccess('')
            }}
            disabled={loading}
          >
            Solicitar código
          </button>
        </div>

        {mode === 'have-code' && (
          <form onSubmit={handleSubmitCode} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Código de Acesso</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="ABC123"
                required
                disabled={loading}
                style={{ fontFamily: 'monospace', letterSpacing: '2px' }}
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button type="submit" disabled={loading || !email || !code} className="login-button">
              {loading ? 'Verificando...' : 'Acessar'}
            </button>
          </form>
        )}

        {mode === 'request-code' && (
          <form onSubmit={handleRequestToken} className="login-form">
            <div className="form-group">
              <label>Seu Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                disabled={loading}
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button type="submit" disabled={loading || !email} className="login-button">
              {loading ? 'Enviando...' : 'Solicitar Código'}
            </button>
          </form>
        )}

        <div className="login-info">
          <p>🔐 Acesso privado e seguro</p>
          <p>Seu código é válido por 24 horas</p>
        </div>
      </div>
    </div>
  )
}
