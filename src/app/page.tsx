import Link from "next/link";

export default function Home() {
  return (
    <main className="home">
      <header className="topbar">
        <div className="brand">SKINSTRIC</div>
        <div className="intro">INTRO</div>
      </header>

      <section className="hero">
        <button className="side-cta side-cta--left">
          <span className="diamond"></span>
          DISCOVER A.I.
        </button>

        <div className="hero__center">
          <div className="hero__diamond hero__diamond--one"></div>
          <div className="hero__diamond hero__diamond--two"></div>
          <div className="hero__diamond hero__diamond--three"></div>

          <h1>
            Sophisticated
            <br />
            skincare
          </h1>

          <Link href="/testing" className="enter-btn">
            ENTER EXPERIENCE
          </Link>
        </div>

        <Link href="/testing" className="side-cta side-cta--right">
          TAKE TEST
          <span className="diamond"></span>
        </Link>
      </section>

      <p className="caption">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED ROUTINE
        TAILORED TO WHAT YOUR SKIN NEEDS.
      </p>
    </main>
  );
}
