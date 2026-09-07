"use client";

import { useEffect, useState, type ReactNode } from "react";

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M16 3h3a2 2 0 0 1 2 2v3" />
      <path d="M8 21H5a2 2 0 0 1-2-2v-3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function CompressIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3v3a2 2 0 0 1-2 2H4" />
      <path d="M15 3v3a2 2 0 0 0 2 2h3" />
      <path d="M9 21v-3a2 2 0 0 0-2-2H4" />
      <path d="M15 21v-3a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

/**
 * Wraps a 3D canvas so the person can expand it to fill the whole viewport.
 * The canvas stays mounted the entire time — only the wrapping div's classes
 * change — so expanding/collapsing never causes the WebGL scene to flicker
 * or reset its camera position.
 */
export default function FullscreenPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [expanded]);

  return (
    <div className={expanded ? "fixed inset-0 z-50 bg-ink" : `relative ${className}`}>
      {children}

      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        aria-label={expanded ? "Exit fullscreen" : "View fullscreen"}
        title={expanded ? "Exit fullscreen (Esc)" : "View fullscreen"}
        className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface/80 text-muted backdrop-blur transition-colors hover:border-amber hover:text-amber"
      >
        {expanded ? <CompressIcon /> : <ExpandIcon />}
      </button>

      {expanded && (
        <p className="pointer-events-none absolute bottom-3 left-3 text-xs text-muted">
          Press Esc or tap the icon to exit fullscreen
        </p>
      )}
    </div>
  );
}