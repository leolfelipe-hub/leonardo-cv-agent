'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'

export default function MetricCard({ title, value, change, trend, icon: Icon, color, delay = 0 }) {
  return (
    <div
      className="metric-card animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="metric-card-row">
        <div className={`metric-icon ${color}`}>
          <Icon size={20} />
        </div>

        <div className="metric-card-mid">
          <h3 className="metric-value">{value}</h3>
          <p className="metric-label">{title}</p>
        </div>

        <div className={`metric-trend ${trend}`}>
          {trend === 'up' ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          <span>{change}</span>
        </div>
      </div>

      <div className="metric-progress-track">
        <div
          className={`metric-progress-fill ${trend}`}
          style={{ width: trend === 'up' ? '78%' : '45%' }}
        ></div>
      </div>
    </div>
  )
}
