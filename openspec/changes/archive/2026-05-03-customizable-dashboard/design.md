## Context

The web app (`packages/web`) currently renders a static `HomePage` component at `/` showing hardcoded system info in a plain card. There is no interactivity or layout customization. The app uses React + Vite + Ant Design and follows a flat page-component structure under `packages/web/src/app/pages/`.

## Goals / Non-Goals

**Goals:**
- Replace `HomePage` with a `DashboardPage` that renders a responsive, draggable card grid
- Support three card width sizes: full (12/12 cols), half (6/12 cols), quarter (3/12 cols)
- Cards can be repositioned by dragging and resized via drag handles
- Persist layout in `localStorage` so it survives page refreshes
- Ship with two cards: System Info and Issue Count (mock data only)

**Non-Goals:**
- Backend API integration for real data (mock/static values only in this change)
- Adding or removing cards dynamically at runtime (fixed card set for now)
- Mobile/responsive adaptation beyond desktop viewport

## Decisions

### D1: Drag-and-drop library — `@dnd-kit/core` + `@dnd-kit/sortable`

`@dnd-kit` is a modern, accessible, tree-shaken React DnD library with no legacy dependencies. Alternative was `react-grid-layout`, which bundles its own CSS grid engine and is heavier. Since we only need reorder + discrete width snapping (not free-pixel resize), `@dnd-kit/sortable` covers the use case cleanly.

**Resizing**: Width changes are handled by a resize handle that cycles through `[3, 6, 12]` column values on drag release — no continuous pixel resize needed. This avoids a complex 2D resize implementation while still satisfying the requirement.

### D2: Layout model — column-span array in localStorage

Each card has a stable `id` and a `colSpan` (3 | 6 | 12). Layout state is `{ order: string[], spans: Record<string, 3 | 6 | 12> }` stored under `dashboard-layout` in localStorage. On first load, defaults are applied. This is the simplest model that satisfies persistence without a backend.

### D3: Grid system — CSS Grid with 12 columns

Ant Design's `Row/Col` grid maps to 12 columns. Cards render inside a 12-column CSS grid. `colSpan` maps directly to Ant Design `Col span` prop: full=24, half=12, quarter=6 (Ant uses a 24-column base; we'll use 24/12/6 equivalents).

### D4: Card shell — custom `DashboardCard` wrapper

A `DashboardCard` component wraps each widget, providing: drag handle (grip icon), resize handle (corner arrow), title bar, and content slot. This keeps card internals (SystemInfoCard, IssueCountCard) free of layout concerns.

## Risks / Trade-offs

- [Resize UX] Discrete width snapping via drag handle may feel unintuitive → Mitigation: add visual width indicator (e.g., "1/2") and tooltip on the resize handle
- [localStorage coupling] Layout tied to browser storage; clearing storage resets layout → Acceptable for initial scope; backend persistence can be added later
- [Ant Design 24-col] Ant's 24-column grid means "quarter" = span 6, "half" = span 12, "full" = span 24 — naming stays user-facing (full/half/quarter), internal values are 24/12/6

## Migration Plan

1. Create `DashboardPage` and card components alongside existing `HomePage`
2. Update the `/` route in `app.tsx` to point to `DashboardPage`
3. `HomePage` can be deleted or kept as dead code; delete it for cleanliness
4. No server-side changes; rollback = revert the route change

## Open Questions

- Should "quarter width" cards stack 4-across on large screens and 2-across on medium? (Deferred — desktop only for now)
- Should the dashboard have a global "reset layout" button? (Deferred to future iteration)
