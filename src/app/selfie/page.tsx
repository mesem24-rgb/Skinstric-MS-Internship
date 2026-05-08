"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL =
  "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

export default function SelfiePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraReady, setCameraReady] = useState(false);
  const [capturedImage, setCapturedImage] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const startCamera = async () => {
    try {
      setError("");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 720 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraReady(true);
      }
    } catch (err) {
      console.error(err);
      setError("Camera access was blocked or unavailable.");
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraReady(false);
  };

  const captureSelfie = () => {
    if (!videoRef.current || !canvasRef.current) {
      setError("Camera is not ready yet.");
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      setError("Unable to capture image.");
      return;
    }

    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    const base64Only = dataUrl.split(",")[1];

    setCapturedImage(dataUrl);
    setBase64Image(base64Only);
    stopCamera();
  };

  const retakeSelfie = () => {
    setCapturedImage("");
    setBase64Image("");
    startCamera();
  };

  const submitSelfie = async () => {
    if (!base64Image) {
      setError("Please take a selfie before proceeding.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      });

      if (!response.ok) {
        throw new Error("Selfie upload failed.");
      }

      const result = await response.json();

      localStorage.setItem("skinstric-analysis", JSON.stringify(result.data));
      localStorage.setItem("skinstric-upload-preview", capturedImage);

      router.push("/results");
    } catch (err) {
      console.error(err);
      setError("Something went wrong while analyzing your selfie.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  return (
    <main className="testing">
      <header className="topbar">
        <Link href="/" className="brand">
          SKINSTRIC
        </Link>
        <div className="intro">SELFIE</div>
      </header>

      <section className="testing__content selfie-content">
        <p className="testing__eyebrow">TAKE A SELFIE</p>

        <div className="selfie-frame">
          <div className="input-diamond input-diamond--one"></div>
          <div className="input-diamond input-diamond--two"></div>
          <div className="input-diamond input-diamond--three"></div>

          <div className="camera-card">
            {capturedImage ? (
              <img
                src={capturedImage}
                alt="Captured selfie"
                className="camera-preview"
              />
            ) : (
              <video
                ref={videoRef}
                className="camera-preview camera-preview--live"
                autoPlay
                playsInline
                muted
              />
            )}
          </div>

          <canvas ref={canvasRef} hidden />
        </div>

        {error && <p className="form-error upload-error">{error}</p>}

        <div className="selfie-controls">
          {!capturedImage ? (
            <button
              type="button"
              className="analysis-option"
              onClick={captureSelfie}
              disabled={!cameraReady}
            >
              CAPTURE
            </button>
          ) : (
            <button type="button" className="analysis-option" onClick={retakeSelfie}>
              RETAKE
            </button>
          )}

          <button
            type="button"
            className="analysis-option"
            onClick={submitSelfie}
            disabled={!capturedImage || loading}
          >
            {loading ? "ANALYZING..." : "USE SELFIE"}
          </button>
        </div>

        <div className="page-actions">
          <Link href="/analysis" className="nav-btn">
            <span className="diamond"></span>
            BACK
          </Link>

          <button
            type="button"
            className="nav-btn"
            onClick={submitSelfie}
            disabled={!capturedImage || loading}
          >
            {loading ? "SENDING..." : "PROCEED"}
            <span className="diamond"></span>
          </button>
        </div>
      </section>
    </main>
  );
}