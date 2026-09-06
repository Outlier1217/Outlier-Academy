# Outlier Academy

Simulation-first learning platform. Currently live: Math → Class XI → Relations and Functions,
with three interactive 3D function simulators (one-one, onto, bijective).

## Run in Codespaces

```bash
pnpm install
pnpm dev
```

Then open the forwarded port (usually 3000).

## Structure

- `app/page.tsx` — homepage (hero + section grid)
- `app/math/page.tsx` — class picker
- `app/math/class-11/page.tsx` — chapter picker for Class XI
- `app/math/class-11/relations-and-functions/page.tsx` — the three simulators
- `components/FunctionSimulator3D.tsx` — the reusable 3D simulator (input box,
  domain check, curve plot, horizontal-line test)
- `components/Navbar.tsx`, `components/Footer.tsx` — shared chrome; footer holds
  the profile links

## Adding a fourth simulator

Reuse `FunctionSimulator3D` — pass a new `fn`, `domainCheck`, axis ranges and an
`accent` color. It handles domain errors, the 3D curve, the input point and the
horizontal-line test automatically.
