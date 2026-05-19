// components/legal/LegalSections.jsx
// Renders the main body — each section heading + paragraph

export default function LegalSections({ sections }) {
  return (
    <div>
      {sections.map((section, i) => (
        <section key={i} id={`sec-${i}`} style={{ marginBottom: 40 }}>
          <h2
            className="display"
            style={{ fontSize: 28, fontWeight: 500, marginBottom: 12 }}
          >
            {section.h}
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, opacity: 0.8 }}>
            {section.b}
          </p>
        </section>
      ))}
    </div>
  )
}