"use client";

import Link from "next/link";
import Header from "../components/Header";
import { useMemo, useState } from "react";

type Category = "race" | "age" | "sex";

const data = {
  race: [
    { label: "Black", value: 76 },
    { label: "Middle eastern", value: 10 },
    { label: "Latino hispanic", value: 4 },
    { label: "Southeast asian", value: 3 },
    { label: "East asian", value: 3 },
    { label: "White", value: 1 },
    { label: "South asian", value: 0 },
  ],
  age: [
    { label: "40-49", value: 48 },
    { label: "30-39", value: 24 },
    { label: "50-59", value: 15 },
    { label: "20-29", value: 7 },
    { label: "60-69", value: 4 },
    { label: "70+", value: 2 },
  ],
  sex: [
    { label: "Male", value: 84 },
    { label: "Female", value: 16 },
  ],
};

const labels: Record<Category, string> = {
  race: "RACE",
  age: "AGE",
  sex: "SEX",
};

export default function SummaryPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("race");

  const [selectedValues, setSelectedValues] = useState<Record<Category, string>>({
    race: data.race[0].label,
    age: data.age[0].label,
    sex: data.sex[0].label,
  });

  const activeOptions = data[activeCategory];

  const activeResult = useMemo(() => {
    return (
      activeOptions.find((item) => item.label === selectedValues[activeCategory]) ||
      activeOptions[0]
    );
  }, [activeCategory, selectedValues, activeOptions]);

  return (
    <main className="demographics-page">
      <Header section="DEMOGRAPHICS" />

      <section className="demographics-hero">
        <p className="demographics-eyebrow">A.I. ANALYSIS</p>
        <h1 className="demographics-title">DEMOGRAPHICS</h1>
        <p className="demographics-subtitle">PREDICTED RACE & AGE</p>
      </section>

      <section className="demographics-content">
        <aside className="demographics-sidebar">
          {(["race", "age", "sex"] as Category[]).map((category) => (
            <button
              key={category}
              className={`sidebar-tab ${
                activeCategory === category ? "sidebar-tab--active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              <span>{selectedValues[category]}</span>
              <small>{labels[category]}</small>
            </button>
          ))}
        </aside>

        <div className="demographics-main">
          <div className="demographics-selected">
            <h2>{activeResult.label}</h2>
          </div>

          <div className="demographics-chart">
            <div
              className="chart-ring"
              style={
                {
                  "--score": `${activeResult.value}%`,
                } as React.CSSProperties
              }
            >
              <div className="chart-ring__inner">
                <span>{activeResult.value}%</span>
              </div>
            </div>
          </div>
        </div>

        <aside className="demographics-confidence">
          <div className="confidence-header">
            <span>{labels[activeCategory]}</span>
            <span>A.I. CONFIDENCE</span>
          </div>

          {activeOptions.map((item) => (
            <button
              key={item.label}
              className={`confidence-row ${
                activeResult.label === item.label ? "confidence-row--active" : ""
              }`}
              onClick={() =>
                setSelectedValues((prev) => ({
                  ...prev,
                  [activeCategory]: item.label,
                }))
              }
            >
              <span>{item.label}</span>
              <strong>{item.value}%</strong>
            </button>
          ))}
        </aside>
      </section>

      <div className="page-actions">
        <Link href="/select" className="nav-btn nav-btn--back">
          <span className="nav-diamond">
            <span className="nav-arrow nav-arrow--left">▶</span>
          </span>
          BACK
        </Link>

        <Link href="/" className="nav-btn nav-btn--proceed">
          HOME
          <span className="nav-diamond">
            <span className="nav-arrow nav-arrow--right">▶</span>
          </span>
        </Link>
      </div>
    </main>
  );
}