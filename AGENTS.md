# Project AI Instructions

# Development Rules

The following rules are mandatory.

Rules have higher priority than existing examples or implementation patterns.

If an existing implementation conflicts with a documented rule,
follow the rule and do not copy the existing implementation.

If no existing example exists, follow the documented rules and
architecture to determine the implementation.

Never introduce a new pattern simply because an example does not exist.

Before introducing a new library, architecture pattern, or convention,
check the documented rules first.

# Frontend Rules

## Mandatory

- TypeScript must be used.
- Do not use `any`.
- Use the existing component library.
- Use React Hook Form for forms.
- Use Zod for validation.
- Use TanStack Query for state management.
- Each feature should have <feature>.query.ts file that contain all its functions and export as "useFeature" hook that held all functions.
- Each feature should have folder inside feature folder named dtos that held all related dtos if response named featureOutputDTO.ts and if request to be featureInputDTO.ts.
- Do not call APIs directly from UI components.
- API calls must go through the API client layer.
- Business logic must not live inside presentation components.
- Reuse existing components when applicable.
- New reusable components must be placed in the appropriate shared location.
- Create reuseable form controls.
- Use shadcn datatable in any table with dynamic columns pattern.
- Don't use static fullback data.

## When no example exists

If there is no existing implementation to use as a reference:

1. Follow these rules.
2. Follow the architecture documentation.
3. Follow the closest applicable pattern.
4. Prefer the simplest implementation.
5. Do not introduce a new library without explicit approval.
6. Document a genuinely new architectural decision.

## Project

This repository contains three applications:

- `website` — Next.js customer-facing website
- `admin/frontend` — React admin dashboard
- `admin/backend` — Node.js + Express backend

A feature may require changes in one or more applications.

---

## Technology Rules

### Website

- Next.js
- TypeScript
- App Router
- Tailwind CSS
- shadcn/ui
- TanStack Query

### Admin

- React
- TypeScript
- React Router
- TanStack Query
- React Hook Form
- Zod
- shadcn/ui

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL

---

## General Rules

- Use TypeScript.
- Do not introduce a new library without approval.
- Reuse existing components before creating new ones.
- Reuse existing API patterns.
- Do not duplicate business logic between frontend applications.
- Validation must exist on the backend.
- Frontend validation should use the same schema where possible.
- API contracts must be typed.
- Follow existing project naming conventions.
- Do not modify unrelated files.
- Before implementing a feature, inspect existing implementations for similar functionality.

---

## Feature Rule

When the user requests a feature, determine whether the feature requires:

1. Database changes
2. Backend changes
3. Admin changes
4. Website changes
5. Shared types/API changes

Implement all required layers unless the user explicitly asks for only one layer.