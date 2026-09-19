---
name: Confirm Event
colors:
  surface: '#FFFFFF'
  surface-dim: '#F3F5F7'
  surface-bright: '#FFFFFF'
  surface-container-lowest: '#FFFFFF'
  surface-container-low: '#F3F5F7'
  surface-container: '#FFFFFF'
  surface-container-high: '#E8ECF0'
  surface-container-highest: '#E0E1DD'
  on-surface: '#0D1B2A'
  on-surface-variant: '#415A77'
  inverse-surface: '#0D1B2A'
  inverse-on-surface: '#E0E1DD'
  outline: '#778DA9'
  outline-variant: '#415A77'
  surface-tint: '#415A77'
  primary: '#0D1B2A'
  on-primary: '#E0E1DD'
  primary-container: '#E8ECF0'
  on-primary-container: '#0D1B2A'
  inverse-primary: '#E0E1DD'
  secondary: '#415A77'
  on-secondary: '#E0E1DD'
  secondary-container: '#E8ECF0'
  on-secondary-container: '#0D1B2A'
  tertiary: '#778DA9'
  on-tertiary: '#0D1B2A'
  tertiary-container: '#E8ECF0'
  on-tertiary-container: '#415A77'
  error: '#E11D48'
  on-error: '#FFFFFF'
  error-container: '#FDE8EC'
  on-error-container: '#E11D48'
  background: '#F3F5F7'
  on-background: '#0D1B2A'
  surface-variant: '#E8ECF0'
  abyssal-navy: '#0D1B2A'
  indigo-slate: '#1B263B'
  muted-steel: '#415A77'
  mist-blue: '#778DA9'
  frost-white: '#E0E1DD'
  canvas: '#F3F5F7'
  card: '#FFFFFF'
  status-confirmed: '#15803D'
  status-pending: '#B45309'
  status-declined: '#E11D48'
dark:
  background: '#0D1B2A'
  on-background: '#E0E1DD'
  card: '#1B263B'
  on-card: '#E0E1DD'
  primary: '#E0E1DD'
  on-primary: '#0D1B2A'
  muted: '#283646'
  muted-foreground: '#778DA9'
  border: 'rgba(119, 141, 169, 0.18)'
  input: '#415A77'
  destructive: '#F87171'
  status-confirmed: '#4ADE80'
  status-pending: '#FBBF24'
  status-declined: '#F87171'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 3.25rem
    fontWeight: '700'
    lineHeight: 3.75rem
    letterSpacing: -0.025em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 2.25rem
    fontWeight: '700'
    lineHeight: 2.75rem
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 2rem
    fontWeight: '600'
    lineHeight: 2.5rem
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.5rem
    fontWeight: '600'
    lineHeight: 2rem
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.375rem
    fontWeight: '600'
    lineHeight: 1.875rem
    letterSpacing: -0.01em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 1.125rem
    fontWeight: '600'
    lineHeight: 1.625rem
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: 1.625rem
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: 1.5rem
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 0.8125rem
    fontWeight: '400'
    lineHeight: 1.25rem
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 0.75rem
    fontWeight: '600'
    lineHeight: 1rem
    letterSpacing: 0.06em
  label-sm:
    fontFamily: Inter
    fontSize: 0.6875rem
    fontWeight: '600'
    lineHeight: 0.875rem
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2.5rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system is an exclusive hospitality cockpit for curated guest lists and digital RSVP journeys. The **default theme is light**: a daylight salon of frost canvas, white cards, and abyssal-navy type. The same five brand colors (navy, slate, steel, mist, frost) invert in dark mode as **Nocturne VIP**.

The aesthetic fuses **Minimalism** with restrained **Glassmorphism**:
- **Visual Identity:** Architectural luxury in daylight. Frost canvas `#F3F5F7` and white cards `#FFFFFF` carry navy typography `#0D1B2A`, steel structure `#415A77`, and mist secondary text `#778DA9`.
- **Personality:** Discerning, architectural, sovereign, and composed.
- **Audience:** High-end event producers, luxury gala coordinators, private club concierges, and VIP guest lists demanding discretion and effortless elegance.
- **Tone:** Polished hospitality ("Hospitalidade de Alto Padrão"). Interactions are crisp, fluid, and deliberate.
- **Dark (Nocturne):** Optional `.dark` mode. Canvas `#0D1B2A`, cards `#1B263B`, frost typography `#E0E1DD`. Same personality, inverted elevation.

## Colors

The palette is the same brand spectrum in both themes. Light is the product default (`:root`). Dark lives only under `.dark`.

### Palette Roles (Light, default)
- **Primary Canvas (`#F3F5F7`):** Cool frost gray. Page background, modal underlays behind white sheets.
- **Key Surfaces (`#FFFFFF`):** Cards, header, popovers, registry tables.
- **Primary Interactive (`#0D1B2A`):** Abyssal Navy. Headlines, body text, and primary CTAs.
- **Secondary Accent & Structure (`#415A77`):** Muted Steel. Secondary typography, metric labels, input focus, outline borders.
- **Tertiary Mist (`#778DA9`):** Input borders, icon accents, placeholders, primary hover fill.
- **Contrasting Neutral (`#E0E1DD`):** Frost White. Text and icons on navy CTAs.

### Semantic Status Colors
- **Light:** Confirmed `#15803D`, Pending `#B45309`, Declined `#E11D48`.
- **Dark (Nocturne):** Confirmed `#4ADE80`, Pending `#FBBF24`, Declined `#F87171`.

## Typography

The typographic system pairs the geometric, confident curves of `Plus Jakarta Sans` for display hierarchies with the neutral, hyper-legible precision of `Inter` for data lists, guest forms, and interface controls.

- **Headlines (`Plus Jakarta Sans`):** Applied to gala titles, hero metrics, attendee counts, and modal headers. Its contemporary proportions convey forward-looking sophistication without archaic serif ornaments.
- **Body & Tabular Interface (`Inter`):** Applied to tabular guest registries, QR ticket passes, timestamp indicators, and field descriptions. Its neutral vertical metrics eliminate layout drift in data-intensive operational dashboards.
- **Labels & Micro-data:** Micro-labels and access tier identifiers utilize `Inter` in bold or semibold weights with uppercase letter-spacing (`+0.06em` to `+0.08em`) to enforce structural hierarchy.

## Layout & Spacing

Layouts follow a fluid, responsive 12-column grid anchored inside a maximum boundary of `1360px` for event management cockpits and `640px` for single-column mobile invitation experiences.

### Breakpoints & Canvas Logic
- **Desktop (1024px+):** 12 columns, `1.5rem` (`24px`) gutters, `2.5rem` (`40px`) page margins. Registry cards, guest lists, and analytical telemetry span harmoniously across multi-column modules.
- **Tablet (768px - 1023px):** 8 columns, `1.25rem` (`20px`) gutters, `2rem` (`32px`) margins. Side rails compress into quick-access iconic menus.
- **Mobile (< 768px):** 4 columns, `1rem` (`16px`) gutters, `1.25rem` (`20px`) margins. Forms and single-guest check-in screens collapse to 4 full columns with tap-friendly targets.

### Spacing Application
- Use `space-xs` (`4px`) and `space-sm` (`8px`) for status pill interior padding, action icons, and inline metadata badges.
- Use `space-md` (`16px`) for form inputs, table cell vertical rhythm, and dropdown item separation.
- Use `space-lg` (`24px`) and `space-xl` (`40px`) for major card interiors, hero invitation framing, and section boundaries.

## Elevation & Depth

Visual hierarchy is driven by tonal stacking, hairline steel outlines, and soft navy-tinted shadows — not muddy gray blobs.

### Depth Hierarchy (Light, default)
- **Level 0 (Atmospheric Canvas):** `#F3F5F7`.
- **Level 1 (Panels & Card Containers):** Solid `#FFFFFF` with a 1px border `rgba(65, 90, 119, 0.16)`. Ambient lift: `0 4px 20px rgba(13, 27, 42, 0.06)`. Header may use `rgba(255, 255, 255, 0.8)` with `12px` backdrop blur.
- **Level 2 (Hover States, Flyout Menus & Tooltips):** `0 12px 28px -4px rgba(13, 27, 42, 0.12), 0 0 0 1px rgba(65, 90, 119, 0.12)`.
- **Level 3 (RSVP Modals & Drawers):** Dimmed backdrop `rgba(13, 27, 42, 0.45)` with `16px` backdrop filter. Box shadow: `0 24px 48px -12px rgba(13, 27, 42, 0.18)`.

### Dark (Nocturne)
- **Level 0:** `#0D1B2A`.
- **Level 1:** `#1B263B` or `rgba(27, 38, 59, 0.7)` with `12px` blur, 1px `rgba(119, 141, 169, 0.18)`. Lift: `0 4px 20px rgba(0, 0, 0, 0.25)`.
- **Level 2:** `0 12px 28px -4px rgba(13, 27, 42, 0.6), 0 0 0 1px rgba(119, 141, 169, 0.3)`.
- **Level 3:** Backdrop `rgba(13, 27, 42, 0.85)` with `16px` blur. Shadow: `0 24px 48px -12px rgba(0, 0, 0, 0.7)`.

## Shapes

The shape vocabulary uses roundedness level `2` (`0.5rem` / `8px` base curve). This strikes a precise balance between architectural modernism and ergonomic luxury.

- **Inputs, Buttons, and Minor Controls:** `0.5rem` (`8px`) radius. Ensures precise tactile boundaries for desktop and handheld scanners.
- **Cards, RSVP Sheets, and Registry Tables:** `1rem` (`16px`, corresponding to `rounded-lg`) corner radii, conferring a contemporary card presentation reminiscent of anodized metal VIP credentials.
- **Modals & Slide-over Sheets:** `1.5rem` (`24px`, corresponding to `rounded-xl`) for soft containment.
- **Pills & Status Chips:** Full pill radius (`9999px`) reserved for status indicators, counter tags, and user avatars.

## Components

### Buttons
- **Primary Action ("Confirmar Presença", "Novo Evento"):** Abyssal Navy background (`#0D1B2A`) with Frost White text (`#E0E1DD`), font weight 600. On hover, fill shifts to Mist Blue (`#778DA9`) with frost text.
- **Secondary ("Visualizar Página", "Filtros"):** White surface, 1px border (`#778DA9`), navy text. On hover, the border brightens to `#415A77`.
- **Ghost / Destructive ("Remover"):** Transparent background with text in `#415A77` or semantic red `#E11D48`, shifting to a muted wash on hover.

**Dark (Nocturne):** Primary is Frost White on navy; secondary is slate `#1B263B` with `#415A77` border and frost text; destructive uses `#F87171`.

### Guest Status Chips & Access Badges
- Pill-shaped (`rounded-full`), padded with `0.25rem 0.75rem`, uppercase label in `label-sm` font.
  - **Confirmado (light):** Background `rgba(21, 128, 61, 0.12)`, text `#15803D`, 1px border `rgba(21, 128, 61, 0.25)`.
  - **Pendente (light):** Background `rgba(180, 83, 9, 0.12)`, text `#B45309`, 1px border `rgba(180, 83, 9, 0.25)`.
  - **Recusado (light):** Background `rgba(225, 29, 72, 0.12)`, text `#E11D48`, 1px border `rgba(225, 29, 72, 0.25)`.
  - **VIP / Black Tier:** Background `#0D1B2A`, text `#E0E1DD`, 1px border `#778DA9`.

**Dark (Nocturne):** Confirmado `#4ADE80`, Pendente `#FBBF24`, Recusado `#F87171`, each on a 12% wash of the same hue.

### Form Inputs & Selects
- Inputs feature background `#FFFFFF`, 1px border in `#778DA9`, text in `#0D1B2A`, and placeholder in `#415A77`.
- **Focus State:** Border transitions to `#415A77` with a subtle focus halo: `0 0 0 3px rgba(65, 90, 119, 0.2)`.
- **Height & Padding:** Minimum 44px touch height, padded with `space-md` horizontally.

**Dark (Nocturne):** Background `#0D1B2A`, border `#415A77`, text `#E0E1DD`, placeholder `#778DA9`, focus ring `rgba(119, 141, 169, 0.2)`.

### Cards & Metric Panels
- **Telemetry Cards:** Container in `#FFFFFF` with a 1px border in `rgba(65, 90, 119, 0.16)`. Stat values rendered in `display-lg-mobile` using `Plus Jakarta Sans` in `#0D1B2A`; supporting text in `body-sm` using `Inter` in `#415A77`. Positive deltas use `#15803D`.
- **RSVP Digital Invitation Card:** White or frosted white glass (`backdrop-filter: blur(12px)`), hairline border `#778DA9`, event header in `Plus Jakarta Sans` bold.

**Dark (Nocturne):** Cards `#1B263B`, stats in `#E0E1DD`, supporting text `#778DA9`, positive deltas `#4ADE80`.

### Tables & Guest Lists
- Light table rows (`#FFFFFF`) separated by razor-thin borders (`rgba(65, 90, 119, 0.12)`).
- Hover state washes the row with `rgba(65, 90, 119, 0.05)`.
- Rapid action controls stay in the rightmost cell.

**Dark (Nocturne):** Rows `#1B263B`, separators `rgba(119, 141, 169, 0.1)`, hover `rgba(119, 141, 169, 0.05)`.
