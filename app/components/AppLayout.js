'use client'

import { useEffect, useRef, useState } from 'react'
import Sidebar from './Sidebar'
import TopNavigation from './TopNavigation'
import Dashboard from './Dashboard'
import Timeline from './Timeline'
import CaseExplorer from './CaseExplorer'
import ExpertiseRadar from './ExpertiseRadar'
import Certifications from './Certifications'
import ChatModule from './ChatModule'

export default function AppLayout({ onLogout }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [searchQuery, setSearchQuery] = useState(null)
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

  // Scroll para o topo ao entrar/trocar de seção
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    const dashScroll = document.querySelector('.dashboard-scroll')
    if (dashScroll) dashScroll.scrollTop = 0
  }, [activeSection])

  const handleSectionChange = (section) => {
    if (section === 'cv') {
      window.open('/CV-PT.pdf', '_blank')
      return
    }
    setActiveSection(section)
    setSearchQuery(null)
    setMobileOpen(false)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    setActiveSection('chat')
  }

  // Usado pelos Marcos Recentes: vai pra aba do chat (com botão voltar)
  const handleAskAgent = (query) => {
    setSearchQuery(query)
    setActiveSection('chat')
    setMobileOpen(false)
  }

  // Usado pelo Quick Action "Falar com IA": só rola até o chat na mesma página
  const handleScrollToChat = () => {
    setMobileOpen(false)
    if (activeSection === 'dashboard') {
      const chat = document.getElementById('chat-section')
      if (chat) chat.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      setActiveSection('dashboard')
      setTimeout(() => {
        const chat = document.getElementById('chat-section')
        if (chat) chat.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 150)
    }
  }


  const BackButton = () => (
    <button
      onClick={() => handleSectionChange('dashboard')}
      className="back-to-dash-btn"
      type="button"
    >
      ← Voltar ao Dashboard
    </button>
  )

  const renderSection = () => {
    switch (activeSection) {
      case 'timeline':
        return (
          <div className="dashboard">
            <BackButton />
            <Timeline />
          </div>
        )
      case 'cases':
        return (
          <div className="dashboard">
            <BackButton />
            <CaseExplorer />
          </div>
        )
      case 'expertise':
        return (
          <div className="dashboard">
            <BackButton />
            <ExpertiseRadar />
          </div>
        )
      case 'certifications':
        return (
          <div className="dashboard">
            <BackButton />
            <Certifications />
          </div>
        )
      case 'chat':
        return (
          <div className="dashboard">
            <BackButton />
            <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
              <ChatModule initialQuery={searchQuery} />
            </div>
          </div>
        )
      case 'contact':
        return (
          <div className="dashboard">
            <BackButton />
            <div className="section-card">
              <div className="section-header">
                <h2>Vamos Conversar?</h2>
                <p>Múltiplas formas de entrar em contato com Leonardo</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '24px' }}>
                <a
                  href="mailto:leo.lfelipe@gmail.com"
                  className="quick-action-btn"
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div className="quick-action-content">
                    <div className="quick-action-icon" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                      📧
                    </div>
                    <div className="quick-action-text">
                      <h4 className="quick-action-label">Email</h4>
                      <p className="quick-action-desc">leo.lfelipe@gmail.com</p>
                    </div>
                  </div>
                </a>
                <a
                  href="https://linkedin.com/in/leonardodibe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quick-action-btn"
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div className="quick-action-content">
                    <div className="quick-action-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>
                      🔗
                    </div>
                    <div className="quick-action-text">
                      <h4 className="quick-action-label">LinkedIn</h4>
                      <p className="quick-action-desc">/in/leonardodibe</p>
                    </div>
                  </div>
                </a>
                <a
                  href="https://wa.me/5511982976543?text=Olá%20Leonardo!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quick-action-btn"
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div className="quick-action-content">
                    <div className="quick-action-icon" style={{ background: 'linear-gradient(135deg, #10b981, #0d9488)' }}>
                      💬
                    </div>
                    <div className="quick-action-text">
                      <h4 className="quick-action-label">WhatsApp</h4>
                      <p className="quick-action-desc">(11) 98297-6543</p>
                    </div>
                  </div>
                </a>
                <a
                  href="tel:+5511982976543"
                  className="quick-action-btn"
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <div className="quick-action-content">
                    <div className="quick-action-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)' }}>
                      📱
                    </div>
                    <div className="quick-action-text">
                      <h4 className="quick-action-label">Telefone</h4>
                      <p className="quick-action-desc">(11) 98297-6543</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )
      default:
        return (
          <Dashboard
            onNavigate={handleSectionChange}
            onAskAgent={handleAskAgent}
            initialQuery={searchQuery}
          />
        )
    }
  }

  return (
    <div className="app-shell">
      {/* Background */}
      <div className="bg-layer">
        <div className="bg-base-gradient"></div>
        <div className="bg-color-overlay"></div>

        <svg className="bg-mesh-grid" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="meshPattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M 80 0 L 0 0 0 80"
                fill="none"
                stroke="url(#meshGradient)"
                strokeWidth="0.3"
              />
            </pattern>
            <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" stopOpacity={0.4} />
              <stop offset="50%" stopColor="#475569" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#334155" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#meshPattern)" />
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
          <div className="bg-twinkle bg-twinkle-4"></div>
        </div>
      </div>

      {/* Layout */}
      <div className="main-layout">
        {/* Mobile overlay */}
        {mobileOpen && (
          <div
            className="mobile-overlay"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          ></div>
        )}

        <div
          className={`sidebar-wrap ${collapsed ? 'collapsed' : 'expanded'} ${
            mobileOpen ? 'mobile-open' : ''
          }`}
        >
          <Sidebar
            collapsed={collapsed}
            onToggle={() => setCollapsed(!collapsed)}
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            onMobileClose={() => setMobileOpen(false)}
            mobileOpen={mobileOpen}
          />
        </div>

        <div className="main-area">
          <div className="topnav-sticky">
            <TopNavigation
              onLogout={onLogout}
              onSearch={handleSearch}
              onMobileMenu={() => setMobileOpen(true)}
              onTalkToAgent={handleScrollToChat}
            />
          </div>

          <div className="dashboard-scroll">{renderSection()}</div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="status-indicator">
        <div className="status-indicator-inner">
          <div className="status-indicator-dot"></div>
        </div>
      </div>
    </div>
  )
}
