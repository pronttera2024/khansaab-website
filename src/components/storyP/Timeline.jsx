import { useState, useEffect, useRef } from "react";
import Img from "../shared/Img.jsx";
import { useViewport } from "../../hooks/useViewport.js";
import MobileTimeline from "./MobileTimeline.jsx";
import timelineEvents from "../../data/storyPages/timelineEvents.json";

export default function Timeline() {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const { isPhone } = useViewport();

  useEffect(() => {
    if (isPhone) return;
    const onScroll = () => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      if (!wrap || !track) return;
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
      track.style.transform = `translateX(${-p * (track.scrollWidth - window.innerWidth)}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isPhone]);

  if (isPhone) return <MobileTimeline />;

  const active = Math.min(
    timelineEvents.length - 1,
    Math.floor(progress * timelineEvents.length),
  );

  return (
    <div
      ref={wrapRef}
      data-timeline
      style={{ height: "350vh", position: "relative", background: "var(--ink)" }}
    >
      <div
        data-timeline-sticky
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          color: "var(--ivory)",
        }}
      >
        <div className="geo-overlay" style={{ opacity: 0.05 }} />

        {/* Header */}
        <div
          style={{
            position: "absolute",
            top: 96,
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 5,
          }}
        >
          <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: 12 }}>
            FIFTY-FOUR YEARS · OUR TIMELINE
          </p>
          <h2
            className="display"
            style={{ fontSize: "clamp(40px, 5vw, 64px)", lineHeight: 1, fontWeight: 400 }}
          >
            From{" "}
            <span className="display-italic" style={{ color: "var(--gold)" }}>
              1972
            </span>{" "}
            to{" "}
            <span className="display-italic" style={{ color: "var(--gold)" }}>
              today.
            </span>
          </h2>
        </div>

        {/* Progress Rail */}
        <div
          data-timeline-rail
          style={{
            position: "absolute",
            bottom: 80,
            left: 80,
            right: 80,
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <span className="mono" style={{ color: "var(--gold)" }}>
            {timelineEvents[0].year}
          </span>
          <div
            style={{
              flex: 1,
              height: 1,
              background: "rgba(245,239,227,0.15)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: `${progress * 100}%`,
                background: "var(--gold)",
                transition: "width 0.1s linear",
              }}
            />
            {timelineEvents.map((e, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${(i / (timelineEvents.length - 1)) * 100}%`,
                  top: -3,
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: i <= active ? "var(--gold)" : "var(--ink)",
                  border: "1px solid var(--gold)",
                  transform: "translateX(-50%)",
                  transition: "background 0.3s",
                }}
              />
            ))}
          </div>
          <span className="mono" style={{ color: "var(--gold)" }}>
            {timelineEvents[timelineEvents.length - 1].year}
          </span>
        </div>

        {/* Scroll hint */}
        <div
          data-timeline-hint
          style={{
            position: "absolute",
            bottom: 28,
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 5,
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            opacity: 0.5,
          }}
        >
          ↓ Continue scrolling — timeline moves horizontally
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          data-timeline-track
          style={{
            display: "flex",
            height: "100%",
            transition: "transform 0.05s linear",
            alignItems: "center",
            paddingLeft: "10vw",
            paddingRight: "10vw",
          }}
        >
          {timelineEvents.map((e, i) => (
            <div
              key={i}
              data-timeline-panel
              style={{
                width: "70vw",
                height: "100%",
                flexShrink: 0,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 60,
                alignItems: "center",
                padding: "180px 60px 140px",
                position: "relative",
              }}
            >
              <div style={{ position: "relative" }}>
                <div
                  className="display-italic"
                  style={{
                    fontSize: "clamp(180px, 22vw, 320px)",
                    color: "var(--gold)",
                    lineHeight: 0.85,
                    opacity: 0.95,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {e.year}
                </div>
                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                  }}
                >
                  <span style={{ width: 56, height: 1, background: "var(--gold)" }} />
                  <span className="mono" style={{ color: "var(--gold-light)", opacity: 0.7 }}>
                    CHAPTER {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3
                  className="display"
                  style={{
                    fontSize: "clamp(40px, 4vw, 64px)",
                    marginTop: 24,
                    marginBottom: 18,
                    fontWeight: 400,
                    lineHeight: 1.05,
                  }}
                >
                  {e.title}
                </h3>
                <p style={{ fontSize: 17, lineHeight: 1.7, opacity: 0.75, maxWidth: 460 }}>
                  {e.desc}
                </p>
              </div>
              <div style={{ position: "relative" }}>
                <Img
                  variant="dark"
                  label={e.img}
                  src={e.src}
                  style={{ aspectRatio: "4/5" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: -18,
                    right: -18,
                    padding: "14px 22px",
                    background: "var(--gold)",
                    color: "var(--ink)",
                    fontFamily: "var(--f-display)",
                    fontStyle: "italic",
                    fontSize: 22,
                  }}
                >
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(timelineEvents.length).padStart(2, "0")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}