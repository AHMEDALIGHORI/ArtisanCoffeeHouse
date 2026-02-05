# Artisan Coffee House

An elegant and modern web application for an artisan coffee house. This project showcases a beautiful frontend built with React and Tailwind CSS, backed by a robust Express server. It handles everything from menu display to table reservations.

![Project Banner](https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2574&auto=format&fit=crop)

## ✨ Features

- **Modern & Responsive UI**: Built with Tailwind CSS and Radix UI for a seamless experience across all devices.
- **Dynamic Menu**: Browse various coffee categories including Hot Coffee, Iced Coffee, and Specialties.
- **Reservation System**: Users can book tables directly through the application.
- **User Authentication**: Secure login system (Pre-configured with a dev user for local testing).
- **Smooth Animations**: Enhanced user experience using Framer Motion.
- **In-Memory Development Mode**: Runs out-of-the-box without a database requirement for local development.

## 🛠️ Tech Stack

- **Frontend**: 
  - React
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Radix UI
  - TanStack Query
- **Backend**: 
  - Node.js
  - Express
- **Database / ORM**: 
  - PostgreSQL (Production)
  - Drizzle ORM
  - *In-memory storage fallback for local development*
- **Build Tools**: 
  - Vite
  - esbuild

## 🚀 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AHMEDALIGHORI/ArtisanCoffeeHouse.git
   cd ArtisanCoffeeHouse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Running Locally

Start the development server:

```bash
npm run dev
```

The application will start effectively immediately. 
- Open [http://localhost:5000](http://localhost:5000) to view the app in your browser.
- The backend API is available at [http://localhost:5000/api](http://localhost:5000/api).

> **Note**: For local development, the app uses an in-memory database. Data will reset when the server restarts.

### Authentication (Local Dev)

For local testing, the authentication system is set to mock mode.
- Navigate to the **Login** page.
- The system defaults to a developer user (No password required for local dev setup, or check `server/replit_integrations/auth/replitAuth.ts` for details).

## 📂 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components (Home, Menu, etc.)
│   │   └── lib/            # Utilities and helpers
├── server/                 # Backend Express application
│   ├── routes.ts           # API routes definitions
│   ├── storage.ts          # Data access layer (DB/Memory)
│   └── index.ts            # Server entry point
├── shared/                 # Shared code between client and server
│   └── schema.ts           # Drizzle schema and Zod types
└── package.json            # Project dependencies and scripts
```

## 📄 License

This project is licensed under the MIT License.
