# Station Commercial Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a runnable React/Vite Prototype that demonstrates the station commercial space flow from login to interactive floor plan and shop detail.

**Architecture:** Keep route-level state in `App`, data contracts and mock data in `src/types.ts` and `src/data/mockData.ts`, and render each product surface through focused components. Use the provided floor plan as a public image and position HTML hotspots as percentage overlays inside a transformable map stage.

**Tech Stack:** React 19, TypeScript, Vite, lucide-react, CSS Modules avoided in favor of one product stylesheet for a coherent visual system.

**Spec:** `docs/superpowers/specs/2026-09-28-station-commercial-platform-design.md`

## Global Constraints

- Use the provided Wuchuan floor plan as the map image; do not redraw or crop it.
- Keep three shop power values at 30KW each and show the aggregate as 90KW.
- Accept any non-empty demo credentials without backend authentication.
- Preserve extensible Station/Floor/Shop/ShopMedia data shapes.
- Avoid backend, GIS, CAD parsing, complex auth, and invented shop photography.

---

### Task 1: Scaffold app and data contracts

**Files:**
- Create: `package.json`, `tsconfig.json`, `tsconfig.node.json`, `vite.config.ts`, `index.html`
- Create: `src/main.tsx`, `src/types.ts`, `src/data/mockData.ts`
- Copy: `public/assets/wuchuan-floor-plan.jpg`, `public/assets/wuchuan-space-schedule.png`

- [ ] Add Vite scripts and dependencies for React, TypeScript and lucide-react.
- [ ] Define Station, Floor, Shop, ShopMedia and route view unions.
- [ ] Add one station, one floor and three shop records with 45/93/73㎡ and 30KW each.
- [ ] Run `npm install --offline` and verify the dependency graph resolves.

### Task 2: Build login, overview and shell surfaces

**Files:**
- Create: `src/components/AppShell.tsx`
- Create: `src/components/LoginPage.tsx`
- Create: `src/components/StationOverview.tsx`
- Modify: `src/App.tsx`
- Create: `src/styles.css`

- [ ] Implement demo login validation and shell navigation.
- [ ] Render the Wuchuan station card with 1 floor, 3 spaces and 211㎡ total.
- [ ] Add a muted future-stations placeholder and the direct map CTA.
- [ ] Establish the dark technical visual language, typography, grid overlays and responsive rules.

### Task 3: Implement map viewer and shop drawer

**Files:**
- Create: `src/components/MapViewer.tsx`
- Create: `src/components/ShopInfoDrawer.tsx`
- Create: `src/components/StationMap.tsx`
- Modify: `src/App.tsx`, `src/styles.css`

- [ ] Add pointer drag and wheel zoom to a transformable map stage.
- [ ] Add zoom in/out, fit and reset controls.
- [ ] Overlay full-area percentage hotspots for 1F01/1F02/1F03 with hover labels and click callbacks.
- [ ] Show the selected shop in a right-side drawer without leaving the map.
- [ ] Show map stats using 211㎡ and 90KW.

### Task 4: Implement shop detail page and route completion

**Files:**
- Create: `src/components/ShopDetail.tsx`
- Modify: `src/App.tsx`, `src/styles.css`

- [ ] Add detail header with back-to-map action and selected shop metrics.
- [ ] Add honest empty media states for photos, video and contact fields.
- [ ] Verify 1F01, 1F02 and 1F03 can each reach their detail page from the drawer.

### Task 5: Verify build and browser flow

**Files:**
- Modify: any file needed to correct verified failures only.

- [ ] Run `npm run build` and record the exit code.
- [ ] Start Vite preview server and use browser automation at 1440×900.
- [ ] Capture screenshots for login, map with selected shop, and detail states.
- [ ] Test the full click path and confirm no console errors.
