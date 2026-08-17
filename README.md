# 🏠 RentNest — Frontend

**Find & List Rental Properties with Ease**

RentNest is a responsive Next.js frontend for a rental property marketplace. Landlords can list properties, manage availability, and approve or reject rental requests through an intuitive dashboard. Tenants can browse listings with advanced filtering, submit rental requests, and complete secure payments. Admins oversee the entire platform through a moderation dashboard.

This frontend consumes the [RentNest Backend API](https://github.com/Shashuvo/RentNest-Backend).

🔗 **Live demo:** [rent-nest-frontend-five.vercel.app](https://rent-nest-frontend-five.vercel.app/)

---

## 📖 Overview

RentNest connects three types of users on a single platform:

- **Tenants** browse listings, submit rental requests, pay rent online, and leave reviews after a completed stay.
- **Landlords** create and manage listings, control availability, and approve or reject incoming requests.
- **Admins** moderate the platform — managing users, listings, categories, and rental requests directly.

The UI adapts dynamically to the authenticated user's role, and protected routes are enforced via Next.js middleware.

---

## ✨ Features

### Public
- Responsive property grid with optimized images (`next/image`), price, location, and amenities
- Property details page with image gallery, description, landlord info, and a "Request to Rent" CTA
- Browse property categories
- Skeleton loaders for data fetching and graceful error fallbacks

### Tenant
- Registration, login, and session refresh with validated auth forms
- Profile management, including profile image upload
- Interactive rental request flow, with a "Proceed to Payment" CTA once approved
- Seamless redirect to Stripe / SSLCommerz checkout, with dedicated payment success/cancel pages
- Tenant dashboard: rental request history with status badges, payment history, and review submission

### Landlord
- Landlord dashboard with an overview of properties, active requests, and earnings
- Property management: create, edit, and remove listings, with multi-image upload (up to 10 images per property)
- Request management table with approve/reject actions and toast notifications
- Optimistic UI updates so request status changes reflect instantly

### Admin
- Admin dashboard with platform-wide stats (users, properties, pending requests)
- User management table with search, pagination, and ban/unban actions
- Content moderation views across all listings and rental requests
- Directly update a rental request's status from the moderation view
- Manage property categories (create/delete)

---

## 🛠️ Tech Stack

| Layer | Technology |
| ----------------- | -------------------------------------------- |
| Framework | Next.js (App Router) |
| Language | TypeScript |
| UI Library | React |
| Styling | Tailwind CSS |
| Components | shadcn/ui, Radix UI |
| Forms & Validation | React Hook Form, Zod, `@hookform/resolvers` |
| Icons | Lucide, React Icons |
| Notifications | Sonner (toasts) |
| Theming | `next-themes` |
| Auth | JWT (`jsonwebtoken`) |
| Package manager | pnpm |

---

## 📁 Project Structure

```
RentNest-Frontend/
├── app/                 # Next.js App Router pages, layouts & routes
├── components/          # Reusable UI components
├── hooks/               # Custom React hooks
├── lib/                 # Shared utilities & config
├── service/             # API client / backend integration layer
├── utils/               # Helper functions
├── public/              # Static assets
├── proxy.ts             # Route protection / middleware logic
├── components.json       # shadcn/ui configuration
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm
- A running instance of the [RentNest Backend](https://github.com/Shashuvo/RentNest-Backend)

### Installation

```bash
git clone https://github.com/Shashuvo/RentNest-Frontend.git
cd RentNest-Frontend
pnpm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
JWT_SECRET=your_jwt_secret
```

### Run the Project

```bash
pnpm dev          # development
pnpm build        # production build
pnpm start        # start built app
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🗺️ Routes & API Integration

Roles noted below are enforced server-side; unmarked endpoints are public or open to any authenticated user. See [`API_INTEGRATION.md`](./API_INTEGRATION.md) for a full component-level breakdown.

| Route | Feature | Backend API | Role |
| ------------------------------------------- | -------------------------------------- | --------------------------------------------------------------- | -------------- |
| `/` | Home page with featured properties | `GET /api/properties` | Public |
| `/properties` | Browse properties | `GET /api/properties`, `GET /api/categories` | Public |
| `/properties/[id]` | Property details & request CTA | `GET /api/properties/:propertyId`, `GET /api/reviews/:propertyId` | Public |
| `/auth/register` | Role selection & registration | `POST /api/auth/register` | Public |
| `/auth/login` | Login | `POST /api/auth/login` | Public |
| Auth context / session refresh | Hydrate current user, refresh token | `GET /api/auth/me`, `POST /api/auth/refresh-token` | Authenticated |
| Profile settings | Update profile & profile image | `PATCH /api/auth/update-me`, `POST /api/upload/profile-image` | Authenticated |
| `/dashboard/tenant` | Tenant overview & request history | `GET /api/rentals`, `GET /api/payments` | Tenant |
| `/dashboard/tenant/requests/[id]` | Rental request detail | `GET /api/rentals/:requestId` | Tenant |
| `/dashboard/tenant/requests/[id]/pay` | Payment initiation page | `POST /api/payments/create` | Tenant |
| `/payment/success` & `/payment/cancel` | Payment outcome pages | Updates UI based on URL params/session (confirmation is a webhook to `POST /api/payments/confirm`, not called from the frontend) | Tenant |
| Review form (on tenant dashboard or property page) | Leave a review after a completed rental | `POST /api/reviews` | Tenant |
| `/dashboard/landlord` | Landlord overview & property list | `GET /api/landlord/properties`, `GET /api/landlord/requests` | Landlord |
| `/dashboard/landlord/properties/new` | Create property form (with image upload) | `POST /api/upload/images`, `POST /api/landlord/properties` | Landlord |
| `/dashboard/landlord/properties/[id]/edit` | Edit property form | `PUT /api/landlord/properties/:propertyId` | Landlord |
| Listing removal action | Delete a listing | `DELETE /api/landlord/properties/:propertyId` | Landlord, Admin |
| `/dashboard/landlord/requests` | Manage incoming requests | `GET /api/landlord/requests`, `PATCH /api/landlord/requests/:requestId` | Landlord |
| `/dashboard/admin` | Admin overview & user management | `GET /api/admin/users`, `PATCH /api/admin/users/:userId` | Admin |
| `/dashboard/admin` — content moderation | All listings & rental requests | `GET /api/admin/properties`, `GET /api/admin/rentals`, `PATCH /api/admin/rentals/:requestId` | Admin |
| `/dashboard/admin` — category management | Create/delete categories | `POST /api/categories`, `DELETE /api/categories/:categoryId` | Admin |

---

## 🔄 User Journeys

### 🏠 Tenant Journey
```
Register/Login → Browse Properties → View Details
    ↓
Submit Request Form → Wait for Approval
    ↓
Approved: "Pay Now" CTA → Stripe/SSLCommerz Redirect
    ↓
Payment Success → Leave Review
```

### 🏘️ Landlord Journey
```
Register/Login → Dashboard Overview → Create Listing Form (with image upload)
    ↓
View Incoming Requests → Approve/Reject
    ↓
Toast Notification → Tenant can now pay
```

---

## 📊 Rental Request Status Badges

| Status | Badge | UI Behavior |
| --------- | ------------- | ------------------------- |
| PENDING | 🟡 Yellow/Orange | Awaiting landlord/admin action |
| APPROVED | 🔵 Blue | Shows "Pay Now" button |
| REJECTED | 🔴 Red | Request closed |
| ACTIVE | 🟢 Green | Shows "Leave Review" button |
| COMPLETED | ⚪ Gray | Rental finished |

---

## 👤 Author

**MD. Shahariat Hossen**
GitHub: [@Shashuvo](https://github.com/Shashuvo)

---

## 📄 License

This project is licensed under the ISC License.