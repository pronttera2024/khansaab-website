// components/legal/LegalBreadcrumb.jsx
// Breadcrumb trail: Home / Legal / <page title>

export default function LegalBreadcrumb({ title, onHomeClick }) {
  return (
    <div className="mono" style={{ opacity: 0.55, marginBottom: 32 }}>
      <button onClick={onHomeClick} style={{ color: 'inherit', padding: 0 }}>
        Home
      </button>
      <span>
        {' '}/ Legal / <span style={{ color: 'var(--ink)' }}>{title}</span>
      </span>
    </div>
  )
}