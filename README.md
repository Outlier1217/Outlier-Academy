# Outlier Academy

A simulation-first learning platform. Instead of reading about a
concept, the student types numbers into a live diagram and watches
the math respond in real time.

Built with Next.js (App Router) + TypeScript + Tailwind CSS +
react-three-fiber (Three.js) for 3D, on pnpm.

---

## What exists right now

### 1. Homepage (`app/page.tsx`)
- Hero section: headline, short pitch, a "Start with Math" CTA, and
  a link to the GitHub repo.
- A hand-built SVG diagram of a "function machine" (input → rule →
  output) that also explains domain and range in plain language —
  this replaces a generic decorative hero image with something that
  actually teaches the site's core idea.
- A 7-card section grid: **Math** (live), Physics, Programming,
  Finance, Blogs, Stories, Contact Us (all marked "Soon").

### 2. Shared layout (`components/Navbar.tsx`, `components/Footer.tsx`)
- Navbar: same 7 sections as the homepage grid, sticky at the top.
  Only "Math" is a real link; the rest show a "Soon" pill and are
  not clickable.
- Footer: short tagline plus icon links to all 6 of Mustak's
  profiles — GitHub, LinkedIn, YouTube, Instagram, X, Telegram.

### 3. Design system (`app/globals.css`, `tailwind.config.ts`, `app/layout.tsx`)
- Colors: ink-black background (`#0E1116`), amber accent
  (`#E8B84B`), teal accent (`#4FD1C5`), warm off-white text
  (`#E9E6DE`) — deliberately not the generic "dark + neon green"
  web3 look.
- Fonts: **Newsreader** (serif, italic) for headings and the
  wordmark, **IBM Plex Sans** for body text and UI, **IBM Plex
  Mono** for equations, coordinates, and numeric readouts.

### 4. Math section
- `app/math/page.tsx` — class picker. Class XI is live; Class X and
  XII are shown as "Coming soon".
- `app/math/class-11/page.tsx` — chapter picker for Class XI.
  **Relations and Functions** and **Complex Numbers** are live; the
  rest of the NCERT Class XI chapter list is shown as "Soon" so the
  page reads as a real syllabus, not a stub.

### 5. Chapter: Relations and Functions
`app/math/class-11/relations-and-functions/page.tsx`

Built around one reusable component:

**`components/FunctionSimulator3D.tsx`**
- Takes a math function (`fn`), a domain check (`domainCheck`), and
  axis ranges as props.
- Renders the curve as a live 3D line (react-three-fiber + drei),
  orbitable by dragging.
- Has a numeric input box. If the typed value is outside the
  domain, it shows a red error explaining *why* nothing plots there
  — this is the "wrong domain → error" behavior that was asked for.
- If the value is valid, it plots the point, draws dashed guide
  lines to both axes, and (optionally) draws a horizontal
  "line test" — the classic way to see, by eye, whether a function
  is one-one or many-one.

Three worked examples on the page:
1. **One-one, not onto** — f(x) = √(x − 1), domain x ≥ 1
2. **Onto, not one-one** — f(x) = x², codomain [0, ∞)
3. **Bijective (one-one and onto)** — f(x) = 2x + 3

### 6. Chapter: Complex Numbers
`app/math/class-11/complex-numbers/page.tsx`

Built around a small shared engine so the same rendering logic
powers all 13 diagrams on the page:

- **`lib/complexMath.ts`** — pure math helpers: `rectToPolar`,
  `polarToRect`, `addRect`, `multiplyRect`, `formatComplex`,
  `normalizeDeg`.
- **`components/complex/ArgandScene.tsx`** — the 3D rendering
  engine. Given a list of vectors, guide lines, an angle arc, a
  "modulus pillar" (a vertical bar in the z-direction whose height
  literally represents |z|), and/or a circle trace, it draws the
  whole Argand plane inside an orbitable 3D canvas.
- **`components/complex/SimulatorCard.tsx`** — the shared card
  shell (title, formula, description, canvas area, input sidebar)
  used by every diagram so they all look and behave consistently.

Diagrams built on top of that engine:

- **`components/complex/IntroComplexNumber.tsx`** — the very first,
  simplest diagram: type a and b, see z = a + bi plotted, read off
  |z| and arg(z).
- **`components/complex/ArgandDiagram3D.tsx`** — 6 variants, picked
  via a `variant` prop:
  1. Modulus (with a literal 3D height pillar for |z|)
  2. Argument (with an angle arc)
  3. Conjugate (mirrors z across the real axis)
  4. Negative (reflects z through the origin)
  5. Addition (parallelogram law, two inputs)
  6. Multiplication (moduli multiply, arguments add, two inputs)
- **`components/complex/PolarDiagram3D.tsx`** — 6 variants:
  1. Rectangular → polar conversion
  2. Plotting a point from (r, θ)
  3. Euler's exponential form z = r·e^(iθ), with a full circle
     trace showing the path z sweeps as θ varies
  4. Multiplying two numbers in polar form
  5. Dividing two numbers in polar form — includes a domain guard:
     if r₂ = 0, it shows an error instead of dividing by zero
  6. De Moivre's theorem (zⁿ)

Every one of the 13 diagrams has its own numeric input(s) and
recomputes and redraws live as you type.

### 7. Fullscreen viewing (applies to every diagram)
`components/FullscreenPanel.tsx`

- A small expand icon sits on every diagram's canvas. Clicking it
  expands that same canvas to fill the whole screen; Esc or the icon
  again collapses it back.
- The canvas is never unmounted during this - only the wrapping
  div's CSS classes change - so the camera angle and everything
  drawn stays exactly where it was.
- Wired once into `SimulatorCard.tsx` and once into
  `FunctionSimulator3D.tsx`, which is why it works across every
  diagram in every chapter without having to touch each one
  individually.

### 8. Chapter: Graph of a Quadratic Polynomial
`app/math/class-11/quadratic-polynomials/page.tsx`

- **`lib/quadraticMath.ts`** - pure math helpers: `evaluate`,
  `discriminant`, `vertex`, `realRoots`, `sumOfRoots`,
  `productOfRoots`.
- **`components/quadratic/QuadraticScene.tsx`** - the 3D rendering
  engine for parabolas: draws the curve, optional point markers
  (vertex, roots, y-intercept), an optional dashed vertical line
  (axis of symmetry), and optional colored segments along the
  x-axis (for showing where the polynomial is positive vs negative).
- **`components/quadratic/QuadraticDiagram3D.tsx`** - 6 variants,
  picked via a `variant` prop, all sharing the same a/b/c input:
  1. **Shape** - opens up or down depending on the sign of a
  2. **Vertex and axis of symmetry** - the turning point, marked
     with a dashed line through it
  3. **Roots (zeroes)** - via the discriminant D = b² - 4ac: two
     real roots, one repeated root, or none at all
  4. **y-intercept** - the point (0, c), read straight off the
     equation
  5. **Sum and product of roots** - checked against −b/a and c/a;
     when the roots are complex instead of real, this diagram notes
     that the formulas still hold even though nothing real plots
  6. **Sign analysis** - which stretches of the x-axis the
     polynomial is positive on and which it's negative on, split at
     the roots

  Same domain-guard pattern as the function simulators: typing
  a = 0 shows an error explaining that it's no longer a quadratic.

## Project structure (updated)

```
components/
  FullscreenPanel.tsx                            → fullscreen toggle, used by SimulatorCard and FunctionSimulator3D
  quadratic/
    QuadraticScene.tsx                            → reusable 3D parabola renderer
    QuadraticDiagram3D.tsx                         → 6 quadratic polynomial variants

lib/
  quadraticMath.ts                                → quadratic polynomial math helpers
```

---

## Project structure

app/
layout.tsx → fonts, global metadata
globals.css → theme tokens, base styles
page.tsx → homepage
math/
page.tsx → class picker
class-11/
page.tsx → chapter picker
relations-and-functions/
page.tsx → 3 function simulators
complex-numbers/
page.tsx → 13 complex-number simulators

components/
Navbar.tsx
Footer.tsx
FunctionSimulator3D.tsx → reusable function-graph engine
complex/
ArgandScene.tsx → reusable 3D Argand-plane renderer
SimulatorCard.tsx → shared card shell + input fields
IntroComplexNumber.tsx
ArgandDiagram3D.tsx → 6 Argand variants
PolarDiagram3D.tsx → 6 polar-form variants
lib/
complexMath.ts → complex-number math helpers


## Run locally / in Codespaces

```bash
pnpm install
pnpm dev
```

Open the forwarded port (usually `http://localhost:3000`).

## Fixed issues along the way

- **Server/Client boundary error** on the Relations and Functions
  page: functions (`fn`, `domainCheck`) were being passed as props
  from a Server Component into a Client Component, which Next.js
  cannot serialize. Fixed by marking the page itself as a Client
  Component with `"use client"` at the top of the file.

## How to add a new chapter or a new diagram

- **New function-based chapter** (like Relations and Functions):
  reuse `FunctionSimulator3D` — pass a new `fn`, `domainCheck`, and
  axis ranges.
- **New complex-number diagram**: add a new `variant` case to
  `ArgandDiagram3D.tsx` or `PolarDiagram3D.tsx` (whichever fits),
  describing what vectors/arcs/pillars to draw and what to compute
  — the rendering engine (`ArgandScene`) and layout (`SimulatorCard`)
  are already shared.
- **New chapter, new topic entirely**: add a folder under
  `app/math/class-11/`, mark it "live" in
  `app/math/class-11/page.tsx`, and build its own component(s)
  following the same pattern (numeric input → validation → 3D
  visualization → readout).