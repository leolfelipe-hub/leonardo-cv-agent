'use client'

import { useEffect, useRef, useState } from 'react'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function LoginForm({ onLoginSuccess }) {
  const [mode, setMode] = useState('have-code')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [requestEmail, setRequestEmail] = useState('')
  const [autoDetected, setAutoDetected] = useState(false)
  const spotlightRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${e.clientX - 300}px`
        spotlightRef.current.style.top = `${e.clientY - 300}px`
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Auto-preenche email/código se vier por URL (ex: link do email)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    const emailParam = params.get('email')
    const codeParam = params.get('code')
    if (emailParam || codeParam) {
      setMode('have-code')
      if (emailParam) setEmail(emailParam)
      if (codeParam) setCode(codeParam.toUpperCase())
      setAutoDetected(true)
      setSuccess('✨ Detectamos seu código! Clica em "Acessar" pra entrar.')
    }
  }, [])

  const handleSubmitCode = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    // Email pode vir do form (Tab 1 com campo opcional, ou Tab 2 já preenchido)
    const validationEmail = email || ''

    try {
      const response = await fetch('/api/auth/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: validationEmail, code }),
      })

      const data = await response.json()

      if (data.success) {
        localStorage.setItem('authenticated', 'true')
        if (validationEmail) localStorage.setItem('userEmail', validationEmail)
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
        body: JSON.stringify({ email: requestEmail }),
      })

      const data = await response.json()

      if (data.success) {
        setCodeSent(true)
        setEmail(requestEmail)
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
    <div className="login-shell">
      {/* Background animado igual ao dashboard */}
      <div className="bg-layer">
        <div className="bg-base-gradient"></div>
        <div className="bg-color-overlay"></div>

        <svg className="bg-mesh-grid" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="loginMesh" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="url(#loginMeshGrad)"
                strokeWidth="0.3"
              />
            </pattern>
            <linearGradient id="loginMeshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" stopOpacity={0.4} />
              <stop offset="50%" stopColor="#475569" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#334155" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#loginMesh)" />
        </svg>

        <div ref={spotlightRef} className="bg-spotlight"></div>
        <div className="bg-accent-tl"></div>
        <div className="bg-accent-br"></div>

        <div className="bg-orbs">
          <div className="bg-orb bg-orb-1"></div>
          <div className="bg-orb bg-orb-2"></div>
          <div className="bg-orb bg-orb-3"></div>
          <div className="bg-twinkle bg-twinkle-1"></div>
          <div className="bg-twinkle bg-twinkle-2"></div>
          <div className="bg-twinkle bg-twinkle-3"></div>
        </div>
      </div>

      <div className="login-grid">
        {/* HERO LEFT */}
        <div className="login-hero">
          <div className="login-hero-avatar-row">
            <div className="login-hero-avatar">LD</div>
            <div className="login-hero-id">
              <span className="login-hero-id-name">Leonardo Dibe</span>
              <span className="login-hero-id-role">Senior Growth Marketing</span>
            </div>
          </div>

          <h1 className="login-hero-greeting">
            Olá, eu sou o <span>Leonardo Dibe</span>
          </h1>

          <div className="login-hero-text">
            Construí este site com o apoio de{' '}
            <strong>ferramentas de IA, incluindo Claude Code</strong>, pra contar um pouco da
            minha trajetória, e mostrar as <strong>ferramentas que eu domino</strong> e a{' '}
            <strong>minha forma de trabalhar</strong>: transformar{' '}
            <strong className="accent">dado em contexto</strong>, contexto em{' '}
            <strong className="accent">decisão</strong>, e decisão em{' '}
            <strong className="accent">ação</strong>.
          </div>

          <div className="login-hero-text">
            <strong>Aqui você pode:</strong>
          </div>

          <ul className="login-hero-options">
            <li>
              <a
                href="https://wa.me/5511982976543?text=Ol%C3%A1%20Leonardo!%20Vi%20seu%20CV%20Agent%20e%20gostaria%20de%20conversar."
                target="_blank"
                rel="noopener noreferrer"
                className="login-option-link login-option-whatsapp"
              >
                <span className="login-option-emoji">💬</span>
                <span className="login-option-text">
                  <strong>Me chamar direto no WhatsApp</strong>
                  <span className="login-option-sub">Pra gente conversar</span>
                </span>
              </a>
            </li>
            <li>
              <a
                href="/CV-PT.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="login-option-link login-option-cv"
              >
                <span className="login-option-emoji">📄</span>
                <span className="login-option-text">
                  <strong>Baixar meu CV em PDF</strong>
                  <span className="login-option-sub">Formato tradicional</span>
                </span>
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  const card = document.querySelector('.login-card-dark')
                  if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    card.classList.add('login-card-pulse')
                    setTimeout(() => card.classList.remove('login-card-pulse'), 1600)
                  }
                }}
                className="login-option-link login-option-locked"
              >
                <span className="login-option-emoji">🤖</span>
                <span className="login-option-text">
                  <strong>Conversar com o agente</strong>
                  <span className="login-option-sub">
                    Detalhes da minha trajetória e cases · <em>requer acesso</em>
                  </span>
                </span>
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  const card = document.querySelector('.login-card-dark')
                  if (card) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' })
                    card.classList.add('login-card-pulse')
                    setTimeout(() => card.classList.remove('login-card-pulse'), 1600)
                  }
                }}
                className="login-option-link login-option-locked"
              >
                <span className="login-option-emoji">📊</span>
                <span className="login-option-text">
                  <strong>Explorar um dashboard interativo</strong>
                  <span className="login-option-sub">
                    Mensuração e visualização de dados · <em>requer acesso</em>
                  </span>
                </span>
              </button>
            </li>
          </ul>

          <div className="login-hero-cta-line">
            <strong>Boa análise!</strong> Vou ficar muito feliz com o seu contato. 💬
          </div>

          <div className="login-hero-pills">
            <span className="login-hero-pill brand">⚡ Growth</span>
            <span className="login-hero-pill brand">👥 CRM & LCM</span>
            <span className="login-hero-pill brand">📊 Performance</span>
            <span className="login-hero-pill brand">🤖 AI Automation</span>
          </div>
        </div>

        {/* CARD RIGHT */}
        <div className="login-card-wrap">
          <div className="login-card-dark">
            <div className="login-card-header">
              <h2>Acessar dashboard</h2>
              <p>Insira o código que você recebeu por email ou solicite um novo</p>
            </div>

            <div className="login-tabs-dark">
              <button
                className={`login-tab-btn ${mode === 'have-code' ? 'active' : ''}`}
                onClick={() => {
                  setMode('have-code')
                  setError('')
                  setSuccess('')
                }}
                disabled={loading}
              >
                Já tenho código
              </button>
              <button
                className={`login-tab-btn ${mode === 'request-code' ? 'active' : ''}`}
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
              <form onSubmit={handleSubmitCode} className="login-form-dark">
                <div className="login-field-dark">
                  <label>
                    Email <span style={{ color: 'var(--text-muted)', fontWeight: 400, textTransform: 'none' }}>(se recebeu por email)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    disabled={loading}
                  />
                </div>

                <div className="login-field-dark">
                  <label>Código de Acesso</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="Insira seu código"
                    required
                    disabled={loading}
                    autoFocus={!autoDetected}
                    style={{ fontFamily: 'monospace', letterSpacing: '2px' }}
                  />
                </div>

                {error && <div className="login-msg-error">{error}</div>}
                {success && <div className="login-msg-success">{success}</div>}

                <button
                  type="submit"
                  disabled={loading || !code}
                  className="login-submit-btn"
                >
                  {loading ? 'Verificando...' : (
                    <>
                      Acessar
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}

            {mode === 'request-code' && (
              <form
                onSubmit={codeSent ? handleSubmitCode : handleRequestToken}
                className="login-form-dark"
              >
                {!codeSent ? (
                  <>
                    <div className="login-field-dark">
                      <label>Seu Email</label>
                      <input
                        type="email"
                        value={requestEmail}
                        onChange={(e) => setRequestEmail(e.target.value)}
                        placeholder="seu@email.com"
                        required
                        disabled={loading}
                      />
                    </div>

                    {error && <div className="login-msg-error">{error}</div>}

                    <button
                      type="submit"
                      disabled={loading || !requestEmail}
                      className="login-submit-btn"
                    >
                      {loading ? 'Enviando...' : (
                        <>
                          Solicitar código
                          <Sparkles size={16} />
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="login-msg-success">
                      ✓ Código enviado para <strong>{email}</strong>!
                    </div>

                    <div className="login-msg-info">
                      📬 <strong>Importante:</strong> verifica também a pasta de <strong>spam/lixo eletrônico</strong>.
                      Se chegar lá, marca como <em>"não é spam"</em> pra próxima vez vir direto na inbox.
                    </div>

                    <div className="login-field-dark">
                      <label>Seu código de acesso</label>
                      <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        placeholder="Insira o código recebido"
                        required
                        disabled={loading}
                        autoFocus
                        style={{ fontFamily: 'monospace', letterSpacing: '2px' }}
                      />
                    </div>

                    {error && <div className="login-msg-error">{error}</div>}

                    <button
                      type="submit"
                      disabled={loading || !code}
                      className="login-submit-btn"
                    >
                      {loading ? 'Verificando...' : (
                        <>
                          Acessar
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCodeSent(false)
                        setCode('')
                        setError('')
                        setRequestEmail('')
                      }}
                      className="login-back-btn"
                      disabled={loading}
                    >
                      ← Voltar
                    </button>
                  </>
                )}
              </form>
            )}

            <div className="login-info-dark">
              <p>🔐 Acesso privado e seguro</p>
              <p>Código válido por 24 horas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
