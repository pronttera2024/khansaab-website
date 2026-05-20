import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useModals } from "../context/ModalsContext.jsx";
import { useViewport } from "../hooks/useViewport.js";
import Img from "../components/shared/Img.jsx";
import { Ornament } from "../components/shared/Ornament.jsx";
import { openWhatsApp } from "../utils/whatsapp.js";
import { HERO_SLIDES } from "../data/hero.js";
import { CATEGORIES } from "../data/categories.js";
import { REELS_DATA } from "../data/reels.js";
import { TESTIMONIALS, TRUST_METRICS } from "../data/testimonials.js";
import { BESPOKE_PROCESS_PANELS, BESPOKE_PROCESS_STEPS, BESPOKE_BENEFITS } from "../data/content.js";
import { WHATSAPP_MESSAGES } from "../data/site-config.js";
import { getBestsellers, getCollectionProducts, toCardFormat } from "../data/products.js";

function Hero() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = HERO_SLIDES.length;
  const navigate = useNavigate();
  const { openAtelier } = useModals();

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % n), 5500);
    return () => clearInterval(t);
  }, [paused, n]);

  const advance = (delta) => setIdx((i) => (i + delta + n) % n);

  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 720,
        background: "var(--ink)",
        color: "var(--ivory)",
        overflow: "hidden",
      }}
    >
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === idx ? 1 : 0,
            transition: "opacity 1.2s var(--ease-out)",
            pointerEvents: i === idx ? "auto" : "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              background: slide.bg,
              transform: i === idx ? "scale(1)" : "scale(1.06)",
              transition: "transform 6s var(--ease-out)",
            }}
          >
            {slide.image && (
              <img
                src={slide.image}
                alt={slide.label}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.7) saturate(0.95)",
                }}
              />
            )}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(10,9,8,0.25) 0%, rgba(10,9,8,0.55) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><g fill='none' stroke='%23C9A961' stroke-width='0.4' opacity='0.5'><path d='M40 0 L80 40 L40 80 L0 40 Z'/><circle cx='40' cy='40' r='3'/></g></svg>\")",
                backgroundSize: "80px",
                opacity: 0.12,
              }}
            />
            <div
              className="label"
              style={{
                position: "absolute",
                top: 24,
                left: 24,
                background: "rgba(10,9,8,0.55)",
                color: "rgba(245,239,227,0.6)",
                border: "1px solid rgba(201,169,97,0.25)",
                padding: "5px 10px",
                fontFamily: "var(--f-mono)",
                fontSize: 9,
                letterSpacing: "0.18em",
              }}
            >
              {slide.label}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(10,9,8,0.55) 0%, rgba(10,9,8,0.25) 35%, rgba(10,9,8,0.85) 100%)",
            }}
          />
        </div>
      ))}

      <div className="geo-overlay" style={{ opacity: 0.06 }} />

      <div
        style={{
          position: "absolute",
          left: 32,
          top: "50%",
          transform: "translateY(-50%) rotate(-90deg)",
          transformOrigin: "left center",
          display: "flex",
          gap: 28,
          alignItems: "center",
          opacity: 0.7,
          zIndex: 3,
        }}
      >
        <span className="eyebrow">SCROLL TO DISCOVER</span>
        <div style={{ width: 80, height: 1, background: "var(--gold)" }} />
      </div>

      <div
        style={{
          position: "absolute",
          right: 40,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "center",
          zIndex: 3,
        }}
      >
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            style={{
              width: i === idx ? 4 : 6,
              height: i === idx ? 28 : 6,
              borderRadius: i === idx ? 2 : 3,
              background: i === idx ? "var(--gold)" : "rgba(245,239,227,0.3)",
              transition: "all 0.5s var(--ease-out)",
              cursor: "pointer",
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          paddingBottom: 110,
          zIndex: 2,
        }}
      >
        <div
          className="container"
          style={{ textAlign: "center", width: "100%" }}
        >
          {HERO_SLIDES.map((slide, i) => (
            <div
              key={i}
              style={{
                position: i === idx ? "relative" : "absolute",
                left: 0,
                right: 0,
                opacity: i === idx ? 1 : 0,
                transform: i === idx ? "translateY(0)" : "translateY(20px)",
                transition: "all 1.2s var(--ease-out)",
                pointerEvents: i === idx ? "auto" : "none",
              }}
            >
              <p
                className="arabic"
                style={{
                  fontSize: "clamp(28px, 3vw, 44px)",
                  color: "var(--gold)",
                  marginBottom: 20,
                  letterSpacing: 0,
                  animation:
                    i === idx ? "fadeUp 1s var(--ease-out) 0.2s both" : "none",
                }}
              >
                {slide.arabic}
              </p>
              <p
                className="eyebrow"
                style={{
                  color: "var(--gold)",
                  letterSpacing: "0.45em",
                  marginBottom: 24,
                  animation:
                    i === idx ? "fadeUp 1s var(--ease-out) 0.3s both" : "none",
                }}
              >
                {slide.eyebrow}
              </p>
              <h1
                className="display"
                style={{
                  fontSize: "clamp(64px, 10vw, 160px)",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  lineHeight: 0.95,
                  marginBottom: 28,
                  animation:
                    i === idx
                      ? "fadeUp 1.1s var(--ease-out) 0.4s both"
                      : "none",
                }}
              >
                {slide.titleTop}{" "}
                <span
                  className="display-italic"
                  style={{ color: "var(--gold)" }}
                >
                  {slide.titleAccent}
                </span>
                <br />
                {slide.titleBot}{" "}
                <span className="display-italic">{slide.titleBotAccent}</span>
              </h1>
              <p
                style={{
                  maxWidth: 560,
                  margin: "0 auto 36px",
                  fontSize: 16,
                  lineHeight: 1.7,
                  opacity: 0.78,
                  animation:
                    i === idx
                      ? "fadeUp 1.1s var(--ease-out) 0.55s both"
                      : "none",
                }}
              >
                {slide.body}
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  justifyContent: "center",
                  flexWrap: "wrap",
                  animation:
                    i === idx
                      ? "fadeUp 1.1s var(--ease-out) 0.7s both"
                      : "none",
                }}
              >
                <button
                  className="btn btn-gold"
                  onClick={() => navigate("/products")}
                >
                  {slide.cta1}
                </button>
                <button className="btn btn-ghost" onClick={openAtelier}>
                  {slide.cta2}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
          fontSize: 11,
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          opacity: 0.85,
          zIndex: 3,
        }}
      >
        <span style={{ minWidth: 200 }}>
          {String(idx + 1).padStart(2, "0")} — {HERO_SLIDES[idx].chapter}
        </span>
        <span style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <button
            onClick={() => advance(-1)}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid rgba(245,239,227,0.3)",
              color: "var(--ivory)",
            }}
          >
            ←
          </button>
          <div
            style={{
              width: 220,
              height: 1,
              background: "rgba(245,239,227,0.2)",
              position: "relative",
            }}
          >
            <div
              key={`bar-${idx}-${paused}`}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                background: "var(--gold)",
                animation: paused
                  ? "none"
                  : "heroProgress 5.5s linear forwards",
              }}
            />
          </div>
          <span className="mono" style={{ opacity: 0.7 }}>
            {String(idx + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
          </span>
          <button
            onClick={() => advance(1)}
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "1px solid rgba(245,239,227,0.3)",
              color: "var(--ivory)",
            }}
          >
            →
          </button>
        </span>
        <span style={{ minWidth: 200, textAlign: "right" }}>
          {HERO_SLIDES[idx].season}
        </span>
      </div>
    </section>
  );
}

/* ---- Horizontal About ---- */
function HorizontalAbout() {
  const trackRef = useRef(null);
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const { isPhone } = useViewport();

  useEffect(() => {
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
  }, []);

  const panels = BESPOKE_PROCESS_PANELS;

  return (
    <div
      ref={wrapRef}
      data-horizontal-about
      style={{
        height: "400vh",
        position: "relative",
        background: "var(--ink)",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          color: "var(--ivory)",
        }}
      >
        <div
          data-horizontal-about-progress
          style={{
            position: "absolute",
            top: 96,
            left: 48,
            right: 48,
            display: "flex",
            alignItems: "center",
            gap: 16,
            zIndex: 5,
          }}
        >
          <span className="eyebrow" style={{ color: "var(--gold)" }}>
            THE BESPOKE PROCESS
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
          </div>
          <span className="mono" style={{ opacity: 0.6 }}>
            {String(
              Math.min(panels.length, Math.floor(progress * panels.length) + 1),
            ).padStart(2, "0")}{" "}
            / {String(panels.length).padStart(2, "0")}
          </span>
        </div>

        <div
          ref={trackRef}
          data-horizontal-about-track
          style={{
            display: "flex",
            height: "100%",
            transition: "transform 0.05s linear",
          }}
        >
          {panels.map((p, i) => (
            <div
              key={i}
              style={{
                width: "100vw",
                height: "100%",
                background: p.bg,
                display: "grid",
                gridTemplateColumns: "1.1fr 1fr",
                alignItems: "center",
                padding: "120px 80px 80px",
                gap: 80,
                flexShrink: 0,
                position: "relative",
              }}
            >
              <div className="geo-overlay" style={{ opacity: 0.07 }} />
              <div style={{ position: "relative", maxWidth: 620 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 24,
                    marginBottom: 32,
                  }}
                >
                  <span
                    className="mono"
                    style={{
                      fontSize: 14,
                      color: "var(--gold)",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  >
                    {p.d}
                  </span>
                </div>
                <h2
                  className="display"
                  style={{
                    fontSize: "clamp(56px, 7vw, 104px)",
                    lineHeight: 0.95,
                    marginBottom: 32,
                    fontWeight: 400,
                  }}
                >
                  {p.t}.
                </h2>
                <p
                  style={{
                    fontSize: 18,
                    lineHeight: 1.7,
                    opacity: 0.78,
                    marginBottom: 36,
                    maxWidth: 520,
                  }}
                >
                  {p.body}
                </p>
              </div>
              <div
                data-horizontal-about-image
                style={{ position: "relative", height: "70vh" }}
              >
                <Img
                  variant="dark"
                  label={p.t}
                  src={p.src}
                  style={{ height: "100%" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: -24,
                    right: -24,
                    width: 120,
                    height: 120,
                    border: "1px solid var(--gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--f-mono)",
                    fontSize: 11,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    background: p.bg,
                    textAlign: "center",
                    padding: 8,
                  }}
                >
                  {p.d}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          data-horizontal-about-hint
          style={{
            position: "absolute",
            bottom: 48,
            left: 48,
            fontSize: 11,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            opacity: 0.55,
          }}
        >
          {isPhone
            ? "↓  Keep scrolling →"
            : "↓  Continue scrolling — content moves horizontally"}
        </div>
      </div>
    </div>
  );
}

/* ---- Categories Bento ---- */
const BENTO_CATS = CATEGORIES;

function BentoCard({ cat, span }) {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const isDark = cat.color === "var(--ivory)";
  return (
    <article
      onClick={() => navigate("/products")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...span,
        background: cat.bg,
        color: cat.color,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: "transform 0.6s var(--ease-out)",
        transform: hover ? "scale(0.995)" : "scale(1)",
      }}
    >
      <div style={{ position: "absolute", inset: 0 }}>
        <Img
          variant={isDark ? "dark" : "default"}
          label={cat.img}
          src={cat.src}
          style={{ height: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isDark
              ? "linear-gradient(160deg, rgba(10,9,8,0.4) 0%, rgba(10,9,8,0.85) 100%)"
              : `linear-gradient(160deg, ${cat.bg}66 0%, ${cat.bg}DD 100%)`,
            transition: "all 0.6s",
          }}
        />
      </div>
      <div className="geo-overlay" style={{ opacity: isDark ? 0.1 : 0.06 }} />
      <div
        style={{
          position: "relative",
          height: "100%",
          padding: "clamp(20px, 4vw, 36px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <span
            className="arabic"
            style={{
              fontSize: "clamp(26px, 4.5vw, 36px)",
              color: isDark ? "var(--gold)" : "var(--emerald)",
              lineHeight: 1,
            }}
          >
            {cat.arabic}
          </span>
          <span className="mono" style={{ opacity: 0.6 }}>
            {String(cat.count).padStart(3, "0")} PIECES
          </span>
        </div>
        <div>
          <h3
            className="display"
            style={{
              fontSize: span.gridRow ? 56 : "clamp(28px, 5vw, 40px)",
              lineHeight: 0.95,
              marginBottom: 10,
              fontWeight: 400,
            }}
          >
            {cat.name}
          </h3>
          <p
            style={{
              fontSize: 13.5,
              opacity: 0.75,
              maxWidth: 320,
              lineHeight: 1.55,
            }}
          >
            {cat.desc}
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              fontWeight: 500,
              paddingBottom: 6,
              borderBottom: `1px solid ${isDark ? "var(--gold)" : "currentColor"}`,
              color: isDark ? "var(--gold)" : "inherit",
            }}
          >
            Explore {cat.name}
          </span>
          <span
            style={{
              transform: hover ? "translateX(6px)" : "translateX(0)",
              transition: "transform 0.4s var(--ease-out)",
              color: isDark ? "var(--gold)" : "inherit",
            }}
          >
            →
          </span>
        </div>
      </div>
    </article>
  );
}

function CategoriesBento() {
  const { isPhone } = useViewport();
  const mobileSpan = { gridColumn: "1 / -1", aspectRatio: "16 / 9" };
  return (
    <section
      style={{
        background: "var(--paper)",
        padding: "140px 0 160px",
        position: "relative",
      }}
    >
      <div className="container">
        <header style={{ textAlign: "center", marginBottom: 80 }}>
          <Ornament />
          <p
            className="eyebrow"
            style={{ color: "var(--emerald)", marginTop: 20, marginBottom: 18 }}
          >
            BROWSE THE HOUSE
          </p>
          <h2
            className="display"
            style={{
              fontSize: "clamp(56px, 7vw, 96px)",
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            Six garments.{" "}
            <span
              className="display-italic"
              style={{ color: "var(--emerald)" }}
            >
              One tradition.
            </span>
          </h2>
          <p
            style={{
              maxWidth: 540,
              margin: "0 auto",
              fontSize: 16,
              opacity: 0.65,
            }}
          >
            Every category is curated by our head tailor. No drop-shipping, no
            compromise — only what we'd wear ourselves.
          </p>
        </header>
        {isPhone ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
            {BENTO_CATS.map((cat, i) => (
              <BentoCard key={i} cat={cat} span={mobileSpan} />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gridAutoRows: "300px",
              gap: 16,
            }}
          >
            <BentoCard
              cat={BENTO_CATS[0]}
              span={{ gridColumn: "span 6", gridRow: "span 2" }}
            />
            <BentoCard cat={BENTO_CATS[1]} span={{ gridColumn: "span 6" }} />
            <BentoCard cat={BENTO_CATS[2]} span={{ gridColumn: "span 6" }} />
          </div>
        )}
      </div>
    </section>
  );
}

/* ---- Reels carousel ---- */

function Reels() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(true);
  const n = REELS_DATA.length;
  const { isPhone, width } = useViewport();
  const cardW = isPhone ? Math.min(260, Math.max(220, width - 80)) : 320;
  const cardGap = isPhone ? 14 : 24;
  const cardH = isPhone ? 460 : 560;
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (paused || isPhone) return;
    const t = setInterval(() => setActive((a) => (a + 1) % n), 4000);
    return () => clearInterval(t);
  }, [paused, n, isPhone]);

  useEffect(() => {
    if (!isPhone) return;
    const el = scrollerRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const center = el.scrollLeft + el.clientWidth / 2;
        const idx = Math.round((center - cardW / 2) / (cardW + cardGap));
        const clamped = Math.max(0, Math.min(n - 1, idx));
        setActive(clamped);
      });
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isPhone, cardW, cardGap, n]);

  const scrollTo = (i) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * (cardW + cardGap), behavior: "smooth" });
  };

  return (
    <section
      style={{
        background: "var(--ink)",
        color: "var(--ivory)",
        padding: "140px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="geo-overlay" style={{ opacity: 0.06 }} />
      <div className="container" style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 64,
          }}
        >
          <div>
            <p
              className="eyebrow"
              style={{ color: "var(--gold)", marginBottom: 16 }}
            >
              FROM THE ATELIER · @KHANSAAB
            </p>
            <h2
              className="display"
              style={{
                fontSize: "clamp(56px, 6.5vw, 96px)",
                lineHeight: 1,
                fontWeight: 400,
              }}
            >
              The reels.
            </h2>
            <p
              style={{
                marginTop: 14,
                opacity: 0.65,
                maxWidth: 480,
                fontSize: 15,
              }}
            >
              A weekly window into the studio. Tap a reel to watch — or follow
              along on Instagram.
            </p>
          </div>
          {!isPhone && (
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button
                onClick={() => setPaused((p) => !p)}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  border: "1px solid rgba(201,169,97,0.4)",
                  color: "var(--gold-light)",
                  fontSize: 12,
                }}
              >
                {paused ? "▶" : "❚❚"}
              </button>
              <div
                style={{
                  width: 1,
                  height: 24,
                  background: "rgba(201,169,97,0.25)",
                }}
              />
              <button
                onClick={() => setActive((a) => (a - 1 + n) % n)}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  border: "1px solid rgba(201,169,97,0.4)",
                  color: "var(--gold-light)",
                }}
              >
                ←
              </button>
              <button
                onClick={() => setActive((a) => (a + 1) % n)}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  border: "1px solid rgba(201,169,97,0.4)",
                  color: "var(--gold-light)",
                }}
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>

      {isPhone ? (
        <div
          ref={scrollerRef}
          data-reels-scroller
          style={{
            display: "flex",
            gap: cardGap,
            overflowX: "auto",
            overflowY: "hidden",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            padding: `0 calc((100% - ${cardW}px) / 2)`,
            height: cardH + 20,
            alignItems: "center",
          }}
        >
          {REELS_DATA.map((r, i) => {
            const isActive = i === active;
            return (
              <article
                key={i}
                onClick={() => scrollTo(i)}
                style={{
                  flex: `0 0 ${cardW}px`,
                  height: cardH,
                  scrollSnapAlign: "center",
                  position: "relative",
                  overflow: "hidden",
                  background: "var(--ink-soft)",
                  boxShadow: isActive ? "0 20px 50px rgba(0,0,0,0.5)" : "none",
                  borderRadius: 6,
                  transform: isActive ? "scale(1)" : "scale(0.94)",
                  transition: "transform 0.4s var(--ease-out), box-shadow 0.4s",
                  cursor: "pointer",
                }}
              >
                {isActive ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${r.ytId}?autoplay=1&mute=0&rel=0&modestbranding=1&playsinline=1`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                  />
                ) : (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${r.ytId}/hqdefault.jpg`}
                      alt={r.label}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, transparent 35%, rgba(10,9,8,0.9) 100%)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 14,
                        left: 14,
                        right: 14,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: 26,
                            height: 26,
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg, var(--gold), var(--gold-warm))",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--ink)",
                            fontSize: 11,
                            fontWeight: 600,
                            fontFamily: "var(--f-display)",
                          }}
                        >
                          K
                        </div>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 500,
                            color: "var(--ivory)",
                          }}
                        >
                          khansaab
                        </span>
                      </div>
                      <div
                        style={{
                          background: "rgba(10,9,8,0.6)",
                          padding: "4px 9px",
                          borderRadius: 4,
                          fontSize: 10,
                          fontFamily: "var(--f-mono)",
                          color: "var(--gold-light)",
                        }}
                      >
                        {r.duration}
                      </div>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 52,
                        height: 52,
                        borderRadius: "50%",
                        border: "1px solid var(--gold)",
                        background: "rgba(201,169,97,0.18)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--gold)",
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5 L20 12 L8 19 Z" />
                      </svg>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: 16,
                        left: 16,
                        right: 16,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          marginBottom: 4,
                          lineHeight: 1.25,
                          color: "var(--ivory)",
                        }}
                      >
                        {r.label}
                      </p>
                      <p
                        style={{
                          fontSize: 11,
                          opacity: 0.75,
                          marginBottom: 6,
                          color: "var(--ivory)",
                        }}
                      >
                        {r.caption}
                      </p>
                      <p
                        className="mono"
                        style={{
                          opacity: 0.55,
                          fontSize: 10,
                          color: "var(--ivory)",
                        }}
                      >
                        {r.views} views · ♡ {r.likes}
                      </p>
                    </div>
                  </>
                )}
              </article>
            );
          })}
        </div>
      ) : (
        <div
          data-reels-viewport
          style={{
            position: "relative",
            height: 640,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {REELS_DATA.map((r, i) => {
            let off = i - active;
            if (off > n / 2) off -= n;
            if (off < -n / 2) off += n;
            const isActive = off === 0;
            const absOff = Math.abs(off);
            const visible = absOff <= 2;
            const x = off * (cardW + cardGap);
            const scale = isActive ? 1 : absOff === 1 ? 0.82 : 0.65;
            const opacity = !visible
              ? 0
              : isActive
                ? 1
                : absOff === 1
                  ? 0.7
                  : 0.3;
            return (
              <article
                key={i}
                onClick={() => setActive(i)}
                style={{
                  position: "absolute",
                  width: cardW,
                  height: 560,
                  transform: `translateX(${x}px) scale(${scale})`,
                  opacity,
                  filter: `blur(${isActive ? 0 : absOff}px)`,
                  transition: "all 0.7s var(--ease-out)",
                  cursor: "pointer",
                  zIndex: isActive ? 5 : 5 - absOff,
                  overflow: "hidden",
                  background: "var(--ink-soft)",
                  boxShadow: isActive ? "0 30px 80px rgba(0,0,0,0.5)" : "none",
                  borderRadius: 6,
                }}
              >
                {isActive ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${r.ytId}?autoplay=1&mute=0&rel=0&modestbranding=1&playsinline=1`}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      border: "none",
                    }}
                  />
                ) : (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${r.ytId}/hqdefault.jpg`}
                      alt={r.label}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(180deg, transparent 35%, rgba(10,9,8,0.9) 100%)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 14,
                        left: 14,
                        right: 14,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: 8,
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background:
                              "linear-gradient(135deg, var(--gold), var(--gold-warm))",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "var(--ink)",
                            fontSize: 11,
                            fontWeight: 600,
                            fontFamily: "var(--f-display)",
                          }}
                        >
                          K
                        </div>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 500,
                            color: "var(--ivory)",
                          }}
                        >
                          khansaab
                        </span>
                      </div>
                      <div
                        style={{
                          background: "rgba(10,9,8,0.6)",
                          backdropFilter: "blur(8px)",
                          padding: "4px 9px",
                          borderRadius: 4,
                          fontSize: 10,
                          fontFamily: "var(--f-mono)",
                          color: "var(--gold-light)",
                        }}
                      >
                        {r.duration}
                      </div>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        border: "1px solid var(--gold)",
                        background: "rgba(201,169,97,0.18)",
                        backdropFilter: "blur(10px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--gold)",
                      }}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5 L20 12 L8 19 Z" />
                      </svg>
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        bottom: 18,
                        left: 18,
                        right: 18,
                      }}
                    >
                      <p
                        style={{
                          fontSize: 15,
                          fontWeight: 500,
                          marginBottom: 4,
                          lineHeight: 1.25,
                          color: "var(--ivory)",
                        }}
                      >
                        {r.label}
                      </p>
                      <p
                        style={{
                          fontSize: 12,
                          opacity: 0.75,
                          marginBottom: 8,
                          color: "var(--ivory)",
                        }}
                      >
                        {r.caption}
                      </p>
                      <p
                        className="mono"
                        style={{
                          opacity: 0.55,
                          fontSize: 10,
                          color: "var(--ivory)",
                        }}
                      >
                        {r.views} views
                      </p>
                    </div>
                  </>
                )}
              </article>
            );
          })}
        </div>
      )}

      <div
        className="container"
        style={{
          marginTop: 32,
          display: "flex",
          justifyContent: "center",
          gap: 8,
        }}
      >
        {REELS_DATA.map((_, i) => (
          <button
            key={i}
            onClick={() => (isPhone ? scrollTo(i) : setActive(i))}
            style={{
              width: i === active ? 36 : 8,
              height: 4,
              borderRadius: 2,
              background:
                i === active ? "var(--gold)" : "rgba(245,239,227,0.2)",
              transition: "all 0.4s",
            }}
          />
        ))}
      </div>
    </section>
  );
}

/* ---- Best Sellers ---- */
const BESTSELLERS = getBestsellers().map(toCardFormat);

function BestSellers() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);
  return (
    <section
      style={{
        background: "var(--paper)",
        padding: "160px 0",
        position: "relative",
      }}
    >
      <div className="container">
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 80,
          }}
        >
          <div>
            <p
              className="eyebrow"
              style={{ color: "var(--emerald)", marginBottom: 18 }}
            >
              ★★★★★ · OUR MOST LOVED
            </p>
            <h2
              className="display"
              style={{
                fontSize: "clamp(56px, 7vw, 104px)",
                lineHeight: 1,
                fontWeight: 400,
              }}
            >
              Best sellers.
            </h2>
          </div>
          <button
            className="btn btn-ghost-dark"
            onClick={() => navigate("/products")}
          >
            View All Products →
          </button>
        </header>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
        >
          {BESTSELLERS.map((p, i) => {
            const isHov = hovered === i;
            return (
              <article
                key={i}
                onClick={() => navigate(`/product/${p.id}`)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "pointer", position: "relative" }}
              >
                <div
                  style={{
                    position: "relative",
                    overflow: "hidden",
                    marginBottom: 24,
                    aspectRatio: "3/4",
                  }}
                >
                  <Img
                    label={`${p.name.toUpperCase()} · FRONT`}
                    src={p.src}
                    style={{
                      height: "100%",
                      transition: "transform 0.6s var(--ease-out)",
                      transform: isHov ? "scale(1.04)" : "scale(1)",
                    }}
                  />
                  <Img
                    label={`${p.name.toUpperCase()} · DETAIL`}
                    src={p.src2}
                    style={{
                      position: "absolute",
                      inset: 0,
                      height: "100%",
                      opacity: isHov ? 1 : 0,
                      transition: "opacity 0.5s var(--ease-out)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      background:
                        p.tag === "BEST SELLER"
                          ? "var(--ink)"
                          : p.tag === "NEW"
                            ? "var(--emerald)"
                            : p.tag === "MADE TO ORDER"
                              ? "var(--gold)"
                              : "var(--ivory)",
                      color:
                        p.tag === "MADE TO ORDER"
                          ? "var(--ink)"
                          : p.tag === "EDITORS' PICK"
                            ? "var(--ink)"
                            : "var(--ivory)",
                      padding: "6px 12px",
                      fontSize: 9,
                      letterSpacing: "0.2em",
                      fontWeight: 600,
                    }}
                  >
                    {p.tag}
                  </div>
                  <button
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: "rgba(245,239,227,0.92)",
                      backdropFilter: "blur(8px)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.3"
                    >
                      <path d="M8 14 C8 14 1 9.5 1 5 C1 3 2.5 1.5 4.5 1.5 C6 1.5 7.2 2.5 8 3.8 C8.8 2.5 10 1.5 11.5 1.5 C13.5 1.5 15 3 15 5 C15 9.5 8 14 8 14 Z" />
                    </svg>
                  </button>
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "var(--ink)",
                      color: "var(--ivory)",
                      padding: "14px 16px",
                      fontSize: 11,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      textAlign: "center",
                      fontWeight: 500,
                      transform: isHov ? "translateY(0)" : "translateY(100%)",
                      transition: "transform 0.5s var(--ease-out)",
                    }}
                  >
                    + Quick Add
                  </div>
                </div>
                <div data-product-meta>
                  <div
                    data-product-cat
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <span
                      className="mono"
                      style={{ opacity: 0.55, fontSize: 10 }}
                    >
                      {p.cat}
                    </span>
                    <span
                      className="arabic"
                      style={{
                        fontSize: 18,
                        color: "var(--emerald)",
                        opacity: 0.8,
                        flexShrink: 0,
                      }}
                    >
                      {p.arabic}
                    </span>
                  </div>
                  <h3
                    className="display"
                    style={{
                      fontSize: 22,
                      lineHeight: 1.15,
                      marginBottom: 14,
                      fontWeight: 500,
                    }}
                  >
                    {p.name}
                  </h3>
                  <div
                    data-product-price-row
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 10,
                        alignItems: "baseline",
                      }}
                    >
                      <span style={{ fontSize: 18, fontWeight: 600 }}>
                        ₹{p.price.toLocaleString()}
                      </span>
                      {p.old && (
                        <span
                          style={{
                            fontSize: 13,
                            textDecoration: "line-through",
                            opacity: 0.45,
                          }}
                        >
                          ₹{p.old}
                        </span>
                      )}
                    </div>
                    <div
                      data-product-sizes
                      style={{ display: "flex", gap: 6, flexWrap: "wrap" }}
                    >
                      {p.sizes.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="mono"
                          style={{
                            padding: "3px 7px",
                            border: "1px solid rgba(10,9,8,0.18)",
                            fontSize: 10,
                          }}
                        >
                          {s}
                        </span>
                      ))}
                      <span
                        className="mono"
                        style={{ opacity: 0.5, fontSize: 10 }}
                      >
                        +{p.sizes.length - 3}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---- Collections ---- */
const COLLECTIONS_PRODUCTS = getCollectionProducts().map(toCardFormat);

function CollectionProductCard({ p }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <article
      onClick={() => navigate(`/product/${p.id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer", position: "relative" }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          aspectRatio: "3/4",
          marginBottom: 20,
        }}
      >
        <img
          src={p.src}
          alt={p.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.6s var(--ease-out)",
          }}
        />
        <img
          src={p.src2}
          alt={p.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.5s var(--ease-out)",
          }}
        />
        {p.tag && (
          <div
            style={{
              position: "absolute",
              top: 14,
              left: 14,
              background:
                p.tag === "BEST SELLER"
                  ? "var(--ink)"
                  : p.tag === "NEW"
                    ? "var(--emerald)"
                    : p.tag === "MADE TO ORDER"
                      ? "var(--gold)"
                      : "var(--ivory)",
              color:
                p.tag === "MADE TO ORDER"
                  ? "var(--ink)"
                  : p.tag === "EDITORS' PICK"
                    ? "var(--ink)"
                    : "var(--ivory)",
              padding: "6px 12px",
              fontSize: 9,
              letterSpacing: "0.2em",
              fontWeight: 600,
            }}
          >
            {p.tag}
          </div>
        )}
        <button
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "rgba(245,239,227,0.92)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          >
            <path d="M8 14 C8 14 1 9.5 1 5 C1 3 2.5 1.5 4.5 1.5 C6 1.5 7.2 2.5 8 3.8 C8.8 2.5 10 1.5 11.5 1.5 C13.5 1.5 15 3 15 5 C15 9.5 8 14 8 14 Z" />
          </svg>
        </button>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 8,
          }}
        >
          <span className="mono" style={{ opacity: 0.55, fontSize: 10 }}>
            {p.cat}
          </span>
          <span
            className="arabic"
            style={{ fontSize: 18, color: "var(--emerald)", opacity: 0.8 }}
          >
            {p.arabic}
          </span>
        </div>
        <h3
          className="display"
          style={{
            fontSize: 22,
            lineHeight: 1.15,
            marginBottom: 14,
            fontWeight: 500,
          }}
        >
          {p.name}
        </h3>
        <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
          <span style={{ fontSize: 18, fontWeight: 600 }}>
            ₹{p.price.toLocaleString()}
          </span>
          {p.old && (
            <span
              style={{
                fontSize: 13,
                textDecoration: "line-through",
                opacity: 0.45,
              }}
            >
              ₹{p.old}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function Collections() {
  const navigate = useNavigate();
  return (
    <section
      style={{
        background: "var(--paper)",
        padding: "160px 0",
        position: "relative",
      }}
    >
      <div className="container">
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 80,
          }}
        >
          <div>
            <p
              className="eyebrow"
              style={{ color: "var(--emerald)", marginBottom: 18 }}
            >
              THE ETERNAL EMIRATES COLLECTION · VOL. VII
            </p>
            <h2
              className="display"
              style={{
                fontSize: "clamp(56px, 7vw, 104px)",
                lineHeight: 1,
                fontWeight: 400,
              }}
            >
              Collections.
            </h2>
          </div>
          <button
            className="btn btn-ghost-dark"
            onClick={() => navigate("/products")}
          >
            View All →
          </button>
        </header>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {COLLECTIONS_PRODUCTS.map((p, i) => (
            <CollectionProductCard key={i} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Testimonials ---- */

function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = TESTIMONIALS.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 6000);
    return () => clearInterval(t);
  }, [paused, n]);

  const current = TESTIMONIALS[i];
  return (
    <section
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        background: "var(--paper)",
        padding: "160px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        className="arabic"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: 480,
          color: "var(--emerald)",
          opacity: 0.04,
          lineHeight: 1,
          fontWeight: 400,
          pointerEvents: "none",
        }}
      >
        ✦
      </div>
      <div
        className="container"
        style={{
          position: "relative",
          textAlign: "center",
          maxWidth: 980,
          margin: "0 auto",
        }}
      >
        <p
          className="eyebrow"
          style={{ color: "var(--emerald)", marginBottom: 18 }}
        >
          TESTIMONIALS · ★★★★★
        </p>
        <h2
          className="display"
          style={{
            fontSize: "clamp(48px, 5vw, 72px)",
            lineHeight: 1.05,
            marginBottom: 56,
            fontWeight: 400,
          }}
        >
          From those who{" "}
          <span className="display-italic" style={{ color: "var(--emerald)" }}>
            wear it.
          </span>
        </h2>
        <div style={{ position: "relative", minHeight: 220 }}>
          <div
            className="display-italic"
            style={{
              fontSize: 160,
              color: "var(--gold)",
              opacity: 0.4,
              position: "absolute",
              top: -60,
              left: "50%",
              transform: "translateX(-50%)",
              lineHeight: 1,
            }}
          >
            "
          </div>
          <blockquote
            key={i}
            className="display"
            style={{
              fontSize: "clamp(26px, 2.6vw, 38px)",
              lineHeight: 1.35,
              fontWeight: 400,
              color: "var(--ink)",
              fontStyle: "italic",
              maxWidth: 880,
              margin: "0 auto",
              animation: "fadeUp 0.7s var(--ease-out) both",
              position: "relative",
            }}
          >
            {current.quote}
          </blockquote>
        </div>
        <Ornament />
        <div style={{ marginTop: 24 }}>
          <p className="display" style={{ fontSize: 22, marginBottom: 6 }}>
            {current.name}
          </p>
          <p className="mono" style={{ opacity: 0.55 }}>
            {current.role}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 24,
            marginTop: 56,
          }}
        >
          <button
            onClick={() => setI((x) => (x - 1 + n) % n)}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "1px solid rgba(10,9,8,0.2)",
              color: "var(--ink)",
              fontSize: 14,
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--emerald)";
              e.currentTarget.style.color = "var(--ivory)";
              e.currentTarget.style.borderColor = "var(--emerald)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--ink)";
              e.currentTarget.style.borderColor = "rgba(10,9,8,0.2)";
            }}
          >
            ←
          </button>
          <div style={{ display: "flex", gap: 8 }}>
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setI(idx)}
                style={{
                  width: idx === i ? 36 : 8,
                  height: 4,
                  background:
                    idx === i ? "var(--emerald)" : "rgba(10,9,8,0.15)",
                  transition: "all 0.4s",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {idx === i && !paused && (
                  <span
                    key={`p-${i}-${paused}`}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      background: "var(--gold)",
                      animation: "heroProgress 6s linear forwards",
                    }}
                  />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => setI((x) => (x + 1) % n)}
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              border: "1px solid rgba(10,9,8,0.2)",
              color: "var(--ink)",
              fontSize: 14,
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--emerald)";
              e.currentTarget.style.color = "var(--ivory)";
              e.currentTarget.style.borderColor = "var(--emerald)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--ink)";
              e.currentTarget.style.borderColor = "rgba(10,9,8,0.2)";
            }}
          >
            →
          </button>
        </div>
        <div
          style={{
            marginTop: 80,
            padding: "32px 40px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
            borderTop: "1px solid rgba(10,9,8,0.1)",
            borderBottom: "1px solid rgba(10,9,8,0.1)",
          }}
        >
          {TRUST_METRICS.map((s, k) => (
            <div key={k} style={{ textAlign: "center" }}>
              <div
                className="display"
                style={{
                  fontSize: 40,
                  color: "var(--emerald)",
                  marginBottom: 4,
                }}
              >
                {s.v}
              </div>
              <div className="mono" style={{ opacity: 0.55 }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---- Customize CTA ---- */
function CustomizeCTA() {
  const { openAtelier } = useModals();
  return (
    <section
      style={{
        background: "var(--ink)",
        color: "var(--ivory)",
        padding: "140px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
        <Img
          variant="dark"
          label="MASTER TAILOR · CHALK MARKING · STUDIO"
          style={{ height: "100%" }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, var(--ink) 0%, rgba(10,9,8,0.5) 100%)",
        }}
      />
      <div className="geo-overlay" style={{ opacity: 0.06 }} />
      <div
        className="container"
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 80,
          alignItems: "center",
        }}
      >
        <div>
          <p
            className="eyebrow"
            style={{ color: "var(--gold)", marginBottom: 20 }}
          >
            BESPOKE · MADE TO MEASURE
          </p>
          <h2
            className="display"
            style={{
              fontSize: "clamp(64px, 7vw, 112px)",
              lineHeight: 0.95,
              marginBottom: 32,
              fontWeight: 400,
            }}
          >
            Don't see{" "}
            <span className="display-italic" style={{ color: "var(--gold)" }}>
              your garment?
            </span>
            <br />
            We'll build it.
          </h2>
          <p
            style={{
              fontSize: 18,
              opacity: 0.78,
              maxWidth: 520,
              lineHeight: 1.7,
              marginBottom: 40,
            }}
          >
            Any fabric. Any silhouette. Any embroidery you can describe — or any
            heirloom you can show us. Our master tailor will sketch, fit and
            finish it over four weeks.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="btn btn-gold" onClick={openAtelier}>
              Start a Bespoke Order
            </button>
            <button
              className="btn btn-ghost"
              onClick={() =>
                openWhatsApp(
                  WHATSAPP_MESSAGES.bespokeOrder,
                )
              }
            >
              Connect on WhatsApp
            </button>
          </div>
          <div
            style={{
              marginTop: 48,
              display: "flex",
              gap: 40,
              flexWrap: "wrap",
            }}
          >
            {BESPOKE_BENEFITS.map((t) => (
              <span
                key={t}
                className="mono"
                style={{ color: "var(--gold-light)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="glass-dark" style={{ padding: 40, borderRadius: 4 }}>
          <p
            className="eyebrow"
            style={{ color: "var(--gold)", marginBottom: 28 }}
          >
            THE BESPOKE PROCESS
          </p>
          <ol
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
            {BESPOKE_PROCESS_STEPS.map((s) => (
              <li
                key={s.n}
                style={{ display: "flex", gap: 20, alignItems: "flex-start" }}
              >
                <span
                  className="display-italic"
                  style={{
                    fontSize: 32,
                    color: "var(--gold)",
                    lineHeight: 1,
                    minWidth: 40,
                  }}
                >
                  {s.n}
                </span>
                <div>
                  <p
                    className="display"
                    style={{ fontSize: 20, marginBottom: 4 }}
                  >
                    {s.t}
                  </p>
                  <p style={{ fontSize: 13, opacity: 0.65, lineHeight: 1.6 }}>
                    {s.d}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---- B2B / Wholesale ---- */
function B2BSection() {
  const navigate = useNavigate();
  return (
    <section
      style={{
        background: "var(--emerald)",
        color: "var(--ivory)",
        padding: "120px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="geo-overlay" style={{ opacity: 0.06 }} />
      <div className="container" style={{ position: "relative" }}>
        <header style={{ textAlign: "center", marginBottom: 72 }}>
          <p
            className="eyebrow"
            style={{ color: "var(--gold)", marginBottom: 18 }}
          >
            WHOLESALE & DISTRIBUTION
          </p>
          <h2
            className="display"
            style={{
              fontSize: "clamp(48px, 6vw, 96px)",
              lineHeight: 1,
              fontWeight: 400,
              marginBottom: 20,
            }}
          >
            Partner with{" "}
            <span className="display-italic" style={{ color: "var(--gold)" }}>
              KhanSaab.
            </span>
          </h2>
          <p
            style={{
              fontSize: 17,
              opacity: 0.8,
              maxWidth: 600,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Stock premium thobes, kanduras and jubbas in your retail store.
            Low minimums, strong margins, and a brand your customers already trust.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
            marginBottom: 72,
          }}
        >
          {[
            {
              icon: "✦",
              t: "Low MOQ",
              d: "Start with as few as 25 pieces per style. No warehouse needed to get started.",
            },
            {
              icon: "✦",
              t: "Retailer Margins",
              d: "30%+ margins on MRP with volume-based tiered pricing. The more you order, the better it gets.",
            },
            {
              icon: "✦",
              t: "Dedicated Support",
              d: "Assigned account manager, priority dispatch, and marketing assets for your store.",
            },
          ].map((card) => (
            <div
              key={card.t}
              style={{
                background: "rgba(245,239,227,0.08)",
                border: "1px solid rgba(201,169,97,0.2)",
                padding: "36px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <span style={{ fontSize: 20, color: "var(--gold)" }}>{card.icon}</span>
              <h3
                className="display"
                style={{ fontSize: 24, fontWeight: 400 }}
              >
                {card.t}
              </h3>
              <p style={{ fontSize: 14, opacity: 0.75, lineHeight: 1.65 }}>
                {card.d}
              </p>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
            padding: "36px 0",
            borderTop: "1px solid rgba(201,169,97,0.2)",
            borderBottom: "1px solid rgba(201,169,97,0.2)",
            marginBottom: 64,
          }}
        >
          {[
            { v: "200+", l: "Retail partners" },
            { v: "12", l: "States covered" },
            { v: "48hr", l: "Dispatch time" },
            { v: "30%+", l: "Retailer margins" },
          ].map((s, k) => (
            <div key={k} style={{ textAlign: "center" }}>
              <div
                className="display"
                style={{
                  fontSize: 40,
                  color: "var(--gold)",
                  marginBottom: 4,
                }}
              >
                {s.v}
              </div>
              <div className="mono" style={{ opacity: 0.65, fontSize: 11 }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <button
            className="btn btn-gold"
            onClick={() =>
              openWhatsApp(
                "Hello KhanSaab — I'm interested in bulk/wholesale pricing for my store.",
              )
            }
          >
            Enquire for Bulk Pricing
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => navigate("/wholesale")}
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---- Page export ---- */
export default function HomePage() {
  return (
    <>
      <Hero />
      <HorizontalAbout />
      <CategoriesBento />
      <Reels />
      <BestSellers />
      <Collections />
      <Testimonials />
      <B2BSection />
      <CustomizeCTA />
    </>
  );
}
