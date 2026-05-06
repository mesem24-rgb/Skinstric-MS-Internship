"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const API_URL =
  "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne";

const isValidText = (value: string) => {
  return /^[A-Za-z\s'-]{2,}$/.test(value.trim());
};

export default function TestingPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [step, setStep] = useState<"name" | "location">("name");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNameProceed = () => {
    if (!isValidText(name)) {
      setError("Please enter a valid name using letters only.");
      return;
    }

    setError("");
    setStep("location");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!isValidText(name)) {
      setError("Please enter a valid name using letters only.");
      setStep("name");
      return;
    }

    if (!isValidText(location)) {
      setError("Please enter a valid location using letters only.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const userData = {
        name: name.trim(),
        location: location.trim(),
      };

      localStorage.setItem("skinstric-user", JSON.stringify(userData));

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit user information.");
      }

      router.push("/analysis");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="testing">
      <header className="topbar">
        <Link href="/" className="brand">
          SKINSTRIC
        </Link>
        <div className="intro">INTRO</div>
      </header>

      <form className="testing__content" onSubmit={handleSubmit}>
        <p className="testing__eyebrow">
          TO START ANALYSIS, PLEASE ENTER YOUR DETAILS
        </p>

        <div className="input-wrap">
          <div className="input-diamond input-diamond--one"></div>
          <div className="input-diamond input-diamond--two"></div>
          <div className="input-diamond input-diamond--three"></div>

          {step === "name" ? (
            <>
              <label htmlFor="name">CLICK TO TYPE</label>
              <input
                id="name"
                type="text"
                value={name}
                autoFocus
                placeholder="Introduce Yourself"
                onChange={(e) => setName(e.target.value)}
              />
            </>
          ) : (
            <>
              <label htmlFor="location">WHERE ARE YOU FROM?</label>
              <input
                id="location"
                type="text"
                value={location}
                autoFocus
                placeholder="Your Location"
                onChange={(e) => setLocation(e.target.value)}
              />
            </>
          )}
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="page-actions">
          {step === "name" ? (
            <Link href="/" className="nav-btn">
              <span className="diamond"></span>
              BACK
            </Link>
          ) : (
            <button
              type="button"
              className="nav-btn"
              onClick={() => {
                setError("");
                setStep("name");
              }}
            >
              <span className="diamond"></span>
              BACK
            </button>
          )}

          {step === "name" ? (
            <button type="button" className="nav-btn" onClick={handleNameProceed}>
              PROCEED
              <span className="diamond"></span>
            </button>
          ) : (
            <button type="submit" className="nav-btn" disabled={loading}>
              {loading ? "SENDING..." : "PROCEED"}
              <span className="diamond"></span>
            </button>
          )}
        </div>
      </form>
    </main>
  );
}