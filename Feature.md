# Feature Development Workflow

When implementing a feature:

## Step 1 — Understand

Identify:

- User-facing behavior
- Admin behavior
- Backend requirements
- Database requirements
- Permissions
- Validation
- Edge cases

Do not start coding yet.

---

## Step 2 — Inspect

Search the repository for:

- Similar features
- Existing API endpoints
- Existing database models
- Existing UI components
- Existing hooks
- Existing validation schemas
- Existing patterns

Prefer existing patterns over introducing new ones.

---

## Step 3 — Plan

Create a feature plan:

### Database
- Tables
- Columns
- Relations
- Indexes
- Migration

### API
- Endpoints
- Request DTOs
- Response DTOs
- Validation
- Authorization

### Admin
- Pages
- Components
- Forms
- Tables
- Hooks

### Website
- Pages
- Components
- Server/client requirements
- API integration

---

## Step 4 — Implement

Implement in this order:

1. Database
2. types/contracts
3. Backend
4. Admin
5. Website

---

## Step 5 — Integrate

Verify:

- API URLs
- Authentication
- Authorization
- Request/response types
- Error handling
- Loading states
- Empty states

---

## Step 6 — Verify

Run:

- Type checking
- Linting
- Tests
- Build

Fix errors before considering the feature complete.