'use client'

import careerData from '../data/careerData.json'
import { useState } from 'react'

export default function Timeline() {
  const [expandedId, setExpandedId] = useState(null)
  const timeline = [...careerData.timeline].reverse()

  const getColorByIndex = (index) => {
    const colors = [
      '#1e40af',
      '#7c3aed',
      '#ea580c',
      '#0891b2',
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <h2>Trajetória Profissional do Leonardo</h2>
        <p>19+ anos de excelência em marketing em diferentes escalas</p>
      </div>

      <div className="timeline-track">
        {timeline.map((job, index) => (
          <div key={job.id} className="timeline-item">
            {/* Timeline dot and line */}
            <div className="timeline-line-container">
              <div className="timeline-dot" style={{ backgroundColor: getColorByIndex(index) }}></div>
              {index !== timeline.length - 1 && <div className="timeline-line"></div>}
            </div>

            {/* Content card */}
            <div className="timeline-content">
              <div
                className="timeline-card"
                onClick={() => setExpandedId(expandedId === job.id ? null : job.id)}
              >
                <div className="timeline-card-header">
                  <div>
                    <h3>{job.position}</h3>
                    <p className="company-name">{job.company}</p>
                  </div>
                  <div className="timeline-date">
                    <span className="duration">{job.duration}</span>
                    <span className={`expand-icon ${expandedId === job.id ? 'expanded' : ''}`}>
                      ▼
                    </span>
                  </div>
                </div>

                <div className="timeline-card-meta">
                  <span className="meta-item">👥 Team: {job.teamSize}</span>
                  {job.budget && <span className="meta-item">💰 {job.budget}</span>}
                </div>

                {expandedId === job.id && (
                  <div className="timeline-expanded">
                    <div className="expanded-section">
                      <h4>Sobre</h4>
                      <p>{job.description}</p>
                    </div>

                    <div className="expanded-section">
                      <h4>Responsabilidades Principais</h4>
                      <ul>
                        {job.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="expanded-section">
                      <h4>Resultados Principais</h4>
                      <ul className="results-list">
                        {job.keyResults.map((result, i) => (
                          <li key={i}>✓ {result}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .timeline-container {
          padding: 2rem;
          background: #fafafa;
          border-radius: 12px;
          max-width: 900px;
        }

        .timeline-header {
          margin-bottom: 3rem;
          text-align: center;
        }

        .timeline-header h2 {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #1e293b;
        }

        .timeline-header p {
          color: #64748b;
          font-size: 0.95rem;
        }

        .timeline-track {
          position: relative;
        }

        .timeline-item {
          display: flex;
          margin-bottom: 2rem;
          gap: 2rem;
        }

        .timeline-line-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          min-width: 40px;
        }

        .timeline-dot {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 2;
          flex-shrink: 0;
        }

        .timeline-line {
          width: 3px;
          flex-grow: 1;
          background: linear-gradient(to bottom, #e2e8f0, #cbd5e1);
          margin-top: -0.5rem;
        }

        .timeline-content {
          flex: 1;
          padding-top: 0.5rem;
        }

        .timeline-card {
          background: white;
          border-radius: 10px;
          padding: 1.5rem;
          cursor: pointer;
          border: 2px solid #e2e8f0;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .timeline-card:hover {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          border-color: #7c3aed;
          transform: translateY(-2px);
          background: #f5f3ff;
        }

        .timeline-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .timeline-card-header h3 {
          font-size: 1.1rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.3rem;
        }

        .company-name {
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .timeline-date {
          text-align: right;
        }

        .duration {
          display: inline-block;
          background: #f1f5f9;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #475569;
          margin-right: 1rem;
        }

        .expand-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          color: #7c3aed;
          font-weight: bold;
          transition: transform 0.3s ease;
        }

        .expand-icon.expanded {
          transform: rotate(180deg);
        }

        .timeline-card-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.9rem;
          color: #64748b;
          margin-bottom: 0;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .timeline-expanded {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid #e2e8f0;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            max-height: 0;
          }
          to {
            opacity: 1;
            max-height: 500px;
          }
        }

        .expanded-section {
          margin-bottom: 1.5rem;
        }

        .expanded-section:last-child {
          margin-bottom: 0;
        }

        .expanded-section h4 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.8rem;
        }

        .expanded-section p {
          color: #475569;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .expanded-section ul {
          list-style: none;
          padding: 0;
        }

        .expanded-section li {
          color: #475569;
          font-size: 0.9rem;
          line-height: 1.6;
          padding: 0.4rem 0;
          padding-left: 1.5rem;
          position: relative;
        }

        .expanded-section li:before {
          content: '→';
          position: absolute;
          left: 0;
          color: #7c3aed;
          font-weight: bold;
        }

        .results-list li:before {
          content: '✓';
          color: #10b981;
        }

        @media (max-width: 768px) {
          .timeline-container {
            padding: 1.5rem;
          }

          .timeline-item {
            gap: 1rem;
          }

          .timeline-card-header {
            flex-direction: column;
          }

          .timeline-date {
            text-align: left;
            margin-top: 0.5rem;
          }

          .timeline-card-meta {
            flex-direction: column;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  )
}
