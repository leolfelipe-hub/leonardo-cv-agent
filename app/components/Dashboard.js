'use client'

import careerData from '../data/careerData.json'
import { useState } from 'react'

export default function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const results = careerData.results

  const filteredResults =
    selectedFilter === 'all'
      ? results
      : results.filter((r) => r.type === selectedFilter)

  const getTypeColor = (type) => {
    const colors = {
      revenue: '#10b981',
      cac: '#3b82f6',
      growth: '#7c3aed',
      roas: '#f59e0b',
    }
    return colors[type] || '#64748b'
  }

  const getTypeEmoji = (type) => {
    const emojis = {
      revenue: '💰',
      cac: '📉',
      growth: '📈',
      roas: '🎯',
    }
    return emojis[type] || '📊'
  }

  const getTypeLabel = (type) => {
    const labels = {
      revenue: 'Revenue',
      cac: 'Cost Reduction',
      growth: 'Growth',
      roas: 'ROAS',
    }
    return labels[type] || type
  }

  const resultTypes = ['all', 'revenue', 'growth', 'cac', 'roas']

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Key Results & Metrics</h2>
        <p>Quantified impact across major initiatives</p>
      </div>

      {/* Filters */}
      <div className="filters">
        {resultTypes.map((type) => (
          <button
            key={type}
            className={`filter-btn ${selectedFilter === type ? 'active' : ''}`}
            onClick={() => setSelectedFilter(type)}
          >
            {type === 'all'
              ? '📊 All'
              : `${getTypeEmoji(type)} ${getTypeLabel(type)}`}
          </button>
        ))}
      </div>

      {/* Results timeline */}
      <div className="results-timeline">
        {filteredResults.length === 0 ? (
          <div className="no-results">
            <p>No results for this filter</p>
          </div>
        ) : (
          <div className="timeline-grid">
            {filteredResults.map((result, index) => (
              <div
                key={`${result.year}-${result.type}-${index}`}
                className="timeline-item"
              >
                <div className="timeline-year">{result.year}</div>
                <div className="timeline-content">
                  <div
                    className="metric-card"
                    style={{ borderTopColor: getTypeColor(result.type) }}
                  >
                    <div
                      className="metric-badge"
                      style={{ backgroundColor: getTypeColor(result.type) }}
                    >
                      {getTypeEmoji(result.type)}
                    </div>
                    <div className="metric-value">{result.value}</div>
                    <div className="metric-text">{result.description}</div>
                    <div className="metric-company">{result.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary stats */}
      <div className="stats-summary">
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <div className="stat-label">Total Metrics</div>
            <div className="stat-value">{results.length}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <div className="stat-label">Period</div>
            <div className="stat-value">2020-2024</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏢</div>
          <div className="stat-info">
            <div className="stat-label">Companies</div>
            <div className="stat-value">{new Set(results.map((r) => r.company)).size}</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔢</div>
          <div className="stat-info">
            <div className="stat-label">Metric Types</div>
            <div className="stat-value">{new Set(results.map((r) => r.type)).size}</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-container {
          padding: 2rem;
          background: #fafafa;
          border-radius: 12px;
        }

        .dashboard-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .dashboard-header h2 {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #1e293b;
        }

        .dashboard-header p {
          color: #64748b;
          font-size: 0.95rem;
        }

        .filters {
          display: flex;
          gap: 0.8rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .filter-btn {
          padding: 0.7rem 1.2rem;
          border: 2px solid #e2e8f0;
          background: white;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          border-color: #7c3aed;
          color: #7c3aed;
        }

        .filter-btn.active {
          background: #7c3aed;
          border-color: #7c3aed;
          color: white;
        }

        .results-timeline {
          margin-bottom: 3rem;
        }

        .timeline-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 2rem;
        }

        .timeline-item {
          position: relative;
        }

        .timeline-year {
          font-size: 0.85rem;
          font-weight: 700;
          color: #7c3aed;
          margin-bottom: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .timeline-content {
          width: 100%;
        }

        .metric-card {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          border-top: 4px solid;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .metric-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }

        .metric-badge {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
          color: white;
        }

        .metric-value {
          font-size: 1.6rem;
          font-weight: 800;
          color: #1e293b;
        }

        .metric-text {
          font-size: 0.9rem;
          color: #475569;
          line-height: 1.5;
        }

        .metric-company {
          font-size: 0.8rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .no-results {
          text-align: center;
          padding: 3rem;
          color: #94a3b8;
          font-size: 1rem;
        }

        .stats-summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1.5rem;
          padding-top: 2rem;
          border-top: 1px solid #e2e8f0;
        }

        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          display: flex;
          gap: 1rem;
          align-items: center;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          border-color: #7c3aed;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.1);
        }

        .stat-icon {
          font-size: 2rem;
          flex-shrink: 0;
        }

        .stat-info {
          flex: 1;
        }

        .stat-label {
          font-size: 0.8rem;
          color: #64748b;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.3rem;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
        }

        @media (max-width: 768px) {
          .dashboard-container {
            padding: 1.5rem;
          }

          .timeline-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .metric-card {
            padding: 1.2rem;
          }

          .stats-summary {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .stat-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 1.2rem;
          }

          .stat-info {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}
