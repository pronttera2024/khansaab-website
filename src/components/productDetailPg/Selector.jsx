export default function Selector({ label, sub, action, children }) {
  return (
    <div style={{ marginTop: 24 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        marginBottom: 12, gap: 12, flexWrap: 'wrap',
      }}>
        <div>
          <span style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600 }}>{label}</span>
          {sub && <span className="mono" style={{ marginLeft: 12, opacity: 0.55 }}>{sub}</span>}
        </div>
        {action}
      </div>
      {children}
    </div>
  )
}