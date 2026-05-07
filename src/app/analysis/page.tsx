import Link from "next/link";

export default function AnalysisPage() {
  return (
    <main className="testing">
      <header className="topbar">
        <Link href="/" className="brand">
          SKINSTRIC
        </Link>
        <div className="intro">ANALYSIS</div>
      </header>

      <section className="testing__content">
        <p className="testing__eyebrow">A.I. ANALYSIS</p>

        <div className="input-wrap">
          <div className="input-diamond input-diamond--one"></div>
          <div className="input-diamond input-diamond--two"></div>
          <div className="input-diamond input-diamond--three"></div>

          <h1 className="analysis-title">Choose Image Method</h1>

          <div className="analysis-options">
            <Link href="/upload" className="analysis-option">
              UPLOAD IMAGE
            </Link>

            <Link href="/selfie" className="analysis-option">
              TAKE SELFIE
            </Link>
          </div>
        </div>

        <div className="page-actions">
          <Link href="/testing" className="nav-btn">
            <span className="diamond"></span>
            BACK
          </Link>

          <Link href="/upload" className="nav-btn">
            PROCEED
            <span className="diamond"></span>
          </Link>
        </div>
      </section>
    </main>
  );
}
