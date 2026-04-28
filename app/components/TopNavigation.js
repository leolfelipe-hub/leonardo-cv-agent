'use client'

import { useEffect, useState } from 'react'
import { Search, MapPin, Clock, HardDrive, LogOut, Menu, MessageCircle } from 'lucide-react'

export default function TopNavigation({ onLogout, onSearch, onMobileMenu }) {
  const [time, setTime] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const t = new Date().toLocaleString('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
      setTime(t)
    }
    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  const handleSearch = (e) => {
    if (e.key === 'Enter' && query.trim() && onSearch) {
      onSearch(query.trim())
      setQuery('')
    }
  }

  return (
    <header className="topnav">
      <div className="topnav-inner">
        {/* Brand + Search */}
        <div className="topnav-left">
          <button
            className="topnav-mobile-menu"
            onClick={onMobileMenu}
            title="Abrir menu"
            aria-label="Abrir menu"
          >
            <Menu size={20} />
          </button>

          <div className="topnav-brand">
            <div className="topnav-brand-logo">LD</div>
            <span className="topnav-brand-name">LEONARDO DIBE</span>
          </div>

          <div className="topnav-search">
            <Search className="topnav-search-icon" size={16} />
            <input
              type="text"
              placeholder="Pergunte sobre cases, experiência, skills..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <span className="topnav-search-kbd">⏎</span>
          </div>
        </div>

        {/* Right side */}
        <div className="topnav-right">
          {/* CTA WhatsApp - sempre visível */}
          <a
            href="https://wa.me/5511982976543?text=Ol%C3%A1%20Leonardo!%20Vi%20seu%20CV%20Agent%20e%20gostaria%20de%20conversar."
            target="_blank"
            rel="noopener noreferrer"
            className="topnav-cta-talk"
            title="Vamos conversar no WhatsApp"
          >
            <MessageCircle size={16} />
            <span className="topnav-cta-talk-label">Falar</span>
          </a>

          <div className="topnav-info">
            <div className="topnav-info-item">
              <HardDrive size={16} style={{ color: 'var(--text-secondary)' }} />
              <span className="topnav-info-label">CV Live</span>
            </div>
            <div className="topnav-info-divider"></div>
            <div className="topnav-info-item">
              <MapPin size={16} style={{ color: 'var(--accent-amber)' }} />
              <span className="topnav-info-label amber">São Paulo</span>
            </div>
            <div className="topnav-info-divider"></div>
            <div className="topnav-info-item">
              <Clock size={16} style={{ color: 'var(--text-muted)' }} />
              <span className="topnav-info-time">{time}</span>
            </div>
          </div>

          <div className="topnav-profile">
            <div className="topnav-avatar">LD</div>
            <div className="topnav-profile-info">
              <p className="topnav-profile-name">Leonardo Dibe</p>
              <div className="topnav-profile-status">
                <div className="profile-status-dot"></div>
                <span className="profile-status-text">Disponível</span>
                <span className="profile-status-divider">•</span>
                <span className="profile-status-mode">São Paulo</span>
              </div>
            </div>
            <button
              className="topnav-icon-btn"
              onClick={onLogout}
              title="Sair"
              style={{ marginLeft: '8px' }}
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
