import Link from "next/link";
import Header from "../components/Header";

const items = [
  { label: "DEMOGRAPHICS", href: "/summary", active: true },
  { label: "SKIN TYPE DETAILS", href: "#", active: false },
  { label: "WEATHER", href: "#", active: false },
  { label: "COSMETIC\nCONCERNS", href: "#", active: false },
];

export default function SummaryPage() {
  return (
    <main className="summary-page">
      <Header section="INTRO" />

      <section className="summary-layout">
        <div className="summary-copy">
          <p className="summary-eyebrow">A.I. ANALYSIS</p>

          <p className="summary-description">
            A.I. HAS ESTIMATED THE FOLLOWING.
            <br />
            FIX ESTIMATED INFORMATION IF NEEDED.
          </p>
        </div>

        <div className="summary-diamond-grid">
          {items.map((item, index) =>
            item.active ? (
              <Link
                key={item.label}
                href={item.href}
                className={`summary-diamond summary-diamond--${index} summary-diamond--active`}
              >
                <span>{item.label}</span>
              </Link>
            ) : (
              <button
                key={item.label}
                type="button"
                className={`summary-diamond summary-diamond--${index} summary-diamond--locked`}
                aria-disabled="true"
              >
                <span>{item.label}</span>
              </button>
            )
          )}
        </div>
      </section>

      <div className="page-actions">
        <Link href="/result" className="nav-btn nav-btn--back">
          <span className="nav-diamond">
            <span className="nav-arrow nav-arrow--left">▶</span>
          </span>
          BACK
        </Link>

        <Link href="/summary" className="nav-btn nav-btn--proceed">
          GET SUMMARY
          <span className="nav-diamond">
            <span className="nav-arrow nav-arrow--right">▶</span>
          </span>
        </Link>
      </div>
    </main>
  );
}