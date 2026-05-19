// src/components/storyP/Team.jsx
import Img from "../shared/Img.jsx";
import { useViewport } from "../../hooks/useViewport.js";
import TeamCard from "./TeamCard.jsx";
import teamMembers from "../../data/storyPages/teamMembers.json";

export default function Team() {
  const { isPhone } = useViewport();
  return (
    <section
      style={{
        padding: isPhone ? "80px 0 72px" : "160px 0",
        background: "var(--paper)",
      }}
    >
      <div className="container">
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: isPhone ? 40 : 80,
            flexWrap: "wrap",
            gap: isPhone ? 14 : 24,
          }}
        >
          <div>
            <p className="eyebrow" style={{ color: "var(--emerald)", marginBottom: 14 }}>
              FORTY HANDS
            </p>
            <h2
              className="display"
              style={{
                fontSize: "clamp(40px, 9vw, 104px)",
                lineHeight: 1.02,
                fontWeight: 400,
              }}
            >
              The{" "}
              <span className="display-italic" style={{ color: "var(--emerald)" }}>
                house.
              </span>
            </h2>
          </div>
          <p
            style={{
              maxWidth: 380,
              opacity: 0.65,
              fontSize: isPhone ? 14 : 16,
              lineHeight: 1.6,
            }}
          >
            Owners, master tailors and the studio team. Every garment leaves
            with a name stitched on the inside placket — these are some of them.
          </p>
        </header>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isPhone ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: isPhone ? 14 : 24,
          }}
        >
          {teamMembers.map((m, i) => (
            <TeamCard key={i} member={m} />
          ))}
        </div>
      </div>
      <div
        style={{
          marginTop: isPhone ? 60 : 120,
          height: isPhone ? "46vh" : "70vh",
          position: "relative",
        }}
      >
        <Img
          label="THE FULL ATELIER · 40 ARTISANS · GROUP PORTRAIT · DUBAI 2026"
          src="/assets/about_1.png"
          style={{ height: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            bottom: isPhone ? 18 : 36,
            left: 0,
            right: 0,
            textAlign: "center",
            color: "var(--ivory)",
            padding: "0 16px",
          }}
        >
          <p
            className="mono"
            style={{ opacity: 0.85, fontSize: isPhone ? 10 : 11, letterSpacing: "0.22em" }}
          >
            THE FULL ATELIER · DUBAI · MARCH 2026
          </p>
        </div>
      </div>
    </section>
  );
}