// components/legal/LegalTableOfContents.jsx
// Sticky sidebar listing all section headings as anchor links

export default function LegalTableOfContents({ sections }) {
  return (
    <aside style={{ position: 'sticky', top: 140, alignSelf: 'start' }}>
      <p
        className="eyebrow"
        style={{ color: 'var(--gold-warm)', marginBottom: 16, opacity: 0.65 }}
      >
        Contents
      </p>
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {sections.map((section, i) => (
          <li key={i} style={{ fontSize: 13, opacity: 0.7 }}>
            <a
              href={`#sec-${i}`}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              {section.h}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}