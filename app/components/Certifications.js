'use client'

import { GraduationCap, Award, BookOpen, Languages } from 'lucide-react'

const certifications = [
  {
    id: 1,
    icon: '📊',
    name: 'Google Analytics',
    issuer: 'Google',
    iconClass: 'google',
    badge: 'Certificado',
    year: 'Ativo',
  },
  {
    id: 2,
    icon: '🎯',
    name: 'Google Ads',
    issuer: 'Google',
    iconClass: 'google',
    badge: 'Certificado',
    year: 'Ativo',
  },
  {
    id: 3,
    icon: '🚀',
    name: 'HubSpot Marketing',
    issuer: 'HubSpot Academy',
    iconClass: 'hubspot',
    badge: 'Certificado',
    year: 'Ativo',
  },
  {
    id: 4,
    icon: '☁️',
    name: 'Salesforce Marketing Cloud',
    issuer: 'Salesforce',
    iconClass: 'salesforce',
    badge: 'Certificado',
    year: 'Ativo',
  },
  {
    id: 5,
    icon: '⚡',
    name: 'Salesforce Marketing Cloud Email Specialist',
    issuer: 'Salesforce',
    iconClass: 'salesforce',
    badge: 'Certificado',
    year: 'Ativo',
  },
  {
    id: 6,
    icon: '📱',
    name: 'Meta Ads (Blueprint)',
    issuer: 'Meta',
    iconClass: 'meta',
    badge: 'Certificado',
    year: 'Ativo',
  },
]

const education = [
  {
    id: 1,
    title: 'MBA em Marketing',
    institution: 'PUC São Paulo',
    year: '2012',
  },
  {
    id: 2,
    title: 'Comunicação Social — Publicidade & Propaganda',
    institution: 'PUC Goiás',
    year: '2008',
  },
  {
    id: 3,
    title: 'Business English',
    institution: 'EC London, Reino Unido',
    year: '2014',
  },
]

export default function Certifications() {
  return (
    <div className="section-card">
      <div className="section-header">
        <h2>Certificações & Educação</h2>
        <p>Formação contínua nas principais plataformas e instituições de marketing</p>
      </div>

      {/* Hero */}
      <div className="cert-hero">
        <div className="cert-hero-icon">
          <Award size={36} />
        </div>
        <div className="cert-hero-info">
          <h3>6 Certificações Ativas + MBA</h3>
          <p>
            Especialização nas <span className="accent">principais plataformas de marketing</span> do
            mercado: Google, Meta, Salesforce e HubSpot — cobrindo analytics, mídia paga, CRM e
            automação de marketing.
          </p>
        </div>
      </div>

      {/* Certifications */}
      <h3 className="cert-section-title">
        <Award size={18} style={{ color: 'var(--accent-amber)' }} />
        Certificações Profissionais
        <div className="cert-section-title-line"></div>
      </h3>

      <div className="cert-grid">
        {certifications.map((cert) => (
          <div key={cert.id} className="cert-card">
            <div className="cert-card-head">
              <div className={`cert-card-icon ${cert.iconClass}`}>{cert.icon}</div>
              <span className="cert-card-badge">{cert.badge}</span>
            </div>
            <div>
              <h4 className="cert-card-name">{cert.name}</h4>
              <p className="cert-card-issuer">{cert.issuer}</p>
            </div>
            <div className="cert-card-meta">
              <span>✓ {cert.year}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Education */}
      <h3 className="cert-section-title">
        <GraduationCap size={18} style={{ color: '#fcd34d' }} />
        Formação Acadêmica
        <div className="cert-section-title-line"></div>
      </h3>

      <div className="education-grid">
        {education.map((edu) => (
          <div key={edu.id} className="education-card">
            <div className="education-icon">
              <BookOpen size={28} />
            </div>
            <div className="education-info">
              <h4>{edu.title}</h4>
              <p>{edu.institution}</p>
            </div>
            <span className="education-year">{edu.year}</span>
          </div>
        ))}
      </div>

      {/* Languages */}
      <h3 className="cert-section-title">
        <Languages size={18} style={{ color: '#fcd34d' }} />
        Idiomas
        <div className="cert-section-title-line"></div>
      </h3>

      <div className="cert-grid">
        <div className="cert-card">
          <div className="cert-card-head">
            <div className="cert-card-icon" style={{ background: 'linear-gradient(135deg, #fbbf24, #d97706)' }}>
              🇧🇷
            </div>
            <span className="cert-card-badge">Nativo</span>
          </div>
          <div>
            <h4 className="cert-card-name">Português</h4>
            <p className="cert-card-issuer">Língua materna</p>
          </div>
        </div>

        <div className="cert-card">
          <div className="cert-card-head">
            <div className="cert-card-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #92400e)' }}>
              🇬🇧
            </div>
            <span className="cert-card-badge">Avançado</span>
          </div>
          <div>
            <h4 className="cert-card-name">Inglês — Business English</h4>
            <p className="cert-card-issuer">EC London, Reino Unido</p>
          </div>
        </div>
      </div>
    </div>
  )
}
