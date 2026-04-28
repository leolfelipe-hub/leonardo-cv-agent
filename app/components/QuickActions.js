'use client'

import { Plus, Briefcase, Award, Users, Coins, Bot, FileDown, MessageSquare, Zap } from 'lucide-react'

export default function QuickActions({ onAction, onNavigate }) {
  const actions = [
    {
      icon: MessageSquare,
      label: 'Falar com IA',
      desc: 'Pergunte sobre experiência',
      color: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
      action: () => {
        const chat = document.getElementById('chat-section')
        if (chat) {
          chat.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else if (onNavigate) {
          onNavigate('chat')
        }
      },
    },
    {
      icon: Award,
      label: 'Ver Cases',
      desc: '5 cases reais com números',
      color: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
      action: () => onNavigate && onNavigate('cases'),
    },
    {
      icon: Briefcase,
      label: 'Trajetória',
      desc: 'Mastercard, Braza, Outback, Accor',
      color: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
      action: () => onNavigate && onNavigate('timeline'),
    },
    {
      icon: Coins,
      label: 'Resultados',
      desc: 'R$21M+ em receita gerada',
      color: 'linear-gradient(135deg, #f97316, #ef4444)',
      action: () =>
        onAction && onAction('Quais foram os principais resultados financeiros do Leonardo?'),
    },
    {
      icon: Bot,
      label: 'Expertise em IA',
      desc: 'Agentes em produção',
      color: 'linear-gradient(135deg, #f59e0b, #eab308)',
      action: () =>
        onAction && onAction('Conte sobre a experiência do Leonardo com IA e agentes em produção'),
    },
    {
      icon: FileDown,
      label: 'Download CV',
      desc: 'PDF Português / English',
      color: 'linear-gradient(135deg, #ec4899, #f43f5e)',
      action: () => onNavigate && onNavigate('cv'),
    },
  ]

  return (
    <div className="quick-actions">
      <div className="quick-actions-header">
        <div className="quick-actions-title-wrap">
          <div className="quick-actions-icon-box">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="quick-actions-title">Ações Rápidas</h3>
            <p className="quick-actions-sub">Explore o agente</p>
          </div>
        </div>
        <Plus size={16} style={{ color: 'var(--accent-amber)' }} />
      </div>

      <div className="quick-actions-list">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <button
              key={index}
              className="quick-action-btn"
              onClick={action.action}
            >
              <div className="quick-action-shine"></div>
              <div className="quick-action-content">
                <div
                  className="quick-action-icon"
                  style={{ background: action.color }}
                >
                  <Icon size={22} />
                </div>
                <div className="quick-action-text">
                  <h4 className="quick-action-label">{action.label}</h4>
                  <p className="quick-action-desc">{action.desc}</p>
                </div>
                <div className="quick-action-plus">
                  <Plus size={14} />
                </div>
              </div>
            </button>
          )
        })}
      </div>

      <div className="quick-actions-cta">
        <a
          href="https://wa.me/5511982976543?text=Olá%20Leonardo!%20Vi%20seu%20CV%20Agent%20e%20gostaria%20de%20conversar."
          target="_blank"
          rel="noopener noreferrer"
          className="quick-actions-cta-btn"
          style={{ textDecoration: 'none' }}
        >
          <span>💬 Conversar no WhatsApp</span>
          <Plus size={14} />
        </a>
      </div>
    </div>
  )
}
