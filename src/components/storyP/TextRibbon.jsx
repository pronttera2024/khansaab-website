// src/components/storyP/TextRibbon.jsx

export default function TextRibbon({
  words,
  direction = "left",
  color = "var(--gold)",
  bg = "var(--ink)",
}) {
  const seq = [...words, ...words, ...words];
  return (
    <div
      style={{
        background: bg,
        color,
        padding: "28px 0",
        overflow: "hidden",
        position: "relative",
        borderTop: "1px solid rgba(201,169,97,0.18)",
        borderBottom: "1px solid rgba(201,169,97,0.18)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 48,
          whiteSpace: "nowrap",
          animation: `ribbonScroll ${direction === "right" ? "-40s" : "40s"} linear infinite`,
          fontFamily: "var(--f-display)",
          fontStyle: "italic",
          fontSize: "clamp(48px, 6vw, 88px)",
          lineHeight: 1,
          fontWeight: 400,
        }}
      >
        {seq.map((w, i) => (
          <span
            key={i}
            style={{ display: "inline-flex", alignItems: "center", gap: 48 }}
          >
            {w}
            <span
              style={{
                width: 12,
                height: 12,
                background: color,
                transform: "rotate(45deg)",
                display: "inline-block",
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}