# 🚌 NextGen Travel — Full Stack Bus Booking Application

> **Smart. Reliable. Future-Ready Bus Travel.**
> A complete bus booking platform built with React.js, Node.js, PostgreSQL and Razorpay payment integration — inspired by RedBus.

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
- [Screenshots](#screenshots)
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
│   │   └── bookingController.js    ← Create order, Verify payment, Bookings
│   │
│   ├── middleware/
│   │   └── auth.js                 ← JWT protect + adminOnly middleware
│   │
│   ├── migrations/
│   │   ├── schema.js               ← Creates all tables + seed data
│   │   └── run.js                  ← Run migrations manually
│   │
│   ├── routes/                     ← URL mapping (routes to controllers)
│   │   ├── authRoutes.js
│   │   ├── busRoutes.js
│   │   ├── routeRoutes.js
│   │   ├── scheduleRoutes.js
│   │   └── bookingRoutes.js
│   │
│   ├── .env                        ← Environment variables (never push to GitHub!)
│   ├── .gitignore
│   ├── package.json
│   └── server.js                   ← Main entry point
│
├── frontend/                       ← React.js
│   ├── public/
│   │   └── index.html              ← Add Razorpay script here
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   └── images/             ← Put hero-bus.png, logo.png here
│   │   │
│   │   ├── components/
│   │   │   └── Navbar.jsx          ← Top navigation bar
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.js      ← Global auth state (user, token)
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.jsx        ← Landing page with search
│   │   │   ├── SearchPage.jsx      ← Bus listing results
│   │   │   ├── BookingPage.jsx     ← Passenger details + payment
│   │   │   ├── BookingSuccessPage.jsx ← Confirmation page
│   │   │   ├── MyBookingsPage.jsx  ← Customer booking history
│   │   │   ├── LoginPage.jsx       ← Login form
│   │   │   ├── RegisterPage.jsx    ← Sign up form
│   │   │   └── AdminDashboard.jsx  ← Admin panel
│   │   │
│   │   ├── utils/
│   │   │   └── api.js              ← Axios instance with base URL + token
│   │   │
│   │   ├── App.js                  ← Routes + PrivateRoute + AdminRoute
│   │   └── index.js
│   │
│   ├── .env                        ← REACT_APP_API_URL
│   └── package.json                ← "proxy": "http://localhost:5000"
│
└── README.md                       ← This file
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have these installed:

```
Node.js     v18 or higher    → nodejs.org
npm         v9  or higher    → comes with Node.js
PostgreSQL  v14 or higher    → postgresql.org  (or use Supabase)
Git                          → git-scm.com
```

### Clone the Repository

```bash
git clone https://github.com/your-username/nextgen-travel.git
cd nextgen-travel
```

---

## 🔐 Environment Variables

### Backend — `backend/.env`

Create this file manually. Never push it to GitHub.

```env
# Server
PORT=5000
NODE_ENV=development

# PostgreSQL (Local)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nextgen_travel
DB_USER=postgres
DB_PASSWORD=your_postgres_password_here

# For Supabase / Render (use this instead of above 5 lines)
# DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres

# JWT
JWT_SECRET=nextgen_travel_super_secret_key_2024
JWT_EXPIRES_IN=7d

# Razorpay Test Keys (get from razorpay.com/dashboard)
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_ID_HERE
RAZORPAY_KEY_SECRET=YOUR_KEY_SECRET_HERE

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

### Frontend — `frontend/.env`

```env
# For local development — leave empty (proxy handles it)
REACT_APP_API_URL=

# For production on Render — set your backend URL
# REACT_APP_API_URL=https://nextgen-travel-backend.onrender.com
```

---

## 🗄 Database Setup

### Option A — Local PostgreSQL

**Step 1:** Install PostgreSQL from postgresql.org

**Step 2:** Open pgAdmin or psql and create database:
```sql
CREATE DATABASE nextgen_travel;
```

**Step 3:** Tables are created automatically when you start the backend server. No manual SQL needed!

### Option B — Supabase (Recommended for beginners)

**Step 1:** Go to supabase.com → Create new project

**Step 2:** Go to Settings → Database → Copy the Connection String (URI)

**Step 3:** Paste it in your `backend/.env` as `DATABASE_URL`:
```env
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxx.supabase.co:5432/postgres
```

**Step 4:** Start the backend — tables are created automatically!

### What Gets Created Automatically

| Table | Description |
|---|---|
| `users` | Customer and admin accounts |
| `routes` | City-to-city routes (Mumbai → Pune etc.) |
| `buses` | Bus details (number, name, type, amenities) |
| `schedules` | Which bus runs on which route at what time |
| `bookings` | All ticket bookings with payment info |

### Sample Data Inserted Automatically

- ✅ 1 admin user (see credentials below)
- ✅ 20 routes across India
- ✅ 6 buses (Volvo AC, AC Sleeper, AC Seater etc.)
- ✅ 126 schedules for next 7 days

---

## ▶ Running the App

### Start Backend

```bash
cd backend
npm install
npm run dev
```

You should see:
```
✅ Connected to PostgreSQL!
✅ Tables created + sample data inserted!
🚌 NextGen Travel Server running on http://localhost:5000
```

### Start Frontend

Open a **new terminal**:

```bash
cd frontend
npm install
npm start
```

You should see:
```
Compiled successfully!
Local: http://localhost:3000
```

> ⚠️ Both terminals must stay open at the same time!

---

## 📡 API Endpoints

### Auth Routes — `/api/auth`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Create new account |
| POST | `/api/auth/login` | Public | Login and get token |
| GET | `/api/auth/me` | Private | Get logged-in user info |

### Bus Routes — `/api/buses`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/buses` | Admin | Get all buses |
| POST | `/api/buses` | Admin | Add new bus |
| PUT | `/api/buses/:id` | Admin | Update bus |
| DELETE | `/api/buses/:id` | Admin | Delete bus |

### Route Routes — `/api/routes`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/routes/cities` | Public | Get all unique cities |
| GET | `/api/routes` | Admin | Get all routes |
| POST | `/api/routes` | Admin | Add new route |
| DELETE | `/api/routes/:id` | Admin | Delete route |

### Schedule Routes — `/api/schedules`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/api/schedules/search` | Public | Search buses by from, to, date |
| GET | `/api/schedules` | Admin | Get all schedules |
| POST | `/api/schedules` | Admin | Create new schedule |
| DELETE | `/api/schedules/:id` | Admin | Cancel schedule |

### Booking Routes — `/api/bookings`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/bookings/create-order` | Private | Create Razorpay order |
| POST | `/api/bookings/verify-payment` | Private | Verify payment + save booking |
| GET | `/api/bookings/my-bookings` | Private | Get my bookings |
| GET | `/api/bookings/stats` | Admin | Get dashboard stats |
| GET | `/api/bookings` | Admin | Get all bookings |

---

## ☁ Deployment on Render

### Step 1 — Create PostgreSQL on Render OR use Supabase

### Step 2 — Deploy Backend

1. Go to render.com → New → Web Service
2. Connect your GitHub repo
3. Settings:
```
Root Directory:  backend
Build Command:   npm install
Start Command:   node server.js
```
4. Add environment variables (from your `.env` file)

### Step 3 — Deploy Frontend

1. Go to render.com → New → Static Site
2. Connect same GitHub repo
3. Settings:
```
Root Directory:    frontend
Build Command:     npm install && npm run build
Publish Directory: build
```
4. Add environment variable:
```
REACT_APP_API_URL = https://your-backend-name.onrender.com
```

### Step 4 — Update CORS

In backend `.env` on Render, update:
```
CLIENT_URL=https://your-frontend-name.onrender.com
```

### Important — SSL for Supabase on Render

Your `backend/config/database.js` must include SSL:

```js
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // ← Required for Supabase + Render
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

1. Go to razorpay.com → Sign up free
2. Dashboard → Settings → API Keys
3. Click **Generate Test Key**
4. Copy `Key ID` and `Key Secret`
5. Paste in `backend/.env`:
```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
```

### Add Razorpay Script to Frontend

In `frontend/public/index.html`, inside `<head>`:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

### Payment Flow

```
1. User clicks Pay
      ↓
2. Frontend → POST /api/bookings/create-order
      ↓
3. Backend creates Razorpay order → returns order_id
      ↓
4. Frontend opens Razorpay popup
      ↓
5. User pays (UPI / Card / Net Banking)
      ↓
6. Razorpay returns 3 keys:
   - razorpay_order_id
   - razorpay_payment_id
   - razorpay_signature
      ↓
7. Frontend → POST /api/bookings/verify-payment
      ↓
8. Backend verifies signature using crypto.createHmac
      ↓
9. If valid → booking saved in DB → success page shown
```

### Test Payment Details (Test Mode)

```
UPI:         success@razorpay
Card No:     4111 1111 1111 1111
Expiry:      Any future date
CVV:         Any 3 digits
OTP:         Enter any OTP when prompted
```

---

## 🏗 MVC Pattern Explained

```
MVC = Model + View + Controller

VIEW        →  React.js pages (what the user sees)
CONTROLLER  →  Node.js controllers (business logic)
MODEL       →  PostgreSQL tables (data storage)

The golden rule:
View NEVER talks to the database directly.
It always goes through the Controller.

User clicks button
    → React (View) sends HTTP request
    → Express Routes matches URL
    → Middleware checks JWT token
    → Controller runs business logic
    → pool.query() runs SQL on PostgreSQL
    → Data returned to Controller
    → Controller sends JSON response
    → React updates the UI
```

---

## 🖼 Screenshots

| Screen | Description |
|---|---|
| Homepage | Hero section with bus + search form |
| Search Results | List of available buses with Book Now button |
| Booking Page | Passenger details + T&C + Razorpay payment |
| Success Page | Booking confirmation with reference number |
| My Bookings | Customer booking history |
| Admin Dashboard | Stats + Bus/Route/Schedule management |
| Login / Register | Auth screens |

---

## 🔑 Admin Login

```
URL:       http://localhost:3000/login
Email:     admin@nextgentravel.com
Password:  Admin@123
```

After login, admin is automatically redirected to `/admin` dashboard.

---

## ❗ Common Errors and Fixes

### Error: `Cannot POST /api/auth/login`
**Cause:** Backend server not running
**Fix:** Run `npm run dev` in the backend folder

---

### Error: `Cannot read properties of undefined (reading 'map')`
**Cause:** API returned undefined instead of an array
**Fix:** Add safe fallback in JSX:
```jsx
{(cities || []).map(c => <option key={c}>{c}</option>)}
```

---

### Error: `getaddrinfo ENOTFOUND base`
**Cause:** `DB_HOST` is wrong in environment variables
**Fix:** Use the full Supabase hostname or `DATABASE_URL` connection string

---

### Error: `SSL required`
**Cause:** Supabase or Render requires SSL
**Fix:** Add `ssl: { rejectUnauthorized: false }` in `database.js`

---

### Error: `injected env (0) from .env`
**Cause:** `.env` file not found on Render
**Fix:** Add all environment variables manually in Render dashboard

---

### Error: Razorpay popup not opening
**Cause:** Script not loaded
**Fix:** Add this in `public/index.html` inside `<head>`:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

---

### Error: `Payment verification failed`
**Cause:** `RAZORPAY_KEY_SECRET` is wrong or missing
**Fix:** Double check your key secret in `.env` and Render environment variables

---

## 📦 Dependencies

### Backend
```json
{
  "express":    "^4.18.2",
  "pg":         "^8.11.3",
  "bcryptjs":   "^2.4.3",
  "jsonwebtoken":"^9.0.2",
  "razorpay":   "^2.9.2",
  "cors":       "^2.8.5",
  "dotenv":     "^16.3.1",
  "uuid":       "^9.0.0"
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

- Never commit `.env` to GitHub
- Add `.env` to `.gitignore`
- JWT tokens expire in 7 days
- Passwords are hashed with bcrypt (10 rounds)
- Razorpay payment signature is verified server-side
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

This project is open source and available under the MIT License.

---

## 🙏 Acknowledgements

- [RedBus](https://www.redbus.in) — Inspiration for the booking flow
- [Razorpay](https://razorpay.com) — Payment gateway
- [Supabase](https://supabase.com) — PostgreSQL hosting
- [Render](https://render.com) — App hosting
- [Unsplash](https://unsplash.com) — Free images
- [Freepik](https://freepik.com) — Bus illustrations

---

*Made with ❤️ for NextGen Travel*
