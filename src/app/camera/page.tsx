"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";

const API_URL =
  "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

export default function CameraPage() {
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
    setCameraReady(false);

    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Camera is not supported in this browser.");
      return;
    }

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

      videoRef.current.onloadedmetadata = async () => {
        try {
          await videoRef.current?.play();
          setCameraReady(true);
          setError("");
        } catch {
          setError("Camera loaded, but playback could not start.");
        }
      };
    }
  } catch (err) {
    console.error(err);
    setCameraReady(false);
    setError(
      "Camera permission was blocked. Check your browser camera settings and try again."
    );
  }
};

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraReady(false);
  };

  const captureImage = () => {
  if (!videoRef.current || !canvasRef.current) return;

  setError("");

  const video = videoRef.current;
  const canvas = canvasRef.current;
  const context = canvas.getContext("2d");

  if (!context) return;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  context.translate(canvas.width, 0);
  context.scale(-1, 1);
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  const dataUrl = canvas.toDataURL("image/jpeg", 0.92);

  setCapturedImage(dataUrl);
  setBase64Image(dataUrl.split(",")[1]);
  setCameraReady(false);
  stopCamera();
};

const retakeImage = async () => {
  setError("");
  setCapturedImage("");
  setBase64Image("");
  await startCamera();
};

  const submitImage = async () => {
    if (!base64Image) {
      setError("Capture an image before proceeding.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!response.ok) throw new Error("Image analysis failed.");

      const result = await response.json();

      localStorage.setItem("skinstric-analysis", JSON.stringify(result.data));
      localStorage.setItem("skinstric-upload-preview", capturedImage);

      router.push("/loading-analysis");
    } catch {
      setError("Something went wrong while analyzing your image.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <main className="testing camera-page">
      <Header section="CAMERA" />

      <section className="testing__content camera-content">
        <p className="testing__eyebrow">TAKE PICTURE</p>

        <div className="camera-frame">
          <div className="input-diamond input-diamond--one"></div>
          <div className="input-diamond input-diamond--two"></div>
          <div className="input-diamond input-diamond--three"></div>

          <div className="camera-card camera-card--small">
            {capturedImage ? (
              <img
                src={capturedImage}
                alt="Captured face scan"
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

        <p className="camera-instruction">
          CENTER YOUR FACE IN THE FRAME
        </p>

        {error && !cameraReady && <p className="form-error upload-error">{error}</p>}

        {loading && (
          <div className="selfie-loading">
            <div className="selfie-loading__bar" />
          </div>
        )}

        <div className="camera-controls">
          {!capturedImage ? (
            <button
              type="button"
              className="camera-action"
              onClick={captureImage}
              disabled={!cameraReady}
            >
              {cameraReady ? "CAPTURE" : "LOADING CAMERA"}
            </button>
          ) : (
            <button
              type="button"
              className="camera-action"
              onClick={retakeImage}
              disabled={loading}
            >
              RETAKE
            </button>
          )}

          <button
            type="button"
            className="camera-action"
            onClick={submitImage}
            disabled={!capturedImage || loading}
          >
            {loading ? "ANALYZING" : "USE IMAGE"}
          </button>
        </div>

        <div className="page-actions">
          <Link href="/result" className="nav-btn nav-btn--back">
            <span className="nav-diamond">
              <span className="nav-arrow nav-arrow--left">▶</span>
            </span>
            BACK
          </Link>

          <button
            type="button"
            className="nav-btn nav-btn--proceed"
            onClick={submitImage}
            disabled={!capturedImage || loading}
          >
            PROCEED
            <span className="nav-diamond">
              <span className="nav-arrow nav-arrow--right">▶</span>
            </span>
          </button>
        </div>
      </section>
    </main>
  );
}
