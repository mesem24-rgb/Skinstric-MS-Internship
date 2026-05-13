"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "./components/Header";

export default function Home() {
  const [hoverSide, setHoverSide] = useState<"left" | "right" | null>(null);

  return (
    <main
      className={`home ${
        hoverSide === "left"
          ? "home--hover-left"
          : hoverSide === "right"
          ? "home--hover-right"
          : ""
      }`}
    >
      <Header section="INTRO" />

      <section className="home-hero">
        <div
          className="landing-cta-wrap landing-cta-wrap--left"
          onMouseEnter={() => setHoverSide("left")}
          onMouseLeave={() => setHoverSide(null)}
        >
          <div className="landing-bg-diamond landing-bg-diamond--one" />
          {/* <div className="landing-bg-diamond landing-bg-diamond--two" /> */}

          <button className="landing-cta landing-cta--left" type="button">
            <span className="landing-cta__diamond">
              <span className="landing-cta__arrow landing-cta__arrow--left">
                ▶
              </span>
            </span>

            <span className="landing-cta__text">DISCOVER A.I.</span>
          </button>
        </div>

        <div className="hero-center">
          <h1>
            Sophisticated
            <br />
            skincare
          </h1>
          <p className="hero-mobile-copy">
            SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALIZED
            ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.
          </p>
          <Link href="/testing" className="hero-enter-mobile">
  <span>ENTER EXPERIENCE</span>
  <span className="hero-enter-diamond">
    <span className="hero-enter-arrow"> ▶</span>
  </span>
</Link>
        </div>

        <div
          className="landing-cta-wrap landing-cta-wrap--right"
          onMouseEnter={() => setHoverSide("right")}
          onMouseLeave={() => setHoverSide(null)}
        >
          <div className="landing-bg-diamond landing-bg-diamond--one" />
          {/* <div className="landing-bg-diamond landing-bg-diamond--two" /> */}

          <Link href="/testing" className="landing-cta landing-cta--right">
            <span className="landing-cta__text">TAKE TEST</span>

            <span className="landing-cta__diamond">
              <span className="landing-cta__arrow">▶</span>
            </span>
          </Link>
        </div>
      </section>

      <p className="home-copy">
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A<br />
        HIGHLY-PERSONALIZED ROUTINE TAILORED TO
        <br />
        WHAT YOUR SKIN NEEDS.
      </p>
    </main>
  );
}
