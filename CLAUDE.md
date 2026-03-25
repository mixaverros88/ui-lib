## Project Overview
This is an ui library tha offers simple components, for other ui projects.

## Tech Stack
- Vue 3
- Typescript
- Tailwind

## Architecture
'/src/components' contains all the components tha lib offers

## Coding Rules
- All the components should be written with Composition API and Typescript
- Use Tailwind utilities instead of custom CSS

## Safety Rules
- Do not rename public API routes unless explicitly requested
- Do not change database schema without calling it out clearly
- Do not modify auth flows unless the task requires it
- Preserve backward compatibility for shared components
- Flag major architectural changes before implementing them

## Commands
npm run build