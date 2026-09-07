"use client";

import type { ReactNode } from "react";

export default function SimulatorCard({
  title,
  formula,
  note,
  scene,
  sidebar,
}: {
  title: string;
  formula: string;
  note?: string;
  scene: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-serif text-lg text-paper">{title}</h3>
        <span className="font-mono text-sm text-amber">{formula}</span>
      </div>
      {note && <p className="mt-2 text-sm text-muted">{note}</p>}

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_260px]">
        <div className="h-72 overflow-hidden rounded-md border border-border/70 bg-ink sm:h-80">
          {scene}
        </div>
        <div className="flex flex-col gap-3">{sidebar}</div>
      </div>
    </div>
  );
}

export function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs text-muted">
      {label}
      <input
        type="number"
        step="any"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-border bg-surface2 px-3 py-2 font-mono text-sm text-paper outline-none focus-visible:border-teal"
      />
    </label>
  );
}

export function ReadoutLine({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-md border border-border bg-surface2 px-3 py-2 font-mono text-sm text-paper">
      {children}
    </div>
  );
}

export function HintLine({ children }: { children: ReactNode }) {
  return <p className="text-sm text-muted">{children}</p>;
}