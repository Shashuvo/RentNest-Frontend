# 🔗 API Integration

This document maps each frontend route/component in **RentNest-Frontend** to the backend endpoint(s) it consumes from **[RentNest-Backend](https://github.com/Shashuvo/RentNest-Backend)**.

Base URL is configured via `NEXT_PUBLIC_API_BASE_URL` in `.env.local`. Roles noted below are enforced server-side; unmarked endpoints are public or open to any authenticated user.

---

## Auth

| Frontend Route / Component | Backend Endpoint | Method | Role | Notes |
| --------------------------- | ----------------------- | ------ | -------------- | ----- |
| `/auth/register` — registration form (role selection) | `/api/auth/register` | POST | Public | Tenant or Landlord chosen at signup |
| `/auth/login` — login form | `/api/auth/login` | POST | Public | Returns JWT, stored for session |
| Navbar / auth context (current user) | `/api/auth/me` | GET | Authenticated | Hydrates the authenticated user on load and drives role-based UI |
| Session handling (silent refresh) | `/api/auth/refresh-token` | POST | Public | Called when the access token expires |
| Profile settings form | `/api/auth/update-me` | PATCH | Authenticated | Updates name, contact info, etc. |
| Profile settings — avatar upload | `/api/upload/profile-image` | POST | Authenticated | Single image, max 5MB; returned URL is saved via `update-me` |

---

## Public Properties

| Frontend Route / Component | Backend Endpoint | Method | Role | Notes |
| --------------------------- | ----------------------- | ------ | ------ | ----- |
| `/` — home page, featured properties | `/api/properties` | GET | Public | Subset/limit of results for the featured grid |
| `/properties` — browse & filter grid | `/api/properties` | GET | Public | Query params for location, price range, type, amenities |
| `/properties` — filter sidebar/top-bar (categories) | `/api/categories` | GET | Public | Populates property type filter options |
| `/properties/[id]` — property details page | `/api/properties/:propertyId` | GET | Public | Gallery, description, landlord info, "Request to Rent" CTA |
| `/properties/[id]` — reviews section | `/api/reviews/:propertyId` | GET | Public | Reviews list for that property |

---

## Tenant

| Frontend Route / Component | Backend Endpoint | Method | Role | Notes |
| --------------------------------------------- | ------------------------ | ------ | ------ | ----- |
| Rental request form/modal (on property details) | `/api/rentals` | POST | Tenant | Submits a rental request for a property |
| `/dashboard/tenant` — request history | `/api/rentals` | GET | Tenant | Tenant's own requests, drives status badges |
| `/dashboard/tenant/requests/[id]` — request detail | `/api/rentals/:requestId` | GET | Tenant | Used when a request row is expanded/clicked |
| `/dashboard/tenant/requests/[id]/pay` — payment initiation | `/api/payments/create` | POST | Tenant | Creates a Stripe/SSLCommerz session, redirects to gateway |
| `/payment/success`, `/payment/cancel` | `/api/payments/confirm` | POST | Webhook (no auth) | **Not called by the frontend** — Stripe/SSLCommerz calls this directly as a raw-body webhook. These pages just read the return URL params/session and reflect status |
| `/dashboard/tenant` — payment history table | `/api/payments` | GET | Tenant, Admin | Current tenant's payment records |
| `/dashboard/tenant` — payment detail | `/api/payments/:paymentId` | GET | Tenant, Admin | Individual payment record |
| Review form (post-completion, on tenant dashboard or property page) | `/api/reviews` | POST | Tenant | Only enabled once a rental request is `COMPLETED` |

---

## Landlord

| Frontend Route / Component | Backend Endpoint | Method | Role | Notes |
| ----------------------------------------------- | -------------------------------------- | ------ | ---------------- | ----- |
| `/dashboard/landlord` — overview (properties, requests, earnings) | `/api/landlord/properties`, `/api/landlord/requests` | GET | Landlord | Combined into dashboard summary cards |
| `/dashboard/landlord/properties/new` — create listing form | `/api/landlord/properties` | POST | Landlord | Submitted after images are uploaded |
| `/dashboard/landlord/properties/new` — image upload step | `/api/upload/images` | POST | Landlord | Up to 10 images, max 5MB each; returned URLs are attached to the property payload |
| `/dashboard/landlord/properties/[id]/edit` — edit listing form | `/api/landlord/properties/:propertyId` | PUT | Landlord | Also used for availability toggles |
| Listing removal action (property list/table) | `/api/landlord/properties/:propertyId` | DELETE | Landlord, Admin | Confirmation dialog before delete |
| `/dashboard/landlord/requests` — incoming requests table | `/api/landlord/requests` | GET | Landlord | Powers the request management table |
| `/dashboard/landlord/requests` — approve/reject action buttons | `/api/landlord/requests/:requestId` | PATCH | Landlord | Optimistic UI update + toast notification on success |

---

## Admin

| Frontend Route / Component | Backend Endpoint | Method | Role | Notes |
| ----------------------------------------------- | -------------------------------------- | ------ | ------ | ----- |
| `/dashboard/admin` — user management table | `/api/admin/users` | GET | Admin | Search + pagination handled client-side or via query params |
| `/dashboard/admin` — ban/unban action buttons | `/api/admin/users/:userId` | PATCH | Admin | Toast notification on success |
| `/dashboard/admin` — content moderation: listings view | `/api/admin/properties` | GET | Admin | Platform-wide property list |
| `/dashboard/admin` — content moderation: requests view | `/api/admin/rentals` | GET | Admin | Platform-wide rental request list |
| `/dashboard/admin` — override a rental request's status | `/api/admin/rentals/:requestId` | PATCH | Admin | Direct status override, separate from the landlord approve/reject flow |
| `/dashboard/admin` — category management | `/api/categories` | POST | Admin | Create a new property category |
| `/dashboard/admin` — category management | `/api/categories/:categoryId` | DELETE | Admin | Delete a category |

---

## Route Protection

Protected routes (`/dashboard/tenant/*`, `/dashboard/landlord/*`, `/dashboard/admin/*`) are gated in `proxy.ts` (Next.js middleware), which checks the JWT and the user's role before allowing access, redirecting unauthenticated or unauthorized users to `/auth/login` or a 403 page.

---

## Not Yet Wired Up

> Use this section to track any endpoint above that a component references but hasn't been connected to real data yet (e.g. still using mock/placeholder data). Update as integration progresses.

- [ ] _(fill in as needed)_