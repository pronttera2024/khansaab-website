// src/components/storyP/RevealText.jsx
import { useReveal } from "../../hooks/useReveal.js";

export default function RevealText({ text, className, style, delay = 0 }) {
  const [ref, visible] = useReveal();
  const words = text.split(" ");
  return (
    <span ref={ref} className={className} style={style}>
      {words.map((w, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            overflow: "hidden",
            marginRight: "0.25em",
            verticalAlign: "bottom",
          }}
        >
          <span
            style={{
              display: "inline-block",
              transform: visible ? "translateY(0)" : "translateY(110%)",
              opacity: visible ? 1 : 0,
              transition: `all 0.9s var(--ease-out) ${delay + i * 0.05}s`,
            }}
          >
            {w}
          </span>
        </span>
      ))}
    </span>
  );
}