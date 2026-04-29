'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Tooltip,
} from 'recharts'
import { MoreHorizontal, TrendingUp } from 'lucide-react'

const careerRevenue = [
  { name: '2015', value: 5, label: 'Outback' },
  { name: '2017', value: 8, label: 'Outback Mgr' },
  { name: '2019', value: 12, label: '1.9M followers' },
  { name: '2020', value: 21, label: 'R$21M Delivery' },
  { name: '2022', value: 18, label: 'Braza Bank' },
  { name: '2023', value: 24, label: '+120% B2C' },
  { name: '2024', value: 32, label: 'Mastercard' },
  { name: '2025', value: 42, label: '+35% Sicredi' },
  { name: '2026', value: 50, label: '+25% LATAM Pass / CPA -50%' },
]

const casesByCategory = [
  { name: 'Aquisição', value: 1, color: '#f59e0b' },
  { name: 'CRM/LCM', value: 1, color: '#d97706' },
  { name: 'Mídia 360°', value: 1, color: '#f97316' },
  { name: 'Growth', value: 1, color: '#fbbf24' },
  { name: 'Atribuição', value: 1, color: '#fbbf24' },
]

const skillsData = [
  { name: 'Growth', value: 100 },
  { name: 'CRM', value: 100 },
  { name: 'Mídia', value: 100 },
  { name: 'Analytics', value: 80 },
  { name: 'IA', value: 80 },
  { name: 'Liderança', value: 80 },
  { name: 'Marca', value: 60 },
  { name: 'Budget', value: 100 },
]

const brandsData = [
  {
    name: 'Hotelaria',
    value: 7,
    color: '#d97706',
    brands: ['Novotel', 'Ibis', 'ibis Styles', 'Mercure', 'Grand Mercure', 'Adagio', 'Pullman'],
  },
  {
    name: 'Cards/Fintech',
    value: 6,
    color: '#f59e0b',
    brands: ['LATAM Pass', 'Sicredi', 'Bradesco', 'Mercado Pago', 'Stone', 'Braza Bank'],
  },
  {
    name: 'Restaurantes',
    value: 5,
    color: '#f97316',
    brands: ['Outback', 'Abbraccio', 'Aussie Grill', "Fleming's", 'Mexcla'],
  },
  {
    name: 'Educação/Outros',
    value: 2,
    color: '#fbbf24',
    brands: ['Homex Brasil', 'Federal Cursos'],
  },
]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload
    return (
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '0.85rem',
          color: 'white',
        }}
      >
        <div style={{ fontWeight: 600 }}>{item.name}</div>
        <div style={{ color: '#fbbf24' }}>{item.label || `${payload[0].value}`}</div>
      </div>
    )
  }
  return null
}

export default function ChartCard({ title, subtitle, type = 'line', trend = '+12.5%' }) {
  const renderChart = () => {
    switch (type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={skillsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
              />
              <Tooltip
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  borderRadius: '8px',
                  color: 'white',
                }}
              />
              <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#92400e" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        )

      case 'donut':
        return (
          <div className="chart-area">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={casesByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {casesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center">
              <div className="donut-center-value">5</div>
              <div className="donut-center-label">Cases</div>
            </div>
          </div>
        )

      case 'brands':
        return (
          <div className="chart-area">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={brandsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {brandsData.map((entry, index) => (
                    <Cell key={`cell-brand-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid rgba(251, 191, 36, 0.3)',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                  formatter={(value, name) => [`${value} marcas`, name]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center">
              <div className="donut-center-value">20+</div>
              <div className="donut-center-label">Marcas</div>
            </div>
          </div>
        )

      default:
        return (
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={careerRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#94a3b8', fontSize: 11 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="url(#lineGradient)"
                strokeWidth={3}
                dot={{ fill: '#fbbf24', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#fbbf24' }}
              />
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        )
    }
  }

  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <h3 className="chart-card-title">{title}</h3>
          <div className="chart-card-subtitle">
            <span className="chart-card-trend">
              <TrendingUp size={14} />
              {trend}
            </span>
            <span className="chart-card-period">{subtitle}</span>
          </div>
        </div>
        <button className="chart-card-menu">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {renderChart()}

      {type === 'donut' && (
        <div className="chart-legend">
          {casesByCategory.map((item, index) => (
            <div key={index} className="chart-legend-item">
              <div className="chart-legend-dot" style={{ backgroundColor: item.color }}></div>
              <span className="chart-legend-name">{item.name}</span>
            </div>
          ))}
        </div>
      )}

      {type === 'brands' && (
        <div className="chart-legend">
          {brandsData.map((item, index) => (
            <div key={index} className="chart-legend-item">
              <div className="chart-legend-dot" style={{ backgroundColor: item.color }}></div>
              <span className="chart-legend-name">{item.name}</span>
              <span className="chart-legend-value">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
