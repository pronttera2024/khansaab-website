import { useRouter } from "../context/RouterContext.jsx";
import { LEGAL_PAGES } from "../data/legalPages/legalPages.js";
import LegalBreadcrumb from "../components/legal/LegalBreadcrumb.jsx";
import LegalHeader from "../components/legal/LegalHeader.jsx";
import LegalTableOfContents from "../components/legal/LegalTableOfContents.jsx";
import LegalSections from "../components/legal/LegalSections.jsx";
import LegalContactBanner from "../components/legal/LegalContactBanner.jsx";

export default function LegalPage({ slug }) {
  const data = LEGAL_PAGES[slug] || LEGAL_PAGES["legal-terms"];
  const { go } = useRouter();

  return (
    <main
      style={{
        background: "var(--ivory)",
        paddingTop: 140,
        paddingBottom: 120,
        minHeight: "100vh",
      }}
    >
      <div className="container" style={{ maxWidth: 880 }}>
        <LegalBreadcrumb title={data.title} onHomeClick={() => go("home")} />

        <LegalHeader
          eyebrow={data.eyebrow}
          title={data.title}
          intro={data.intro}
        />

        <div
          style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 56 }}
        >
          <LegalTableOfContents sections={data.sections} />
          <LegalSections sections={data.sections} />
        </div>

        <LegalContactBanner pageTitle={data.title} />
      </div>
    </main>
  );
}
