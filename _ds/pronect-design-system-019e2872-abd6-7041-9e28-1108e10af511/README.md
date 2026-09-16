# ProNect Design System

The design system for **ProNect® Data Platform** — Promega's web-based hub for setting up assays, managing lab data, and connecting GloMax / MyGlo instruments to analysis apps.

> *"Designed to streamline your lab workflow, ProNect helps you set up assays, manage data, access protocols, and integrate with tools all from a single platform."* — Resource Center hero copy

---

## Components

| Component | Description |
|---|---|
| `AppCard` | Colorful assay card (assay / comingSoon / tool variants) |
| `ApplicationsTile` | Row of AppCards inside the dashboard tile |
| `Header` | Top bar with user chip and support button |
| `InstrumentsTile` | Instrument rows with status tracks |
| `MyDataTile` | Searchable table of analysis results |
| `Sidebar` | Dark left-rail nav with Sol selected state |
| `Dashboard` | Full screen — Applications tile + MyData + Instruments |
| `ReadPlate` | Full screen — Read Protocol, heatmap, reads list |
| `ResourceCenter` | Full screen — Hero band and product grid |
| `Settings` | Full screen — Notification preferences |

---

## Source materials

This system has two source lineages, and the codebase always wins where they overlap:

- **`PromegaCode/GspInstrumentDashboard` (GitHub, `main`)** — the real production app. `Sidebar` and `Header` are rebuilt directly from `src/components/Sidebar.js` / `Header.js`, `src/assets/styles/base/_sidebar.scss`, `_variables.scss`, `base.scss` (`.app-bar-header`), and `MaterialUiTheme.js`. See `github.md` for the sync record.
- **Diamond Release.fig** (Figma, reverse-engineered) — everything else in this kit (`AppCard`, `ApplicationsTile`, `InstrumentsTile`, `MyDataTile`, and the `Dashboard` / `ReadPlate` / `ResourceCenter` / `Settings` screens) still traces back to the Read-Plate-Tool, User-Dashboard-Revamp-v1, ProNect-Platform-Updates, CH-App-Updates and TPD-App-Updates pages of this file, and has **not** been checked against the real repo yet.

Two additional Figma files were referenced in the original brief but were never mounted: **Citrine Release.fig** (Local-Components, CTG-Standard-Curve, BacTiter-Glo, Resource-Center, App-Card-Updates, TPD-Error-Messages, CH-Updates, CTG-BTG-Engine-Errors, Results-Download, Device-Telemetry) and **Bismuth Release.fig** (Resource-Center, Settings-Revamp, Resources-Tile, Get-a-MyGlo-Link, Rename-Analysis-Result-Record, App-Home-Page-Resources, TPD-Updates, CTG-Graph-Tabs, Local-Components). If a component in this kit still reads as Figma-guesswork and looks wrong against the running app, treat the repo as the tiebreaker and rebuild it the way Sidebar/Header were rebuilt — the same repo has the source for every screen listed above.

No slide template was attached.

---

## Product context

**ProNect by Promega** is a desktop / large-tablet web platform (designed at 1366×768 and 1920×1080). It is the data-and-control plane for a family of luminescence-based cell-health and protein-degradation assays run on Promega's GloMax-family readers (GloMax / MyGlo / BGSimulator instruments).

It hosts three classes of surface:

1. **Dashboard apps** — one card per assay protocol:
   - **CellTiter-Glo** (cell viability)
   - **Caspase-Glo 3/7** (apoptosis)
   - **LDH-Glo** (cytotoxicity)
   - **BacTiter-Glo** (microbial ATP)
   - **TPD Kinetic** (targeted protein degradation) — runs on GloMax, not MyGlo
2. **Tools** — utilities like the **Read Plate Tool** (endpoint & time-course reads, heat-map results, plate-map analysis).
3. **Platform surfaces** — User Dashboard, Resource Center, Settings (notifications + account), Instrument Dashboard, GloFi-Lookup, plate-map / results renaming dialogs.

Apps run "for" a specific instrument (`for MyGlo`, `for GloMax`) — that pairing is part of the visual identity of every app card.

---

## What's in this folder

| Path | Purpose |
|---|---|
| `README.md` | This file — context, content rules, visual foundations, iconography. |
| `PATTERNS.md` | Canonical interaction & UX decisions from prototype work. **Supersedes README where they conflict.** |
| `SKILL.md` | Cross-compatible skill manifest for Claude Code use. |
| `colors_and_type.css` | All design tokens: brand colors, neutrals, status, app-category, typography, spacing, radii, shadows. |
| `fonts/` | Local copies of Roboto & Comic Neue (Google Fonts). |
| `assets/` | Logos, app-card backgrounds, app icons, sidebar icons, illustration SVGs. |
| `preview/` | Small HTML specimen cards for the Design System tab. |
| `ui_kits/pronect/` | Hi-fi recreation of the platform: User Dashboard, Resource Center, Settings, Read Plate Tool, Instrument list. |

---

## Content fundamentals

ProNect's voice is **clinical, second-person, and product-functional** — it reads like the UI of a lab instrument, not a marketing site.

**Tone & person.** UI strings address the user directly when needed (*"See what we're working on"*, *"Check out our latest updates and provide feedback"*) but most copy is bare nouns and noun-phrases: section titles (`Applications`, `My Data`, `Instruments`, `Read Protocol`, `Reads`), object names (`BacTiter-Glo atp lin with old plateMap`), and status words (`Available`, `Offline`, `Reading - 00:02:23`, `Reading - 23578min left`).

**Casing.**
- **Title Case** for section headers and tile titles: `Applications`, `My Data`, `Instruments`, `Read Protocol`, `Read Plate Tool`, `Resource Center`.
- **Sentence case** for body and helper copy: *"See what we're working on"*, *"Designed to streamline your lab workflow…"*.
- **PascalCase product names** are preserved verbatim: `CellTiter-Glo`, `Caspase-Glo 3/7`, `LDH-Glo`, `BacTiter-Glo`, `TPD Kinetic`, `ProNect`, `MyGlo`, `GloMax`. The hyphenated `-Glo` suffix is canonical — never `Glo` standalone, never `CellTiter Glo`.
- **NEW** labels are full-caps on a starburst badge.

**Person.**
- Default: third-person / no person (`Reading - 00:02:23`, `Coming Soon`, `Read Plate Tool`).
- "we"/"our" appears in marketing-y copy in the resource center (*"See what we're working on"*, *"…and provide feedback"*).
- The dashboard owner is shown as a real name in the top-right (e.g. `Milen Tasev`), not "Hello, Milen".

**Branded terms.**
- `ProNect®` carries the registered-trademark symbol in long-form copy ("ProNect® Resource Center").
- App cards always show a small `for MyGlo` (or `for GloMax`) underneath the assay name — `for` is 10px and `MyGlo` is 12–14px, both bold, right-aligned.

**Examples of canonical copy.**
- Tile titles: `Applications`, `My Data`, `Instruments`, `Read Protocol`, `Reads`
- Status: `Available`, `Offline`, `Reading - 23578min left`, `N/A`
- Dialog/CTAs: `ProNect & MyGlo Updates`, `Check out our latest updates and provide feedback`, `Coming Soon`, `See what we're working on`
- Empty/meta: `1094 Analyses`, `12 Instrument(s)`

**No emoji in product UI.** The Figma file uses 🟢 / 💎 status emojis on *Figma frame names* (developer signage), never inside the actual rendered UI.

---

## Visual foundations

### Aesthetic
ProNect is a **light, white-surface productivity dashboard with a single dark sidebar** and a wide rotation of **richly-photographed app-card backgrounds**. The mood is "Material Design × Promega print catalogue" — restrained, mostly white, with one bold yellow-gold brand thread and one bright purple "what's-coming" gradient.

### Colors
- **Promega Sol `#FDB813`** is the single most loaded brand color: logo glyph, checked-checkbox tick, selected-nav indicator, "Reading…" progress bar.
- **Sidebar `#292929`** is the only persistent dark surface. Everything else sits on white or warm-white (`#FEFCF4`).
- **App-card palette** mixes a saturated **orange `#EB5B26`** (CTG family) with bright **purple gradients** (`#7F1BAD → #C800FF`) for "Coming Soon" and **teal gradients** (`#0FA888 → #0D6670`) for tools. Each color carries an embedded full-bleed photo (cells, microbes, lab gear) at low opacity.
- **Type ink** is `#272D3B` for tile headlines and `#333333` for body. Secondary text steps through `#6B7280` → `#717171` → `#666666`.
- **Borders** are `#E5E7EB` for cards and `#D9D9D9` for inputs. Vertical rules between groups use `#BBBBBB @ 50% opacity`.

### Backgrounds
- **Page backdrop** on app surfaces is a soft photographic image (e.g. `ae0eec412b94.png`) that fills the whole window beneath the white panels.
- **Resource Center hero** layers a **diamond/purple gradient SVG mask** over a microscopy photo (`AdobeStock_1767089284`) for a dark, jewel-toned hero band.
- **Tiles themselves** are pure white with `radius: 16px` and a soft shadow.
- **App cards** use `radius: 10px`, `padding: 16px` and a `linear-gradient(color,color) , url(photo)` cocktail so the photo tints to the assay color.

### Animation
The Figma file does not encode motion, but the system reads as:
- **Fade + slight scale** for tile entry.
- **Linear progress bar** (the "Reading" indicator is a yellow rounded bar `#FDB813` 4px radius) — pair with a 200-300ms ease-in-out width transition.
- **Hover states** lift cards by 1–2px and shift shadow from `--shadow-1` → `--shadow-2`. No bounce, no spring.
- **Selected sidebar item** is marked by a thin Sol left-edge bar, not an icon-color swap — icons and labels stay white/full-opacity either way; only the inactive items dim to 50% opacity.

### Hover / press / focus
- **Hover:** background tint darkens 4–8% (or shifts to a defined hover variant), shadow steps up one level.
- **Press:** background drops one tone darker; no scale.
- **Selected:** sidebar items show a thin Sol left-edge bar (icon/label color never changes); checkboxes flip to a filled Sol square with a white tick.
- **Focus ring:** 2px `--primary-stroke` (`#3B82F6`) at 50% opacity — Material default.
- **Disabled:** 38% opacity, grey fills.

### Borders, dividers, shadows
- **Card borders** are 1px `#E5E7EB`; cards are usually borderless and rely on shadow.
- **Horizontal rules inside panels** are 1px `#E5E7EB` running edge-to-edge.
- **Vertical rules** are 1px wide × full-height, color `#BBBBBB @ 50%`, with `border-radius: 16` (decorative, even though they're 1px wide).
- **Material elevation 1/2/3** is used verbatim (the file has 23 instances of the canonical 3-stop Material shadow recipe; see `--shadow-1/-2/-3`).
- ProNect prefers **flat outlined cards with one elevated tile** rather than universal drop shadows. Tiles on the dashboard are elevated; everything inside them is flat.

### Radii
| Use | Radius |
|---|---|
| Page-frame outline | `2px` |
| Inputs, list rows | `4px` |
| Panels (Read Protocol box, Reads list, dialogs) | `8px` |
| App cards, Read Plate tile, "Coming Soon" card | `10px` |
| Top-level dashboard tiles (Applications, My Data) | `16px` |
| Pills, scrollbar, "NEW" badge | `9999px` |

### Layout rules
- **Sidebar** is `clamp(101px, 7.5vw, 284px)` wide on a `#292929` field. Exactly **3 items, always**: **Dashboard** (top, selected by default), **Resources**, **Settings** — no Feedback button, no hidden/optional Site Manager slot. Selection is a thin gold `#FDB913` bar flush left (full item height, `width:2.8%` of the sidebar); icons and labels never change color.
- **Logo** in the sidebar is a full-bleed `<img>`, `width:100%; height:clamp(45px,7vh,80px); object-fit:cover` — the real ProNect-by-Promega wordmark lockup, not a glyph+text build.
- **Header strip** runs across the top of the white canvas, `height:clamp(40px,5vh,120px)` — user name + chevron (opens Sign out) on the right, a divider, then a `Support` link with icon.
- **Tiles** stack vertically below the header with 24–28px gutters; left-padded 167px (1920w) or 123px (1366w).
- **App cards** are 153–226px wide × 170–181px tall, laid out in a flex row with a 12px gap, and the row ends with a vertical rule then a single Tools card.

### Use of transparency and blur
- The Coming-Soon card composites two backgrounds: a base solid + a top diagonal gradient with alpha (`rgba(200,0,255,0)` end-stop). This produces a magenta-to-orange edge that fades to underlying tone.
- White text on photos uses **no scrim** — the photo is already darkened underneath the colored gradient (e.g. orange `#EB5B26` linear-gradient *over* a microscopy png).
- Sidebar dividers are `rgba(255,255,255,0.1)`.

### Imagery vibe
- **Warm, slightly saturated, with depth-of-field.** Microscopy photos (cells in orange tones), bacteria (BacTiter-Glo card), molecules and lab tubes (TPD card), abstract microbiology (Coming Soon).
- Photos are always darkened and tinted by the overlaying solid/gradient — they never appear at full color fidelity.
- A jewel-purple background photo is used for the Resource Center hero band (rotated/skewed `matrix(-1,0,0,1,…)`).

### Backgrounds & patterns
- No repeating patterns. No hand-drawn illustrations in production UI.
- Whiteboard sketches (Comic Neue, hand-drawn rectangles) exist in `User-Dashboard-Revamp-v1/Whiteboard-Sketches-Initial-Concepts` — those are *internal sketches*, not a production motif. Do not use Comic Neue in production output.

---

## Iconography

ProNect uses a **mixed icon system** rooted in **Material Design Icons** (or a close in-house redraw of them), with a small set of **bespoke assay icons** for app cards.

### What's in the system

1. **Sidebar / nav glyphs (32×32, white stroke, real SVG files from the repo):** `Dashboard` (2×2 grid of squares), `Setting` (three slider tracks with knobs). `Resources` uses MUI's `CollectionsBookmarkIcon` filled white, `viewBox 0 0 24 24`. Exactly these 3 — there is no Site/Customer/Feedback glyph in the real sidebar. **Selection is a Sol (`#FDB813`) left-edge bar; icon fill never changes and stays white at all times.** (Sidebar bg is `#292929`.)

2. **UI control icons (22×22 / 16×16, black, outline):** `Search` (magnifying glass), `Calendar` (grid + tabs), `Direction=Left/Right/Down` (chevron). Match Material Symbols Outlined at 22dp; we substitute **Material Symbols Outlined** from CDN as the closest match.

3. **Status / action icons in list rows:** Edit (pencil-on-paper), Delete (trash), Download (down-tick), Pinned (star/bookmark — the Sol and grey stars in the My Data table). All Material-style monoline outline.

4. **Assay app icons (48×48 or 64×64, white, custom illustration):** `CellTiter-Glo` (cell shape), `Caspase-Glo 3/7` (split cell), `LDH-Glo` (droplet + ring), `BacTiter-Glo` (bacterium), `TPD` (molecule chain). These are **single-color SVGs intended to be filled with the card's tint** (white on the orange/purple/teal background). Copied as-is into `assets/`.

5. **"NEW" badge.** A starburst polygon outline filled white with the word `NEW` in bold black — used to flag freshly-released cards.

### Files in this kit

| File | Source | Use |
|---|---|---|
| `assets/logo-glyph.svg` | Figma Logo / Path-1 | The yellow "flame/wave" glyph next to the ProNect wordmark. Default fill = `currentColor`; set the wrapper color to `--promega-sol` (`#FDB813`). |
| `assets/icon-new-releases.svg`, `icon-new-releases-large.svg` | "NEW" starburst | Coming-soon / new-feature badge. |
| `assets/app-icon-celltiterglo.svg` | AppCellTiterGlo / Union | CTG cell illustration. White on orange. |
| `assets/app-icon-caspase-glo.svg` | AppCaspaseGlo37 / Union | Caspase apoptotic cell. |
| `assets/app-icon-ldh-glo.svg` | AppLDHGlo / Union | LDH droplet glyph. |
| `assets/app-icon-bactiter-fill.svg`, `…-stroke.svg` | AppBacTiterGlo | Bacterium pair (Bactiter-Glo). |
| `assets/app-icon-tpd75.svg` | Tpd75 / Union | TPD molecule. |
| `assets/resource-center-vector.svg` | Resource Center / Vector | Diamond gradient mask for hero. |
| `assets/app-cellbg-orange.png` | CTG card asset | Microscopy photo embedded behind the orange CTG gradient. |
| `assets/icon-nav_dashboard.svg` | `GspInstrumentDashboard` `src/assets/images/icons/Dashboard.svg` | 2×2 grid icon; 32×32, white strokes. Never recolored — selection is shown by the Sol left-edge bar, not the icon. |
| `assets/icon-nav_settings.svg` | `GspInstrumentDashboard` `src/assets/images/icons/Setting.svg` | 3-slider icon; 32×32, white strokes. Never recolored. |
| `assets/icon-support.svg` | `GspInstrumentDashboard` `src/assets/images/icons/Support.svg` | Header support glyph; black fill/stroke, 28×29, for use on the white header bar. |
| `assets/logo-lockup.svg` | Provided directly as real vector artwork (`ProNect-Logo.svg`) — replaces the old PNG and its broken pattern-fill SVG stub | Sidebar logo. Full-bleed `<img>`, `width:100%; height:clamp(45px,7vh,80px); object-fit:cover`. |

### Substitutions flagged

- For generic UI iconography (chevron, search, calendar, edit, delete, download, star) we link **Material Symbols Outlined** from Google Fonts CDN. The Figma file's icons are visually identical to Material Symbols Outlined at weight 400 / fill 0 / grade 0. **If the production codebase uses a different icon library (e.g. an internal `@promega/icons` package or a Tabler/Phosphor set), please point us at it and we'll re-skin.**

- No **icon font** was found in the Figma file — every glyph is either composed-shape geometry or an inline SVG path. Production likely has an SVG-component library; substitute `Material Symbols Outlined` until that is provided.

### Font substitutions
- **Roboto** and **Comic Neue** are both loaded from **Google Fonts** (no TTF files were embedded in the Figma binary). This matches the Figma file 1:1 and is the production intent for Roboto. If Promega licenses an in-house typeface (e.g. for marketing pages), we'll need the files.
- **`Allan Regular`** appeared exactly once at 200px in the Figma file as a one-off decorative caption — not part of the design system; the `--font-display` token has been removed rather than tracked.

---

## Naming confirmation — non-vocabulary component names

The following exported component names don't correspond to any named entity in ProNect's product vocabulary (app, screen, or UI-role word) because they were auto-derived from raw Figma layer names — sizes (`22`, `16`, `28`, `32`, `48`, `75`), Figma frame/node IDs, or generic device-chrome labels. These are **confirmed intentional**, not naming mistakes to fix:

- **Size-suffixed icon/asset names** (the numeral is the Figma icon-family size, e.g. `22/Calendar` → `Calendar22`): `AppIcon1K32`, `AppIcon2K48`, `AppIcon75`, `AppIcon752`, `Arrow16`, `Arrow162`, `Arrow163`, `Arrow164`, `Calendar22`, `Cas75`, `CTG75`, `Check16`, `Customer32`, `Dashboard32`, `Dashboard322`, `Delete16`, `Delete28`, `Download28`, `Eye28`, `Feedback32`, `Later16`, `Now16`, `Plus16`, `Search22`, `Selected16`, `Selected162`, `Setting32`, `Setting322`, `Site32`, `Support28`, `Tpd75`, `Well16`.
- **Figma frame-ID / browser-chrome names** (unlabeled device-frame or generated-ID layers): `BrowserUIHeight1366X`, `BrowserUIHeight1366X2`, `Frame1707479328`, `Frame1707479949`, `MacControls`, `WindowsBottomBar`, `WindowsControls`, `XAxis`, `M`.
- **Screen-local repeat instances** (see the naming note in each kit section below for the `2`/`3` suffix convention): `CheckboxS2`, `InputBox2`, `LDHGloHeader2`, `LDHGloSidebar2`.

Rename to product vocabulary only if a component graduates from the raw Bismuth/Citrine library into the curated `ui_kits/pronect/` recreation — until then these stay as literal Figma-derived names so they can be traced back to source.

---

## Bismuth kit — raw component library (`components/`)

Every component/token family from the mounted **Bismuth Release.fig** was materialized 1:1 into `components/` — raw, unstyled-by-intent extractions, not yet curated into the `ui_kits/pronect/` recreation above. Variant props are preserved (e.g. `size`, `color`, `state` on `Button`). Icons live separately in `components/icons/` (`Icon.jsx` + `icon-data.js`, 24 glyphs — see `Icon.d.ts` for names).

**None of this is a source of truth for anything, type included.** `components/Typography.jsx` in particular is a 25-variant Figma MUI-Typography dump with hardcoded literal font sizes/line-heights/letter-spacing and Material's default text color — it predates and has no relationship to this design system's actual type scale. For type, always use the `--pn-font-*` tokens in `colors_and_type.css` (matches `src/tokens/typography.json` in the published `@pronect/design-system` library 1:1) plus the role guidance in `PATTERNS.md` and `pronect-type-scale.css`. If you find yourself copying literal px/line-height values out of any file under `components/`, stop — that's this caveat being ignored.

**Components:** `Account`, `AppCardReadButton`, `AppIcon1K32`, `AppIcon2K48`, `AppIcon75`, `Arrow`, `Arrow16`, `Arrow163`, `Arrow164`, `BTGHeader`, `Back`, `Backdrop`, `BacticerGlo`, `BlinkingCursor`, `BlinkingCursor2`, `BrowserUIHeight1366X`, `Button`, `CHAppCard`, `Calendar22`, `CaspaseGlo`, `CellTiterGlo`, `Check16`, `CheckboxM`, `CheckboxS`, `ChevronLeftFilled`, `ChevronRightFilled`, `Chips`, `CloseTabBtn`, `Dashboard32`, `Dashboard322`, `DashboardNavItem`, `DataVizTabBar`, `DataVizTabItems`, `DateFilterBar`, `Delete28`, `Description`, `Dialog`, `DialogActions`, `DialogContent`, `DialogElements`, `DialogTitle`, `Download28`, `Dropdown`, `DropdownIcon`, `DropdownList`, `ErrorMsgTextTPDExceeds`, `ErrorMsgTextTPDLess`, `ErrorMsgTextTPDMissing`, `ErrorMsgTextTPDSample`, `Eye28`, `FavoriteBtn`, `Feedback`, `Feedback32`, `FilterDropdownBgS`, `FilterDropdownIconSelectM`, `Forward`, `Frame1707479328`, `Frame1707479949`, `Grid`, `Home`, `Image`, `InputBox`, `LDHGlo`, `LDHGloHeader`, `LDHGloSidebar`, `LibraryInstanceSlot`, `ListNumber`, `Logo`, `MacControls`, `MySite`, `NavBtn`, `Number`, `Pagination`, `Paper`, `Plus16`, `ProNectFrame`, `ProNectLogo`, `ProgressBarS`, `Reload`, `Search22`, `SearchTabsBtn`, `SearchbarS`, `Selected16`, `Setting`, `Setting32`, `Setting322`, `SideMenuBarDefault`, `Site32`, `Support28`, `TableBlock`, `TileBg`, `Typography`, `Well16`, `WindowsBottomBar`, `WindowsControls`, `XAxis`.

**Icons (`components/icons/Icon.jsx`, `name=`):** `CTG75`, `Calculate`, `Calendar22`, `Cas75`, `ChevronLeftFilled`, `ChevronRightFilled`, `CloudDone`, `CollectionsBookmarkRounded`, `Customer32`, `Dashboard32`, `Delete16`, `Feedback32`, `IconArrowSecure`, `Later16`, `LibraryBooks`, `LockFilled`, `Now16`, `Search22`, `Selected16`, `Setting32`, `Settings`, `Site32`, `Support28`, `Tpd75`.

Naming note: some names above (`Calendar22`, `Check16`, `Delete28`, `Eye28`, `Site32`, etc.) are filesystem-safe renames of Figma layer names that used slashes (`22/Calendar`, `16/Check`, `28/Delete`, `28/Eye`, `32/Site`) — same components, not new ones. `DashboardNavItem` was renamed from the kit's plain `Dashboard` to avoid colliding with the `Dashboard` screen in `ui_kits/pronect/screens/`.

Not yet built from this kit: the `16/Arrow` variant family (5 near-duplicate instances in the source; `Arrow`/`Arrow16`/`Arrow163`/`Arrow164` above cover the distinct ones), and the generic `image` placeholder families.

---

## Citrine kit — raw component library (`components/screens/`)

Every component from the mounted **Citrine Release.fig** was materialized 1:1 into `components/screens/<page>/`, grouped by the Figma page it came from. Same caveat as Bismuth: raw, unstyled-by-intent extractions, not curated into `ui_kits/pronect/`.

**CH Updates** (`components/screens/ch-updates/`): `AppCardUpdate`, `Cas75`, `LinearityDisplayIssues`, `ReadingScreen`, `TileBg2`, `Tpd75`, `UserDashboardInstrumentsTile`.

**BacTiter-Glo** (`components/screens/bactiter-glo/`): `AppIcon752`, `BTGDataVizDoseResponse`, `BTGDataVizDoseResponse2`, `BTGDataVizLinearityAnalysis`, `BTGDataVizSingleConcentration`, `BTGDataVizSingleConcentration2`, `BTGDesignElements`, `BTGWellEditor`, `CheckboxS2`, `InputBox2`, `Selected162`.

**CTG Standard Curve** (`components/screens/ctg-standard-curve/`): `Arrow162`, `BrowserUIHeight1366X2`, `CTGGraphs`, `CTGStandardCurveDoseResponse`, `CTGStandardCurveSingleConcentration`, `CTGStandardCurveWellWizard`, `Delete16`, `DRTooltipErrorBarsOff`, `DRTooltipErrorBarsOn`, `LDHGloHeader2`, `LDHGloSidebar2`, `M`, `Now16`.

**TPD Error Messages / Engine Errors** (`components/screens/error-messages/`): `EngineErrorMessageCTGBTG`, `EngineErrorMessageCTGBTG2`, `EngineErrorMessageGeneric`, `EngineErrorMessagePlatformAnalysis`, `EngineErrorMessagePlatformPR`, `EngineErrorMessagePlatformPlate`, `ErrorMsgTextTPDExceeds2`, `ErrorMsgTextTPDExceeds3`, `NOTReadyForDev`, `ReadyForDevelopment`, `TPDRenormalizationAlert`.

**Results Download** (`components/screens/results-download/`): `CHAppsAnalysisResults`, `DownloadingAnalysisResultsAfter30`, `DownloadingAnalysisResultsAfter5`, `DownloadingAnalysisResultsInitialDisplay`, `TPDAnalysisLibrary`, `TPDAppAnalysisResults`.

**Misc / Local Components** (`components/screens/misc/`): `Calculate`, `CloudDone`, `CollectionsBookmarkRounded`, `DesignSpecsAndAssets`, `NoDataAvailable`, `Offline`, `ProNectDataPlatform202510`, `ResponsiveMockups`.

Naming note: names ending in `2`/`3` (`BTGDataVizDoseResponse2`, `BrowserUIHeight1366X2`, `CheckboxS2`, `InputBox2`, `Selected162`, `LDHGloHeader2`, `LDHGloSidebar2`, `Arrow162`, `Delete16`, `Now16`, `M`, `EngineErrorMessageCTGBTG2`, `ErrorMsgTextTPDExceeds2`, `ErrorMsgTextTPDExceeds3`, `TileBg2`) are screen-local repeat instances of the same Figma component placed again on a different frame — same intentional pattern as the Bismuth kit's slash-name renames, not new components. Kept separate (not merged) because each instance carries screen-specific overrides (copy, state, size).

---

| Section | Where |
|---|---|
| Design tokens (CSS) | `colors_and_type.css` |
| Brand assets | `assets/` |
| Specimen cards (Design System tab) | `preview/*.html` |
| ProNect UI Kit (interactive recreation) | `ui_kits/pronect/index.html` |
| Interaction & pattern decisions | `PATTERNS.md` |
| Cross-tool skill manifest | `SKILL.md` |

---

## Caveats

- **`Sidebar` and `Header` are verified against the real `GspInstrumentDashboard` codebase** — everything else in this kit (`AppCard`, `ApplicationsTile`, `InstrumentsTile`, `MyDataTile`, and the four full screens) is still Figma-reverse-engineered and unverified against the repo. Treat those as a best guess until someone checks them against the running app.
- Citrine and Bismuth Figma releases were named in the original brief but never mounted. Re-attach them to fold in BTG / CTG data-viz, standard-curve panels, and the Bismuth settings revamp — or better, check whether that functionality already exists in the repo.
- Non-sidebar/header icons are still pulled from the Figma binary, not the codebase. If a production icon set exists there (Material Symbols, an in-house `@promega/icons` package, etc.), substitute and re-export the same way Dashboard/Setting/Support were.
- The `for MyGlo` / `for GloMax` micro-label is unique to ProNect and is preserved in the UI kit. If new instruments come online, extend the `<AppCard instrument>` prop.
