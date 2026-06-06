import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useModals } from "../context/ModalsContext.jsx";
import { useViewport } from "../hooks/useViewport.js";
import Img from "../components/shared/Img.jsx";
import { openWhatsApp } from "../utils/whatsapp.js";
import { ALL_PRODUCTS, toCardFormat } from "../data/products.js";
import { FILTER_OPTIONS, SORT_OPTIONS } from "../data/categories.js";
import { SEARCH_PLACEHOLDERS } from "../data/content.js";
import { WHATSAPP_MESSAGES } from "../data/site-config.js";

const PRODUCTS_LIST = ALL_PRODUCTS.map(toCardFormat);

function FilterGroup({ title, options, value, onChange }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p
        style={{
          fontSize: 11,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          fontWeight: 600,
          marginBottom: 14,
        }}
      >
        {title}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map(([v, label]) => {
          const active = v === value;
          return (
            <button
              key={v}
              onClick={() => onChange(v)}
              style={{
                textAlign: "left",
                fontSize: 14,
                padding: "8px 0",
                color: active ? "var(--emerald)" : "rgba(10,9,8,0.7)",
                fontWeight: active ? 600 : 400,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  border: `1px solid ${active ? "var(--emerald)" : "rgba(10,9,8,0.25)"}`,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {active && (
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "var(--emerald)",
                    }}
                  />
                )}
              </span>
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ProductCard({ p, view, compact }) {
  const [hov, setHov] = useState(false);
  const navigate = useNavigate();

  if (compact) {
    const rating = 4.6 + (p.price % 4) / 10;
    const reviews = 40 + (p.price % 280);
    const discount = p.old ? Math.round(((p.old - p.price) / p.old) * 100) : 0;
    return (
      <article
        onClick={() => navigate(`/product/${p.id}`)}
        style={{
          cursor: "pointer",
          position: "relative",
          background: "var(--paper)",
          borderRadius: 10,
          overflow: "hidden",
          border: "1px solid rgba(10,9,8,0.06)",
        }}
      >
        <div
          style={{
            position: "relative",
            aspectRatio: "4/5",
            background: "var(--bone)",
          }}
        >
          <Img
            src={p.src}
            label={p.name.toUpperCase()}
            style={{ height: "100%" }}
          />
          {p.tag && (
            <div
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                background: "var(--ink)",
                color: "var(--ivory)",
                padding: "3px 7px",
                fontSize: 8,
                letterSpacing: "0.16em",
                fontWeight: 700,
                borderRadius: 3,
              }}
            >
              {p.tag}
            </div>
          )}
          {discount > 0 && (
            <div
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                background: "var(--gold)",
                color: "var(--ink)",
                padding: "3px 7px",
                fontSize: 10,
                fontWeight: 700,
                borderRadius: 3,
              }}
            >
              -{discount}%
            </div>
          )}
        </div>
        <div style={{ padding: "10px 10px 12px" }}>
          <h3
            style={{
              fontFamily: "var(--f-body)",
              fontSize: 13,
              fontWeight: 500,
              lineHeight: 1.3,
              color: "var(--ink)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: 34,
              marginBottom: 6,
            }}
          >
            {p.name}
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              marginBottom: 6,
            }}
          >
            <span
              style={{
                color: "var(--gold)",
                fontSize: 11,
                letterSpacing: "0.04em",
              }}
            >
              ★★★★★
            </span>
            <span className="mono" style={{ fontSize: 10, opacity: 0.55 }}>
              ({reviews})
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}
            >
              ₹{p.price.toLocaleString()}
            </span>
            {p.old && (
              <span
                style={{
                  fontSize: 11,
                  textDecoration: "line-through",
                  opacity: 0.45,
                }}
              >
                ₹{p.old}
              </span>
            )}
          </div>
          <p
            style={{
              fontSize: 10,
              color: "var(--emerald)",
              marginTop: 6,
              fontWeight: 600,
            }}
          >
            ✦ Free express delivery
          </p>
        </div>
      </article>
    );
  }

  if (view === "list") {
    return (
      <article
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onClick={() => navigate(`/product/${p.id}`)}
        style={{
          display: "grid",
          gridTemplateColumns: "240px 1fr auto",
          gap: 32,
          padding: 20,
          border: "1px solid rgba(10,9,8,0.08)",
          background: "var(--paper)",
          cursor: "pointer",
          transition: "all 0.4s",
        }}
      >
        <Img
          src={p.src}
          label={p.name.toUpperCase()}
          style={{ aspectRatio: "3/4" }}
        />
        <div style={{ paddingTop: 12 }}>
          {p.tag && (
            <span
              style={{
                fontSize: 9,
                letterSpacing: "0.2em",
                fontWeight: 600,
                color: "var(--emerald)",
                marginBottom: 8,
                display: "inline-block",
              }}
            >
              {p.tag}
            </span>
          )}
          <h3 className="display" style={{ fontSize: 28, marginBottom: 8 }}>
            {p.name}
          </h3>
          <p
            className="arabic"
            style={{
              fontSize: 22,
              color: "var(--emerald)",
              opacity: 0.7,
              marginBottom: 12,
            }}
          >
            {p.arabic}
          </p>
          <p className="mono" style={{ opacity: 0.55 }}>
            {p.cat.toUpperCase()}
          </p>
        </div>
        <div
          style={{
            textAlign: "right",
            paddingTop: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 14,
          }}
        >
          <div style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
            <span style={{ fontSize: 24, fontWeight: 600 }}>
              ₹{p.price.toLocaleString()}
            </span>
            {p.old && (
              <span
                style={{
                  fontSize: 14,
                  textDecoration: "line-through",
                  opacity: 0.4,
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

  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => !p.outOfStock && navigate(`/product/${p.id}`)}
      style={{
        cursor: p.outOfStock ? "default" : "pointer",
        position: "relative",
        opacity: p.outOfStock ? 0.6 : 1,
      }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          aspectRatio: "3/4",
          marginBottom: compact ? 10 : 20,
        }}
      >
        <Img
          src={p.src}
          label={p.name.toUpperCase()}
          style={{
            height: "100%",
            transform: hov && !p.outOfStock ? "scale(1.04)" : "scale(1)",
            transition: "transform 0.6s var(--ease-out)",
            filter: p.outOfStock ? "grayscale(0.5)" : "none",
          }}
        />
        {!compact && (
          <Img
            src={p.src2}
            label={`${p.name.toUpperCase()} · DETAIL`}
            style={{
              position: "absolute",
              inset: 0,
              height: "100%",
              opacity: hov && !p.outOfStock ? 1 : 0,
              transition: "opacity 0.5s",
            }}
          />
        )}
        {p.tag && (
          <div
            style={{
              position: "absolute",
              top: compact ? 8 : 14,
              left: compact ? 8 : 14,
              background: p.outOfStock ? "rgba(10,9,8,0.7)" : "var(--ink)",
              color: p.outOfStock ? "var(--ivory)" : "var(--ivory)",
              padding: compact ? "3px 7px" : "5px 10px",
              fontSize: compact ? 8 : 9,
              letterSpacing: "0.18em",
              fontWeight: 600,
            }}
          >
            {p.tag}
          </div>
        )}
        {p.outOfStock && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                background: "rgba(10,9,8,0.75)",
                color: "var(--ivory)",
                padding: "10px 20px",
                fontSize: 11,
                letterSpacing: "0.25em",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              Sold Out
            </span>
          </div>
        )}
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 4,
            gap: 6,
          }}
        >
          <span
            className="mono"
            style={{ opacity: 0.55, fontSize: compact ? 9 : 10 }}
          >
            {p.cat.toUpperCase()}
          </span>
          <span
            className="arabic"
            style={{
              fontSize: compact ? 13 : 16,
              color: "var(--emerald)",
              opacity: 0.7,
            }}
          >
            {p.arabic}
          </span>
        </div>
        <h3
          className="display"
          style={{
            fontSize: compact ? 16 : 22,
            lineHeight: 1.15,
            marginBottom: 6,
            fontWeight: 500,
          }}
        >
          {p.name}
        </h3>
        <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
          <span style={{ fontSize: compact ? 14 : 17, fontWeight: 600 }}>
            ₹{p.price.toLocaleString()}
          </span>
          {p.old && (
            <span
              style={{
                fontSize: compact ? 11 : 13,
                textDecoration: "line-through",
                opacity: 0.4,
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

function BottomSheet({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 150,
          background: "rgba(10,9,8,0.55)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 151,
          background: "var(--ivory)",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          maxHeight: "88vh",
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.4s var(--ease-out)",
          boxShadow: "0 -20px 60px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "12px 0 4px",
          }}
        >
          <div
            style={{
              width: 44,
              height: 4,
              borderRadius: 2,
              background: "rgba(10,9,8,0.2)",
            }}
          />
        </div>
        <div
          style={{
            padding: "8px 20px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(10,9,8,0.08)",
          }}
        >
          <h3 className="display" style={{ fontSize: 22, fontWeight: 500 }}>
            {title}
          </h3>
          <button
            onClick={onClose}
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            Close
          </button>
        </div>
        <div style={{ overflowY: "auto", padding: "12px 20px", flex: 1 }}>
          {children}
        </div>
        {footer && (
          <div
            style={{ padding: 16, borderTop: "1px solid rgba(10,9,8,0.08)" }}
          >
            {footer}
          </div>
        )}
      </div>
    </>
  );
}

function FilterSheet({ open, onClose, count, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 150,
          background: "rgba(10,9,8,0.55)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 151,
          background: "var(--ivory)",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          maxHeight: "88vh",
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.4s var(--ease-out)",
          boxShadow: "0 -20px 60px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "12px 0 4px",
          }}
        >
          <div
            style={{
              width: 44,
              height: 4,
              borderRadius: 2,
              background: "rgba(10,9,8,0.2)",
            }}
          />
        </div>
        <div
          style={{
            padding: "8px 20px 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid rgba(10,9,8,0.08)",
          }}
        >
          <h3 className="display" style={{ fontSize: 22, fontWeight: 500 }}>
            Filter
          </h3>
          <button
            onClick={onClose}
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            Close
          </button>
        </div>
        <div style={{ overflowY: "auto", padding: "20px 20px 100px", flex: 1 }}>
          {children}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: 16,
            background: "var(--ivory)",
            borderTop: "1px solid rgba(10,9,8,0.08)",
          }}
        >
          <button
            onClick={onClose}
            className="btn btn-ink"
            style={{ width: "100%", height: 52, fontSize: 13 }}
          >
            Show {count} {count === 1 ? "garment" : "garments"}
          </button>
        </div>
      </div>
    </>
  );
}

function ContactStrip() {
  const { opencollection } = useModals();
  return (
    <section
      style={{
        background: "var(--emerald)",
        color: "var(--ivory)",
        padding: "80px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="geo-overlay" style={{ opacity: 0.08 }} />
      <div
        className="container"
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: 60,
          alignItems: "center",
        }}
      >
        <div>
          <p
            className="eyebrow"
            style={{ color: "var(--gold)", marginBottom: 12 }}
          >
            Can't find what you're looking for?
          </p>
          <h3
            className="display"
            style={{
              fontSize: "clamp(36px, 4vw, 60px)",
              lineHeight: 1,
              fontWeight: 400,
            }}
          >
            Speak to our{" "}
            <span className="display-italic" style={{ color: "var(--gold)" }}>
              guide.
            </span>
          </h3>
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "flex-end",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => openWhatsApp(WHATSAPP_MESSAGES.guide)}
            className="btn btn-gold"
          >
             guide
          </button>
          <a href="tel:+919834449478" className="btn btn-ghost">
            Book a Call
          </a>
        </div>
      </div>
    </section>
  );
}

export { ContactStrip, ProductCard };

export default function ProductsPage() {
  const { isPhone } = useViewport();
  const { opencollection } = useModals();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "all",
  });
  const [sort, setSort] = useState("featured");
  const [view, setView] = useState("grid");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [query, setQuery] = useState("");

  const PLACEHOLDERS = SEARCH_PLACEHOLDERS;
  const [phIdx, setPhIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setPhIdx((i) => (i + 1) % PLACEHOLDERS.length),
      2800,
    );
    return () => clearInterval(t);
  }, []);

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const SORTS = SORT_OPTIONS;
  const sortLabel = SORTS.find((s) => s.v === sort)?.label || "Featured";

  const q = query.trim().toLowerCase();
  const matches = PRODUCTS_LIST.filter(
    (p) =>
      (filters.category === "all" || p.cat === filters.category) &&
      (q === "" || p.name.toLowerCase().includes(q) || p.cat.includes(q)),
  );

  const PER_PAGE = isPhone ? 6 : 9;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(matches.length / PER_PAGE));
  const paged = matches.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Reset to page 1 when filters/query change
  useEffect(() => {
    setPage(1);
  }, [filters.category, query]);

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== "all",
  ).length;

  const filterRail = (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 28,
        }}
      >
        <p className="eyebrow" style={{ color: "var(--emerald)" }}>
          Refine
        </p>
        <button
          onClick={() => setFilters({ category: "all" })}
          style={{
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.55,
          }}
        >
          Reset
        </button>
      </div>
      <FilterGroup
        title="Category"
        value={filters.category}
        onChange={(v) => setFilters({ ...filters, category: v })}
        options={FILTER_OPTIONS.category}
      />
      <div
        style={{
          marginTop: 40,
          padding: 20,
          background: "var(--emerald)",
          color: "var(--ivory)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="geo-overlay" style={{ opacity: 0.1 }} />
        <p
          className="eyebrow"
          style={{ color: "var(--gold)", marginBottom: 10 }}
        >
          Need help?
        </p>
        <p
          style={{
            fontSize: 14,
            opacity: 0.85,
            marginBottom: 18,
            lineHeight: 1.55,
          }}
        >
          Our guide will pick three pieces tailored to your event.
        </p>
        <button
          onClick={() => openWhatsApp(WHATSAPP_MESSAGES.findGarment)}
          style={{
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--gold)",
            paddingBottom: 4,
            borderBottom: "1px solid var(--gold)",
          }}
        >
          Chat with guide →
        </button>
      </div>
    </>
  );

  return (
    <main
      style={{
        background: "var(--ivory)",
        paddingTop: isPhone ? 96 : 120,
        minHeight: "100vh",
      }}
    >
      {!isPhone && (
        <section
          style={{
            padding: "60px 0 60px",
            borderBottom: "1px solid rgba(10,9,8,0.08)",
          }}
        >
          <div className="container">
            <div
              className="mono"
              style={{ opacity: 0.55, marginBottom: 20, fontSize: 11 }}
            >
              Home / Collection / All
            </div>
            <span
              className="arabic"
              style={{
                fontSize: 44,
                color: "var(--emerald)",
                display: "block",
                marginBottom: 8,
              }}
            >
              المجموعة الكاملة
            </span>
            <h1
              className="display"
              style={{
                fontSize: "clamp(40px, 8vw, 128px)",
                lineHeight: 0.95,
                fontWeight: 400,
              }}
            >
              The full{" "}
              <span
                className="display-italic"
                style={{ color: "var(--emerald)" }}
              >
                collection.
              </span>
            </h1>
            <p
              style={{
                marginTop: 20,
                maxWidth: 540,
                fontSize: 16,
                opacity: 0.65,
              }}
            >
              Showing{" "}
              <span style={{ fontWeight: 600, color: "var(--ink)" }}>
                {paged.length}
              </span>{" "}
              of{" "}
              <span style={{ fontWeight: 600, color: "var(--ink)" }}>
                {matches.length}
              </span>{" "}
              garments{totalPages > 1 && ` · Page ${page} of ${totalPages}`}
            </p>
          </div>
        </section>
      )}

      {isPhone && (
        <div
          style={{
            position: "sticky",
            top: 102,
            zIndex: 30,
            background: "var(--ivory)",
            borderBottom: "1px solid rgba(10,9,8,0.08)",
          }}
        >
          {/* Row 1: search + filter icon + sort icon */}
          <div
            style={{
              display: "flex",
              gap: 8,
              padding: scrolled ? "8px 12px" : "10px 12px",
              transition: "padding 0.25s var(--ease-out)",
            }}
          >
            <label
              style={{
                flex: 1,
                minWidth: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
                height: 42,
                padding: "0 14px",
                background: "var(--paper)",
                border: "1px solid rgba(10,9,8,0.12)",
                borderRadius: 999,
                position: "relative",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                style={{ opacity: 0.55, flexShrink: 0 }}
              >
                <circle cx="7" cy="7" r="5" />
                <path d="M11 11l3 3" />
              </svg>
              <div
                style={{
                  flex: 1,
                  minWidth: 0,
                  position: "relative",
                  height: "100%",
                }}
              >
                <input
                  type="search"
                  inputMode="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search garments"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: 0,
                    outline: 0,
                    background: "transparent",
                    fontFamily: "var(--f-body)",
                    fontSize: 14,
                    color: "var(--ink)",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
                {!query && (
                  <span
                    key={phIdx}
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      fontSize: 14,
                      color: "rgba(10,9,8,0.4)",
                      pointerEvents: "none",
                      animation: "fadeUp 0.5s var(--ease-out)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {PLACEHOLDERS[phIdx]}
                  </span>
                )}
              </div>
              {query && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "rgba(10,9,8,0.12)",
                    color: "var(--ink)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                  }}
                >
                  ×
                </button>
              )}
            </label>
            <button
              onClick={() => setFilterOpen(true)}
              aria-label="Filter"
              style={{
                flexShrink: 0,
                width: 42,
                height: 42,
                borderRadius: "50%",
                border: "1px solid rgba(10,9,8,0.18)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: activeFilterCount ? "var(--ink)" : "transparent",
                color: activeFilterCount ? "var(--ivory)" : "var(--ink)",
                position: "relative",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="2" y1="5" x2="14" y2="5" />
                <line x1="2" y1="11" x2="14" y2="11" />
                <circle cx="6" cy="5" r="1.8" fill="currentColor" />
                <circle cx="10" cy="11" r="1.8" fill="currentColor" />
              </svg>
              {activeFilterCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -2,
                    right: -2,
                    minWidth: 16,
                    height: 16,
                    padding: "0 4px",
                    borderRadius: 999,
                    background: "var(--gold)",
                    color: "var(--ink)",
                    fontSize: 10,
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setSortOpen(true)}
              aria-label={`Sort: ${sortLabel}`}
              style={{
                flexShrink: 0,
                width: 42,
                height: 42,
                borderRadius: "50%",
                border: "1px solid rgba(10,9,8,0.18)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--ink)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 3v10M4 13l-2-2M4 13l2-2" />
                <path d="M12 13V3M12 3l-2 2M12 3l2 2" />
              </svg>
            </button>
          </div>

          {/* Row 2: selected filter chips */}
          {activeFilterCount > 0 && (
            <div
              style={{
                display: "flex",
                gap: 6,
                overflowX: "auto",
                padding: "0 12px 10px",
                scrollbarWidth: "none",
              }}
              data-no-scrollbar
            >
              <button
                onClick={() => setFilters({ category: "all", price: "all" })}
                style={{
                  flex: "0 0 auto",
                  height: 28,
                  padding: "0 12px",
                  borderRadius: 999,
                  border: "1px solid rgba(10,9,8,0.18)",
                  background: "transparent",
                  color: "rgba(10,9,8,0.6)",
                  fontSize: 11,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                Clear all
              </button>
              {Object.entries(filters)
                .filter(([, v]) => v !== "all")
                .map(([k, v]) => (
                  <button
                    key={k}
                    onClick={() => setFilters({ ...filters, [k]: "all" })}
                    style={{
                      flex: "0 0 auto",
                      height: 28,
                      padding: "0 10px 0 12px",
                      borderRadius: 999,
                      background: "var(--ink)",
                      color: "var(--ivory)",
                      fontSize: 11,
                      fontWeight: 600,
                      whiteSpace: "nowrap",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {v.replace("-", " – ")}
                    <span style={{ opacity: 0.7 }}>×</span>
                  </button>
                ))}
            </div>
          )}
        </div>
      )}

      {!isPhone && (
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingTop: 28,
            gap: 12,
            alignItems: "center",
          }}
        >
          <span className="mono" style={{ opacity: 0.55 }}>
            Sort by
          </span>
          <div style={{ position: "relative" }}>
            {(() => {
              const SORT_LABELS = {
                featured: "Featured",
                new: "Newest",
                "price-asc": "Price: low to high",
                "price-desc": "Price: high to low",
              };
              return (
                <>
                  <button
                    onClick={() => setSortOpen((o) => !o)}
                    onBlur={() => setTimeout(() => setSortOpen(false), 120)}
                    aria-haspopup="listbox"
                    aria-expanded={sortOpen}
                    style={{
                      height: 42,
                      minWidth: 200,
                      padding: "0 18px",
                      border: "1px solid rgba(10,9,8,0.18)",
                      background: sortOpen ? "var(--ink)" : "transparent",
                      color: sortOpen ? "var(--ivory)" : "var(--ink)",
                      fontFamily: "var(--f-body)",
                      fontSize: 13,
                      borderRadius: 999,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      transition: "all 0.25s var(--ease-out)",
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        gap: 8,
                        alignItems: "center",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      >
                        <path d="M4 4 H13" />
                        <path d="M4 8 H10" />
                        <path d="M4 12 H7" />
                      </svg>
                      {SORT_LABELS[sort]}
                    </span>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      style={{
                        transition: "transform 0.25s",
                        transform: sortOpen ? "rotate(180deg)" : "rotate(0)",
                      }}
                    >
                      <path d="M2 3.5 L5 6.5 L8 3.5" />
                    </svg>
                  </button>
                  {sortOpen && (
                    <div
                      role="listbox"
                      style={{
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        right: 0,
                        minWidth: 220,
                        background: "var(--paper)",
                        border: "1px solid rgba(10,9,8,0.1)",
                        borderRadius: 14,
                        boxShadow: "0 18px 40px rgba(10,9,8,0.12)",
                        padding: 6,
                        zIndex: 50,
                      }}
                    >
                      {Object.entries(SORT_LABELS).map(([v, label]) => {
                        const active = v === sort;
                        return (
                          <button
                            key={v}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                              setSort(v);
                              setSortOpen(false);
                            }}
                            role="option"
                            aria-selected={active}
                            style={{
                              width: "100%",
                              textAlign: "left",
                              padding: "10px 14px",
                              fontSize: 13,
                              borderRadius: 10,
                              background: active
                                ? "rgba(15,59,46,0.08)"
                                : "transparent",
                              color: active ? "var(--emerald)" : "var(--ink)",
                              fontWeight: active ? 600 : 400,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 10,
                              cursor: "pointer",
                              transition: "background 0.18s",
                            }}
                            onMouseEnter={(e) => {
                              if (!active)
                                e.currentTarget.style.background =
                                  "rgba(10,9,8,0.05)";
                            }}
                            onMouseLeave={(e) => {
                              if (!active)
                                e.currentTarget.style.background =
                                  "transparent";
                            }}
                          >
                            {label}
                            {active && (
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 16 16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M3 8.5 L6.5 12 L13 4.5" />
                              </svg>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
          <div
            style={{
              display: "flex",
              border: "1px solid rgba(10,9,8,0.18)",
              borderRadius: 999,
            }}
          >
            <button
              onClick={() => setView("grid")}
              style={{
                padding: "10px 14px",
                borderRadius: 999,
                background: view === "grid" ? "var(--ink)" : "transparent",
                color: view === "grid" ? "var(--ivory)" : "inherit",
              }}
            >
              ⊞
            </button>
            <button
              onClick={() => setView("list")}
              style={{
                padding: "10px 14px",
                borderRadius: 999,
                background: view === "list" ? "var(--ink)" : "transparent",
                color: view === "list" ? "var(--ivory)" : "inherit",
              }}
            >
              ☰
            </button>
          </div>
        </div>
      )}

      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: isPhone ? "1fr" : "260px 1fr",
          gap: isPhone ? 0 : 56,
          padding: isPhone ? "16px 0 64px" : "32px 0 120px",
        }}
      >
        {!isPhone && (
          <aside style={{ position: "sticky", top: 120, alignSelf: "start" }}>
            {filterRail}
          </aside>
        )}
        <div>
          {activeFilterCount > 0 && !isPhone && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 24,
              }}
            >
              {Object.entries(filters)
                .filter(([, v]) => v !== "all")
                .map(([k, v]) => (
                  <button
                    key={k}
                    onClick={() => setFilters({ ...filters, [k]: "all" })}
                    style={{
                      padding: "8px 16px",
                      borderRadius: 999,
                      background: "var(--ink)",
                      color: "var(--ivory)",
                      fontSize: 11,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    {v.replace("-", " – ")} ×
                  </button>
                ))}
            </div>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isPhone
                ? "repeat(2, 1fr)"
                : view === "grid"
                  ? "repeat(3, 1fr)"
                  : "1fr",
              gap: isPhone ? 12 : view === "grid" ? 28 : 16,
              padding: isPhone ? "0 12px" : 0,
            }}
          >
            {paged.map((p, i) => (
              <ProductCard
                key={p.id || i}
                p={p}
                view={isPhone ? "grid" : view}
                compact={isPhone}
              />
            ))}
            {matches.length === 0 && (
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: 60,
                  opacity: 0.5,
                }}
              >
                <p className="display" style={{ fontSize: 28 }}>
                  No garments match.
                </p>
                <p className="mono" style={{ marginTop: 12 }}>
                  Try widening your filters.
                </p>
              </div>
            )}
          </div>
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 6,
                marginTop: isPhone ? 40 : 80,
                paddingTop: isPhone ? 24 : 40,
                borderTop: "1px solid rgba(10,9,8,0.08)",
                flexWrap: "wrap",
                padding: isPhone ? "24px 16px 0" : "40px 0 0",
              }}
            >
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  minWidth: isPhone ? 38 : 44,
                  height: isPhone ? 38 : 44,
                  border: "1px solid rgba(10,9,8,0.15)",
                  background: "transparent",
                  fontSize: 13,
                  borderRadius: 999,
                  opacity: page === 1 ? 0.3 : 1,
                  cursor: page === 1 ? "default" : "pointer",
                }}
              >
                ←
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  style={{
                    minWidth: isPhone ? 38 : 44,
                    height: isPhone ? 38 : 44,
                    border: "1px solid rgba(10,9,8,0.15)",
                    background: n === page ? "var(--ink)" : "transparent",
                    color: n === page ? "var(--ivory)" : "inherit",
                    fontSize: 13,
                    borderRadius: 999,
                    cursor: "pointer",
                  }}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{
                  minWidth: isPhone ? 38 : 44,
                  height: isPhone ? 38 : 44,
                  border: "1px solid rgba(10,9,8,0.15)",
                  background: "transparent",
                  fontSize: 13,
                  borderRadius: 999,
                  opacity: page === totalPages ? 0.3 : 1,
                  cursor: page === totalPages ? "default" : "pointer",
                }}
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>

      {isPhone && (
        <>
          <FilterSheet
            open={filterOpen}
            onClose={() => setFilterOpen(false)}
            count={matches.length}
          >
            {filterRail}
          </FilterSheet>
          <BottomSheet
            open={sortOpen}
            onClose={() => setSortOpen(false)}
            title="Sort by"
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              {SORTS.map((s) => {
                const active = s.v === sort;
                return (
                  <button
                    key={s.v}
                    onClick={() => {
                      setSort(s.v);
                      setSortOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px 4px",
                      borderBottom: "1px solid rgba(10,9,8,0.06)",
                      fontSize: 15,
                      color: active ? "var(--emerald)" : "var(--ink)",
                      fontWeight: active ? 600 : 400,
                    }}
                  >
                    {s.label}
                    {active && (
                      <span style={{ color: "var(--emerald)" }}>✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </BottomSheet>
        </>
      )}

      <ContactStrip />
    </main>
  );
}
