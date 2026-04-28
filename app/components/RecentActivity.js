'use client'

import { Award, TrendingUp, Bot, Users, Coins, Clock, CheckCircle, Zap } from 'lucide-react'

export default function RecentActivity() {
  const milestones = [
    {
      id: 1,
      icon: Bot,
      title: 'Media Plan Audit Agent em produção',
      description: 'Agente IA validando 50+ planos/mês • 90% adoção LAC',
      time: 'Mastercard • 2024-2025',
      status: 'success',
      tag: 'AI',
      color: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    },
    {
      id: 2,
      icon: TrendingUp,
      title: '+25% crescimento LATAM Pass',
      description: 'Novos portadores em 6 meses • CPA -50%',
      time: 'Mastercard • 2024',
      status: 'success',
      tag: 'GROWTH',
      color: 'linear-gradient(135deg, #10b981, #0d9488)',
    },
    {
      id: 3,
      icon: Award,
      title: '+35% receita Sicredi',
      description: 'Estratégia LCM omnicanal com modelos de propensão',
      time: 'Mastercard • 2024',
      status: 'success',
      tag: 'CRM',
      color: 'linear-gradient(135deg, #f59e0b, #ea580c)',
    },
    {
      id: 4,
      icon: Users,
      title: '+120% base B2C Braza Bank',
      description: 'CAC -53% • Clientes ativos 20% → 44%',
      time: 'Braza Bank • 2023',
      status: 'success',
      tag: 'GROWTH',
      color: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
    },
    {
      id: 5,
      icon: Coins,
      title: 'R$ 21M em receita incremental',
      description: 'Delivery Outback • ROAS +100% • Modelo de atribuição próprio',
      time: 'Outback • 2020',
      status: 'success',
      tag: 'REVENUE',
      color: 'linear-gradient(135deg, #f97316, #dc2626)',
    },
  ]

  const getStatusIcon = (status) => {
    if (status === 'success') return <CheckCircle size={12} />
    return <Clock size={12} />
  }

  return (
    <div className="recent-activity">
      <div className="recent-activity-header">
        <div className="recent-activity-title-wrap">
          <div className="recent-activity-icon-box">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="recent-activity-title">Marcos Recentes</h3>
            <p className="recent-activity-sub">Resultados comprovados</p>
          </div>
        </div>
        <button className="recent-activity-link">Ver todos</button>
      </div>

      <div className="activities-list">
        {milestones.map((milestone) => {
          const Icon = milestone.icon
          return (
            <div key={milestone.id} className="activity-item">
              <div className="activity-row">
                <div className="activity-icon-wrap" style={{ background: milestone.color }}>
                  <Icon size={20} />
                  <div className={`activity-status-pill ${milestone.status}`}>
                    {getStatusIcon(milestone.status)}
                  </div>
                </div>
                <div className="activity-content">
                  <h4 className="activity-title">{milestone.title}</h4>
                  <p className="activity-desc">{milestone.description}</p>
                  <div className="activity-meta">
                    <span className="activity-time">
                      <Clock size={12} />
                      {milestone.time}
                    </span>
                    <span className="activity-meta">•</span>
                    <span className="activity-tag amber">{milestone.tag}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="recent-activity-footer">
        <span className="activity-sync">19+ anos de experiência</span>
        <div className="activity-status">
          <div className="activity-live">
            <div className="live-dot"></div>
            <span className="live-text">Ativo</span>
          </div>
          <div className="activity-live">
            <span style={{ color: 'var(--accent-amber)', fontSize: '0.75rem' }}>🇧🇷 BR</span>
          </div>
        </div>
      </div>
    </div>
  )
}
