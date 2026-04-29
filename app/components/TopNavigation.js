'use client'

import { LogOut, Menu, Bot, MessageCircle, Home } from 'lucide-react'

export default function TopNavigation({ onLogout, onMobileMenu, onTalkToAgent, onBackToExpress }) {
  return (
    <header className="topnav topnav-clean">
      <div className="topnav-inner">
        {/* Esquerda: hamburger (mobile) + brand */}
        <div className="topnav-left">
          <button
            className="topnav-mobile-menu"
            onClick={onMobileMenu}
            title="Abrir menu"
            aria-label="Abrir menu"
          >
            <Menu size={18} />
            <span className="topnav-mobile-menu-label">Menu</span>
          </button>

          <div className="topnav-brand topnav-brand-prominent">
            <div className="topnav-brand-logo">LD</div>
            <span className="topnav-brand-name-full">Leonardo Dibe</span>
          </div>
        </div>

        {/* Direita: ações principais */}
        <div className="topnav-right">
          {onBackToExpress && (
            <button
              onClick={onBackToExpress}
              className="back-to-express-btn"
              type="button"
              title="Voltar à página inicial"
            >
              <Home size={14} />
              <span>Página inicial</span>
            </button>
          )}

          <button
            onClick={onTalkToAgent}
            className="topnav-cta-talk"
            title="Falar com o Agente de IA"
            type="button"
          >
            <Bot size={16} />
            <span className="topnav-cta-talk-label">Falar com IA</span>
          </button>

          <a
            href="https://wa.me/5511982976543?text=Ol%C3%A1%20Leonardo!%20Vi%20seu%20CV%20Agent%20e%20gostaria%20de%20conversar."
            target="_blank"
            rel="noopener noreferrer"
            className="topnav-cta-whats"
            title="Conversar no WhatsApp"
            aria-label="Conversar no WhatsApp"
          >
            <MessageCircle size={16} />
          </a>

          <button
            className="topnav-logout-icon"
            onClick={onLogout}
            title="Sair"
            aria-label="Sair"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  )
}
