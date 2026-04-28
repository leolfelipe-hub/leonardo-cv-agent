'use client'

import careerData from '../data/careerData.json'

const skillIcons = {
  'Growth Marketing': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 17"></polyline>
      <polyline points="17 6 23 6 23 12"></polyline>
    </svg>
  ),
  'CRM e Gestão de Ciclo de Vida': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  ),
  'Mídia de Performance': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="12 2 15.09 10.26 24 12.52 17.77 18.91 19.54 28 12 23.77 4.46 28 6.23 18.91 0 12.52 8.91 10.26 12 2"></polygon>
    </svg>
  ),
  'Data Analytics': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
  ),
  'Automação com IA': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="1"></circle>
      <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 0l4.24-4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08 0l4.24 4.24"></path>
    </svg>
  ),
  'Liderança Ágil': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  ),
  'Estratégia de Marca': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 6v6l4 2"></path>
    </svg>
  ),
  'Gestão de Orçamento': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="1"></circle>
      <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 0l4.24-4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08 0l4.24 4.24"></path>
    </svg>
  ),
}

export default function ExpertiseRadar() {
  const expertise = careerData.expertise

  return (
    <div className="expertise-container">
      <div className="expertise-header">
        <h2>Áreas de Especialidade</h2>
        <p>19+ anos de excelência especializada em marketing</p>
      </div>

      <div className="expertise-layout">
        {/* Skills grid */}
        <div className="skills-grid">
          {expertise.map((skill, index) => (
            <div key={skill.skill} className="skill-card">
              <div className="skill-icon">{skillIcons[skill.skill]}</div>
              <h4>{skill.skill}</h4>
              <p className="skill-description">{skill.description}</p>

              {/* Skill bar */}
              <div className="skill-bar-container">
                <div className="skill-bar-background">
                  <div
                    className="skill-bar-fill"
                    style={{
                      width: `${(skill.level / 5) * 100}%`,
                      animationDelay: `${index * 0.1}s`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Level dots */}
              <div className="skill-level-dots">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`dot ${i < skill.level ? 'filled' : ''}`}
                  ></span>
                ))}
              </div>
              <span className="years-badge">{skill.yearsExperience}y</span>
            </div>
          ))}
        </div>

        {/* Summary sidebar */}
        <div className="expertise-summary">
          <div className="summary-stat">
            <div className="stat-number">
              {expertise.filter((s) => s.level === 5).length}
            </div>
            <div className="stat-text">Expertise Total</div>
          </div>

          <div className="summary-stat">
            <div className="stat-number">{expertise.length}</div>
            <div className="stat-text">Áreas Principais</div>
          </div>

          <div className="summary-stat">
            <div className="stat-number">
              {Math.round(
                expertise.reduce((acc, s) => acc + s.yearsExperience, 0) /
                  expertise.length
              )}
            </div>
            <div className="stat-text">Anos Médios</div>
          </div>

          <div className="summary-stat highlight">
            <div className="stat-number">19+</div>
            <div className="stat-text">Experiência Total</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .expertise-container {
          padding: 2rem;
          background: #fafafa;
          border-radius: 12px;
        }

        .expertise-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .expertise-header h2 {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #1e293b;
        }

        .expertise-header p {
          color: #64748b;
          font-size: 0.95rem;
        }

        .expertise-layout {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 2rem;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .skill-card {
          background: white;
          padding: 0.8rem;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .skill-card:hover {
          border-color: #7c3aed;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.1);
          transform: translateY(-2px);
        }

        .skill-icon {
          width: 24px;
          height: 24px;
          color: #7c3aed;
          margin-bottom: 0.4rem;
          flex-shrink: 0;
        }

        .skill-card h4 {
          font-size: 0.9rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 0.25rem;
          line-height: 1.2;
        }

        .skill-description {
          color: #64748b;
          font-size: 0.7rem;
          line-height: 1.3;
          margin-bottom: 0.6rem;
          min-height: auto;
        }

        .skill-bar-container {
          margin-bottom: 0.45rem;
          width: 100%;
        }

        .skill-bar-background {
          width: 100%;
          height: 4px;
          background: #e2e8f0;
          border-radius: 2px;
          overflow: hidden;
        }

        .skill-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #7c3aed 0%, #a855f7 100%);
          border-radius: 2px;
          animation: fillBar 1s ease-out forwards;
        }

        @keyframes fillBar {
          from {
            width: 0;
          }
        }

        .skill-level-dots {
          display: flex;
          gap: 0.3rem;
          margin-bottom: 0.45rem;
        }

        .dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #cbd5e1;
          transition: all 0.3s ease;
        }

        .dot.filled {
          background: #7c3aed;
          box-shadow: 0 0.5px 2px rgba(124, 58, 237, 0.3);
        }

        .years-badge {
          display: inline-block;
          background: #f1f5f9;
          padding: 0.12rem 0.4rem;
          border-radius: 3px;
          font-size: 0.65rem;
          font-weight: 600;
          color: #64748b;
          margin-top: auto;
        }

        .expertise-summary {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .summary-stat {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          text-align: center;
          transition: all 0.3s ease;
        }

        .summary-stat:hover {
          border-color: #7c3aed;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.1);
        }

        .summary-stat.highlight {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          border-color: #7c3aed;
          color: white;
        }

        .stat-number {
          font-size: 2.2rem;
          font-weight: 800;
          color: #1e293b;
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .summary-stat.highlight .stat-number {
          color: white;
        }

        .stat-text {
          font-size: 0.8rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .summary-stat.highlight .stat-text {
          color: rgba(255, 255, 255, 0.9);
        }

        @media (max-width: 1024px) {
          .expertise-layout {
            grid-template-columns: 1fr;
          }

          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .expertise-summary {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
          }
        }

        @media (max-width: 768px) {
          .expertise-container {
            padding: 1.5rem;
          }

          .skills-grid {
            grid-template-columns: 1fr;
          }

          .skill-card {
            padding: 1.2rem;
          }

          .expertise-summary {
            grid-template-columns: repeat(2, 1fr);
          }

          .expertise-header h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}
