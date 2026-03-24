npm login

# mgv-backoffice

Shared Vue 3 UI component library.

## Prerequisites

- Node.js 18+
- npm

## Setup

```bash
npm install
```

## Development

Watch mode rebuilds on every file change:

```bash
npm run dev
```

## Publishing a new version

### 1. Build the library

```bash
npm run build
```

This outputs the bundled files to `dist/` (UMD, ESM, type declarations, and CSS).

### 2. Bump the version

Use one of the following depending on the type of change:

```bash
# Patch (bug fixes, small tweaks): 1.0.4 → 1.0.5
npm version patch

# Minor (new components, non-breaking features): 1.0.4 → 1.1.0
npm version minor

# Major (breaking changes): 1.0.4 → 2.0.0
npm version major
```

This updates `package.json` and creates a git tag automatically.

### 3. Publish to npm

```bash
npm publish
```

If publishing to a private registry or GitHub Packages, make sure your `.npmrc` is configured with the correct registry URL and auth token.

### 4. Verify

```bash
npm info mgv-backoffice version
```

### Quick one-liner

Build, bump patch, and publish in one go:

```bash
npm run build && npm version patch && npm publish
```

## Usage in consuming projects

```bash
npm install mgv-backoffice
```

```ts
import { BaseButton, BaseBadge, BaseBreadcrumb } from 'mgv-backoffice'
import 'mgv-backoffice/dist/style.css'
```

## Components

| Component | Description |
|---|---|
| BaseAlert | Dismissible alert banner |
| BaseBadge | Colored status badge |
| BaseBreadcrumb | Auto-generated or manual breadcrumb nav |
| BaseButton | Button with color, size, loading, and routing support |
| BaseLine | Horizontal divider |
| BaseLogo | SVG brand logo |
| BaseModal | Confirmation modal dialog |
| BaseRow | Card-like content container |
| BaseSpinner | Loading spinner |
| BaseToast | Toast notification |
| ColoredSquares | Colored square indicator |
| EuroAmount | Formatted euro currency display |
| Pagination | Page navigation |
| TrendArrow | Up/down trend indicator with badge |

## Peer dependencies

These must be installed in the consuming project:

- `vue` ^3.3.0
- `vue-router` ^4.0.0
- `@heroicons/vue` ^2.0.0
