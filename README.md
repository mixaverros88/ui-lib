# mgv-backoffice

Shared Vue 3 UI component library built with TypeScript and Tailwind CSS.

## Installation

```bash
npm install mgv-backoffice
```

### Peer Dependencies

These must be installed in your project:

```bash
npm install vue@^3.3.0 vue-router@^4.0.0 @heroicons/vue@^2.0.0
```

### Import Styles

Include the library's stylesheet in your app entry point:

```ts
import 'mgv-backoffice/dist/style.css'
```

### Tailwind Safelist

If your project uses Tailwind, import the safelist so dynamic classes used by this library are generated correctly:

```js
// In your Tailwind config
import safelist from 'mgv-backoffice/tailwind.safelist'
```

Or include the pre-built CSS safelist:

```css
@import 'mgv-backoffice/tailwind.safelist.css';
```

> Maintainers: `tailwind.safelist.js` is the single source of truth.
> `tailwind.safelist.css` is generated from it via `npm run safelist`
> (runs automatically before `npm run build`) — don't edit it by hand.

---

## Components

### BaseAlert

Dismissible alert banner with color-coded variants.

**Props:**

| Prop    | Type        | Default            | Description              |
| ------- | ----------- | ------------------ | ------------------------ |
| `title` | `String`    | `AlertEnum.ERROR`  | Text displayed in alert  |
| `color` | `AlertEnum` | `AlertEnum.ERROR`  | Alert color variant      |

**Example:**

```vue
<template>
  <BaseAlert title="Operation successful" :color="AlertEnum.SUCCESS" />
  <BaseAlert title="Something went wrong" :color="AlertEnum.ERROR" />
</template>

<script setup lang="ts">
import { BaseAlert, AlertEnum } from 'mgv-backoffice'
</script>
```

---

### BaseBadge

Colored status badge/pill.

**Props:**

| Prop    | Type     | Default | Description                       |
| ------- | -------- | ------- | --------------------------------- |
| `color` | `String` | —       | Color variant (use `ColorsEnums`) |

**Slots:** `default` — badge label content.

**Example:**

```vue
<template>
  <BaseBadge :color="ColorsEnums.GREEN">Active</BaseBadge>
  <BaseBadge :color="ColorsEnums.RED">Inactive</BaseBadge>
</template>

<script setup lang="ts">
import { BaseBadge, ColorsEnums } from 'mgv-backoffice'
</script>
```

---

### BaseBreadcrumb

Breadcrumb navigation. Provide items manually or pass a URL path for auto-generation.

**Props:**

| Prop    | Type            | Default     | Description                                |
| ------- | --------------- | ----------- | ------------------------------------------ |
| `items` | `BreadCrumb[]`  | `undefined` | Manual breadcrumb entries                  |
| `path`  | `String`        | `undefined` | URL path for auto-generated breadcrumbs    |

**BreadCrumb type:**

```ts
interface BreadCrumb {
  name: string
  url: string
}
```

**Example:**

```vue
<template>
  <!-- Manual -->
  <BaseBreadcrumb :items="[
    { name: 'Home', url: '/' },
    { name: 'Users', url: '/users' },
    { name: 'Profile', url: '/users/1' }
  ]" />

  <!-- Auto-generated from path -->
  <BaseBreadcrumb path="/users/settings/profile" />
</template>

<script setup lang="ts">
import { BaseBreadcrumb } from 'mgv-backoffice'
import type { BreadCrumb } from 'mgv-backoffice'
</script>
```

---

### BaseButton

Button with color, size, loading state, and Vue Router integration.

**Props:**

| Prop          | Type                                | Default               | Description                          |
| ------------- | ----------------------------------- | --------------------- | ------------------------------------ |
| `description` | `String`                            | **required**          | Button label text                    |
| `color`       | `String`                            | `BaseButtonEnum.BLUE` | Color variant (`BLUE`/`WHITE`/`DARK`/`GREEN`/`EMERALD`/`RED`/`YELLOW`/`PURPLE`/`SKY`/`GRAY`/`AMBER`) |
| `outline`     | `Boolean`                           | `false`               | Outlined/secondary style — transparent fill, coloured text + border, tinted hover (theme-aware) |
| `ghost`       | `Boolean`                           | `false`               | Ghost/borderless style — no border or fill, coloured text + tinted hover (theme-aware). For compact toolbar/action buttons |
| `to`          | `String`                            | —                     | Vue Router path (renders `<router-link>`) |
| `type`        | `'button' \| 'submit' \| 'reset'`  | `'button'`            | HTML button type                     |
| `iconLeft`    | `Boolean`                           | `false`               | Render the slot icon before the label |
| `isRounded`   | `Boolean`                           | —                     | Fully rounded corners                |
| `isDisable`   | `Boolean`                           | —                     | Disabled state                       |
| `size`        | `String`                            | —                     | Size variant (use `BaseButtonSizeEnum`) |
| `isLoading`   | `Boolean`                           | —                     | Show loading spinner                 |

**Slots:** `default`

**Example:**

```vue
<template>
  <BaseButton description="Submit" :color="BaseButtonEnum.GREEN" type="submit" />
  <BaseButton description="Go to Users" :to="'/users'" />
  <BaseButton description="Saving..." :isLoading="true" :isDisable="true" />
  <BaseButton
    description="Delete"
    :color="BaseButtonEnum.RED"
    :size="BaseButtonSizeEnum.SMALL"
  />
  <!-- Outlined / secondary -->
  <BaseButton description="Import" :color="BaseButtonEnum.EMERALD" outline iconLeft>
    <ArrowUpTrayIcon class="w-4 h-4 mr-1.5" />
  </BaseButton>
  <!-- Ghost / borderless toolbar action -->
  <BaseButton description="Logs" :color="BaseButtonEnum.SKY" ghost iconLeft :size="BaseButtonSizeEnum.SMALL">
    <ClipboardDocumentListIcon class="w-4 h-4 mr-1.5" />
  </BaseButton>
</template>

<script setup lang="ts">
import { BaseButton, BaseButtonEnum, BaseButtonSizeEnum } from 'mgv-backoffice'
</script>
```

---

### BaseLine

Horizontal divider with style variants.

**Props:**

| Prop   | Type     | Default         | Description       |
| ------ | -------- | --------------- | ----------------- |
| `mode` | `String` | `LineEnum.BASE` | Divider style     |

**Example:**

```vue
<template>
  <BaseLine />
  <BaseLine :mode="LineEnum.SQUARE" />
</template>

<script setup lang="ts">
import { BaseLine, LineEnum } from 'mgv-backoffice'
</script>
```

---

### BaseLogo

SVG brand logo component.

**Props:**

| Prop   | Type     | Default                | Description  |
| ------ | -------- | ---------------------- | ------------ |
| `size` | `String` | `BaseLoginEnum.MEDIUM` | Logo size    |

**Example:**

```vue
<template>
  <BaseLogo :size="BaseLoginEnum.LARGE" />
</template>

<script setup lang="ts">
import { BaseLogo, BaseLoginEnum } from 'mgv-backoffice'
</script>
```

---

### BaseModal

> ⚠️ **Deprecated.** Prefer [`BaseConfirmModal`](#baseconfirmmodal) for confirm/cancel
> flows or [`BaseModalShell`](#basemodalshell) for custom dialogs — they support dark
> mode, teleport to `<body>`, and slot-based composition. Kept for backward
> compatibility.

Confirmation dialog with support for delete and success modes. `DELETE` mode renders
the confirm/cancel pair; any other mode renders the title, optional `description`,
the default slot, and a single OK button that emits `closeModal`.

**Props:**

| Prop          | Type     | Default     | Description                         |
| ------------- | -------- | ----------- |-------------------------------------|
| `title`       | `String` | **required**| Modal heading                       |
| `description` | `String` | —           | Body text                           |
| `to`          | `String` | `"/"`       | Redirect path on confirm            |
| `mode`        | `String` | `'SUCCESS'` | Modal variant (use `BaseModalEnum`) |

**Events:**

| Event          | Description                     |
| -------------- | ------------------------------- |
| `closeModal`   | Emitted when modal is dismissed |
| `confirmModal` | Emitted on confirm action       |

**Example:**

```vue
<template>
  <BaseModal
    title="Delete this item?"
    description="This action cannot be undone."
    :mode="BaseModalEnum.DELETE"
    @closeModal="showModal = false"
    @confirmModal="handleDelete"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BaseModal, BaseModalEnum } from 'mgv-backoffice'

const showModal = ref(true)
const handleDelete = () => { /* ... */ }
</script>
```

---

### BaseRow

Card-like content container with border and shadow.

**Props:**

| Prop      | Type     | Default   | Description            |
| --------- | -------- | --------- | ---------------------- |
| `bgColor` | `String` | `"white"` | Background color class |

**Slots:** `default` — row content.

**Example:**

```vue
<template>
  <BaseRow>
    <p>Card content goes here</p>
  </BaseRow>
</template>

<script setup lang="ts">
import { BaseRow } from 'mgv-backoffice'
</script>
```

---

### BaseSpinner

Animated loading spinner — a neutral ring with a coloured leading arc.

**Props:**

| Prop    | Type                                                                       | Default  | Description                                                  |
|---------|----------------------------------------------------------------------------|----------|-------------------------------------------------------------|
| `size`  | `'sm' \| 'md' \| 'lg' \| 'xl'`                                              | `'sm'`   | Diameter + ring thickness — 16 / 24 / 32 / 48px.            |
| `color` | `'blue' \| 'emerald' \| 'sky' \| 'indigo' \| 'teal' \| 'purple' \| 'red' \| 'amber'` | `'blue'` | Colour of the spinning arc. The track stays neutral gray.   |

With no props it renders the original 16px blue spinner, so existing call sites are unaffected.

**Example:**

```vue
<template>
  <!-- legacy default -->
  <BaseSpinner />
  <!-- larger, themed -->
  <BaseSpinner size="lg" color="emerald" />
</template>

<script setup lang="ts">
import { BaseSpinner } from 'mgv-backoffice'
</script>
```

---

### BaseToast

Toast notification with positioning and auto-dismiss.

**Props:**

| Prop           | Type             | Default   | Description                                |
| -------------- | ---------------- | --------- | ------------------------------------------ |
| `mode`         | `BaseToastEnum`  | **required** | Toast variant (SUCCESS, WARNING, ERROR) |
| `description`  | `String`         | **required** | Message text                            |
| `hasCloseIcon` | `Boolean`        | `true`    | Show close button                          |
| `positioning`  | `String`         | `'right'` | Screen position (use `PositioningEnum`)    |

**Example:**

```vue
<template>
  <BaseToast
    :mode="BaseToastEnum.SUCCESS"
    description="Changes saved successfully!"
    :positioning="PositioningEnum.TOP_RIGHT"
  />
</template>

<script setup lang="ts">
import { BaseToast, BaseToastEnum, PositioningEnum } from 'mgv-backoffice'
</script>
```

---

### ColoredSquares

Colored square indicator with randomized pastel accent.

**Props:**

| Prop    | Type     | Default | Description                       |
| ------- | -------- | ------- | --------------------------------- |
| `color` | `String` | —       | Color variant (use `ColorsEnums`) |

**Slots:** `default` — label content.

**Example:**

```vue
<template>
  <ColoredSquares :color="ColorsEnums.BLUE">Category A</ColoredSquares>
</template>

<script setup lang="ts">
import { ColoredSquares, ColorsEnums } from 'mgv-backoffice'
</script>
```

---

### EarningsCard

Earnings summary card with formatted currency display.

**Props:**

| Prop       | Type     | Default                 | Description          |
| ---------- | -------- |-------------------------|----------------------|
| `title`    | `String` | `'TOTAL EARNINGS'`      | Card heading         |
| `amount`   | `Number` | `0`                     | Monetary value       |
| `subtitle` | `String` | `'Lifetime commission'` | Subheading text      |
| `badge`    | `String` | `''`                    | Optional badge label |
| `currency` | `String` | `'$'`                   | Currency symbol      |
| `decimals` | `Number` | `2`                     | Fraction digits shown for the amount |

**Example:**

```vue
<template>
  <EarningsCard
    title="Monthly Revenue"
    :amount="12500"
    subtitle="April 2026"
    currency="€"
  />
</template>

<script setup lang="ts">
import { EarningsCard } from 'mgv-backoffice'
</script>
```

---

### EuroAmount

Formatted euro currency display with conditional color coding.

**Props:**

| Prop           | Type      | Default | Description                                     |
| -------------- | --------- | ------- |-------------------------------------------------|
| `amount`       | `Number`  | —       | Value to display                                |
| `beforeAmount` | `Number`  | `null`  | Previous value (green if amount > beforeAmount) |
| `showCurrency` | `Boolean` | `true`  | Show euro symbol                                |

**Example:**

```vue
<template>
  <!-- Shows green (amount > beforeAmount) -->
  <EuroAmount :amount="1500" :beforeAmount="1200" />

  <!-- Shows red (negative) -->
  <EuroAmount :amount="-300" />

  <!-- Without currency symbol -->
  <EuroAmount :amount="800" :showCurrency="false" />
</template>

<script setup lang="ts">
import { EuroAmount } from 'mgv-backoffice'
</script>
```

---

### Pagination

Page navigation with smart ellipsis for large page counts.

**Props:**

| Prop           | Type     | Default | Description             |
| -------------- | -------- | ------- | ----------------------- |
| `totalItems`   | `Number` | `10`    | Total number of items   |
| `itemsPerPage` | `Number` | `20`    | Items shown per page    |

**Events:**

| Event          | Payload  | Description                      |
| -------------- | -------- |----------------------------------|
| `page-changed` | `Number` | Emitted with the new page number |

**Example:**

```vue
<template>
  <Pagination
    :totalItems="200"
    :itemsPerPage="10"
    @page-changed="onPageChange"
  />
</template>

<script setup lang="ts">
import { Pagination } from 'mgv-backoffice'

const onPageChange = (page: number) => {
  console.log('Page:', page)
}
</script>
```

---

### TrendArrow

Up/down trend indicator displayed as a colored badge.

**Props:**

| Prop     | Type     | Default | Description                                          |
| -------- | -------- | ------- |------------------------------------------------------|
| `number` | `Number` | —       | Positive = green arrow up, negative = red arrow down, zero = neutral gray dash |
| `icon`   | `String` | —       | Optional suffix appended after the number (e.g. `"%"`) |

**Example:**

```vue
<template>
  <TrendArrow :number="12.5" />   <!-- Green up arrow -->
  <TrendArrow :number="-3.2" />   <!-- Red down arrow -->
  <TrendArrow :number="0" />      <!-- Neutral gray dash -->
</template>

<script setup lang="ts">
import { TrendArrow } from 'mgv-backoffice'
</script>
```

---

## Enums

All enums are importable directly from the package:

```ts
import {
  AlertEnum,
  BaseBadgeEnum,
  BaseButtonEnum,
  BaseButtonSizeEnum,
  BaseLoginEnum,
  BaseModalEnum,
  BaseToastEnum,
  ColorsEnums,
  LineEnum,
  PositioningEnum
} from 'mgv-backoffice'
```

| Enum                 | Values                                                        |
| -------------------- |---------------------------------------------------------------|
| `AlertEnum`          | `WARNING`, `ERROR`, `SUCCESS`, `INFO`                         |
| `BaseBadgeEnum`      | `WIN`, `LOSE`                                                 |
| `BaseButtonEnum`     | `RED`, `BLUE`, `WHITE`, `DARK`, `GREEN`, `YELLOW`, `PURPLE`   |
| `BaseButtonSizeEnum` | `EXTRA_SMALL`, `SMALL`, `BASE`, `LARGE`, `EXTRA_LARGE`        |
| `BaseLoginEnum`      | `SMALL`, `MEDIUM`, `LARGE`                                    |
| `BaseModalEnum`      | `DELETE`, `SUCCESS`                                           |
| `BaseToastEnum`      | `SUCCESS`, `WARNING`, `ERROR`                                 |
| `ColorsEnums`        | `NONE`, `RED`, `YELLOW`, `BLACK`, `GRAY`, `GREEN`, `BLUE`     |
| `LineEnum`           | `BASE`, `BASE_SHORTER`, `SQUARE`                              |
| `PositioningEnum`    | `TOP_LEFT`, `TOP_RIGHT`, `BOTTOM_LEFT`, `BOTTOM_RIGHT`        |

---

## Types

```ts
import type { BreadCrumb, PnL, PnLInputs } from 'mgv-backoffice'
```

| Type         | Shape                                  |
| ------------ | -------------------------------------- |
| `BreadCrumb` | `{ name: string; url: string }`        |
| `PnLInputs`  | `{ buyPrice; lastPrice; filledQty }` (each `number \| string \| null \| undefined`) |
| `PnL`        | `{ pnlUsd: number \| null; pnlPct: number \| null }` |

---

## Utilities

```ts
import { getBaseColor, getBaseColorOf } from 'mgv-backoffice'
```

| Function         | Signature                          | Returns                             |
| ---------------- | ---------------------------------- | ----------------------------------- |
| `getBaseColor`   | `(c: AlertEnum) => string`         | Tailwind color name for alert type  |
| `getBaseColorOf` | `(c: ColorsEnums) => string`       | Tailwind color name for color enum  |

### HTTP colours

```ts
import {
  methodBadgeSolid,
  methodBadgeBright,
  statusBadgeSolid,
  statusBadgeTinted,
} from 'mgv-backoffice'
```

Tailwind class helpers for HTTP method and status code badges. `Solid` variants
return saturated `bg-*-600` classes for use on neutral surfaces; `Bright` /
`Tinted` variants return softer combinations suitable for cards. `statusBadgeTinted`
takes `(status, isDark)` to adapt between themes.

### HTML sanitizer

```ts
import { sanitizeHtml, isSafeHref } from 'mgv-backoffice'
```

| Function       | Signature                                       | Returns |
| -------------- | ----------------------------------------------- | ------- |
| `sanitizeHtml` | `(raw: string \| undefined \| null) => string`  | Allow-list–sanitised HTML safe for `v-html`. |
| `isSafeHref`   | `(value: string) => boolean`                    | `true` if the href uses a safe scheme (http/https/mailto/tel, root-relative, or anchor). |

Allow-list sanitizer for strings bound into `v-html`. Keeps a small set of
formatting tags (`a`, `b`/`strong`, `i`/`em`, `code`, `pre`, `p`, `ul`/`ol`/`li`,
`span`, `div`, `br`), strips all other elements (unwrapping to text, or dropping
content entirely for `script`/`style`/`iframe`/etc.), removes every attribute
except `href`/`title` on anchors, rejects unsafe href schemes
(`javascript:`/`data:`/`vbscript:`/`file:`), and hardens surviving links with
`rel="noopener noreferrer" target="_blank"`. Browser-only (uses `DOMParser`).

```ts
sanitizeHtml('<p>Hi<script>alert(1)<\/script></p>') // '<p>Hi</p>'
```

### Display formatters

```ts
import {
  fmtNumber,
  fmtDate,
  fmtDateTime,
  fmtDateShort,
  fmtPrice,
  fmtPct,
  fmtUsd,
} from 'mgv-backoffice'
```

Locale-aware, pure, dependency-free formatters for tables, logs and charts.
They handle missing/non-finite input gracefully (rendering an em-dash) so raw
API values can be passed without pre-sanitising.

| Function       | Signature                                                       | Returns |
| -------------- | --------------------------------------------------------------- | ------- |
| `fmtNumber`    | `(n: number \| string \| null \| undefined, digits = 4) => string` | Fixed-fraction number; em-dash for null/undefined/non-finite. Accepts numeric strings. |
| `fmtDate`      | `(s: string \| number \| null \| undefined) => string`          | Locale date-time from ISO string or epoch; em-dash on empty, raw value on parse failure. |
| `fmtDateTime`  | `(ms: number) => string`                                        | Compact `"Mon D, HH:MM"` label from epoch-millis (chart axes/tooltips). |
| `fmtDateShort` | `(ms: number) => string`                                        | Short `"Mon D"` calendar label from epoch-millis. |
| `fmtPrice`     | `(n: number) => string`                                         | Price with precision that scales to magnitude (more decimals for sub-cent values). |
| `fmtPct`       | `(n: number, digits = 2) => string`                             | Percentage with explicit sign, e.g. `"+2.50%"`. |
| `fmtUsd`       | `(v: number) => string`                                         | Signed USD amount with leading sign, e.g. `"+$5.00"`. |

### Profit & loss

```ts
import { computePnL } from 'mgv-backoffice'
import type { PnL, PnLInputs } from 'mgv-backoffice'
```

| Function     | Signature                       | Returns |
| ------------ | ------------------------------- | ------- |
| `computePnL` | `(row: PnLInputs) => PnL`       | Unrealised mark-to-market PnL in absolute USD and percent. Returns `{ pnlUsd: null, pnlPct: null }` when any input is missing, non-finite, or `buyPrice <= 0`. |

```ts
interface PnLInputs {
  buyPrice: number | string | null | undefined
  lastPrice: number | string | null | undefined
  filledQty: number | string | null | undefined
}

interface PnL {
  pnlUsd: number | null
  pnlPct: number | null
}
```

```ts
computePnL({ buyPrice: 100, lastPrice: 110, filledQty: 5 })
// { pnlUsd: 50, pnlPct: 10 }
```

---

## Layout & shells (Tier 2 — full backoffice chrome)

### BaseAppLayout

Root layout: dark/light page background, skip link, `<main>`-with-inert wrapper.

**Props:**

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `showSidebar` | `Boolean` | `true` | Render the `sidebar` slot. Set false for full-bleed pages. |
| `skipLinkLabel` | `String` | `'Skip to main content'` | Label for the accessibility skip link. |

**Slots:** `sidebar`, `default` (page content).

```vue
<BaseAppLayout :show-sidebar="route.name !== 'presentation'">
  <template #sidebar><AppSidebar /></template>
  <RouterView />
</BaseAppLayout>
```

### BaseSidebar

Responsive sidebar with desktop fixed-positioning and mobile off-canvas
behavior, focus management, optional theme toggle, and configurable nav
sections.

**Props:**

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `sections` | `NavSection[]` | **required** | Grouped nav items. |
| `homeRouteName` | `String` | `'home'` | Route name for the logo / "go home" click. |
| `appName` | `String` | `''` | Optional app name in the footer. |
| `version` | `String` | `''` | Optional version string in the footer. |
| `showThemeToggle` | `Boolean` | `true` | Toggle the dark/light switch in the footer. |

**Slots:**

| Slot     | Slot props | Description |
| -------- | ---------- | ----------- |
| `logo`   | `{ size }` | Brand logo. Receives a `size` hint (28px in mobile bar, 52px in sidebar). |
| `status` | —          | Footer status row (e.g. health indicator, sync state). |
| `footer` | —          | Replaces the default `appName v0` line. |

**Types:**

```ts
import type { NavItem, NavSection } from 'mgv-backoffice'

interface NavItem {
  name: string       // Vue Router route name
  label: string      // display text
  icon: Component    // typically a Heroicon
}

interface NavSection {
  title: string
  items: NavItem[]
}
```

```vue
<BaseSidebar :sections="navSections" home-route-name="projects" app-name="WireMate UI" :version="appVersion">
  <template #logo="{ size }"><WireMateLogo :size="size" /></template>
  <template #status>
    <HealthIndicator />
  </template>
</BaseSidebar>
```

---

## Modals & sections

### BaseModalShell

Shared modal chrome — `Teleport` to body, backdrop, themed card, escape key,
aria-modal. Compose this rather than building modals from scratch.

**Props:**

| Prop            | Type      | Default     | Description |
| --------------- | --------- | ----------- | ----------- |
| `title`         | `String`  | **required** | Modal heading. |
| `maxWidthClass` | `String`  | `'max-w-md'` | Tailwind max-w utility for the card. |
| `manualClose`   | `Boolean` | `false`     | If true, backdrop click and Escape do NOT auto-emit `cancel`. |
| `scrollable`    | `Boolean` | `false`     | Switch to the large-content layout: a flex column capped at `90vh` with a fixed header/footer and a scrolling body. |
| `subtitle`      | `String`  | `''`        | Muted line under the title (scrollable layout only). |

**Slots:** `icon`, `default`, `footer`, and (scrollable layout) `header-actions` — content on the right of the header, e.g. a close button.
**Events:** `cancel`, `backdrop`.

### BaseConfirmModal

Confirmation dialog built on `BaseModalShell`. Variant chooses red (danger) or
amber (warning) styling.

**Props:** `title`, `message`, `confirmText`, `cancelText`, `submittingText`,
`variant: 'danger' | 'warning'`, `submitting`.

**Events:** `confirm`, `cancel`.

### BaseTextInputModal

"Ask the user for a single string and confirm" dialog. Preserves typed input
on stray backdrop clicks; Escape always cancels.

**Props:** `title`, `message`, `initialValue`, `placeholder`, `inputLabel`,
`confirmText`, `cancelText`, `submittingText`, `submitting`.

**Slots:** `icon` — override the default emerald document icon.
**Events:** `confirm(value: string)`, `cancel`.

### BaseEntityPickerModal

Searchable "pick one from a list" dialog. Pass `items` directly or an async
`loader` that runs on mount.

**Props:** `title`, `message?`, `items?: EntityPickerItem[]`,
`loader?: () => Promise<EntityPickerItem[]>`, `excludeId?`,
`variant: 'emerald' | 'purple' | 'blue' | 'red' | 'amber'`,
`searchPlaceholder`, `emptyMessage`, `noMatchMessage`, `confirmText`,
`cancelText`, `submittingText`, `submitting`.

**Events:** `confirm(itemId: string)`, `cancel`.

```ts
interface EntityPickerItem { id: string; label: string }
```

### BaseCollapsibleSection

Section wrapper with a clickable header, optional badge, and a `default` slot
for the body. Parent owns the `collapsed` state.

**Props:** `title`, `collapsed`, `badge?`, `bodyClass?`.
**Events:** `toggle`.

### BaseNotFoundPage

Drop-in 404 view.

**Props:** `code` (`'404'`), `message` (`'Page not found'`),
`homeRouteName` (`'home'`), `homeLabel` (`'Go home'`).

### BasePageHeader

Page-level header: icon badge + title/subtitle on the left, action
buttons on the right. Gives top-level views a consistent header shape
and width.

**Props:**

| Prop            | Type     | Default       | Description |
| --------------- | -------- | ------------- | ----------- |
| `title`         | `String` | **required**  | H1 text. |
| `subtitle`      | `String` | `''`          | Muted line below the title. |
| `iconColor`     | `String` | `'emerald'`   | Badge + icon colour: `'emerald' \| 'sky' \| 'red' \| 'amber'`. |
| `maxWidthClass` | `String` | `'max-w-4xl'` | Tailwind max-w utility constraining header width. |

**Slots:**

| Slot      | Slot props        | Description |
| --------- | ----------------- | ----------- |
| `icon`    | `{ iconClass }`   | Page Heroicon. Bind `:class="iconClass"` for the theme-aware colour. |
| `actions` | —                 | Buttons rendered on the right (refresh, destructive, etc.). |

```vue
<template>
  <BasePageHeader title="Request Journal" subtitle="Recent matched requests" icon-color="sky">
    <template #icon="{ iconClass }">
      <DocumentTextIcon class="w-5 h-5" :class="iconClass" />
    </template>
    <template #actions>
      <BaseButton description="Refresh" @click="reload" />
    </template>
  </BasePageHeader>
</template>

<script setup lang="ts">
import { BasePageHeader, BaseButton } from 'mgv-backoffice'
import { DocumentTextIcon } from '@heroicons/vue/24/outline'
</script>
```

---

### BaseToolbarButton

Bordered toolbar button — the "Refresh / Delete All" row that sits under
a page header. Optional leading icon (via slot) plus a label.

**Props:**

| Prop       | Type      | Default     | Description |
| ---------- | --------- | ----------- | ----------- |
| `label`    | `String`  | `''`        | Button text. Omit for an icon-only button. |
| `variant`  | `String`  | `'neutral'` | `'neutral'` (grey) or `'danger'` (solid red). |
| `disabled` | `Boolean` | `false`     | Greys out and blocks the click. |
| `title`    | `String`  | `undefined` | Native tooltip / a11y text. |
| `type`     | `String`  | `'button'`  | Native button type. |

**Slots:**

| Slot   | Slot props      | Description |
| ------ | --------------- | ----------- |
| `icon` | `{ iconClass }` | Leading Heroicon. Bind `:class="iconClass"` (`w-4 h-4`); add state classes as needed. |

**Emits:** `click` (native `MouseEvent`).

```vue
<template>
  <BaseToolbarButton label="Refresh" :disabled="isLoading" title="Refresh" @click="reload">
    <template #icon="{ iconClass }">
      <ArrowPathIcon :class="[iconClass, { 'animate-spin': isLoading }]" />
    </template>
  </BaseToolbarButton>
  <BaseToolbarButton label="Delete All" variant="danger" @click="deleteAll">
    <template #icon="{ iconClass }">
      <TrashIcon :class="iconClass" />
    </template>
  </BaseToolbarButton>
</template>
```

---

### BaseActionButton

Compact ghost action button — the colour-coded "Edit / Logs / Stub /
Delete" actions on a card footer or action row. No border/fill at rest;
a tinted hover background keyed to the semantic colour.

**Props:**

| Prop        | Type      | Default     | Description |
| ----------- | --------- | ----------- | ----------- |
| `label`     | `String`  | `''`        | Button text. Omit for an icon-only button. |
| `color`     | `String`  | `'emerald'` | `'emerald' \| 'sky' \| 'indigo' \| 'teal' \| 'purple' \| 'red' \| 'amber' \| 'amberStrong'`. |
| `disabled`  | `Boolean` | `false`     | Dims via opacity and suppresses the hover tint. |
| `fullWidth` | `Boolean` | `false`     | Stretch to fill its flex row (`flex-1`). |
| `title`     | `String`  | `undefined` | Native tooltip. |
| `ariaLabel` | `String`  | `undefined` | Accessible label. |
| `type`      | `String`  | `'button'`  | Native button type. |

**Slots:**

| Slot   | Slot props      | Description |
| ------ | --------------- | ----------- |
| `icon` | `{ iconClass }` | Leading Heroicon. Bind `:class="iconClass"` (`w-4 h-4`). |

**Emits:** `click` (native `MouseEvent`).

```vue
<template>
  <BaseActionButton label="Edit" color="emerald" full-width title="Edit this mock" @click="edit">
    <template #icon="{ iconClass }">
      <PencilSquareIcon :class="iconClass" />
    </template>
  </BaseActionButton>
  <BaseActionButton label="Delete" color="red" @click="remove">
    <template #icon="{ iconClass }">
      <TrashIcon :class="iconClass" />
    </template>
  </BaseActionButton>
</template>
```

---

### BaseCopyButton

Copy-to-clipboard icon button with transient "copied" feedback — clicks
write `text` to the clipboard, swap the clipboard icon for a checkmark
for `resetMs`, then revert. Uses the async Clipboard API with a
hidden-textarea `execCommand` fallback for insecure origins. Emits
`copied` / `error` so the parent can fire its own toast.

**Props:**

| Prop        | Type      | Default   | Description |
| ----------- | --------- | --------- | ----------- |
| `text`      | `String`  | **required** | Value written to the clipboard. |
| `label`     | `String`  | `''`      | Used in the tooltip / aria-label (`Copy {label}`). |
| `variant`   | `String`  | `'ghost'` | `'ghost'` (borderless `p-1` icon) or `'bordered'` (`w-9 h-9` boxed, turns emerald while copied). |
| `resetMs`   | `Number`  | `1500`    | How long the checkmark stays before reverting. |
| `iconClass` | `String`  | `'w-4 h-4'` | Icon size class. |

**Emits:** `copied`, `error(err)`.

```vue
<template>
  <!-- Inline ID copy, parent fires the toast -->
  <BaseCopyButton
    :text="stub.id"
    label="Stub ID"
    @copied="showToastMessage('Stub ID copied to clipboard', BaseToastEnum.SUCCESS)"
    @error="showToastMessage('Failed to copy stub ID', BaseToastEnum.ERROR)"
  />
  <!-- Boxed copy next to a read-only input -->
  <BaseCopyButton :text="mock.id" label="Mock ID" variant="bordered" :reset-ms="2000" />
</template>

<script setup lang="ts">
import { BaseCopyButton, BaseToastEnum } from 'mgv-backoffice'
</script>
```

---

## Composables

```ts
import {
  initTheme,
  useTheme,
  useThemeClasses,
  useEscapeKey,
  useDebouncedRef,
  useToast,
  useMobileSidebar,
} from 'mgv-backoffice'
```

| Composable | Purpose |
| ---------- | ------- |
| `initTheme({ storageKey? })` | Explicitly initialize the theme singleton. Call in your app entry point **before mounting** when you need a custom storage key — library components call `useTheme()` internally, so a component mounting first would otherwise lock in the default key (a dev-mode warning fires if that happens). |
| `useTheme({ storageKey? })` | Singleton dark/light controller. Toggles `<html class="dark">` and persists via localStorage (default key `'mgv-theme'`). Prefer `initTheme` at app entry for custom keys. |
| `useThemeClasses()` | Named Tailwind class roles for dark/light (card, border, primaryText, mutedText, dimText, input, ghostButton, emeraldText, redText, …). Returns computed refs auto-unwrapped in templates. |
| `useEscapeKey(handler)` | Component-scoped Escape key listener. |
| `useDebouncedRef(source, delay?)` | Debounced mirror of a ref. Timer cleared on scope dispose. |
| `useToast(durationMs?)` | Per-component toast state: `{ showToast, toastMessage, toastType, showToastMessage }`. |
| `useMobileSidebar()` | Singleton state shared between `BaseSidebar` and `BaseAppLayout` for the off-canvas open/closed flag. |

---

## Tailwind setup for consumers

The lib's components rely on Tailwind utility classes (including dark-mode
variants). Consumers should add the lib's `dist` output to their Tailwind
`content` paths so the JIT can see the class names:

```js
// tailwind.config.js
export default {
  content: [
    './index.html',
    './src/**/*.{vue,ts}',
    './node_modules/mgv-backoffice/dist/**/*.{js,mjs,cjs,vue}',
  ],
}
```

The legacy `tailwind.safelist.js` only covers the v1 components; the
recommended path for v4+ is the `content` glob above.
