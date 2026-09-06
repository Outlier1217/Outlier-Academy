type Profile = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A10.53 10.53 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.14 1.45-2.14 2.94v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.48v6.26ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.75s-.23-1.64-.94-2.36c-.9-.95-1.9-.95-2.36-1.01C16.9 3 12 3 12 3h-.01s-4.89 0-8.19.38c-.46.06-1.46.06-2.36 1.01C.74 5.11.5 6.75.5 6.75S.25 8.68.25 10.6v1.8c0 1.93.25 3.85.25 3.85s.23 1.64.94 2.36c.9.96 2.08.93 2.6 1.03 1.89.18 8 .38 8 .38s4.9-.01 8.19-.38c.46-.06 1.46-.06 2.36-1.02.71-.72.94-2.36.94-2.36s.25-1.93.25-3.85v-1.8c0-1.93-.25-3.85-.25-3.85ZM9.65 14.98V7.9l6.44 3.55-6.44 3.53Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07Zm0 2.17c-3.15 0-3.5.01-4.73.07-.97.04-1.5.2-1.85.34-.46.18-.79.4-1.14.74-.34.35-.56.68-.74 1.14-.14.35-.3.88-.34 1.85-.06 1.23-.07 1.58-.07 4.73s.01 3.5.07 4.73c.04.97.2 1.5.34 1.85.18.46.4.79.74 1.14.35.34.68.56 1.14.74.35.14.88.3 1.85.34 1.23.06 1.58.07 4.73.07s3.5-.01 4.73-.07c.97-.04 1.5-.2 1.85-.34.46-.18.79-.4 1.14-.74.34-.35.56-.68.74-1.14.14-.35.3-.88.34-1.85.06-1.23.07-1.58.07-4.73s-.01-3.5-.07-4.73c-.04-.97-.2-1.5-.34-1.85a3 3 0 0 0-.74-1.14 3 3 0 0 0-1.14-.74c-.35-.14-.88-.3-1.85-.34-1.23-.06-1.58-.07-4.73-.07Zm0 3.69a4.98 4.98 0 1 1 0 9.96 4.98 4.98 0 0 1 0-9.96Zm0 8.21a3.23 3.23 0 1 0 0-6.46 3.23 3.23 0 0 0 0 6.46Zm6.34-8.4a1.16 1.16 0 1 1-2.33 0 1.16 1.16 0 0 1 2.33 0Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M18.24 2.5h3.3l-7.2 8.23L23 21.5h-6.63l-5.2-6.8-5.94 6.8H1.9l7.7-8.8L1 2.5h6.8l4.7 6.2 5.74-6.2Zm-1.16 17.02h1.83L6.98 4.38H5.02l11.06 15.14Z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d="M21.94 4.6 18.7 20.14c-.24 1.09-.88 1.36-1.78.85l-4.92-3.63-2.37 2.28c-.26.26-.48.48-.98.48l.35-4.98 9.06-8.19c.39-.35-.09-.55-.61-.2L6.6 12.9l-4.9-1.53c-1.07-.33-1.08-1.07.23-1.59L20.6 3.36c.89-.33 1.67.2 1.34 1.24Z" />
    </svg>
  );
}

const PROFILES: Profile[] = [
  { label: "GitHub", href: "https://github.com/Outlier1217", icon: <GitHubIcon /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mustak1217/", icon: <LinkedInIcon /> },
  { label: "YouTube", href: "https://www.youtube.com/@Outlier1217", icon: <YouTubeIcon /> },
  { label: "Instagram", href: "https://www.instagram.com/mustak_1217/?hl=en", icon: <InstagramIcon /> },
  { label: "X", href: "https://x.com/Mustak1217", icon: <XIcon /> },
  { label: "Telegram", href: "https://t.me/Outlier_Lab/1", icon: <TelegramIcon /> },
];

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-serif text-lg italic text-paper">Outlier Academy</p>
            <p className="mt-1 max-w-sm text-sm text-muted">
              Built and taught by Mustak — an outlier learning in public.
            </p>
          </div>

          <ul className="flex flex-wrap items-center gap-2">
            {PROFILES.map((p) => (
              <li key={p.label}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={p.label}
                  title={p.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-amber hover:text-amber"
                >
                  {p.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-xs text-muted">
          © {new Date().getFullYear()} Outlier Academy. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
