'use client'

import { useState } from 'react'
import careerData from '../data/careerData.json'

export default function CaseExplorer() {
  const [selectedCase, setSelectedCase] = useState(careerData.cases[0])

  const getCategoryEmoji = (category) => {
    const emojis = {
      acquisition: '🎯',
      crm: '👥',
      media: '📢',
      growth: '📈',
    }
    return emojis[category] || '💼'
  }

  const getCategoryLabel = (category) => {
    const labels = {
      acquisition: 'AQUISIÇÃO',
      crm: 'CRM & LCM',
      media: 'MÍDIA 360°',
      growth: 'GROWTH',
    }
    return labels[category] || category.toUpperCase()
  }

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>Cases de Sucesso</h2>
        <p>5 cases reais comprovados — formato Problema → Ação → Número</p>
      </div>

      <div className="cases-layout">
        <div className="cases-list">
          {careerData.cases.map((caseItem) => (
            <div
              key={caseItem.id}
              className={`case-mini ${selectedCase.id === caseItem.id ? 'active' : ''}`}
              onClick={() => setSelectedCase(caseItem)}
            >
              <div className={`case-mini-icon ${caseItem.category}`}>
                {getCategoryEmoji(caseItem.category)}
              </div>
              <div className="case-mini-info">
                <h4 className="case-mini-title">{caseItem.title}</h4>
                <p className="case-mini-company">{caseItem.company} • {caseItem.year}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="case-detail-card">
          <div className={`case-detail-header ${selectedCase.category}`}>
            <span className="case-detail-tag">
              {getCategoryEmoji(selectedCase.category)} {getCategoryLabel(selectedCase.category)}
            </span>
            <h1 className="case-detail-title">{selectedCase.title}</h1>
            <p className="case-detail-tagline">{selectedCase.tagline}</p>
            <div className="case-detail-meta">
              <span>📅 {selectedCase.year}</span>
              <span>🏢 {selectedCase.company}</span>
            </div>
          </div>

          <div className="case-detail-body">
            <div className="case-section-block">
              <div className="case-section-num">01</div>
              <div>
                <h3 className="case-section-title">O Desafio</h3>
                <p className="case-section-text">{selectedCase.problem}</p>
              </div>
            </div>

            <div className="case-section-block">
              <div className="case-section-num">02</div>
              <div>
                <h3 className="case-section-title">A Estratégia</h3>
                <p className="case-section-text">{selectedCase.approach}</p>
                <div className="case-methods">
                  {selectedCase.methods.map((m, i) => (
                    <span key={i} className="case-method-tag">{m}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="case-section-block">
              <div className="case-section-num">03</div>
              <div>
                <h3 className="case-section-title">O Impacto</h3>
                <div className="case-results-grid">
                  {selectedCase.results.map((r, i) => (
                    <div key={i} className={`case-result-tile ${selectedCase.category}`}>
                      <div className="case-result-metric">{r.metric}</div>
                      <div className="case-result-desc">{r.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
