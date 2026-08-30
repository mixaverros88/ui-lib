# mgv-backoffice

Shared Vue 3 UI component library built with TypeScript and Tailwind CSS.

## Installation

```bash
npm install mgv-backoffice
```

### Peer Dependencies

These must be installed in your project:

```bash
npm install vue@^3.5.0 vue-router@^5.0.0 @heroicons/vue@^2.0.0
```

> `vue-router` 5.x is required (peer range `^5.0.0`) — it's what the library is
> developed and tested against. Upgrade from Router 4 before installing this library.

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

Inline notice panel with color-coded variants (error / warning / success /
info), theme-aware via the shared `isDark` ref. The optional default slot
renders body content under the title, and `compact` gives a slim text-xs
variant for in-form warnings.

**Props:**

| Prop      | Type        | Default            | Description              |
| --------- | ----------- | ------------------ | ------------------------ |
| `title`   | `String`    | `''`               | Bold headline (optional when the slot carries the message). |
| `color`   | `AlertEnum` | `AlertEnum.ERROR`  | Alert color variant.     |
| `compact` | `Boolean`   | `false`            | Slim variant: text-xs, smaller icon/padding. |

**Slots:** default — body content rendered under the title.

**Example:**

```vue
<template>
  <BaseAlert title="Operation successful" :color="AlertEnum.SUCCESS" />
  <BaseAlert title="Proxying is active." :color="AlertEnum.WARNING">
    <p class="mt-0.5 text-xs opacity-90">The canned response below is ignored.</p>
  </BaseAlert>
  <BaseAlert compact :color="AlertEnum.WARNING">
    Chunked dribble is ignored while Fault Simulation is active.
  </BaseAlert>
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
| `size` | `String` | `BaseLogoEnum.MEDIUM`  | Logo size    |

**Example:**

```vue
<template>
  <BaseLogo :size="BaseLogoEnum.LARGE" />
</template>

<script setup lang="ts">
import { BaseLogo, BaseLogoEnum } from 'mgv-backoffice'
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

Earnings summary card with formatted currency display. Supports a signed P&L
mode that renders a red loss theme (and a downward trend glyph) for negative
amounts.

**Props:**

| Prop       | Type     | Default                 | Description          |
| ---------- | -------- |-------------------------|----------------------|
| `title`    | `String` | `'TOTAL EARNINGS'`      | Card heading         |
| `amount`   | `Number` | `0`                     | Monetary value (a stringified number is coerced) |
| `subtitle` | `String` | `'Lifetime commission'` | Subheading text      |
| `badge`    | `String` | `''`                    | Optional badge label |
| `currency` | `String` | `'$'`                   | Currency symbol      |
| `decimals` | `Number` | `2`                     | Fraction digits shown for the amount |
| `accent`   | `'orange' \| 'emerald' \| 'red'` | `'orange'` | Card theme. `emerald` tints it green; `red` is the loss theme. |
| `signed`   | `Boolean` | `false`                | Treat `amount` as a signed P&L figure: a negative value automatically switches to the `red` loss theme and flips the trend glyph to point **down**; a non-negative value keeps the chosen `accent` and the upward glyph. |

**Example:**

```vue
<template>
  <!-- Always-positive total: original behaviour. -->
  <EarningsCard
    title="Monthly Revenue"
    :amount="12500"
    subtitle="April 2026"
    currency="€"
  />

  <!-- Signed P&L: renders red + a down arrow when the amount is negative. -->
  <EarningsCard
    title="TOTAL P&L"
    :amount="-128.4"
    subtitle="Realised + unrealised"
    accent="emerald"
    signed
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
  BaseLogoEnum,
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
| `BaseButtonEnum`     | `RED`, `BLUE`, `WHITE`, `DARK`, `GREEN`, `EMERALD`, `YELLOW`, `PURPLE`, `SKY`, `GRAY`, `AMBER` |
| `BaseButtonSizeEnum` | `EXTRA_SMALL`, `SMALL`, `BASE`, `LARGE`, `EXTRA_LARGE`        |
| `BaseLogoEnum`       | `SMALL`, `MEDIUM`, `LARGE` (`BaseLoginEnum` is a deprecated alias) |
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

| Type             | Shape                                  |
| ---------------- | -------------------------------------- |
| `BreadCrumb`     | `{ name: string; url: string }`        |
| `DropdownOption` | `{ value: string \| number; label: string; title?: string; disabled?: boolean }` |
| `PnLInputs`      | `{ buyPrice; lastPrice; filledQty }` (each `number \| string \| null \| undefined`) |
| `PnL`            | `{ pnlUsd: number \| null; pnlPct: number \| null }` |

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
  methodBadgeTinted,
  statusBadgeSolid,
  statusBadgeTinted,
  statusBadgeSoft,
} from 'mgv-backoffice'
```

Tailwind class helpers for HTTP method and status code badges. `Solid` variants
return saturated `bg-*-600` classes for use on neutral surfaces; `Bright` /
`Tinted` variants return softer combinations suitable for cards. `statusBadgeTinted`
takes `(status, isDark)` to adapt between themes.

`methodBadgeTinted(method, isDark)` gives each method its own hue on a soft
tinted surface (`bg-*-500/15` dark / `bg-*-100` light; GET blue, POST emerald,
PUT amber, DELETE red, PATCH purple, HEAD sky) — the card-chip palette used by
WireMate's mock/stub cards. `statusBadgeSoft(status, isDark)` is its status
companion keyed by status class (emerald 2xx / sky 3xx / amber 4xx / red 5xx).

### Key/value row validators

```ts
import { rowKeyMissing, rowValueMissing } from 'mgv-backoffice'
```

| Function          | Signature                                                              | Returns |
| ----------------- | ---------------------------------------------------------------------- | ------- |
| `rowValueMissing` | `(row: { key?, value?, matcherType? }) => boolean`                     | `true` when the row has a key but no value. |
| `rowKeyMissing`   | `(row: { key?, value?, matcherType? }) => boolean`                     | `true` when the row has a value but no key. |

Consistency checks for dynamic key/value grids (header lists, query params,
metadata rows). Rows with `matcherType: 'absent'` are exempt — an absent
matcher intentionally carries no value.

### Input validators

```ts
import { isValidAbsoluteUrl, isValidJson, isValidXml, isValidBase64 } from 'mgv-backoffice'
```

Pure, dependency-free form-input validators. The payload validators treat
empty/whitespace-only input as **valid** — required-ness is a separate rule
from well-formedness; `isValidAbsoluteUrl` validates a value that must exist,
so empty is invalid there.

| Function             | Signature                    | Returns |
| -------------------- | ---------------------------- | ------- |
| `isValidAbsoluteUrl` | `(value: string) => boolean` | `true` for an absolute `http://` / `https://` URL (other schemes rejected). |
| `isValidJson`        | `(str: string) => boolean`   | `true` when empty or parseable as JSON. |
| `isValidXml`         | `(str: string) => boolean`   | `true` when empty or well-formed XML (DOMParser `<parsererror>` check; browser-only). |
| `isValidBase64`      | `(str: string) => boolean`   | `true` when empty or well-formed base64 (whitespace stripped, length/alphabet checked, then `atob` as the final authority). |

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
| `fmtDateTimeMs`| `(s: string \| number) => string`                               | Full 24-hour locale date-time WITH the millisecond fraction — for dense feeds where same-second rows must stay distinguishable. |
| `fmtDateShort` | `(ms: number) => string`                                        | Short `"Mon D"` calendar label from epoch-millis. |
| `fmtCalendarDate` | `(s: string \| number \| null \| undefined) => string`       | `"Mon D, YYYY"` en-US calendar label; em-dash on empty, raw value on parse failure. |
| `fmtCalendarDateTime` | `(s: string \| number \| null \| undefined) => string`   | `"Mon D, YYYY, HH:MM"` en-US calendar label with time of day. |
| `fmtMsAsSeconds` | `(ms: number \| null \| undefined) => string`                 | `"= 1.50 s"` magnitude hint for millisecond inputs (3 decimals below 1 s); `''` for non-positive input. |
| `fmtBytes`     | `(bytes: number \| null \| undefined) => string`                | `"512 B"` / `"1.5 KB"` / `"2.0 MB"`; `''` for zero/falsy input. |
| `fmtPrice`     | `(n: number) => string`                                         | Price with precision that scales to magnitude (more decimals for sub-cent values). |
| `fmtPct`       | `(n: number, digits = 2) => string`                             | Percentage with explicit sign, e.g. `"+2.50%"`. |
| `fmtUsd`       | `(v: number) => string`                                         | Signed USD amount with leading sign, e.g. `"+$5.00"`. |
| `formatJson`   | `(content: string) => string`                                   | Pretty-prints parseable JSON with 2-space indentation; returns anything else verbatim. |
| `stringifyValue` | `(value: unknown) => string`                                  | Display string for an unknown value: strings pass through, null/undefined → `''`, everything else JSON-serialized (`String()` fallback). |

### Spec-form helpers

```ts
import { buildSpecParams, firstInvalidNumericSpec } from 'mgv-backoffice'
```

Value-map helpers for spec-driven forms (the state behind `BaseSpecFields`).
A spec whose `default` is `null` is treated as OPTIONAL — blank means "knob
disabled" and passes validation.

| Function                 | Signature | Returns |
| ------------------------ | --------- | ------- |
| `buildSpecParams`        | `(specs: SpecField[] \| undefined, existing: Record<string, SpecFieldValue>) => Record<string, SpecFieldValue>` | Value map seeded from each spec's `default`, keeping overlapping values the caller already has. |
| `firstInvalidNumericSpec`| `(specs: SpecField[] \| undefined, params: Record<string, SpecFieldValue>) => string \| null` | Label of the first blank / NaN numeric field, or `null` when all numerics are valid. |

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
The `<main>` content offset tracks the sidebar width automatically —
`lg:ml-60` when expanded, `lg:ml-16` when collapsed (via `useSidebarCollapse()`).

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
behavior, focus management, optional theme toggle, a desktop collapse
toggle (icon-only rail), an optional notifications bell, and configurable
nav sections.

**Props:**

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `sections` | `NavSection[]` | **required** | Grouped nav items. |
| `homeRouteName` | `String` | `'home'` | Route name for the logo / "go home" click. |
| `appName` | `String` | `''` | Optional app name in the footer. |
| `version` | `String` | `''` | Optional version string in the footer. |
| `showThemeToggle` | `Boolean` | `true` | Toggle the dark/light switch in the footer. |
| `collapsible` | `Boolean` | `true` | Show the desktop collapse toggle that shrinks the sidebar to an icon-only rail. |
| `showNotifications` | `Boolean` | `false` | Show the notifications bell (with unread badge) that toggles `BaseNotificationPanel`. |

> **Collapse state** is shared via `useSidebarCollapse()` (and persisted to
> localStorage) so `BaseAppLayout` can shrink the content offset from
> `lg:ml-60` to `lg:ml-16` in step with the rail. Collapsing only affects
> desktop (`lg+`); on mobile the sidebar stays a full off-canvas panel.

> **Notifications:** set `:show-notifications="true"` to render the bell,
> then drop a [`BaseNotificationPanel`](#basenotificationpanel) in your app.
> Both share state through `useNotifications()`, so the unread badge and the
> panel stay in sync.

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

### BaseNotificationPanel

Left-anchored notification drawer (teleported to `<body>`, slides in from
the left, backdrop + Escape to close). Open/close state and the list live
in `useNotifications()`, so the sidebar bell and the panel stay in sync.

Enable the bell on the sidebar with `:show-notifications="true"`, drop one
`<BaseNotificationPanel />` anywhere in your app, and feed it data via the
composable.

**Props:**

| Prop              | Type      | Default                        | Description |
| ----------------- | --------- | ------------------------------ | ----------- |
| `title`           | `String`  | `'Notifications'`              | Panel heading. |
| `emptyText`       | `String`  | `'You have no notifications.'` | Shown when the list is empty. |
| `showMarkAllRead` | `Boolean` | `true`                         | Render the "Mark all as read" action when there are unread items. |

**Emits:** `select` (the clicked notification's `id`; the row is also marked read).

```vue
<script setup lang="ts">
import { BaseNotificationPanel, useNotifications } from 'mgv-backoffice'
const { setNotifications } = useNotifications()
setNotifications([
  { id: 1, title: 'New comment', message: 'Alice replied to your post', time: '2m ago', type: 'info' },
  { id: 2, title: 'Build passed', time: '1h ago', read: true, type: 'success' },
])
</script>

<template>
  <BaseSidebar :sections="navSections" :show-notifications="true" />
  <BaseNotificationPanel @select="(id) => goTo(id)" />
</template>
```

```ts
import type { NotificationItem } from 'mgv-backoffice'

interface NotificationItem {
  id: string | number
  title: string
  message?: string
  time?: string                                   // pre-formatted by you
  read?: boolean
  type?: 'info' | 'success' | 'warning' | 'error' // status dot colour
}
```

---

## Authentication

### BaseGoogleSignInButton

Google-branded "Sign in with Google" button (official multi-colour "G",
dark-mode surface swap). Purely presentational — it runs no OAuth itself;
listen on `click` and start your own Google Identity / Firebase / backend
flow there.

**Props:**

| Prop       | Type      | Default                    | Description |
| ---------- | --------- | -------------------------- | ----------- |
| `label`    | `String`  | `'Sign in with Google'`    | Button text. |
| `loading`  | `Boolean` | `false`                    | Disables and shows a spinner. |
| `disabled` | `Boolean` | `false`                    | Disables without the spinner. |
| `block`    | `Boolean` | `true`                     | Full-width layout. |

**Emits:** `click` (only when not disabled/loading).

### BaseLoginForm

Presentational sign-in card: email + password (with show/hide), an optional
"Remember me" checkbox, an error banner, the Google button + "or" divider,
and `logo` / `forgot` / `footer` slots. Owns its input state and emits
`submit` / `google-sign-in`; the app handles the actual request and feeds
back `loading` / `error`.

**Props:**

| Prop            | Type      | Default     | Description |
| --------------- | --------- | ----------- | ----------- |
| `title`         | `String`  | `'Sign in'` | Card heading. |
| `subtitle`      | `String`  | `''`        | Muted line under the heading. |
| `submitLabel`   | `String`  | `'Sign in'` | Submit button text. |
| `loading`       | `Boolean` | `false`     | Disables the form, spinner on submit. |
| `googleLoading` | `Boolean` | `false`     | Disables the form, spinner on the Google button. |
| `error`         | `String`  | `''`        | Error banner above the form. |
| `showGoogle`    | `Boolean` | `true`      | Render the Google button + divider. |
| `showRemember`  | `Boolean` | `false`     | Render the "Remember me" checkbox. |

**Emits:** `submit` (`LoginCredentials`), `google-sign-in`.

**Slots:** `logo`, `forgot` (next to the password label), `footer`.

```vue
<script setup lang="ts">
import { BaseLoginForm } from 'mgv-backoffice'
import type { LoginCredentials } from 'mgv-backoffice'

async function onSubmit(creds: LoginCredentials) { /* call your API */ }
function onGoogle() { /* start Google OAuth */ }
</script>

<template>
  <BaseLoginForm
    subtitle="Welcome back"
    :show-remember="true"
    @submit="onSubmit"
    @google-sign-in="onGoogle"
  >
    <template #logo><MyLogo /></template>
    <template #forgot><a href="/forgot" class="text-sm text-emerald-600">Forgot?</a></template>
    <template #footer>No account? <a href="/signup" class="text-emerald-600">Sign up</a></template>
  </BaseLoginForm>
</template>
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
and width. The icon badge only renders when the `icon` slot is filled,
so icon-less apps get a plain title/subtitle header.

**Props:**

| Prop            | Type     | Default       | Description |
| --------------- | -------- | ------------- | ----------- |
| `title`         | `String` | **required**  | H1 text. |
| `subtitle`      | `String` | `''`          | Muted line below the title. |
| `iconColor`     | `String` | `'emerald'`   | Badge + icon colour: `'emerald' \| 'sky' \| 'red' \| 'amber'`. |
| `maxWidthClass` | `String` | `'max-w-4xl'` | Tailwind max-w utility constraining header width. Pass `''` to skip the width wrapper entirely — the header then spans its container. |
| `align`         | `String` | `'center'`    | Vertical alignment of the title block vs the actions: `'center'` or `'end'` (actions sit on the title baseline). |
| `marginClass`   | `String` | `'mb-8'`      | Space under the header. Pass `''` when the parent manages vertical rhythm (`space-y-*`). |

**Slots:**

| Slot       | Slot props        | Description |
| ---------- | ----------------- | ----------- |
| `icon`     | `{ iconClass }`   | Page Heroicon. Bind `:class="iconClass"` for the theme-aware colour. Badge square renders only when this slot is filled. |
| `subtitle` | —                 | Rich subtitle content (links, `<strong>`, interpolation); overrides the `subtitle` prop. |
| `actions`  | —                 | Buttons rendered on the right (refresh, destructive, etc.). |

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
| `variant`  | `String`  | `'neutral'` | `'neutral'` (grey), `'danger'` (solid red) or `'ghost'` (slate h-9 outline — toolbar/modal-footer buttons). |
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

### BaseChipButton

Small tinted emerald "chip" action button — the compact "+ Add" pill used
above repeatable form rows. Label comes from the default slot.

**Props:**

| Prop       | Type      | Default | Description |
| ---------- | --------- | ------- | ----------- |
| `size`     | `String`  | `'sm'`  | `'sm'` = `px-2.5 py-1`; `'xs'` = `px-2 py-0.5` for tight corners. |
| `disabled` | `Boolean` | `false` | Dims the chip and blocks clicks. |

**Emits:** `click`.

```vue
<BaseChipButton @click="addRow(rows)">+ Add</BaseChipButton>
<BaseChipButton size="xs" @click="addNamespace">+ Add</BaseChipButton>
```

---

### BaseRemoveButton

The red "×" remove-row affordance used beside repeatable form rows. Name it
for screen readers via `aria-label`; `title`, `disabled` and extra classes
(`pt-1`, `self-start`, …) fall through as attrs.

**Emits:** `click`.

```vue
<BaseRemoveButton :aria-label="`Remove header ${i + 1}`" @click="rows.splice(i, 1)" />
```

---

### BaseStatusPill

Connection/health status pill: a colored dot (pulsing while `ok`) next to a
short label on a tinted background.

**Props:**

| Prop     | Type     | Default | Description |
| -------- | -------- | ------- | ----------- |
| `status` | `String` | **required** | `'ok'` (emerald, pulsing), `'error'` (red), `'unknown'` (gray). |
| `label`  | `String` | **required** | Short text next to the dot, e.g. `WireMock Connected`. |

```vue
<BaseStatusPill :status="healthy ? 'ok' : 'error'" :label="healthy ? 'Connected' : 'Disconnected'" />
```

---

### BaseFileDropzone

Dashed "click to select a file" upload zone (extracted from WireMate's
Postman-import modal). Renders a document-arrow-up icon (overridable via the
`#icon` slot), a label line, and an optional dimmed hint line. Clicking opens
the native file picker; dragging files onto the zone also works (the border
highlights emerald while dragging). The hidden input resets after every
selection, so picking the same file twice still emits.

**Props:**

| Prop       | Type      | Default | Description |
| ---------- | --------- | ------- | ----------- |
| `label`    | `String`  | **required** | Main line, e.g. `Click to select a Postman collection (.json)`. |
| `hint`     | `String`  | `''`    | Dimmed helper line below the label. |
| `accept`   | `String`  | `''`    | Forwarded to the input's `accept`. Dropped files are **not** filtered by it. |
| `multiple` | `Boolean` | `false` | Allow multi-select; when `false`, a multi-file drop emits only the first file. |
| `disabled` | `Boolean` | `false` | Dims the zone and ignores clicks/drops. |

**Emits:** `files` (`File[]`, never empty).

**Slots:** `icon` — replaces the default upload icon.

```vue
<BaseFileDropzone
  accept="application/json,.json"
  label="Click to select a Postman collection (.json)"
  hint="Exported from Postman → Export → Collection v2.1"
  @files="onFiles"
/>
```

### BaseCodeBlock

Themed monospace `<pre>` for JSON payloads, request dumps and code snippets
(extracted from WireMate's stub/request detail views). Preserves whitespace
verbatim, scrolls both axes, and adapts to the theme. Extra classes (margins
etc.) fall through via the normal class merge.

**Props:**

| Prop             | Type     | Default  | Description |
| ---------------- | -------- | -------- | ----------- |
| `code`           | `String` | **required** | The raw text to render. |
| `variant`        | `String` | `'soft'` | `'soft'` = tinted fill, no border (in-card look); `'bordered'` = bordered card fill (standalone look). |
| `size`           | `String` | `'sm'`   | `'sm'` = `text-sm px-5 py-4`; `'xs'` = dense `text-xs p-3`. |
| `maxHeightClass` | `String` | `''`     | Optional Tailwind max-height utility, e.g. `max-h-96`. |

```vue
<BaseCodeBlock :code="formatJson(response.body)" size="xs" max-height-class="max-h-64" />
```

---

## Forms & tables

These components use `dark:` Tailwind variants, so the consuming app must map
the `dark` variant to the `.dark` class that `useTheme()` toggles (see
[Tailwind setup for consumers](#tailwind-setup-for-consumers)).

### BaseInput

Themed text/number input carrying the shared field skin (slate border,
`bg-slate-50` / dark `bg-slate-900` surface). Everything else — `placeholder`,
`id`, `disabled`, `step`/`min`, extra classes like `font-mono` or
`placeholder:*` — falls through via attrs and Vue class merging.

**Props:**

| Prop         | Type               | Default  | Description |
| ------------ | ------------------ | -------- | ----------- |
| `modelValue` | `String \| Number` | `''`     | `v-model` value. |
| `type`       | `String`           | `'text'` | Native input type. |
| `size`       | `String`           | `'md'`   | `'md'` = `px-3 py-2`, `'sm'` = `px-2 py-1.5`. |
| `block`      | `Boolean`          | `true`   | Full-width (`w-full`); set `false` for inline fields. |

**Emits:** `update:modelValue(value: string)` — always the raw string; parse
numbers in the owner.

```vue
<BaseInput v-model="query" placeholder="e.g. AMD or BTC" class="font-mono" />
```

### BaseSelect

Themed `<select>` sharing BaseInput's field skin. Options come from the
default slot so callers keep full control of `<option>` rendering.

**Props:**

| Prop         | Type               | Default | Description |
| ------------ | ------------------ | ------- | ----------- |
| `modelValue` | `String \| Number` | `''`    | `v-model` value. |
| `size`       | `String`           | `'sm'`  | `'sm'` = `px-2 py-1.5`, `'md'` = `px-3 py-2`. |
| `block`      | `Boolean`          | `true`  | Full-width; set `false` for inline selects. |

**Slots:** `default` — the `<option>` elements.
**Emits:** `update:modelValue(value: string)`.

```vue
<BaseSelect v-model="strategyType">
  <option v-for="e in catalog" :key="e.type" :value="e.type" :title="e.description">
    {{ e.label }}
  </option>
</BaseSelect>
```

### BaseDropdown

Button-style single-select dropdown ("Select Social User ⌄"). Unlike
`BaseSelect` (a native `<select>`), this renders a trigger button plus a
floating menu, so the closed control shows a placeholder and a chevron that
rotates while open — matching the app's filter dropdowns. Selecting a row
emits its `value` and closes the menu; Escape and an outside click also close
it.

**Props:**

| Prop          | Type                       | Default      | Description |
| ------------- | -------------------------- | ------------ | ----------- |
| `options`     | `DropdownOption[]`         | **required** | `{ value, label, title?, disabled? }` per row. |
| `modelValue`  | `String \| Number \| null` | `null`       | Selected option's `value` (`v-model`). |
| `placeholder` | `String`                   | `'Select'`   | Trigger text shown when nothing is selected. |
| `size`        | `String`                   | `'md'`       | `'md'` = `px-4 py-2.5` (app filter height), `'sm'` = `px-3 py-2`. |
| `block`       | `Boolean`                  | `true`       | Full-width; set `false` for an inline, content-width dropdown. |
| `disabled`    | `Boolean`                  | `false`      | Disables the trigger. |
| `ariaLabel`   | `String`                   | `''`         | Accessible name for the trigger/listbox when there is no visible label. |

**Emits:** `update:modelValue(value)`.

```vue
<BaseDropdown
  v-model="socialUserId"
  :options="socialUsers.map((u) => ({ value: u.id, label: u.name }))"
  placeholder="Select Social User"
  aria-label="Social user"
/>
```

### BaseSegmentedControl

Segmented button group ("All | Stock | Crypto"). One button per option; the
selected one gets the filled treatment and `aria-pressed="true"`.

**Props:**

| Prop          | Type                | Default  | Description |
| ------------- | ------------------- | -------- | ----------- |
| `options`     | `SegmentedOption[]` | **required** | `{ value, label, title? }` per button. |
| `modelValue`  | `String \| Number`  | **required** | Selected option's `value` (`v-model`). |
| `variant`     | `String`            | `'base'` | `'base'` (`px-3 py-2`, emerald-500 fill), `'wide'` (`px-4 py-2`, emerald-600 fill), `'toolbar'` (`h-9` uppercase `text-xs` with focus-visible rings). |
| `ariaLabel`   | `String`            | `''`     | When set, the wrapper renders `role="group"` + `aria-label`. |
| `optionClass` | `Function`          | —        | `(option, active) => string` override for per-button fill classes (e.g. severity colours); layout stays owned by the variant. |

**Emits:** `update:modelValue(value)`.

```vue
<BaseSegmentedControl v-model="assetFilter" :options="ASSET_FILTERS" />
<BaseSegmentedControl v-model="exchange" :options="EXCHANGES" variant="wide" aria-label="Exchange" />
```

### BaseTable

Styling shell for data tables — **not** a data grid. Owns the table skin
(slate header band, `px-4 py-3` header cells, empty-state row); body rows are
the caller's own `<tr>` markup via the default slot. Wrap it yourself for
scrolling/card chrome (e.g. a `BaseRow` with `overflow-x-auto`).

**Props:**

| Prop        | Type            | Default      | Description |
| ----------- | --------------- | ------------ | ----------- |
| `columns`   | `TableColumn[]` | **required** | `{ label, align? }`; `align: 'right'` right-aligns the header cell. |
| `empty`     | `Boolean`       | `false`      | True renders the empty-state row spanning every column. |
| `emptyText` | `String`        | `'No rows.'` | Fallback empty-state text. |

**Slots:** `default` — the `<tr>` rows; `empty` — custom empty-state content.

```vue
<BaseTable :columns="COLUMNS" :empty="rows.length === 0">
  <template #empty>No trades match your filters.</template>
  <tr v-for="row in rows" :key="row.id" class="border-t border-slate-200 dark:border-slate-700">
    …
  </tr>
</BaseTable>
```

### BaseSpecFields

Spec-driven form fields: renders a select / checkbox / number input per
`SpecField`, with labels and help text, in a responsive two-column grid. Feed
it a backend-described catalogue and every form editing those values stays in
lockstep. Never mutates `params` — every edit is emitted as `(key, value)`
and the owner writes it back into its own state.

**Props:**

| Prop     | Type                             | Default      | Description |
| -------- | -------------------------------- | ------------ | ----------- |
| `specs`  | `SpecField[]`                    | **required** | `{ key, label, type: 'decimal' \| 'integer' \| 'boolean' \| 'select', options?, step?, min?, help? }`. |
| `params` | `Record<string, SpecFieldValue>` | **required** | Current values keyed by `spec.key`. |

**Slots:** `after` (`{ spec }`) — extra content under each field (e.g. a live
preview attached to one key).
**Emits:** `update(key: string, value: SpecFieldValue)` — numbers are parsed
(`parseFloat`); unparseable input passes through raw so the owner's
validation can catch it.

```vue
<BaseSpecFields :specs="entry.params" :params="form.params"
  @update="(key, value) => (form.params[key] = value)" />
```

### BaseFilterChip

Colour-coded toggleable filter chip — one-click event/category filters above
a data feed. Idle renders a tinted border/background in the semantic colour;
active renders a solid fill with white text (`aria-pressed` reflects the
state). Layout classes (`h-9 flex-1`, …) pass through the class attribute;
click handlers bind natively on the component.

**Props:**

| Prop       | Type      | Default   | Description |
| ---------- | --------- | --------- | ----------- |
| `label`    | `String`  | `''`      | Chip text; the default slot overrides it. |
| `color`    | `'emerald' \| 'sky' \| 'amber' \| 'red' \| 'slate'` | `'slate'` | Semantic colour of the idle tint and active fill. |
| `active`   | `Boolean` | `false`   | Whether the chip's filter is applied (solid fill). |
| `disabled` | `Boolean` | `false`   | Greys out + blocks the click. |
| `title`    | `String`  | —         | Native tooltip. |

```vue
<BaseFilterChip
  v-for="f in filters"
  :key="f.key"
  class="h-9 flex-1"
  :color="f.color"
  :active="isActive(f)"
  :title="f.title"
  @click="toggle(f)"
>{{ f.label }}</BaseFilterChip>
```

### BaseCredentialsForm

One service's API-credentials card: key id + secret + base/data URLs, with
the has-secret handling (placeholder dots, blank-keeps-stored-secret), the
save-validation ladder and a saving spinner. Load/save results are EMITTED —
the parent owns toasts / error banners. Exposes `load()` so a parent Reload
button can re-pull several cards in parallel.

**Props:** `title` + `idPrefix` + `fetchFn: () => Promise<CredentialsView>` +
`updateFn: (body: CredentialsUpdate) => Promise<CredentialsView>` +
`defaults: { baseUrl, dataUrl }` (required); `subtitle`, `keyLabel`,
`keyPlaceholder`, `secretLabel`, `secretPlaceholder`, `secretSetHint`,
`permissionsHint`, `requiredKeyMessage`, `requiredSecretMessage`,
`savedMessage`, `saveLabel` (optional copy overrides).

**Slots:** `no-secret-hint` — rich help while no secret is stored;
`base-url-extra` (`{ form }`) — extras under the Base URL field (e.g.
live/paper shortcut buttons that write into the form); `footer` — extra
content at the card's bottom.

**Emits:** `saved(message)`, `error(message)`, `load-error(message)`.

```vue
<BaseCredentialsForm
  ref="card"
  title="Alpaca API"
  id-prefix="alpaca"
  :fetch-fn="fetchAlpaca"
  :update-fn="updateAlpaca"
  :defaults="{ baseUrl: LIVE_BASE, dataUrl: DATA_URL }"
  @saved="onSaved"
  @error="onError"
  @load-error="onLoadError"
/>
```

---

### BasePillPickerModal

"Pick one of many" modal: every item rendered as a clickable pill, narrowed
by a free-text filter and an optional segmented group toggle. Clicking a pill
emits `pick` with the item; backdrop / Escape / the footer Close emit `close`.
Narrowing state lives inside, so a `v-if`-mounted instance always opens fresh.

**Props:** `title` + `items: PillPickerItem[]` (required);
`groups?: SegmentedOption<string>[]` (renders the group toggle with an
`allLabel` option prepended, narrowing by each item's `group`); `icon?`
(defaults to the magnifying glass), `subtitle?`, `searchPlaceholder`,
`emptyMessage`, `noMatchMessage`, `mono` (mono font for the filter input and
pills — symbols, codes, ids), `maxWidthClass` (default `max-w-2xl`),
`closeText`, `groupAriaLabel`, `allLabel`.

**Emits:** `pick(item: PillPickerItem)`, `close`.

```ts
interface PillPickerItem {
  id: string      // unique key; identifies the pick
  label: string   // pill text; what the filter matches
  group?: string  // segmented-toggle bucket
  title?: string  // pill tooltip
}
```

```vue
<BasePillPickerModal
  v-if="open"
  title="Symbols"
  :items="symbols.map(s => ({ id: s.id, label: s.symbol, group: s.assetClass }))"
  :groups="[{ value: 'STOCK', label: 'STOCK' }, { value: 'CRYPTO', label: 'CRYPTO' }]"
  mono
  @pick="apply"
  @close="open = false"
/>
```

---

### BaseBarDistribution

Compact value-distribution chart: one thin rounded bar per distinct
value, count labelled on top and the value underneath — scrolls
sideways when there are many bars. Pure Tailwind, no chart library.
Extracted from TradeAutomation's variant-stats modal.

**Props:**

| Prop           | Type     | Default                | Description |
| -------------- | -------- | ---------------------- | ----------- |
| `bars`         | `Array`  | **required**           | `DistributionBar[]` — `{ label, count }` per bar, in display order (sort ascending for numeric values). |
| `ariaLabel`    | `String` | `'Value distribution'` | Accessible description of the chart. |
| `countNoun`    | `String` | `'item'`               | Noun for each bar's tooltip count, e.g. `'variant'` → "3 variants". |
| `titlePrefix`  | `String` | `''`                   | Tooltip prefix before the value, e.g. the field name. |
| `maxBarHeight` | `Number` | `56`                   | Height of the tallest bar, in px. |
| `barClass`     | `String` | emerald fill           | Tailwind classes for the bar fill. |

```vue
<BaseBarDistribution
  :bars="[{ label: '0.5', count: 1 }, { label: '1', count: 4 }]"
  aria-label="Distribution of Take profit across variants"
  title-prefix="Take profit"
  count-noun="variant"
/>
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
  useSidebarCollapse,
  useNotifications,
  useQueryParamSync,
  useFieldClasses,
  usePolling,
} from 'mgv-backoffice'
```

| Composable | Purpose |
| ---------- | ------- |
| `initTheme({ storageKey? })` | Explicitly initialize the theme singleton. Call in your app entry point **before mounting** when you need a custom storage key — library components call `useTheme()` internally, so a component mounting first would otherwise lock in the default key (a dev-mode warning fires if that happens). |
| `useTheme({ storageKey? })` | Singleton dark/light controller. Toggles `<html class="dark">` and persists via localStorage (default key `'mgv-theme'`). Prefer `initTheme` at app entry for custom keys. |
| `useThemeClasses()` | Named Tailwind class roles for dark/light (card, border, primaryText, mutedText, dimText, input, ghostButton, emeraldText, redText, …). Since 1.34.0 returns a `reactive` object of plain strings — bind `t.card` directly, never `t.card.value` (the old ComputedRef shape leaked ref internals into `:class` bindings). |
| `useEscapeKey(handler)` | Component-scoped Escape key listener. |
| `useDebouncedRef(source, delay?)` | Debounced mirror of a ref. Timer cleared on scope dispose. |
| `useToast(durationMs?)` | Per-component toast state: `{ showToast, toastMessage, toastType, showToastMessage }`. |
| `useMobileSidebar()` | Singleton state shared between `BaseSidebar` and `BaseAppLayout` for the off-canvas open/closed flag. |
| `useSidebarCollapse({ storageKey? })` | Singleton collapsed/expanded state for the desktop sidebar rail, shared between `BaseSidebar` and `BaseAppLayout` and persisted to localStorage (default key `'mgv-sidebar-collapsed'`). |
| `useNotifications()` | Singleton notification state shared by the sidebar bell and `BaseNotificationPanel`: `{ notifications, unreadCount, open, openPanel, closePanel, togglePanel, setNotifications, add, remove, markRead, markAllRead, clear }`. |
| `useQueryParamSync()` | URL-query mirroring for filterable views: `{ qparam(name), qenum(name, allowed, fallback), replaceQuery(next) }`. Read filters from the query string once on setup, write changes back with `router.replace` (no-op when unchanged) so filtered views stay shareable without polluting history. |
| `useFieldClasses()` | Shared form-field class strings for the gray/emerald form skin: `{ label, input, requiredInput(value) }`. `requiredInput` returns a red border+ring skin while the value is empty and the standard skin otherwise. |
| `usePolling(fn, intervalMs, { immediate?, pauseWhenHidden? })` | Visibility-gated polling loop bound to the component lifecycle: starts on mount, stops on unmount, pauses while the tab is hidden and refreshes + resumes on return to visible (both default on). Pass `intervalMs: null` for refresh-only mode (run on mount + each return-to-visible, no timer). Returns `{ start, stop, active }`. A loop stopped via `stop()` stays stopped across hide/show cycles (since 1.36.0) — only a visibility-paused loop auto-resumes. Catch errors inside `fn` — the loop never swallows rejections. |

---

## Typography

Since 1.33.0 the library ships the shared brand typography: the stylesheet
loads **Fira Sans** (UI text) and **Fira Code** (numerals/data) from Google
Fonts via `@import`, registers them as the Tailwind `--font-sans` /
`--font-mono` theme defaults, and applies `font-family: var(--font-sans)` to
`body`. Consumers get the fonts just by importing the lib CSS — remove any
app-local Google Fonts `<link rel="stylesheet">` and `--font-sans`/`--font-mono`
overrides. Keep (or add) the preconnect hints in `index.html` for a faster
first paint:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

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
