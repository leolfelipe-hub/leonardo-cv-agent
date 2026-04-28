'use client'

import {
  LayoutDashboard,
  Briefcase,
  Award,
  TrendingUp,
  MessageCircle,
  Mail,
  FileDown,
  ChevronLeft,
  HardDrive,
  GraduationCap,
  X,
} from 'lucide-react'

const navigation = [
  { key: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { key: 'timeline', icon: Briefcase, label: 'Trajetória', badge: '5' },
  { key: 'cases', icon: Award, label: 'Cases', badge: '5' },
  { key: 'expertise', icon: TrendingUp, label: 'Expertise' },
  { key: 'certifications', icon: GraduationCap, label: 'Certificações' },
  { key: 'chat', icon: MessageCircle, label: 'Chat com IA' },
  { key: 'contact', icon: Mail, label: 'Contato' },
  { key: 'cv', icon: FileDown, label: 'Download CV' },
]

export default function Sidebar({
  collapsed,
  onToggle,
  activeSection,
  onSectionChange,
  onMobileClose,
  mobileOpen,
}) {
  return (
    <aside
      className={`sidebar ${collapsed ? 'collapsed' : 'expanded'} ${
        mobileOpen ? 'mobile-open' : ''
      }`}
    >
      <div className="sidebar-inner">
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-logo">LD</div>
            <div className="sidebar-brand-text">
              <h1 className="sidebar-brand-name">Leonardo Dibe</h1>
              <h2 className="sidebar-brand-role">SR. MARKETING</h2>
              <p className="sidebar-brand-tag">Growth • CRM • AI</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className={`sidebar-toggle desktop-only ${collapsed ? 'rotated' : ''}`}
            title={collapsed ? 'Expandir' : 'Recolher'}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={onMobileClose}
            className="sidebar-toggle mobile-only"
            title="Fechar menu"
            aria-label="Fechar menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.key
            return (
              <button
                key={item.key}
                onClick={() => onSectionChange(item.key)}
                className={`sidebar-item ${isActive ? 'active' : ''}`}
              >
                <Icon className="sidebar-item-icon" size={20} />
                <span className="sidebar-item-label">{item.label}</span>
                {item.badge && <span className="sidebar-item-badge">{item.badge}</span>}
                <span className="sidebar-tooltip">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
            {/* CTA WhatsApp */}
            <a
              href="https://wa.me/5511982976543?text=Ol%C3%A1%20Leonardo!%20Vi%20seu%20CV%20Agent%20e%20gostaria%20de%20conversar."
              target="_blank"
              rel="noopener noreferrer"
              className="sidebar-cta-whatsapp"
            >
              <span className="sidebar-cta-emoji">💬</span>
              <div className="sidebar-cta-text">
                <strong>Vamos marcar um papo?</strong>
                <span>WhatsApp</span>
              </div>
            </a>

            <div className="sidebar-status">
              <div className="sidebar-status-row">
                <div className="sidebar-status-icon">
                  <HardDrive size={20} />
                </div>
                <div className="sidebar-status-info">
                  <p className="sidebar-status-title">19+ Anos</p>
                  <p className="sidebar-status-subtitle">Marketing & Growth</p>
                </div>
              </div>
              <div className="sidebar-status-footer">
                <span style={{ color: 'var(--text-muted)' }}>Disponível</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <div className="status-dot"></div>
                  <span style={{ color: '#34d399' }}>Online</span>
                </div>
              </div>
            </div>
          </div>
      </div>
    </aside>
  )
}
