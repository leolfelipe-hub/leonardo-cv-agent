'use client'

import { useState } from 'react'

export default function LoginForm({ onLoginSuccess }) {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
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
        setError(data.message || 'Invalid email or code')
      }
    } catch (err) {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Leonardo's AI Assistant</h1>
          <p>Professional CV & Career Companion</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Access Code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="LEONARDO-XXXXXX"
              required
              disabled={loading}
              style={{ fontFamily: 'monospace', letterSpacing: '2px' }}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading || !email || !code} className="login-button">
            {loading ? 'Verifying...' : 'Access Chat'}
          </button>
        </form>

        <div className="login-info">
          <p>🔐 This is a private access link.</p>
          <p>Each code works only once per email for security.</p>
        </div>
      </div>
    </div>
  )
}
