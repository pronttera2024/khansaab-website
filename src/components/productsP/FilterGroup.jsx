// src/components/productsP/FilterGroup.jsx

export default function FilterGroup({ title, options, value, onChange }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 14 }}>
        {title}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {options.map(([v, label]) => {
          const active = v === value
          return (
            <button
              key={v}
              onClick={() => onChange(v)}
              style={{
                textAlign: 'left', fontSize: 14, padding: '8px 0',
                color: active ? 'var(--emerald)' : 'rgba(10,9,8,0.7)',
                fontWeight: active ? 600 : 400,
                display: 'flex', alignItems: 'center', gap: 10,
              }}
            >
              <span style={{
                width: 16, height: 16, borderRadius: '50%',
                border: `1px solid ${active ? 'var(--emerald)' : 'rgba(10,9,8,0.25)'}`,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                {active && <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--emerald)' }} />}
              </span>
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}