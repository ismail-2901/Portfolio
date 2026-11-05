"use client";

import { useEffect } from "react";

export function SkipLink() {
  const focusMain = () => {
    requestAnimationFrame(() => {
      const target = document.getElementById("main-content");
      if (target) {
        target.focus();
      }
    });
  };

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === "#main-content") {
        focusMain();
      }
    };
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <a
      className="skip-link"
      href="#main-content"
      onClick={focusMain}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          focusMain();
        }
      }}
    >
      Skip to content
    </a>
  );
}
