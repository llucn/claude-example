## Why

The current homepage lacks meaningful at-a-glance information, leaving users without a quick overview of system health and issue activity. A customizable dashboard gives users the ability to organize relevant widgets to match their workflow.

## What Changes

- Replace the current homepage with a drag-and-drop dashboard layout
- Add a **System Info** card displaying environment/system metadata
- Add an **Issue Count** card showing ongoing and completed issue totals
- Cards support three width sizes: full (100%), half (50%), quarter (25%)
- Cards can be repositioned by dragging and resized via mouse drag handles
- Dashboard layout persists across sessions (local state for now, no backend required)

## Capabilities

### New Capabilities

- `dashboard-layout`: Grid-based dashboard container supporting drag-to-reorder and resize for cards, with layout persistence
- `dashboard-card-system-info`: Card displaying system information (app version, environment, platform)
- `dashboard-card-issue-count`: Card displaying issue statistics — ongoing and completed counts

### Modified Capabilities

- `webapp-navigation`: Update default/home route to render the dashboard instead of the previous home screen

## Impact

- Replaces or wraps the existing home screen component in the web app (`packages/webapp`)
- No new backend APIs required; cards display mock/static data initially
- May require a drag-and-drop library (e.g., `@dnd-kit/core` or `react-grid-layout`)
- Layout state stored in `localStorage` or React state
