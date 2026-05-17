import { useState, useEffect, useRef } from "react";
import Img from "../components/shared/Img.jsx";
import { Ornament, CornerOrnament } from "../components/shared/Ornament.jsx";
import { useReveal } from "../hooks/useReveal.js";
import { useViewport } from "../hooks/useViewport.js";
import { ContactStrip } from "./ProductsPage.jsx";

function TextRibbon({
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

function RevealText({ text, className, style, delay = 0 }) {
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

const TIMELINE_EVENTS = [
  {
    year: "1972",
    title: "The first stitch",
    desc: "Khan opens a sewing room behind the Dubai gold souk with two needles and a kerosene lamp.",
    img: "1972 · WORKSHOP",
  },
  {
    year: "1988",
    title: "Beyond the Emirates",
    desc: "Waiting list extends to Riyadh, Doha and Kuwait City. Six tailors are hired.",
    img: "1988 · APPOINTMENT BOOK",
  },
  {
    year: "1995",
    title: "Second generation",
    desc: "Saif's father, Rashid, takes the bench. The atelier moves to Al Wasl Road.",
    img: "1995 · RASHID KHAN",
  },
  {
    year: "2003",
    title: "The Bisht Room",
    desc: "A dedicated atelier for ceremonial cloaks opens — 24k gold-thread embroidery a specialty.",
    img: "2003 · BISHT ROOM",
  },
  {
    year: "2014",
    title: "KhanSaab is born",
    desc: "Saif joins. The house is formally named KhanSaab and begins serving international clientele.",
    img: "2014 · SAIF KHAN",
  },
  {
    year: "2019",
    title: "Diplomatic",
    desc: "The Diplomatic line launches — crease-resistant travel thobes worn from Geneva to Tokyo.",
    img: "2019 · DIPLOMATIC LINE",
  },
  {
    year: "2026",
    title: "Forty hands, one craft",
    desc: "Today: 40 artisans, 47 countries shipped, 12,400+ five-star reviews — and the same shears.",
    img: "2026 · THE ATELIER",
  },
];

function MobileTimelineItem({ e, i, total }) {
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
        <Img variant="dark" label={e.img} style={{ height: "100%" }} />
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

function MobileTimeline() {
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
          <p
            className="eyebrow"
            style={{ color: "var(--gold)", marginBottom: 12 }}
          >
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

        <ol
          style={{ listStyle: "none", position: "relative", paddingLeft: 28 }}
        >
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
          {TIMELINE_EVENTS.map((e, i) => (
            <MobileTimelineItem
              key={i}
              e={e}
              i={i}
              total={TIMELINE_EVENTS.length}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Timeline() {
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
    TIMELINE_EVENTS.length - 1,
    Math.floor(progress * TIMELINE_EVENTS.length),
  );

  return (
    <div
      ref={wrapRef}
      data-timeline
      style={{
        height: "350vh",
        position: "relative",
        background: "var(--ink)",
      }}
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
          <p
            className="eyebrow"
            style={{ color: "var(--gold)", marginBottom: 12 }}
          >
            FIFTY-FOUR YEARS · OUR TIMELINE
          </p>
          <h2
            className="display"
            style={{
              fontSize: "clamp(40px, 5vw, 64px)",
              lineHeight: 1,
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
        </div>

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
            {TIMELINE_EVENTS[0].year}
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
            {TIMELINE_EVENTS.map((e, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: `${(i / (TIMELINE_EVENTS.length - 1)) * 100}%`,
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
            {TIMELINE_EVENTS[TIMELINE_EVENTS.length - 1].year}
          </span>
        </div>

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
          {TIMELINE_EVENTS.map((e, i) => (
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
                  <span
                    style={{ width: 56, height: 1, background: "var(--gold)" }}
                  />
                  <span
                    className="mono"
                    style={{ color: "var(--gold-light)", opacity: 0.7 }}
                  >
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
                <p
                  style={{
                    fontSize: 17,
                    lineHeight: 1.7,
                    opacity: 0.75,
                    maxWidth: 460,
                  }}
                >
                  {e.desc}
                </p>
              </div>
              <div style={{ position: "relative" }}>
                <Img
                  variant="dark"
                  label={e.img}
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
                  {String(TIMELINE_EVENTS.length).padStart(2, "0")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const TEAM = [
  {
    name: "Saif Khan",
    role: "Head of House · Master Tailor",
    arabic: "سيف خان",
    since: "2014",
    quote:
      "A garment is a thirty-year conversation between a man and his cloth.",
  },
  {
    name: "Rashid Khan",
    role: "Founder · Chairman",
    arabic: "راشد خان",
    since: "1995",
    quote: "We make heritage. The seasons are someone else's problem.",
  },
  {
    name: "Aisha Al-Nuaimi",
    role: "Creative Director",
    arabic: "عائشة النعيمي",
    since: "2018",
    quote: "Tradition is not what we preserve. It is what we choose to extend.",
  },
  {
    name: "Tariq Mansouri",
    role: "Bisht Master · 24k Gold",
    arabic: "طارق المنصوري",
    since: "2003",
    quote:
      "A bisht should weigh on the shoulders the way honour does — gently, firmly.",
  },
];

function TeamCard({ member }) {
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
            style={{
              fontSize: isPhone ? 16 : 22,
              color: "var(--gold)",
              marginBottom: 4,
            }}
          >
            {member.arabic}
          </p>
          <h3
            className="display"
            style={{
              fontSize: isPhone ? 18 : 26,
              marginBottom: 4,
              lineHeight: 1.1,
            }}
          >
            {member.name}
          </h3>
          <p
            className="mono"
            style={{
              opacity: 0.7,
              fontSize: isPhone ? 9 : 11,
              letterSpacing: "0.18em",
            }}
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
          style={{
            fontSize: 13.5,
            lineHeight: 1.5,
            opacity: 0.78,
            color: "var(--emerald)",
          }}
        >
          "{member.quote}"
        </p>
      )}
    </article>
  );
}

function Team() {
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
            <p
              className="eyebrow"
              style={{ color: "var(--emerald)", marginBottom: 14 }}
            >
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
              <span
                className="display-italic"
                style={{ color: "var(--emerald)" }}
              >
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
          {TEAM.map((m, i) => (
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
            style={{
              opacity: 0.85,
              fontSize: isPhone ? 10 : 11,
              letterSpacing: "0.22em",
            }}
          >
            THE FULL ATELIER · DUBAI · MARCH 2026
          </p>
        </div>
      </div>
    </section>
  );
}

export default function StoryPage() {
  const { isPhone } = useViewport();
  return (
    <main style={{ background: "var(--ivory)" }}>
      {/* Hero */}
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
          <p
            className="eyebrow"
            style={{ color: "var(--emerald)", marginBottom: isPhone ? 14 : 20 }}
          >
            EST. MMXIV · DUBAI
          </p>
          <p
            className="arabic"
            style={{
              fontSize: isPhone ? 26 : 36,
              color: "var(--emerald)",
              marginBottom: 14,
              opacity: 0.8,
            }}
          >
            تراثنا قصتنا
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
            Our legacy is
            <br />
            <span
              className="display-italic"
              style={{ color: "var(--emerald)" }}
            >
              our story.
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
            A short letter from three generations of tailors — on the cloth, the
            city and the men who taught us how to dress the modern Khaleeji.
          </p>
          {isPhone && (
            <p
              className="mono"
              style={{
                opacity: 0.5,
                fontSize: 10,
                letterSpacing: "0.3em",
                marginTop: 28,
              }}
            >
              ↓ SCROLL TO BEGIN
            </p>
          )}
        </div>
        {!isPhone && (
          <>
            <div
              style={{ position: "absolute", top: 200, left: 80, opacity: 0.4 }}
            >
              <CornerOrnament size={80} color="var(--emerald)" />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 80,
                right: 80,
                opacity: 0.4,
              }}
            >
              <CornerOrnament size={80} color="var(--emerald)" />
            </div>
          </>
        )}
      </section>

      <TextRibbon
        words={["Heritage", "Craftsmanship", "Devotion", "Khaleej", "Atelier"]}
        color="var(--gold)"
        bg="var(--ink)"
      />

      {/* Archival image */}
      <section
        style={{ position: "relative", height: isPhone ? "70vh" : "80vh" }}
      >
        <Img
          variant="dark"
          label="DUBAI · 1972 · TAILOR WORKSHOP · BLACK & WHITE ARCHIVAL"
          style={{ height: "100%" }}
        />
        {isPhone ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(10,9,8,0.2) 0%, transparent 30%, rgba(10,9,8,0.85) 100%)",
            }}
          />
        ) : null}
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
            style={{
              opacity: 0.75,
              fontSize: isPhone ? 10 : 11,
              letterSpacing: "0.22em",
              color: "var(--gold-light)",
            }}
          >
            BASTAKIYA QUARTER · 1972
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
            "Our grandfather, Khan, opened a single sewing room behind the gold
            souk. He stitched 14 hours a day."
          </div>
        </div>
      </section>

      {/* Founder story */}
      <section
        style={{
          padding: isPhone ? "80px 0" : "160px 0",
          background: "var(--paper)",
        }}
      >
        <div className="container" style={{ maxWidth: 980 }}>
          <div style={{ textAlign: "center", marginBottom: isPhone ? 44 : 80 }}>
            <p
              className="eyebrow"
              style={{ color: "var(--emerald)", marginBottom: 14 }}
            >
              A LETTER FROM THE ATELIER
            </p>
            <h2
              className="display"
              style={{
                fontSize: "clamp(30px, 8vw, 80px)",
                lineHeight: 1.05,
                fontWeight: 400,
              }}
            >
              <RevealText text="From a single sewing room to forty pairs of hands." />
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
            <p style={{ marginBottom: 22 }}>
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
              n 1972 my grandfather Khan opened a sewing room behind the Dubai
              gold souk with two needles, a kerosene lamp and the conviction
              that a man's garment ought to outlast him. He hand-stitched 14
              hours a day, six days a week, for the merchants of the old
              quarter.
            </p>
            <p style={{ marginBottom: 22 }}>
              He never advertised. Word travelled — first to neighbouring
              emirates, then to Riyadh, Doha and Kuwait City. By 1988 his
              appointment book required three months of waiting.
            </p>
            <p style={{ marginBottom: 22 }}>
              My father inherited the bench in 1995 and added the second floor.
              He insisted on English shears, Japanese cotton, and the unbroken
              rule that every garment leaves the atelier with the maker's name
              stitched on the inside placket.
            </p>
            <p style={{ marginBottom: 22 }}>
              I joined in 2014 — not to change anything, but to extend it.
              KhanSaab today dresses forty men a week and ships to forty-seven
              countries. The shears, the cotton and the placket remain the same.
            </p>
            <p style={{ marginBottom: 0 }}>
              We do not run advertisements. We do not chase seasons. We make
              heritage garments for men who know the difference.
            </p>
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
              S
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600 }}>Saif Khan</p>
              <p
                className="mono"
                style={{ opacity: 0.55, fontSize: 10, letterSpacing: "0.2em" }}
              >
                MASTER TAILOR · THIRD GENERATION
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Double full-bleed */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: isPhone ? "1fr" : "1fr 1fr",
          height: isPhone ? "auto" : "75vh",
        }}
      >
        <div
          style={{ position: "relative", height: isPhone ? "60vh" : "100%" }}
        >
          <Img
            label="HAND CUTTING · CHALK MARKS · POPLIN"
            style={{ height: "100%" }}
          />
          {isPhone && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, transparent 50%, rgba(245,239,227,0.85) 100%)",
              }}
            />
          )}
          <div
            style={{
              position: "absolute",
              bottom: isPhone ? 20 : 32,
              left: isPhone ? 20 : 32,
              color: "var(--ink)",
              maxWidth: 280,
            }}
          >
            <p
              className="mono"
              style={{
                opacity: 0.7,
                marginBottom: 6,
                fontSize: isPhone ? 10 : 11,
                letterSpacing: "0.22em",
              }}
            >
              CHAPTER I
            </p>
            <p
              className="display"
              style={{ fontSize: isPhone ? 32 : 28, lineHeight: 1.05 }}
            >
              The Cloth.
            </p>
          </div>
        </div>
        <div
          style={{ position: "relative", height: isPhone ? "60vh" : "100%" }}
        >
          <Img
            variant="dark"
            label="GOLD THREAD EMBROIDERY · COLLAR DETAIL · MACRO"
            style={{ height: "100%" }}
          />
          {isPhone && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, transparent 50%, rgba(10,9,8,0.85) 100%)",
              }}
            />
          )}
          <div
            style={{
              position: "absolute",
              bottom: isPhone ? 20 : 32,
              left: isPhone ? 20 : 32,
              color: "var(--ivory)",
              maxWidth: 280,
            }}
          >
            <p
              className="mono"
              style={{
                opacity: 0.85,
                marginBottom: 6,
                color: "var(--gold)",
                fontSize: isPhone ? 10 : 11,
                letterSpacing: "0.22em",
              }}
            >
              CHAPTER II
            </p>
            <p
              className="display"
              style={{ fontSize: isPhone ? 32 : 28, lineHeight: 1.05 }}
            >
              The Thread.
            </p>
          </div>
        </div>
      </section>

      <TextRibbon
        words={["Made by hand", "Made to last", "Made to be passed on"]}
        direction="right"
        color="var(--ink)"
        bg="var(--gold)"
      />

      <Timeline />
      <Team />
      <ContactStrip />
    </main>
  );
}
