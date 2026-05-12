"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";

type CategoryData = Record<string, number>;

type AnalysisData = {
  race: CategoryData;
  age: CategoryData;
  gender: CategoryData;
};

type Category = "race" | "age" | "gender";

const labels: Record<Category, string> = {
  race: "RACE",
  age: "AGE",
  gender: "SEX",
};

const formatLabel = (label: string) =>
  label
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const sortScores = (data: CategoryData = {}) =>
  Object.entries(data).sort((a, b) => b[1] - a[1]);

export default function DemographicsPage() {
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("race");
  const [loading, setLoading] = useState(true);

  const [selectedValues, setSelectedValues] = useState<
    Record<Category, string>
  >({
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

    setLoading(false);
  }, []);

  const activeScores = useMemo(() => {
    if (!analysis) return [];
    return sortScores(analysis[activeCategory]);
  }, [analysis, activeCategory]);

  const topResult = activeScores[0];

  const selectedLabel =
    selectedValues[activeCategory] || topResult?.[0] || "Unknown";

  const topScore = topResult ? topResult[1] * 100 : 0;

  const handleSelectValue = (value: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [activeCategory]: value,
    }));
  };

  if (loading) {
    return (
      <main className="demo-page">
        <Header section="DEMOGRAPHICS" />

        <section className="demo-layout">
          <div className="page-skeleton">
            <div className="skeleton skeleton-heading" />
            <div className="skeleton skeleton-diamond" />
            <div className="skeleton skeleton-button-row" />
          </div>
        </section>
      </main>
    );
  }

  if (!analysis) {
    return (
      <main className="demo-page">
        <Header section="DEMOGRAPHICS" />

        <section className="demo-layout">
          <h1 className="demo-title">No demographic data found</h1>
        </section>
      </main>
    );
  }

  return (
    <main className="demo-page">
      <Header section="DEMOGRAPHICS" />

      <section className="demo-layout">
        <div className="demo-heading">
          <p>A.I. ANALYSIS</p>

          <h1>
            DEMOGRAPHIC
            <br />
            SUMMARY
          </h1>

          <span>PREDICTED RACE & AGE</span>
        </div>

        <div className="demo-content">
          {/* LEFT SIDE */}

          <aside className="demo-tabs">
            {(["race", "age", "gender"] as Category[]).map((category) => {
              const top = sortScores(analysis[category])[0];

              return (
                <button
                  key={category}
                  className={`demo-tab ${
                    activeCategory === category ? "demo-tab--active" : ""
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  <strong>
                    {selectedValues[category]
                      ? formatLabel(selectedValues[category])
                      : top
                      ? formatLabel(top[0])
                      : "Unknown"}
                  </strong>

                  <span>{labels[category]}</span>
                </button>
              );
            })}
          </aside>

          {/* CENTER */}

          <section className="demo-main-card">
            <h2>{formatLabel(selectedLabel)}</h2>

            <div className="demo-circle">
              <span>{topScore.toFixed(0)}%</span>
            </div>
          </section>

          {/* RIGHT SIDE */}

          <aside className="demo-score-card">
            <div className="demo-score-header">
              <span>{labels[activeCategory]}</span>
              <span>A.I. CONFIDENCE</span>
            </div>

            {activeScores.map(([label, score]) => (
              <button
                key={label}
                className={`demo-score-row ${
                  selectedValues[activeCategory] === label
                    ? "demo-score-row--active"
                    : ""
                }`}
                onClick={() => handleSelectValue(label)}
              >
                <span>{formatLabel(label)}</span>

                <strong>{(score * 100).toFixed(0)}%</strong>
              </button>
            ))}
          </aside>
        </div>

        <p className="demo-note">
          If A.I. estimate is wrong, select the correct one.
        </p>
      </section>

      <div className="page-actions">
        <Link href="/summary" className="nav-btn">
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