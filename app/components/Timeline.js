'use client'

import { useState } from 'react'
import { Briefcase, Users, Wallet, ChevronDown } from 'lucide-react'
import careerData from '../data/careerData.json'

export default function Timeline() {
  const [expandedId, setExpandedId] = useState(null)
  const timeline = [...careerData.timeline].reverse()

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>Trajetória Profissional</h2>
        <p>19+ anos de excelência em Marketing, Growth e CRM em diferentes escalas</p>
      </div>

      <div className="timeline-track">
        {timeline.map((job, index) => {
          const isExpanded = expandedId === job.id
          return (
            <div key={job.id} className="timeline-row">
              <div className="timeline-rail">
                <div className={`timeline-bullet idx-${index % 4}`}>
                  <Briefcase size={20} />
                </div>
                {index < timeline.length - 1 && <div className="timeline-line-down"></div>}
              </div>

              <div
                className="timeline-card"
                onClick={() => setExpandedId(isExpanded ? null : job.id)}
              >
                <div className="timeline-card-top">
                  <div>
                    <div className="timeline-position">{job.position}</div>
                    <div className="timeline-company">{job.company}</div>
                  </div>
                  <div className="timeline-duration">{job.duration}</div>
                </div>

                <div className="timeline-meta">
                  <div className="timeline-meta-item">
                    <Users size={14} />
                    <span>Time: {job.teamSize}</span>
                  </div>
                  {job.budget && job.budget !== 'Não especificado' && (
                    <div className="timeline-meta-item">
                      <Wallet size={14} />
                      <span>{job.budget}</span>
                    </div>
                  )}
                  <div className="timeline-meta-item">
                    📍 <span>{job.location}</span>
                  </div>
                </div>

                <p className="timeline-description">{job.description}</p>

                {isExpanded && (
                  <div className="timeline-expanded">
                    <div>
                      <h4>Responsabilidades</h4>
                      <ul>
                        {job.responsibilities.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4>Resultados-chave</h4>
                      <ul className="timeline-results">
                        {job.keyResults.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <button
                  className="timeline-toggle"
                  onClick={(e) => {
                    e.stopPropagation()
                    setExpandedId(isExpanded ? null : job.id)
                  }}
                  style={{ marginTop: '8px' }}
                >
                  <span>{isExpanded ? 'Recolher' : 'Ver detalhes'}</span>
                  <ChevronDown
                    size={14}
                    style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s',
                    }}
                  />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
