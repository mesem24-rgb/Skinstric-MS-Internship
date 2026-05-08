import Link from "next/link";
import Header from "./components/Header";
import Diamond from "./components/Diamond";

export default function Home() {
  return (
    <main className="skin-page">
      <Header section="INTRO" />

      <section className="home-hero">
        <button className="hero-side hero-side--left">
        
          <span className="arrow-left">▶</span>
          DISCOVER A.I.
        </button>

        <div className="hero-center">

          <h1>
            Sophisticated
            <br />
            skincare
          </h1>

          <Link href="/testing" className="primary-link">
            ENTER EXPERIENCE
          </Link>
        </div>

        <Link href="/testing" className="hero-side hero-side--right">
          TAKE TEST <span>▶</span>
        </Link>
      </section>

      <p className="home-copy">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALED ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.
      </p>
    </main>
  );
}
