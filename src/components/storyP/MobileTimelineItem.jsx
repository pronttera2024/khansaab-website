// src/components/storyP/MobileTimelineItem.jsx
import Img from "../shared/Img.jsx";
import { useReveal } from "../../hooks/useReveal.js";

export default function MobileTimelineItem({ e, i, total }) {
  const [ref, visible] = useReveal(0.2);
  return (
    <li
      ref={ref}
      style={{
        position: "relative",
        paddingBottom: 44,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "all 0.7s var(--ease-out)",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: -27,
          top: 6,
          width: 15,
          height: 15,
          borderRadius: "50%",
          background: "var(--ink)",
          border: "1px solid var(--gold)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "var(--gold)",
          }}
        />
      </span>
      <p
        className="mono"
        style={{
          color: "var(--gold-light)",
          opacity: 0.75,
          fontSize: 10,
          letterSpacing: "0.22em",
          marginBottom: 6,
        }}
      >
        CHAPTER {String(i + 1).padStart(2, "0")}
      </p>
      <p
        className="display-italic"
        style={{
          fontSize: 48,
          color: "var(--gold)",
          lineHeight: 0.9,
          marginBottom: 14,
          letterSpacing: "-0.02em",
        }}
      >
        {e.year}
      </p>
      <div
        style={{
          aspectRatio: "16/9",
          marginBottom: 16,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Img variant="dark" label={e.img} src={e.src} style={{ height: "100%" }} />
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 8,
            padding: "4px 8px",
            background: "var(--gold)",
            color: "var(--ink)",
            fontFamily: "var(--f-display)",
            fontStyle: "italic",
            fontSize: 13,
          }}
        >
          {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>
      <h3
        className="display"
        style={{
          fontSize: 26,
          marginBottom: 8,
          fontWeight: 400,
          lineHeight: 1.1,
        }}
      >
        {e.title}
      </h3>
      <p style={{ fontSize: 14.5, lineHeight: 1.7, opacity: 0.78 }}>{e.desc}</p>
    </li>
  );
}