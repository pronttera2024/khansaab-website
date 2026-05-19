import Img from "../components/shared/Img.jsx";
import { Ornament, CornerOrnament } from "../components/shared/Ornament.jsx";
import { useViewport } from "../hooks/useViewport.js";
import  ContactStrip  from "../components/productsP/ContactStrip.jsx";

import TextRibbon from "../components/storyP/TextRibbon.jsx";
import RevealText from "../components/storyP/RevealText.jsx";
import Timeline from "../components/storyP/Timeline.jsx";
import Team from "../components/storyP/Team.jsx";

import heroContent from "../data/storyPages/heroContent.json";
import storyContent from "../data/storyPages/storyContent.json";

const { ribbon1, ribbon2, archivalImage, founderLetter, doubleBleed } = storyContent;

export default function StoryPage() {
  const { isPhone } = useViewport();

  return (
    <main style={{ background: "var(--ivory)" }}>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: isPhone ? 120 : 180,
          paddingBottom: isPhone ? 72 : 120,
          background: "var(--paper)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <p className="eyebrow" style={{ color: "var(--emerald)", marginBottom: isPhone ? 14 : 20 }}>
            {heroContent.eyebrow}
          </p>
          <p
            className="arabic"
            style={{ fontSize: isPhone ? 26 : 36, color: "var(--emerald)", marginBottom: 14, opacity: 0.8 }}
          >
            {heroContent.arabic}
          </p>
          <h1
            className="display"
            style={{
              fontSize: "clamp(54px, 14vw, 220px)",
              lineHeight: 0.92,
              fontWeight: 400,
              letterSpacing: "-0.02em",
              marginBottom: isPhone ? 22 : 28,
            }}
          >
            {heroContent.heading}
            <br />
            <span className="display-italic" style={{ color: "var(--emerald)" }}>
              {heroContent.headingItalic}
            </span>
          </h1>
          <Ornament />
          <p
            style={{
              maxWidth: 620,
              margin: "24px auto 0",
              fontSize: isPhone ? 15 : 18,
              lineHeight: 1.7,
              opacity: 0.7,
              padding: isPhone ? "0 4px" : 0,
            }}
          >
            {heroContent.subtext}
          </p>
          {isPhone && (
            <p className="mono" style={{ opacity: 0.5, fontSize: 10, letterSpacing: "0.3em", marginTop: 28 }}>
              {heroContent.scrollHint}
            </p>
          )}
        </div>
        {!isPhone && (
          <>
            <div style={{ position: "absolute", top: 200, left: 80, opacity: 0.4 }}>
              <CornerOrnament size={80} color="var(--emerald)" />
            </div>
            <div style={{ position: "absolute", bottom: 80, right: 80, opacity: 0.4 }}>
              <CornerOrnament size={80} color="var(--emerald)" />
            </div>
          </>
        )}
      </section>

      {/* ── Ribbon 1 ─────────────────────────────────────────── */}
      <TextRibbon {...ribbon1} />

      {/* ── Archival Image ───────────────────────────────────── */}
      <section style={{ position: "relative", height: isPhone ? "70vh" : "80vh" }}>
        <Img
          variant="dark"
          label={archivalImage.label}
          src={archivalImage.src}
          style={{ height: "100%" }}
        />
        {isPhone && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(10,9,8,0.2) 0%, transparent 30%, rgba(10,9,8,0.85) 100%)",
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            bottom: isPhone ? 22 : 40,
            left: isPhone ? 20 : 40,
            right: isPhone ? 20 : 40,
            display: "flex",
            flexDirection: isPhone ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isPhone ? "flex-start" : "flex-end",
            gap: isPhone ? 14 : 0,
            color: "var(--ivory)",
          }}
        >
          <div
            className="mono"
            style={{ opacity: 0.75, fontSize: isPhone ? 10 : 11, letterSpacing: "0.22em", color: "var(--gold-light)" }}
          >
            {archivalImage.caption}
          </div>
          <div
            style={{
              maxWidth: isPhone ? "100%" : 320,
              textAlign: isPhone ? "left" : "right",
              fontFamily: "var(--f-display)",
              fontStyle: "italic",
              fontSize: isPhone ? 18 : 16,
              lineHeight: 1.45,
              opacity: 0.95,
            }}
          >
            {archivalImage.quote}
          </div>
        </div>
      </section>

      {/* ── Founder Letter ───────────────────────────────────── */}
      <section style={{ padding: isPhone ? "80px 0" : "160px 0", background: "var(--paper)" }}>
        <div className="container" style={{ maxWidth: 980 }}>
          <div style={{ textAlign: "center", marginBottom: isPhone ? 44 : 80 }}>
            <p className="eyebrow" style={{ color: "var(--emerald)", marginBottom: 14 }}>
              {founderLetter.eyebrow}
            </p>
            <h2
              className="display"
              style={{ fontSize: "clamp(30px, 8vw, 80px)", lineHeight: 1.05, fontWeight: 400 }}
            >
              <RevealText text={founderLetter.heading} />
            </h2>
          </div>
          <div
            data-letter
            style={{
              columnCount: isPhone ? 1 : 2,
              columnGap: 56,
              fontSize: isPhone ? 15.5 : 17,
              lineHeight: 1.85,
              color: "rgba(10,9,8,0.8)",
            }}
          >
            {founderLetter.paragraphs.map((text, i) => (
              <p key={i} style={{ marginBottom: i < founderLetter.paragraphs.length - 1 ? 22 : 0 }}>
                {i === 0 && (
                  <span
                    className="display"
                    style={{
                      fontSize: isPhone ? 64 : 80,
                      float: "left",
                      lineHeight: 0.85,
                      marginRight: 12,
                      marginTop: 4,
                      color: "var(--emerald)",
                      fontWeight: 400,
                    }}
                  >
                    I
                  </span>
                )}
                {text}
              </p>
            ))}
          </div>
          <div
            style={{
              marginTop: isPhone ? 32 : 40,
              display: "flex",
              alignItems: "center",
              gap: 14,
              justifyContent: isPhone ? "flex-start" : "flex-end",
              paddingTop: 24,
              borderTop: "1px solid rgba(10,9,8,0.12)",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "var(--emerald)",
                color: "var(--gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--f-display)",
                fontStyle: "italic",
                fontSize: 20,
              }}
            >
              {founderLetter.signature.initial}
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600 }}>{founderLetter.signature.name}</p>
              <p className="mono" style={{ opacity: 0.55, fontSize: 10, letterSpacing: "0.2em" }}>
                {founderLetter.signature.role}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Double Full-Bleed ─────────────────────────────────── */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: isPhone ? "1fr" : "1fr 1fr",
          height: isPhone ? "auto" : "75vh",
        }}
      >
        {doubleBleed.map((panel, i) => (
          <div key={i} style={{ position: "relative", height: isPhone ? "60vh" : "100%" }}>
            <Img
              variant={panel.variant === "dark" ? "dark" : undefined}
              label={panel.label}
              src={panel.src}
              style={{ height: "100%" }}
            />
            {isPhone && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    panel.variant === "dark"
                      ? "linear-gradient(180deg, transparent 50%, rgba(10,9,8,0.85) 100%)"
                      : "linear-gradient(180deg, transparent 50%, rgba(245,239,227,0.85) 100%)",
                }}
              />
            )}
            <div
              style={{
                position: "absolute",
                bottom: isPhone ? 20 : 32,
                left: isPhone ? 20 : 32,
                color: panel.variant === "dark" ? "var(--ivory)" : "var(--ink)",
                maxWidth: 280,
              }}
            >
              <p
                className="mono"
                style={{
                  opacity: panel.variant === "dark" ? 0.85 : 0.7,
                  marginBottom: 6,
                  color: panel.variant === "dark" ? "var(--gold)" : undefined,
                  fontSize: isPhone ? 10 : 11,
                  letterSpacing: "0.22em",
                }}
              >
                {panel.chapter}
              </p>
              <p className="display" style={{ fontSize: isPhone ? 32 : 28, lineHeight: 1.05 }}>
                {panel.title}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* ── Ribbon 2 ─────────────────────────────────────────── */}
      <TextRibbon {...ribbon2} />

      {/* ── Timeline ─────────────────────────────────────────── */}
      <Timeline />

      {/* ── Team ─────────────────────────────────────────────── */}
      <Team />

      {/* ── Contact Strip ────────────────────────────────────── */}
      <ContactStrip />

    </main>
  );
}