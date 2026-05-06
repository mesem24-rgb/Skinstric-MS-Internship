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
        <p className="testing__eyebrow">PHASE 1 COMPLETE</p>

        <div className="input-wrap">
          <div className="input-diamond input-diamond--one"></div>
          <div className="input-diamond input-diamond--two"></div>
          <div className="input-diamond input-diamond--three"></div>

          <h1 className="analysis-title">Initializing Analysis</h1>
        </div>

        <div className="page-actions">
          <Link href="/testing" className="nav-btn">
            <span className="diamond"></span>
            BACK
          </Link>

          <Link href="/" className="nav-btn">
            HOME
            <span className="diamond"></span>
          </Link>
        </div>
      </section>
    </main>
  );
}
