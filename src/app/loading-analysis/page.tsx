"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

export default function LoadingAnalysisPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/summary");
    }, 2600);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="analysis-loading-page">
      <Header section="ANALYSIS" />

      <div className="analysis-loading">
        <div className="analysis-loading__diamond analysis-loading__diamond--one" />
        <div className="analysis-loading__diamond analysis-loading__diamond--two" />
        <div className="analysis-loading__diamond analysis-loading__diamond--three" />

        <div className="analysis-loading__content">
          <h1>ANALYZING IMAGE</h1>

          <p>
            A.I. IS GENERATING YOUR
            <br />
            PERSONALIZED SKIN ANALYSIS
          </p>

          <div className="analysis-loading__bar">
            <div className="analysis-loading__progress" />
          </div>
        </div>
      </div>
    </main>
  );
}