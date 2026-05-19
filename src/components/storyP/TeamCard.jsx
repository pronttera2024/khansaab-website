// src/components/storyP/TeamCard.jsx
import { useState } from "react";
import Img from "../shared/Img.jsx";
import { useViewport } from "../../hooks/useViewport.js";

export default function TeamCard({ member }) {
  const [hov, setHov] = useState(false);
  const { isPhone } = useViewport();
  const open = hov || isPhone;

  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ cursor: "pointer", position: "relative" }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "3/4",
          marginBottom: isPhone ? 12 : 20,
          overflow: "hidden",
        }}
      >
        <Img
          variant="dark"
          label={`PORTRAIT · ${member.name.toUpperCase()}`}
          src={member.src}
          style={{
            height: "100%",
            transform: hov ? "scale(1.05)" : "scale(1)",
            transition: "transform 0.7s var(--ease-out)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, transparent 35%, rgba(10,9,8,${open ? 0.92 : 0.55}) 100%)`,
            transition: "background 0.5s",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: isPhone ? 14 : 24,
            left: isPhone ? 14 : 24,
            right: isPhone ? 14 : 24,
            color: "var(--ivory)",
          }}
        >
          <p
            className="arabic"
            style={{ fontSize: isPhone ? 16 : 22, color: "var(--gold)", marginBottom: 4 }}
          >
            {member.arabic}
          </p>
          <h3
            className="display"
            style={{ fontSize: isPhone ? 18 : 26, marginBottom: 4, lineHeight: 1.1 }}
          >
            {member.name}
          </h3>
          <p
            className="mono"
            style={{ opacity: 0.7, fontSize: isPhone ? 9 : 11, letterSpacing: "0.18em" }}
          >
            {member.role}
          </p>
          {!isPhone && (
            <div
              style={{
                marginTop: 14,
                maxHeight: hov ? 100 : 0,
                opacity: hov ? 1 : 0,
                overflow: "hidden",
                transition: "all 0.6s var(--ease-out)",
              }}
            >
              <p
                className="display-italic"
                style={{
                  fontSize: 15,
                  lineHeight: 1.5,
                  opacity: 0.9,
                  paddingTop: 12,
                  borderTop: "1px solid rgba(201,169,97,0.4)",
                }}
              >
                "{member.quote}"
              </p>
            </div>
          )}
        </div>
        <div
          style={{
            position: "absolute",
            top: isPhone ? 10 : 16,
            right: isPhone ? 10 : 16,
            padding: isPhone ? "4px 7px" : "6px 10px",
            background: "rgba(245,239,227,0.92)",
            color: "var(--ink)",
            fontSize: isPhone ? 9 : 10,
            fontFamily: "var(--f-mono)",
            letterSpacing: "0.15em",
          }}
        >
          SINCE {member.since}
        </div>
      </div>
      {isPhone && (
        <p
          className="display-italic"
          style={{ fontSize: 13.5, lineHeight: 1.5, opacity: 0.78, color: "var(--emerald)" }}
        >
          "{member.quote}"
        </p>
      )}
    </article>
  );
}