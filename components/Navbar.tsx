import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
  live: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Math", href: "/math", live: true },
  { label: "Physics", href: "#", live: false },
  { label: "Programming", href: "#", live: false },
  { label: "Finance", href: "#", live: false },
  { label: "Blogs", href: "#", live: false },
  { label: "Stories", href: "#", live: false },
  { label: "Contact Us", href: "#", live: false },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-ink/85 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-xl italic tracking-tight text-paper">
          Outlier <span className="text-amber">Academy</span>
        </Link>

        <ul className="flex items-center gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              {item.live ? (
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm text-paper/90 transition-colors hover:bg-surface2 hover:text-amber"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className="group relative inline-flex cursor-default items-center gap-1.5 rounded-md px-3 py-2 text-sm text-muted"
                  title={`${item.label} — coming soon`}
                >
                  {item.label}
                  <span className="rounded-full border border-border bg-surface2 px-1.5 py-0.5 text-[10px] text-muted">
                    Soon
                  </span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
