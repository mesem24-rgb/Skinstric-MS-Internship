"use client";

import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL =
  "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

export default function UploadPage() {
  const router = useRouter();

  const [preview, setPreview] = useState("");
  const [base64Image, setBase64Image] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    setError("");

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result as string;
      setPreview(result);

      const base64Only = result.split(",")[1];
      setBase64Image(base64Only);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!base64Image) {
      setError("Please upload an image before proceeding.");
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
        throw new Error("Image upload failed.");
      }

      const result = await response.json();

      localStorage.setItem("skinstric-analysis", JSON.stringify(result.data));
      localStorage.setItem("skinstric-upload-preview", preview);

      router.push("/results");
    } catch (err) {
      console.error(err);
      setError("Something went wrong while analyzing your image.");
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
        <div className="intro">UPLOAD</div>
      </header>

      <section className="testing__content">
        <p className="testing__eyebrow">UPLOAD YOUR IMAGE</p>

        <div className="upload-zone">
          <div className="input-diamond input-diamond--one"></div>
          <div className="input-diamond input-diamond--two"></div>
          <div className="input-diamond input-diamond--three"></div>

          <label htmlFor="image-upload" className="upload-label">
            {preview ? (
              <img src={preview} alt="Uploaded preview" className="upload-preview" />
            ) : (
              <>
                <span className="upload-plus">+</span>
                <strong>UPLOAD IMAGE</strong>
                <small>Accepted: JPG, PNG, WEBP</small>
              </>
            )}
          </label>

          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </div>

        {fileName && <p className="upload-filename">{fileName}</p>}
        {error && <p className="form-error upload-error">{error}</p>}

        <div className="page-actions">
          <Link href="/analysis" className="nav-btn">
            <span className="diamond"></span>
            BACK
          </Link>

          <button
            type="button"
            className="nav-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "ANALYZING..." : "PROCEED"}
            <span className="diamond"></span>
          </button>
        </div>
      </section>
    </main>
  );
}