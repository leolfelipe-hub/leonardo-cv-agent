'use client'

import careerData from '../data/careerData.json'
import { useState } from 'react'

export default function CaseExplorer() {
  const [selectedCase, setSelectedCase] = useState(careerData.cases[0])

  const getCategoryColor = (category) => {
    const colors = {
      acquisition: '#1e40af',
      crm: '#7c3aed',
      media: '#ea580c',
      growth: '#10b981',
    }
    return colors[category] || '#64748b'
  }

  const getCategoryEmoji = (category) => {
    const emojis = {
      acquisition: '🎯',
      crm: '👥',
      media: '📢',
      growth: '📈',
    }
    return emojis[category] || '💼'
  }

  return (
    <div className="case-explorer-container">
      <div className="case-explorer-header">
        <h2>Cases de Sucesso do Leonardo</h2>
        <p>Desafios reais e soluções comprovadas</p>
      </div>

      <div className="case-explorer-layout">
        {/* Cases sidebar */}
        <div className="cases-sidebar">
          {careerData.cases.map((caseItem) => (
            <div
              key={caseItem.id}
              className={`case-card-mini ${
                selectedCase.id === caseItem.id ? 'active' : ''
              }`}
              onClick={() => setSelectedCase(caseItem)}
            >
              <div
                className="case-category-badge"
                style={{ backgroundColor: getCategoryColor(caseItem.category) }}
              >
                {getCategoryEmoji(caseItem.category)}
              </div>
              <div className="case-mini-info">
                <h4>{caseItem.title}</h4>
                <p>{caseItem.company}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Case detail */}
        <div className="case-detail">
          <div
            className="case-header"
            style={{
              backgroundColor: getCategoryColor(selectedCase.category),
            }}
          >
            <div className="case-header-content">
              <div className="case-badge">
                {getCategoryEmoji(selectedCase.category)} {selectedCase.category.toUpperCase()}
              </div>
              <h1>{selectedCase.title}</h1>
              <p className="case-tagline">{selectedCase.tagline}</p>
              <div className="case-meta">
                <span className="case-year">{selectedCase.year}</span>
                <span className="case-company">{selectedCase.company}</span>
              </div>
            </div>
          </div>

          <div className="case-sections">
            {/* Challenge section */}
            <div className="case-section">
              <div className="section-number">01</div>
              <div className="section-content">
                <h3>O Desafio</h3>
                <p>{selectedCase.problem}</p>
              </div>
            </div>

            {/* Approach section */}
            <div className="case-section">
              <div className="section-number">02</div>
              <div className="section-content">
                <h3>A Estratégia</h3>
                <p>{selectedCase.approach}</p>
                <div className="methods-tags">
                  {selectedCase.methods.map((method, i) => (
                    <span key={i} className="method-tag">
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Results section */}
            <div className="case-section">
              <div className="section-number">03</div>
              <div className="section-content">
                <h3>O Impacto</h3>
                <div className="results-showcase">
                  {selectedCase.results.map((result, i) => (
                    <div
                      key={i}
                      className="result-showcase-item"
                      style={{
                        borderLeftColor: getCategoryColor(selectedCase.category),
                      }}
                    >
                      <div className="result-metric">{result.metric}</div>
                      <div className="result-description">{result.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .case-explorer-container {
          padding: 2rem;
          background: #fafafa;
          border-radius: 12px;
        }

        .case-explorer-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .case-explorer-header h2 {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #1e293b;
        }

        .case-explorer-header p {
          color: #64748b;
          font-size: 0.95rem;
        }

        .case-explorer-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2rem;
        }

        .cases-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: 600px;
          overflow-y: auto;
        }

        .case-card-mini {
          display: flex;
          gap: 1rem;
          padding: 1rem;
          background: white;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
        }

        .case-card-mini:hover {
          border-color: #7c3aed;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.15);
          background: #fafafa;
          transform: translateX(4px);
        }

        .case-card-mini.active {
          border-color: #7c3aed;
          background: #f5f3ff;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.2);
        }

        .case-category-badge {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
          color: white;
        }

        .case-mini-info {
          flex: 1;
          min-width: 0;
        }

        .case-mini-info h4 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.3rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .case-mini-info p {
          font-size: 0.8rem;
          color: #64748b;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .case-detail {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }

        .case-header {
          padding: 3rem 2rem;
          color: white;
        }

        .case-header-content {
          max-width: 600px;
        }

        .case-badge {
          display: inline-block;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .case-header h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .case-tagline {
          font-size: 0.95rem;
          opacity: 0.95;
          margin-bottom: 1.5rem;
        }

        .case-meta {
          display: flex;
          gap: 2rem;
          font-size: 0.9rem;
          opacity: 0.85;
        }

        .case-sections {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .case-section {
          display: grid;
          grid-template-columns: 60px 1fr;
          gap: 2rem;
        }

        .section-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: #e2e8f0;
          line-height: 1;
        }

        .section-content {
          flex: 1;
        }

        .section-content h3 {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1rem;
        }

        .section-content p {
          color: #475569;
          line-height: 1.8;
          font-size: 1rem;
          margin-bottom: 1.5rem;
        }

        .methods-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .method-tag {
          display: inline-block;
          background: #f1f5f9;
          padding: 0.5rem 1.2rem;
          border-radius: 6px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #475569;
          border: 1px solid #cbd5e1;
        }

        .results-showcase {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
        }

        .result-showcase-item {
          background: #f8fafc;
          padding: 1.5rem;
          border-radius: 8px;
          border-left: 4px solid;
        }

        .result-metric {
          font-size: 1.8rem;
          font-weight: 800;
          color: #1e293b;
          margin-bottom: 0.8rem;
        }

        .result-description {
          font-size: 0.9rem;
          color: #475569;
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .case-explorer-layout {
            grid-template-columns: 1fr;
          }

          .cases-sidebar {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            max-height: none;
          }
        }

        @media (max-width: 768px) {
          .case-explorer-container {
            padding: 1.5rem;
          }

          .case-header {
            padding: 2rem;
          }

          .case-header h1 {
            font-size: 1.5rem;
          }

          .case-sections {
            padding: 1.5rem;
            gap: 2rem;
          }

          .case-section {
            grid-template-columns: 40px 1fr;
            gap: 1.2rem;
          }

          .section-number {
            font-size: 1.8rem;
          }

          .results-showcase {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
