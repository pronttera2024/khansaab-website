import { useEffect } from "react";
import { Ornament } from "./shared/Ornament.jsx";
import { openWhatsApp } from "../utils/whatsapp.js";
import { collection_DIALOG } from "../data/content.js";
import { WHATSAPP_MESSAGES } from "../data/site-config.js";

export default function collectionDialog({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      onClick={onClose}
      data-modal-backdrop
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(10,9,8,0.72)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        animation: "fadeIn 0.3s var(--ease-out)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        data-mobile-sheet
        data-sheet-type="dialog"
        style={{
          background: "var(--ivory)",
          color: "var(--ink)",
          maxWidth: 560,
          width: "100%",
          position: "relative",
          padding: "56px 48px 48px",
          border: "1px solid rgba(201,169,97,0.4)",
          boxShadow: "0 40px 120px rgba(0,0,0,0.5)",
          animation: "fadeUp 0.5s var(--ease-out)",
        }}
      >
        <span data-sheet-handle aria-hidden="true" />
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            opacity: 0.6,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <line x1="2" y1="2" x2="12" y2="12" />
            <line x1="12" y1="2" x2="2" y2="12" />
          </svg>
        </button>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 24,
          }}
        >
          <Ornament color="var(--emerald)" width={36} />
        </div>

        <p
          className="arabic"
          style={{
            fontSize: 28,
            color: "var(--emerald)",
            textAlign: "center",
            marginBottom: 6,
          }}
        >
          {collection_DIALOG.arabicTitle}
        </p>
        <p
          className="eyebrow"
          style={{
            color: "var(--emerald)",
            textAlign: "center",
            marginBottom: 18,
          }}
        >
          {collection_DIALOG.eyebrow}
        </p>
        <h2
          className="display"
          style={{
            fontSize: "clamp(36px, 4.5vw, 52px)",
            lineHeight: 1.05,
            textAlign: "center",
            marginBottom: 16,
            fontWeight: 400,
          }}
        >
          {collection_DIALOG.heading}{" "}
          <span className="display-italic" style={{ color: "var(--emerald)" }}>
            {collection_DIALOG.headingAccent}
          </span>
        </h2>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            opacity: 0.75,
            textAlign: "center",
            marginBottom: 32,
          }}
        >
          {collection_DIALOG.body}
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginBottom: 32,
            flexWrap: "wrap",
          }}
        >
          {collection_DIALOG.processSteps.map((s, i) => (
            <span
              key={s}
              style={{
                padding: "8px 14px",
                border: "1px solid rgba(15,59,46,0.25)",
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "var(--emerald)",
                borderRadius: 999,
              }}
            >
              {String(i + 1).padStart(2, "0")} · {s}
            </span>
          ))}
        </div>

        <div data-sheet-footer>
          <button
            onClick={() => openWhatsApp(WHATSAPP_MESSAGES.bespoke)}
            className="btn btn-gold"
            style={{
              width: "100%",
              height: 56,
              fontSize: 13,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {collection_DIALOG.ctaLabel}
          </button>

          <p
            className="mono"
            style={{
              marginTop: 14,
              fontSize: 11,
              opacity: 0.5,
              textAlign: "center",
            }}
          >
            {collection_DIALOG.slaLine}
          </p>
        </div>
      </div>
    </div>
  );
}
