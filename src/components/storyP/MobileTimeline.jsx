// src/components/storyP/MobileTimeline.jsx
import timelineEvents from "../../data/storyPages/timelineEvents.json";
import MobileTimelineItem from "./MobileTimelineItem.jsx";

export default function MobileTimeline() {
  return (
    <section
      style={{
        background: "var(--ink)",
        color: "var(--ivory)",
        padding: "72px 0 96px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="geo-overlay" style={{ opacity: 0.05 }} />
      <div className="container" style={{ position: "relative" }}>
        <header style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="eyebrow" style={{ color: "var(--gold)", marginBottom: 12 }}>
            FIFTY-FOUR YEARS
          </p>
          <h2
            className="display"
            style={{
              fontSize: "clamp(34px, 9vw, 56px)",
              lineHeight: 1.05,
              fontWeight: 400,
            }}
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
        </header>

        <ol style={{ listStyle: "none", position: "relative", paddingLeft: 28 }}>
          <span
            aria-hidden
            style={{
              position: "absolute",
              left: 7,
              top: 6,
              bottom: 6,
              width: 1,
              background:
                "linear-gradient(180deg, rgba(201,169,97,0.5), rgba(201,169,97,0.15) 90%, transparent)",
            }}
          />
          {timelineEvents.map((e, i) => (
            <MobileTimelineItem
              key={i}
              e={e}
              i={i}
              total={timelineEvents.length}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}