# Artisan Coffee House

## Overview

A premium coffee shop website featuring an elegant landing page with menu display, table reservations, and user authentication. The application showcases artisan coffee products with a sophisticated dark/light theme system and smooth scroll animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite with custom configuration for Replit

The frontend follows a component-based architecture with:
- Page components in `client/src/pages/`
- Section components for the landing page in `client/src/components/sections/`
- Reusable UI components from shadcn/ui in `client/src/components/ui/`
- Custom hooks in `client/src/hooks/`

### Backend Architecture
- **Runtime**: Node.js with Express
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful endpoints under `/api/`

Key server files:
- `server/index.ts`: Main entry point with middleware setup
- `server/routes.ts`: API route definitions
- `server/storage.ts`: Data access layer with storage interface pattern
- `server/db.ts`: Database connection using Drizzle ORM

### Data Storage
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM with Zod schema validation
- **Schema Location**: `shared/schema.ts` for shared types between client and server
- **Migrations**: Managed via `drizzle-kit push`

Database tables:
- `menu_items`: Coffee and pastry products with pricing and categories
- `reservations`: Table booking information
- `users`: User accounts for authentication
- `sessions`: Session storage for auth persistence

### Authentication
- **Provider**: Replit Auth (OpenID Connect)
- **Session Storage**: PostgreSQL-backed sessions via connect-pg-simple
- **Implementation**: Located in `server/replit_integrations/auth/`

The auth system uses Passport.js with OIDC strategy, storing sessions in the database for persistence across restarts.

### Theme System
- Dual theme support (light/dark) implemented via CSS custom properties
- Theme state managed in React context (`client/src/components/theme-provider.tsx`)
- Persisted to localStorage

## External Dependencies

### Database
- PostgreSQL via `DATABASE_URL` environment variable
- Drizzle ORM for type-safe queries

### Authentication
- Replit OIDC provider (`ISSUER_URL` defaults to `https://replit.com/oidc`)
- Requires `SESSION_SECRET` environment variable

### UI Libraries
- shadcn/ui components (Radix UI primitives)
- Tailwind CSS for styling
- Lucide React for icons

### Key NPM Packages
- `@tanstack/react-query`: Server state management
- `drizzle-orm` / `drizzle-zod`: Database ORM and validation
- `express-session` / `connect-pg-simple`: Session management
- `passport` / `openid-client`: Authentication
- `react-hook-form` / `zod`: Form handling and validation