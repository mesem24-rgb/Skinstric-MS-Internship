"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

export default function ResultPage() {
  const router = useRouter();
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);

  const handleAllowCamera = () => {
    setCameraLoading(true);

    setTimeout(() => {
      router.push("/camera");
    }, 900);
  };

  return (
    <main className="result-page">
      <Header section="INTRO" />

      <p className="testing__eyebrow">TO START ANALYSIS</p>

      <section className="result-options">
        <button
          type="button"
          className="result-card"
          onClick={() => setShowCameraModal(true)}
        >
          <div className="result-diamond result-diamond--one" />
          <div className="result-diamond result-diamond--two" />

          <div className="result-node result-node--camera">
            <div className="result-icon">
              <img
                src="/assets/camera-icon.png"
                alt="Camera scan"
                className="result-icon__image"
              />
            </div>

            <div className="result-connector" />

            <p className="result-label">
              ALLOW A.I.
              <br />
              TO SCAN YOUR FACE
            </p>
          </div>
        </button>

        <Link href="/upload" className="result-card">
          <div className="result-diamond result-diamond--one" />
          <div className="result-diamond result-diamond--two" />

          <div className="result-node result-node--gallery">
            <div className="result-icon">
              <img
                src="/assets/gallery-icon.png"
                alt="Gallery upload"
                className="result-icon__image"
              />
            </div>

            <div className="result-connector" />

            <p className="result-label">
              ALLOW A.I.
              <br />
              ACCESS GALLERY
            </p>
          </div>
        </Link>
      </section>

      {showCameraModal && (
        <div className="permission-modal">
          <div className="permission-modal__box">
            <h2>ALLOW A.I. TO ACCESS YOUR CAMERA</h2>

            <div className="permission-modal__actions">
              <button
                type="button"
                onClick={() => setShowCameraModal(false)}
                disabled={cameraLoading}
              >
                DENY
              </button>

              <button
                type="button"
                onClick={handleAllowCamera}
                disabled={cameraLoading}
              >
                {cameraLoading ? "LOADING..." : "ALLOW"}
              </button>
            </div>

            {cameraLoading && (
              <div className="permission-loading">
                <div className="permission-loading__bar" />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="page-actions">
        <Link href="/testing" className="nav-btn nav-btn--back">
          <span className="nav-diamond">
            <span className="nav-arrow nav-arrow--left">▶</span>
          </span>
          BACK
        </Link>
      </div>
    </main>
  );
}
