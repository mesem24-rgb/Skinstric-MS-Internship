"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type CategoryData = Record<string, number>;

type AnalysisData = {
  race: CategoryData;
  age: CategoryData;
  gender: CategoryData;
};

type Category = "race" | "age" | "gender";

const formatLabel = (label: string) => {
  return label
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const sortScores = (data: CategoryData = {}) => {
  return Object.entries(data).sort((a, b) => b[1] - a[1]);
};

export default function ResultsPage() {
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("race");
  const [selectedValues, setSelectedValues] = useState<Record<Category, string>>({
    race: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    const savedAnalysis = localStorage.getItem("skinstric-analysis");

    if (savedAnalysis) {
      const parsed = JSON.parse(savedAnalysis) as AnalysisData;
      setAnalysis(parsed);

      setSelectedValues({
        race: sortScores(parsed.race)[0]?.[0] || "",
        age: sortScores(parsed.age)[0]?.[0] || "",
        gender: sortScores(parsed.gender)[0]?.[0] || "",
      });
    }
  }, []);

  const activeScores = useMemo(() => {
    if (!analysis) return [];
    return sortScores(analysis[activeCategory]);
  }, [analysis, activeCategory]);

  const handleScoreClick = (value: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [activeCategory]: value,
    }));
  };

  if (!analysis) {
    return (
      <main className="results-page">
        <header className="topbar">
          <Link href="/" className="brand">
            SKINSTRIC
          </Link>
          <div className="intro">RESULTS</div>
        </header>

        <section className="results-empty">
          <h1>No analysis found</h1>
          <Link href="/upload" className="analysis-option">
            UPLOAD IMAGE
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="results-page">
      <header className="topbar">
        <Link href="/" className="brand">
          SKINSTRIC
        </Link>
        <div className="intro">RESULTS</div>
      </header>

      <section className="results-layout">
        <aside className="results-sidebar">
          <p className="results-eyebrow">A.I. ANALYSIS</p>
          <h1>Demographics</h1>
          <p className="results-subtitle">Predicted race, age, and gender.</p>

          <div className="selected-blocks">
            {(["race", "age", "gender"] as Category[]).map((category) => (
              <button
                key={category}
                className={`selected-block ${
                  activeCategory === category ? "selected-block--active" : ""
                }`}
                onClick={() => setActiveCategory(category)}
              >
                <span>{category.toUpperCase()}</span>
                <strong>
                  {selectedValues[category]
                    ? formatLabel(selectedValues[category])
                    : "Not selected"}
                </strong>
              </button>
            ))}
          </div>
        </aside>

        <section className="scores-panel">
          <div className="scores-header">
            <h2>{activeCategory.toUpperCase()}</h2>
            <span>CONFIDENCE</span>
          </div>

          <div className="scores-list">
            {activeScores.map(([label, score]) => (
              <button
                key={label}
                className={`score-row ${
                  selectedValues[activeCategory] === label ? "score-row--active" : ""
                }`}
                onClick={() => handleScoreClick(label)}
              >
                <span>{formatLabel(label)}</span>
                <strong>{(score * 100).toFixed(2)}%</strong>
              </button>
            ))}
          </div>
        </section>
      </section>

      <div className="page-actions">
        <Link href="/upload" className="nav-btn">
          <span className="diamond"></span>
          BACK
        </Link>

        <Link href="/" className="nav-btn">
          HOME
          <span className="diamond"></span>
        </Link>
      </div>
    </main>
  );
}