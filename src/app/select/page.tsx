"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import { ImageSkeleton } from "../components/Skeleton";

export default function SelectPage() {
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedPreview = localStorage.getItem("skinstric-upload-preview");

    if (savedPreview) {
      setPreviewImage(savedPreview);
    }
    setLoading(false);
  }, []);

  {loading ? (
  <ImageSkeleton />
) : previewImage ? (
  <img src={previewImage} alt="Selected preview" className="select-preview" />
) : (
  <div className="select-empty">No image selected</div>
)}

  return (
    <main className="select-page">
      <Header section="ANALYSIS" />

      <p className="testing__eyebrow">SELECT YOUR IMAGE</p>

      <section className="select-content">
        <div className="select-frame">
          <div className="input-diamond input-diamond--one"></div>
          <div className="input-diamond input-diamond--two"></div>
          <div className="input-diamond input-diamond--three"></div>

          {previewImage ? (
            <img
              src={previewImage}
              alt="Selected preview"
              className="select-preview"
            />
          ) : (
            <div className="select-empty">No image selected</div>
          )}
        </div>

        <p className="select-helper">
          IMAGE ACCEPTED. PROCEED TO VIEW YOUR DEMOGRAPHIC SUMMARY.
        </p>
      </section>

      <div className="page-actions">
        <Link href="/result" className="nav-btn">
          <span className="diamond"></span>
          BACK
        </Link>

        <Link href="/loading-analysis" className="nav-btn nav-btn--reverse">
          PROCEED
          <span className="diamond"></span>
        </Link>
      </div>
    </main>
  );
}