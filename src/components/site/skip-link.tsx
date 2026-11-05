"use client";

export function SkipLink() {
  const handleFocusMain = () => {
    const target = document.getElementById("main-content");
    if (target) {
      target.focus();
    }
  };

  return (
    <a
      className="skip-link"
      href="#main-content"
      onClick={handleFocusMain}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleFocusMain();
        }
      }}
    >
      Skip to content
    </a>
  );
}
