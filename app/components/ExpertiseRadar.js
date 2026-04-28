'use client'

import { TrendingUp, Users, Target, BarChart3, Bot, UserCheck, Sparkles, Wallet } from 'lucide-react'
import careerData from '../data/careerData.json'

const skillIcons = {
  'Growth Marketing': TrendingUp,
  'CRM e Gestão de Ciclo de Vida': Users,
  'Mídia de Performance': Target,
  'Data Analytics': BarChart3,
  'Automação com IA': Bot,
  'Liderança Ágil': UserCheck,
  'Estratégia de Marca': Sparkles,
  'Gestão de Orçamento': Wallet,
}

export default function ExpertiseRadar() {
  const expertise = careerData.expertise

  const totalExpert = expertise.filter((s) => s.level === 5).length
  const avgYears = Math.round(
    expertise.reduce((acc, s) => acc + s.yearsExperience, 0) / expertise.length
  )

  return (
    <div className="section-card">
      <div className="section-header">
        <h2>Áreas de Especialidade</h2>
        <p>8 habilidades core • 19+ anos de experiência aplicada</p>
      </div>

      <div className="expertise-layout">
        <div className="skills-grid-dark">
          {expertise.map((skill) => {
            const Icon = skillIcons[skill.skill] || TrendingUp
            return (
              <div key={skill.skill} className="skill-card-dark">
                <div className="skill-card-head">
                  <div className="skill-card-icon">
                    <Icon size={20} />
                  </div>
                  <span className="skill-card-years">{skill.yearsExperience}y</span>
                </div>

                <div>
                  <h4 className="skill-card-name">{skill.skill}</h4>
                  <p className="skill-card-desc">{skill.description}</p>
                </div>

                <div className="skill-card-bar">
                  <div
                    className="skill-card-bar-fill"
                    style={{ width: `${(skill.level / 5) * 100}%` }}
                  ></div>
                </div>

                <div className="skill-card-dots">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`skill-card-dot ${i < skill.level ? 'filled' : ''}`}
                    ></span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="expertise-summary-dark">
          <div className="summary-stat-dark">
            <div className="summary-stat-num">{totalExpert}</div>
            <div className="summary-stat-text">Expert Level</div>
          </div>
          <div className="summary-stat-dark">
            <div className="summary-stat-num">{expertise.length}</div>
            <div className="summary-stat-text">Áreas Core</div>
          </div>
          <div className="summary-stat-dark">
            <div className="summary-stat-num">{avgYears}y</div>
            <div className="summary-stat-text">Anos Médios</div>
          </div>
          <div className="summary-stat-dark highlight">
            <div className="summary-stat-num">19+</div>
            <div className="summary-stat-text">Total</div>
          </div>
        </div>
      </div>
    </div>
  )
}
