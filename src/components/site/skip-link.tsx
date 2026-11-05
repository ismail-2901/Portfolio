"use client";

import { useEffect } from "react";

export function SkipLink() {
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#main-content") {
        const el = document.getElementById("main-content");
        if (el) {
          el.focus();
        }
      }
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <a
      className="skip-link"
      href="#main-content"
      onClick={() => {
        const target = document.getElementById("main-content");
        if (target) {
          target.focus();
        }
      }}
    >
      Skip to content
    </a>
  );
}
