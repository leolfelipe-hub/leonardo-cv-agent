'use client'

export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'chat', label: 'Chat' },
    { id: 'timeline', label: 'Trajetória' },
    { id: 'cases', label: 'Cases' },
    { id: 'expertise', label: 'Habilidades' },
  ]

  const icons = {
    chat: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    ),
    timeline: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 17"></polyline>
        <polyline points="17 6 23 6 23 12"></polyline>
      </svg>
    ),
    cases: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 10.26 24 12.52 17.77 18.91 19.54 28 12 23.77 4.46 28 6.23 18.91 0 12.52 8.91 10.26 12 2"></polygon>
      </svg>
    ),
    dashboard: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg>
    ),
    expertise: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    ),
  }

  return (
    <div className="tabs-container">
      <div className="tabs-wrapper">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            title={tab.label}
          >
            <span className="tab-icon">{icons[tab.id]}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <style jsx>{`
        .tabs-container {
          width: 100%;
          border-bottom: 1px solid #e2e8f0;
          background: white;
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .tabs-wrapper {
          display: flex;
          gap: 0;
          overflow-x: auto;
          padding: 0 1rem;
        }

        .tabs-wrapper::-webkit-scrollbar {
          height: 4px;
        }

        .tabs-wrapper::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        .tabs-wrapper::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.8rem 1.2rem;
          background: transparent;
          border: none;
          border-bottom: 3px solid transparent;
          color: #64748b;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
          min-height: 50px;
        }

        .tab-btn:hover {
          color: #1e293b;
          background: #f8fafc;
        }

        .tab-btn.active {
          color: #7c3aed;
          border-bottom-color: #7c3aed;
        }

        .tab-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          overflow: visible;
        }

        .tab-label {
          display: none;
        }

        @media (min-width: 640px) {
          .tab-label {
            display: inline;
          }
        }

        @media (max-width: 768px) {
          .tabs-wrapper {
            padding: 0 0.5rem;
          }

          .tab-btn {
            padding: 0.7rem 0.8rem;
            font-size: 0.85rem;
            min-height: 45px;
          }

          .tab-label {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}
