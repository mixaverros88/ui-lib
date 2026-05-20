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
| `color`       | `String`                            | `BaseButtonEnum.BLUE` | Color variant                        |
| `to`          | `String`                            | —                     | Vue Router path (renders `<router-link>`) |
| `type`        | `'button' \| 'submit' \| 'reset'`  | `'button'`            | HTML button type                     |
| `icon`        | `String`                            | —                     | Right-side icon name                 |
| `iconSize`    | `String`                            | —                     | Icon size class                      |
| `iconLeft`    | `String`                            | —                     | Left-side icon name                  |
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

Confirmation dialog with support for delete and success modes.

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

Simple animated loading spinner.

**Props:** None

**Example:**

```vue
<template>
  <BaseSpinner />
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
| `number` | `Number` | —       | Positive = green arrow up, negative = red arrow down |
| `icon`   | `String` | —       | Optional icon override                               |

**Example:**

```vue
<template>
  <TrendArrow :number="12.5" />   <!-- Green up arrow -->
  <TrendArrow :number="-3.2" />   <!-- Red down arrow -->
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
| `AlertEnum`          | `WARNING`, `ERROR`, `SUCCESS`, `INFROM`                       |
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
import type { BreadCrumb } from 'mgv-backoffice'
```

| Type         | Shape                                  |
| ------------ | -------------------------------------- |
| `BreadCrumb` | `{ name: string; url: string }`        |

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

**Slots:** `icon`, `default`, `footer`.
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

---

## Composables

```ts
import {
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
| `useTheme({ storageKey? })` | Singleton dark/light controller. Toggles `<html class="dark">` and persists via localStorage (default key `'mgv-theme'`). Consumers should call once at app entry with their app-specific storage key. |
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
