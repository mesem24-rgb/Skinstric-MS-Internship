"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import Header from "../components/Header";
import { ResultsSkeleton } from "../components/Skeleton";

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

  const [activeCategory, setActiveCategory] =
    useState<Category>("race");

  const [selectedValues, setSelectedValues] = useState<
    Record<Category, string>
  >({
    race: "",
    age: "",
    gender: "",
  });

  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const savedAnalysis = localStorage.getItem(
      "skinstric-analysis"
    );

    const savedPreview = localStorage.getItem(
      "skinstric-upload-preview"
    );

    if (savedPreview) {
      setPreviewImage(savedPreview);
    }

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
        <Header section="RESULTS" />

        <ResultsSkeleton />

        <div className="page-actions">
          <Link href="/upload" className="nav-btn">
            <span className="diamond"></span>
            BACK
          </Link>

          <Link href="/upload" className="nav-btn">
            UPLOAD IMAGE
            <span className="diamond"></span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="results-page">
      <Header section="RESULTS" />

      <section className="results-layout">
        <aside className="results-sidebar">
          <p className="results-eyebrow">
            A.I. DEMOGRAPHIC ANALYSIS
          </p>

          <h1>
            Your Skin
            <br />
            Profile
          </h1>

          <p className="results-subtitle">
            The A.I. generated demographic predictions based on
            your uploaded image. Click any category result to
            update your actual attribute selection.
          </p>

          {previewImage && (
            <div className="results-preview-wrap">
              <img
                src={previewImage}
                alt="User upload preview"
                className="results-preview"
              />
            </div>
          )}

          <div className="selected-blocks">
            {(["race", "age", "gender"] as Category[]).map(
              (category) => (
                <button
                  key={category}
                  className={`selected-block ${
                    activeCategory === category
                      ? "selected-block--active"
                      : ""
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
              )
            )}
          </div>
        </aside>

        <section className="scores-panel">
          <div className="scores-header">
            <h2>{activeCategory.toUpperCase()}</h2>

            <span>CONFIDENCE SCORE</span>
          </div>

          <div className="scores-list">
            {activeScores.map(([label, score], index) => (
              <button
                key={label}
                className={`score-row ${
                  selectedValues[activeCategory] === label
                    ? "score-row--active"
                    : ""
                }`}
                onClick={() => handleScoreClick(label)}
              >
                <div className="score-left">
                  <span className="score-rank">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>

                  <span className="score-label">
                    {formatLabel(label)}
                  </span>
                </div>

                <div className="score-right">
                  <div className="score-bar">
                    <div
                      className="score-bar__fill"
                      style={{
                        width: `${(score * 100).toFixed(2)}%`,
                      }}
                    />
                  </div>

                  <strong>
                    {(score * 100).toFixed(2)}%
                  </strong>
                </div>
              </button>
            ))}
          </div>
        </section>
      </section>

      <div className="page-actions">
        <Link href="/analysis" className="nav-btn">
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