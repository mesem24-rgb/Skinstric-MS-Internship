import Link from "next/link";
import Header from "../components/Header";

const items = [
  { label: "DEMOGRAPHICS", href: "/demographics", active: true },
  { label: "SKIN TYPE DETAILS", href: "#", active: false },
  { label: "WEATHER", href: "#", active: false },
  { label: "COSMETIC CONCERNS", href: "#", active: false },
];

export default function SummaryPage() {
  return (
    <main className="select-page">
      <Header section="INTRO" />

      <section className="select-layout">
        <div className="select-copy">
          <p className="select-eyebrow">A.I. ANALYSIS</p>

          <p className="select-description">
            A.I. HAS ESTIMATED THE FOLLOWING.
            <br />
            FIX ESTIMATED INFORMATION IF NEEDED.
          </p>
        </div>

        <div className="diamond-grid">
          {items.map((item, index) =>
            item.active ? (
              <Link
                href={item.href}
                key={item.label}
                className={`diamond-option diamond-option--${index} diamond-option--active`}
              >
                <span>{item.label}</span>
              </Link>
            ) : (
              <button
                type="button"
                key={item.label}
                className={`diamond-option diamond-option--${index} diamond-option--locked`}
                aria-disabled="true"
              >
                <span>{item.label}</span>
              </button>
            )
          )}
        </div>
      </section>

      <div className="page-actions">
        <Link href="/select" className="nav-btn">
          <span className="diamond"></span>
          BACK
        </Link>

        <Link href="/demographics" className="nav-btn nav-btn--reverse">
          GET SUMMARY
          <span className="diamond"></span>
        </Link>
      </div>
    </main>
  );
}