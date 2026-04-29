'use client'

import {
  TrendingUp,
  MapPin,
} from 'lucide-react'
import ChartCard from './ChartCard'
import RecentActivity from './RecentActivity'
import PersonalCard from './PersonalCard'

export default function Dashboard({ onNavigate, onAskAgent, initialQuery }) {
  const highlights = [
    { label: 'Aquisição', value: '+25%', trend: 'up', display: 'LATAM Pass' },
    { label: 'CAC', value: '-53%', trend: 'up', display: 'Braza Bank' },
    { label: 'ROAS', value: '+100%', trend: 'up', display: 'Outback' },
  ]

  return (
    <div className="dashboard">
      {/* 1. Welcome Banner UNIFICADO (com manifesto integrado) */}
      <section className="welcome-section">
        <div className="welcome-deco-1"></div>
        <div className="welcome-deco-2"></div>
        <div className="glass-card welcome-card">
          <div className="welcome-row">
            <div className="welcome-info">
              <div className="welcome-avatar-wrap">
                <div className="welcome-avatar-glow"></div>
                <div className="welcome-avatar">LD</div>
              </div>
              <div className="welcome-text">
                <h2 className="welcome-name-title">Leonardo Dibe</h2>
                <p className="welcome-subtitle">
                  Senior Marketing Manager • Growth, CRM & AI
                </p>
                <div className="welcome-meta">
                  <div className="welcome-status-badge">
                    <div className="welcome-status-dot"></div>
                    <span className="welcome-status-text">Aberto a novas oportunidades</span>
                  </div>
                  <div className="welcome-location">
                    <MapPin size={16} />
                    <span>São Paulo, Brasil</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card welcome-highlights">
              <div className="highlights-header">
                <h3 className="highlights-title">
                  <TrendingUp size={20} />
                  <span>Highlights</span>
                </h3>
              </div>
              <div className="highlights-list">
                {highlights.map((h, idx) => (
                  <div key={idx} className={`highlight-item ${h.trend}`}>
                    <span className="highlight-label">{h.label}</span>
                    <div className="highlight-right">
                      <span className={`highlight-trend ${h.trend}`}>
                        {h.trend === 'up' ? '↗' : h.trend === 'down' ? '↘' : '→'} {h.value}
                      </span>
                      <span className="highlight-value">{h.display}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Manifesto integrado — order definido por CSS pra mobile (vai antes dos highlights) */}
            <div className="welcome-manifesto">
              <p className="manifesto-body">
                <strong>Bem-vindo ao meu dashboard.</strong> Aqui mostro de forma viva o que faço
                todos os dias: <strong>transformar dados em decisão</strong>. Construído com IA —
                Claude Code, prompt engineering e sistemas agentic — para ser uma demonstração
                prática da minha expertise.
              </p>
              <p className="manifesto-flow">
                É assim que penso e executo:{' '}
                <span className="flow-step">dado</span>
                <span className="flow-arrow">→</span>
                <span className="flow-step">contexto</span>
                <span className="flow-arrow">→</span>
                <span className="flow-step">decisão</span>
                <span className="flow-arrow">→</span>
                <span className="flow-step flow-step-final">ação</span>
              </p>

              <p className="manifesto-tip">
                💡 No <strong>menu lateral</strong> você encontra outras abas pra se aprofundar em{' '}
                <strong>Trajetória</strong>, <strong>Cases</strong>, <strong>Expertise</strong>,{' '}
                <strong>Certificações</strong> e <strong>Chat com IA</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Charts: Linha + Donut Marcas (lado a lado, 50/50) */}
      <section className="dashboard-charts-row">
        <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <ChartCard
            title="Trajetória de Receita & Impacto"
            subtitle="Evolução de carreira (R$ M)"
            type="line"
            trend="+19y"
          />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <ChartCard
            title="Marcas Atendidas"
            subtitle="20+ marcas em 4 segmentos"
            type="brands"
            trend="20+"
          />
        </div>
      </section>

      {/* 3. Marcos Recentes em grid (2-3 colunas) */}
      <section className="animate-fade-in-up" style={{ animationDelay: '500ms' }}>
        <RecentActivity onAskAgent={onAskAgent} layout="grid" />
      </section>

      {/* 4. Spotify (tamanho médio) */}
      <section className="dashboard-spotify-medium animate-fade-in-up" style={{ animationDelay: '700ms' }}>
        <PersonalCard />
      </section>
    </div>
  )
}
