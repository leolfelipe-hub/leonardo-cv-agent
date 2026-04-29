'use client'

import {
  TrendingUp,
  Coins,
  Award,
  Users,
  Briefcase,
  Bot,
  Crown,
  Sparkles,
  MapPin,
  Building2,
  Zap,
  Target,
  GraduationCap,
} from 'lucide-react'
import MetricCard from './MetricCard'
import ChartCard from './ChartCard'
import QuickActions from './QuickActions'
import RecentActivity from './RecentActivity'
import ChatModule from './ChatModule'
import PersonalCard from './PersonalCard'

export default function Dashboard({ onNavigate, onAskAgent, initialQuery }) {
  const metrics = [
    {
      title: 'Receita Gerada',
      value: 'R$ 21M+',
      change: '+100%',
      trend: 'up',
      icon: Coins,
      color: 'emerald',
    },
    {
      title: 'Crescimento B2C',
      value: '+120%',
      change: '12 meses',
      trend: 'up',
      icon: TrendingUp,
      color: 'blue',
    },
    {
      title: 'Cases Reais',
      value: '5',
      change: 'comprovados',
      trend: 'up',
      icon: Award,
      color: 'purple',
    },
    {
      title: 'Empresas',
      value: '9',
      change: 'F500 + startup',
      trend: 'up',
      icon: Briefcase,
      color: 'orange',
    },
    {
      title: 'Habilidades',
      value: '8+',
      change: 'core skills',
      trend: 'up',
      icon: Zap,
      color: 'amber',
    },
    {
      title: 'Anos Experiência',
      value: '19+',
      change: 'sênior',
      trend: 'up',
      icon: Target,
      color: 'red',
    },
  ]

  const highlights = [
    { label: 'Aquisição', value: '+25%', trend: 'up', display: 'LATAM Pass' },
    { label: 'CAC', value: '-53%', trend: 'up', display: 'Braza Bank' },
    { label: 'ROAS', value: '+100%', trend: 'up', display: 'Outback' },
  ]

  return (
    <div className="dashboard">
      {/* Welcome Banner */}
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
                <div className="welcome-title-row">
                  <div style={{ position: 'relative' }}>
                    <h1 className="welcome-title">Bem-vindo(a), Recrutador</h1>
                    <div className="welcome-sparkle">
                      <Sparkles size={20} />
                    </div>
                  </div>
                  <Crown className="welcome-crown" size={28} />
                </div>
                <p className="welcome-subtitle">
                  Leonardo Dibe • Senior Marketing Manager • Growth, CRM & AI
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
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="metrics-grid">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={metric.icon}
            color={metric.color}
            delay={index * 100}
          />
        ))}
      </section>

      {/* Main Grid: Chat + Charts | Side */}
      <section className="main-grid">
        <div className="charts-area">
          {/* Chat Module */}
          <div id="chat-section" className="animate-fade-in-up" style={{ animationDelay: '600ms' }}>
            <ChatModule initialQuery={initialQuery} />
          </div>

          {/* Career Trajectory Line Chart */}
          <div className="animate-fade-in-up" style={{ animationDelay: '700ms' }}>
            <ChartCard
              title="Trajetória de Receita & Impacto"
              subtitle="Evolução de carreira (R$ M)"
              type="line"
              trend="+19y"
            />
          </div>

          <div className="charts-row">
            <div className="animate-fade-in-up" style={{ animationDelay: '800ms' }}>
              <ChartCard
                title="Cases por Categoria"
                subtitle="5 cases reais"
                type="donut"
                trend="100%"
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '900ms' }}>
              <ChartCard
                title="Marcas Atendidas"
                subtitle="20+ marcas em 4 segmentos"
                type="brands"
                trend="20+"
              />
            </div>
          </div>

          {/* Áreas de Especialização (compacto) - preenche espaço vazio */}
          <div className="animate-fade-in-up insights-card" style={{ animationDelay: '950ms' }}>
            <div className="insights-header">
              <div className="insights-title-wrap">
                <div className="insights-icon-box">
                  <TrendingUp size={20} />
                </div>
                <h3 className="insights-title">Áreas de Especialização</h3>
              </div>
              <Zap size={20} style={{ color: '#60a5fa' }} className="animate-pulse-soft" />
            </div>

            <div className="insights-grid">
              <div className="insight-tile green">
                <div className="insight-icon-circle green">
                  <TrendingUp size={24} />
                </div>
                <div className="insight-label">Growth & Performance</div>
                <div className="insight-value green">+25%</div>
                <div className="insight-sub">LATAM Pass cardholders</div>
              </div>

              <div className="insight-tile blue">
                <div className="insight-icon-circle blue">
                  <Bot size={24} />
                </div>
                <div className="insight-label">Impacto IA</div>
                <div className="insight-value blue">High</div>
                <div className="insight-sub">2 agentes em produção</div>
                <div className="insight-tags">
                  <span className="insight-tag">Claude Code</span>
                  <span className="insight-tag">Copilot</span>
                  <span className="insight-tag">IA Mídia</span>
                  <span className="insight-tag">IA CRM</span>
                </div>
              </div>

              <div className="insight-tile purple">
                <div className="insight-icon-circle purple">
                  <Building2 size={24} />
                </div>
                <div className="insight-label">Budget Gerenciado</div>
                <div className="insight-value purple">$24M+</div>
                <div className="insight-sub">Anual • Mastercard LAC</div>
              </div>
            </div>
          </div>
        </div>

        <div className="side-area">
          <div className="animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
            <QuickActions onAction={onAskAgent} onNavigate={onNavigate} />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '1100ms' }}>
            <RecentActivity onAskAgent={onAskAgent} />
          </div>
        </div>
      </section>

      {/* Status Cards */}
      <section className="status-cards">
        <div className="animate-fade-in-up status-card green" style={{ animationDelay: '1200ms' }}>
          <div className="status-card-content">
            <div className="status-card-icon-wrap">
              <div className="status-card-icon-bg green">
                <Award size={32} />
              </div>
              <div className="status-card-check">✓</div>
            </div>
            <div className="status-card-info">
              <h3 className="status-card-title">Status Profissional</h3>
              <p className="status-card-status">Aberto a novas oportunidades</p>
              <p className="status-card-meta">Senior Growth / Director • Brasil ou remoto LATAM</p>
            </div>
          </div>
          <div className="status-card-side">
            <div className="status-card-side-circle">19+</div>
            <span className="status-card-side-label">Anos</span>
          </div>
        </div>

        <div className="animate-fade-in-up status-card amber" style={{ animationDelay: '1300ms' }}>
          <div className="status-card-content">
            <div className="status-card-icon-wrap">
              <div className="status-card-icon-bg amber">
                <GraduationCap size={32} />
              </div>
            </div>
            <div className="status-card-info">
              <h3 className="status-card-title">Educação & Certificações</h3>
              <p className="status-card-status">MBA Marketing • PUC SP</p>
              <p className="status-card-meta">Google Analytics • HubSpot • Salesforce • Meta Ads</p>
            </div>
          </div>
          <div className="status-card-side">
            <div className="status-card-side-square">🎓</div>
            <span className="status-card-side-label">MBA + 6 Certs</span>
          </div>
        </div>
      </section>

      {/* Personal Card (Spotify) — fechamento humano */}
      <section className="animate-fade-in-up" style={{ animationDelay: '1400ms' }}>
        <PersonalCard />
      </section>
    </div>
  )
}
