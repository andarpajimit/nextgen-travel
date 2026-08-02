# 🚌 NextGen Travel — Full Stack Bus Booking Application

> **Smart. Reliable. Future-Ready Bus Travel.**
> A complete bus booking platform built with React.js, Node.js, PostgreSQL and Razorpay payment integration — inspired by RedBus.

---

## 🖥️ Website Preview

### 🏠 Homepage

![NextGen Travel Homepage](./homepage-preview.svg)

> **Top to bottom layout:**
> - 🔵 **Topbar** — contact info and social links
> - ⬜ **Navbar** — logo, navigation links, Sign Up / Log In buttons
> - 🌊 **Hero Section** — animated headline, bus illustration, search form
> - 📋 **Why Choose Us** — 3 feature cards (Smart Booking, Eco-Friendly, Reliable)
> - ⚙️ **Advanced Features** — Planning, Tech, Comfort, Safety cards

---

### 🔍 Search Results Page

```
┌────────────────────────────────────────────────────────────────┐
│  🚌 NEXTGEN                   Home  About  Services  Contact   │
│                                              [Sign Up] [Log In]│
├────────────────────────────────────────────────────────────────┤
│  Mumbai → Pune  ·  4 Apr 2026  ·  4 buses found               │
├────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ [Volvo AC]   NextGen Express                     ₹450    │  │
│  │  06:00 ●────────── 3h 30m ──────────● 09:30    40 seats  │  │
│  │  WiFi  USB Charging  AC  Blanket            [Book Now]   │  │
│  └──────────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ [AC Sleeper] NextGen Sleeper                     ₹550    │  │
│  │  22:00 ●────────── 3h 30m ──────────● 01:30    36 seats  │  │
│  │  WiFi  Pillow  Blanket  AC                  [Book Now]   │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

---

### 🎫 Booking Page

```
┌──────────────────────────────────────────────────────────────────────┐
│  Complete Your Booking                                               │
├────────────────────────────────────┬─────────────────────────────────┤
│  ┌──────────────────────────────┐  │  Booking Summary                │
│  │ NextGen Express · NG001      │  │  ─────────────────────────────  │
│  │ Mumbai → Pune                │  │  Route      Mumbai → Pune       │
│  │ 06:00 → 09:30  4 Apr 2026  ₹450│  │  Date       4 Apr 2026         │
│  └──────────────────────────────┘  │  Departure  06:00 AM            │
│                                    │  Bus type   Volvo AC            │
│  👤 Passenger Details              │  Passenger  Rahul Sharma        │
│  Full Name:  [Rahul Sharma      ]  │  Base fare  ₹450               │
│  Age:  [28]   Gender: [Male  ▾]   │  ─────────────────────────────  │
│                                    │  Total      ₹450               │
│  ☑ I have read and agree to all   │                                  │
│    Terms & Conditions              │  [💳 Pay ₹450 with Razorpay]   │
│                                    │                                  │
│  [     Proceed to Payment →     ]  │  Secured · UPI · Cards · NB    │
├────────────────────────────────────┴─────────────────────────────────┤
└──────────────────────────────────────────────────────────────────────┘
```

---

### ✅ Booking Success Page

```
┌───────────────────────────────────────┐
│                                       │
│              ✅                       │
│        Booking Confirmed!             │
│   Payment successful. Ticket booked.  │
│                                       │
│  ┌─────────────────────────────────┐  │
│  │     BOOKING REFERENCE           │  │
│  │         NG4F8K2A                │  │
│  └─────────────────────────────────┘  │
│                                       │
│  Route       Mumbai → Pune            │
│  Passenger   Rahul Sharma             │
│  Travel date 4 Apr 2026 · 06:00       │
│  Amount paid ₹450 ✓                   │
│                                       │
│  [🏠 Go Home]   [📋 My Bookings]     │
│                                       │
└───────────────────────────────────────┘
```

---

### 🛠️ Admin Dashboard

```
┌────────────────────────────────────────────────────────────────────┐
│  🚌 NEXTGEN    🛠 Admin Dashboard                                  │
├────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│  │ 🎫 128   │ │ 💰₹72,400│ │ 👥 94    │ │ 🗺️ 10   │             │
│  │Bookings  │ │ Revenue  │ │Customers │ │ Routes   │             │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘             │
├────────────────────────────────────────────────────────────────────┤
│  [Stats] [Buses] [Routes] [Schedules] [Bookings]                   │
├────────────────────────────────────────────────────────────────────┤
│  Ref       Customer      Route            Amount   Status          │
│  ──────────────────────────────────────────────────────────        │
│  NG4F8K2A  Rahul Sharma  Mumbai→Pune      ₹450    ✅ Paid          │
│  NGX9J7LM  Priya Patel   Mumbai→Goa       ₹1,200  ✅ Paid          │
│  NG2R5KQP  Amit Desai    Pune→Goa         ₹900    ⏳ Pending       │
└────────────────────────────────────────────────────────────────────┘
```

---

### 🔐 Login & Register Pages

```
┌─────────────────────────┐   ┌─────────────────────────┐
│     Welcome Back 👋     │   │   Create Account 🚌     │
│  Login to your account  │   │  Join NextGen Travel     │
│                         │   │                          │
│  Email                  │   │  Full Name               │
│  [admin@nextgen.com   ] │   │  [Rahul Sharma         ] │
│                         │   │                          │
│  Password               │   │  Email                   │
│  [••••••••           ] │   │  [rahul@gmail.com      ] │
│                         │   │                          │
│  [     Login →       ]  │   │  Phone                   │
│                         │   │  [9876543210           ] │
│  Don't have account?    │   │                          │
│  Sign Up                │   │  Password                │
│                         │   │  [••••••              ] │
│  🔑 Admin credentials   │   │                          │
│  admin@nextgentravel.com│   │  [     Sign Up →      ]  │
│  Admin@123              │   │  Already have account?   │
│                         │   │  Login                   │
└─────────────────────────┘   └─────────────────────────┘
```

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Deployment on Render](#deployment-on-render)
- [Razorpay Integration](#razorpay-integration)
- [MVC Pattern Explained](#mvc-pattern-explained)
- [Admin Login](#admin-login)
- [Common Errors and Fixes](#common-errors-and-fixes)

---

## 🎯 About the Project

NextGen Travel is a full-stack bus ticket booking web application. Customers can search buses by route and date, book tickets, and pay online. Admins can manage buses, routes, schedules, and view all bookings from a dedicated dashboard.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js 18, React Router v6, Axios |
| Backend | Node.js, Express.js |
| Database | PostgreSQL (via Supabase) |
| Payment | Razorpay (test mode) |
| Auth | JWT (JSON Web Tokens) + bcryptjs |
| Hosting | Render (backend + frontend) |
| Pattern | MVC (Model View Controller) |

---

## ✨ Features

### Customer
- ✅ Register new account
- ✅ Login / Logout
- ✅ Search buses by From → To → Date
- ✅ View available buses with amenities, timings, price
- ✅ Book ticket with passenger details (name, age, gender)
- ✅ Accept Terms and Conditions before payment
- ✅ Pay online via Razorpay (UPI, Cards, Net Banking)
- ✅ Get booking confirmation with unique reference number
- ✅ View all my bookings

### Admin
- ✅ Admin login (separate role)
- ✅ Dashboard with stats (bookings, revenue, customers, routes)
- ✅ Add / Edit / Delete buses
- ✅ Add / Delete routes
- ✅ Create / Cancel schedules
- ✅ View all customer bookings with payment status

---

## 📁 Folder Structure

```
nextgen-travel/
│
├── backend/                        ← Node.js + Express (MVC)
│   ├── config/
│   │   └── database.js             ← PostgreSQL connection pool
│   │
│   ├── controllers/                ← Business logic (C in MVC)
│   │   ├── authController.js       ← Register, Login, GetMe
│   │   ├── busController.js        ← CRUD for buses
│   │   ├── routeController.js      ← CRUD for routes
│   │   ├── scheduleController.js   ← Search + CRUD for schedules
│   │   └── bookingController.js    ← Create order, Verify payment
│   │
│   ├── middleware/
│   │   └── auth.js                 ← JWT protect + adminOnly
│   │
│   ├── migrations/
│   │   ├── schema.js               ← Creates all tables + seed data
│   │   └── run.js                  ← Run migrations manually
│   │
│   ├── routes/                     ← URL mapping
│   │   ├── authRoutes.js
│   │   ├── busRoutes.js
│   │   ├── routeRoutes.js
│   │   ├── scheduleRoutes.js
│   │   └── bookingRoutes.js
│   │
│   ├── .env                        ← Never push to GitHub!
│   ├── .gitignore
│   ├── package.json
│   └── server.js                   ← Main entry point
│
├── frontend/                       ← React.js
│   ├── public/
│   │   └── index.html              ← Add Razorpay script here
│   │
│   ├── src/
│   │   ├── assets/images/          ← hero-bus.png, logo.png
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.js      ← Global auth state
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── SearchPage.jsx
│   │   │   ├── BookingPage.jsx
│   │   │   ├── BookingSuccessPage.jsx
│   │   │   ├── MyBookingsPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── utils/
│   │   │   └── api.js              ← Axios with base URL + token
│   │   ├── App.js
│   │   └── index.js
│   │
│   ├── .env
│   └── package.json                ← "proxy": "http://localhost:5000"
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

```
Node.js     v18+    → nodejs.org
npm         v9+     → comes with Node.js
PostgreSQL  v14+    → postgresql.org  (or use Supabase)
Git                 → git-scm.com
```

### Clone the Repository

```bash
git clone https://github.com/your-username/nextgen-travel.git
cd nextgen-travel
```

---

## 🔐 Environment Variables

### Backend — `backend/.env`

```env
PORT=5000
NODE_ENV=development

# PostgreSQL Local
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nextgen_travel
DB_USER=postgres
DB_PASSWORD=your_postgres_password_here

# OR use Supabase connection string
# DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres

# JWT
JWT_SECRET=nextgen_travel_super_secret_key_2024
JWT_EXPIRES_IN=7d

# Razorpay Test Keys
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID_HERE
RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET_HERE

# Frontend URL for CORS
CLIENT_URL=http://localhost:3000
```

### Frontend — `frontend/.env`

```env
# Local — leave empty (proxy handles it)
REACT_APP_API_URL=

# Production on Render
# REACT_APP_API_URL=https://nextgen-travel-backend.onrender.com
```

---

## 🗄 Database Setup

### Option A — Local PostgreSQL

```sql
-- Step 1: Create database
CREATE DATABASE nextgen_travel;

-- Step 2: Tables are created automatically when backend starts!
```

### Option B — Supabase (Recommended)

1. Go to **supabase.com** → Create project
2. Settings → Database → Copy **Connection String (URI)**
3. Paste as `DATABASE_URL` in `backend/.env`
4. Start backend → tables auto-create!

### Tables Created Automatically

| Table | Description |
|---|---|
| `users` | Customer and admin accounts |
| `routes` | City-to-city routes |
| `buses` | Bus details and amenities |
| `schedules` | Bus timings and pricing |
| `bookings` | All ticket bookings |

### Sample Data Inserted Automatically

- ✅ 1 admin user
- ✅ 20 routes across India
- ✅ 6 buses (Volvo AC, AC Sleeper, AC Seater etc.)
- ✅ Schedules for next 7 days

---

## ▶ Running the App

### Terminal 1 — Start Backend

```bash
cd backend
npm install
npm run dev
```

Expected output:
```
✅ Connected to PostgreSQL!
✅ Tables created + sample data inserted!
🚌 Server running on http://localhost:5000
```

### Terminal 2 — Start Frontend

```bash
cd frontend
npm install
npm start
```

Expected output:
```
Compiled successfully!
Local: http://localhost:3000
```

> ⚠️ Keep BOTH terminals open at the same time!

---

## 📡 API Endpoints

### Auth — `/api/auth`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create new account |
| POST | `/api/auth/login` | Public | Login and get JWT token |
| GET | `/api/auth/me` | Private | Get logged-in user info |

### Buses — `/api/buses`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/buses` | Admin | Get all buses |
| POST | `/api/buses` | Admin | Add new bus |
| PUT | `/api/buses/:id` | Admin | Update bus |
| DELETE | `/api/buses/:id` | Admin | Delete bus |

### Routes — `/api/routes`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/routes/cities` | Public | Get all unique cities |
| GET | `/api/routes` | Admin | Get all routes |
| POST | `/api/routes` | Admin | Add new route |
| DELETE | `/api/routes/:id` | Admin | Delete route |

### Schedules — `/api/schedules`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/schedules/search` | Public | Search buses by route+date |
| GET | `/api/schedules` | Admin | Get all schedules |
| POST | `/api/schedules` | Admin | Create schedule |
| DELETE | `/api/schedules/:id` | Admin | Cancel schedule |

### Bookings — `/api/bookings`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/bookings/create-order` | Private | Create Razorpay order |
| POST | `/api/bookings/verify-payment` | Private | Verify + save booking |
| GET | `/api/bookings/my-bookings` | Private | Get my bookings |
| GET | `/api/bookings/stats` | Admin | Dashboard stats |
| GET | `/api/bookings` | Admin | All bookings |

---

## ☁ Deployment on Render

### Step 1 — Deploy Backend

```
Root Directory:   backend
Build Command:    npm install
Start Command:    node server.js
```

Add environment variables in Render dashboard.

### Step 2 — Deploy Frontend

```
Root Directory:    frontend
Build Command:     npm install && npm run build
Publish Directory: build
```

Add:
```
REACT_APP_API_URL = https://your-backend-name.onrender.com
```

### SSL Fix for Supabase on Render

In `backend/config/database.js`:

```js
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // ← Required!
      }
    : {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        ssl: false,
      }
);
```

---

## 💳 Razorpay Integration

### Get Test API Keys

1. razorpay.com → Sign up → Dashboard → API Keys
2. Generate Test Key → copy Key ID + Key Secret
3. Add to `backend/.env`

### Add Script to Frontend

In `frontend/public/index.html` inside `<head>`:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

### Payment Flow

```
User clicks Pay
    ↓
POST /api/bookings/create-order
    ↓
Backend creates Razorpay order → returns order_id
    ↓
Razorpay popup opens in browser
    ↓
User pays (UPI / Card / Net Banking)
    ↓
Razorpay returns: order_id + payment_id + signature
    ↓
POST /api/bookings/verify-payment
    ↓
Backend verifies HMAC signature
    ↓
Booking saved → Success page shown ✅
```

### Test Payment Details

```
UPI:      success@razorpay
Card No:  4111 1111 1111 1111
Expiry:   Any future date
CVV:      Any 3 digits
OTP:      Any value
```

---

## 🏗 MVC Pattern Explained

```
VIEW        →  React.js pages     (what the user sees)
CONTROLLER  →  Node.js controllers (business logic)
MODEL       →  PostgreSQL tables  (data storage)

Golden Rule:
View NEVER talks to DB directly.
Always goes through Controller.

User clicks → React → axios → Express Routes
           → Middleware (JWT check)
           → Controller (logic)
           → pool.query() → PostgreSQL
           → JSON response → React updates UI
```

---

## 🔑 Admin Login

```
URL:       http://localhost:3000/login
Email:     admin@nextgentravel.com
Password:  Admin@123
```

Admin is automatically redirected to `/admin` dashboard after login.

---

## ❗ Common Errors and Fixes

| Error | Cause | Fix |
|---|---|---|
| `Cannot POST /api/auth/login` | Backend not running | Run `npm run dev` in backend folder |
| `Cannot read properties of undefined (reading 'map')` | API returned undefined | Add `(cities \|\| []).map(...)` |
| `getaddrinfo ENOTFOUND base` | Wrong DB_HOST | Use full Supabase hostname or DATABASE_URL |
| `SSL required` | Render/Supabase needs SSL | Add `ssl: { rejectUnauthorized: false }` |
| `injected env (0) from .env` | .env not on Render | Add env vars in Render dashboard |
| Razorpay popup not opening | Script not loaded | Add checkout.js in index.html head |
| `Payment verification failed` | Wrong key secret | Check RAZORPAY_KEY_SECRET in .env |

---

## 📦 Dependencies

### Backend
```json
{
  "express":     "^4.18.2",
  "pg":          "^8.11.3",
  "bcryptjs":    "^2.4.3",
  "jsonwebtoken":"^9.0.2",
  "razorpay":    "^2.9.2",
  "cors":        "^2.8.5",
  "dotenv":      "^16.3.1",
  "uuid":        "^9.0.0"
}
```

### Frontend
```json
{
  "react":            "^18.2.0",
  "react-dom":        "^18.2.0",
  "react-router-dom": "^6.21.0",
  "axios":            "^1.6.2",
  "react-toastify":   "^10.0.4"
}
```

---

## 🔒 Security Notes

- Never commit `.env` to GitHub — add to `.gitignore`
- JWT tokens expire in 7 days
- Passwords hashed with bcrypt (10 rounds)
- Razorpay payment signature verified server-side using HMAC
- Admin routes protected by `adminOnly` middleware

---

## 👨‍💻 Author

**NextGen Travel** — Built as a real-world full-stack project

- Frontend: React.js
- Backend: Node.js / Express.js
- Database: PostgreSQL (Supabase)
- Payment: Razorpay
- Hosting: Render

---

## 📄 License

MIT License — open source and free to use.

---

## 🙏 Acknowledgements

- [RedBus](https://www.redbus.in) — Booking flow inspiration
- [Razorpay](https://razorpay.com) — Payment gateway
- [Supabase](https://supabase.com) — PostgreSQL hosting
- [Render](https://render.com) — App hosting
- [Unsplash](https://unsplash.com) — Free images
- [Freepik](https://freepik.com) — Bus illustrations

---

*Made with ❤️ for NextGen Travel*
