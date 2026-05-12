# Setup & Run Sistem KRS

## Checklist Kebutuhan

### Hardware/Software
- ✅ Node.js v18+ (npm 9+)
- ✅ PostgreSQL 13+ (local atau Supabase)
- ✅ Git
- ✅ Code editor (VSCode recommended)

### Repository
- ✅ Clone repo: `git clone <repo_url>`
- ✅ Backend code: `backend/` folder dengan modules lengkap
- ✅ Frontend code: `frontend/` folder dengan React app
- ✅ Database files: `backend/database/schema.sql` & `seed.sql`

---

## Step 1: Setup Database

### Option A: PostgreSQL Local

1. **Install PostgreSQL** (jika belum ada)
   ```bash
   # Windows: Download dari https://www.postgresql.org/download/windows/
   # macOS: brew install postgresql
   # Linux: sudo apt install postgresql
   ```

2. **Start PostgreSQL service**
   ```bash
   # Windows
   pg_ctl -D "C:\Program Files\PostgreSQL\16\data" start
   
   # macOS
   brew services start postgresql
   
   # Linux
   sudo service postgresql start
   ```

3. **Create database**
   ```bash
   psql -U postgres -c "CREATE DATABASE krs_db;"
   ```

4. **Load schema & seed data**
   ```bash
   cd backend/database
   psql -U postgres -d krs_db -f schema.sql
   psql -U postgres -d krs_db -f seed.sql
   ```

5. **Verify data**
   ```bash
   psql -U postgres -d krs_db -c "SELECT COUNT(*) FROM users;"
   # Should return 26 (1 admin + 5 lecturer + 20 student)
   ```

### Option B: Supabase Cloud

1. **Create project at https://supabase.com**
2. **Go to SQL Editor → New Query**
3. **Copy & run content dari `backend/database/schema.sql`**
4. **Copy & run content dari `backend/database/seed.sql`**
5. **Get connection string from Project Settings → Database**

---

## Step 2: Setup Backend

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Create `.env` file
```bash
# backend/.env

# Database connection (local example)
DATABASE_URL=postgresql://postgres:password@localhost:5432/krs_db

# Or use Supabase (get from Project Settings)
# DATABASE_URL=postgresql://postgres.xxxxx:password@db.xxxxx.supabase.co:5432/postgres

# JWT secret for token (use strong random string)
JWT_SECRET=your_super_secret_jwt_key_min_32_chars_recommended

# Frontend URL for CORS
FRONTEND_URL=http://localhost:5173

# Node environment
NODE_ENV=development
```

### 3. Test backend
```bash
npm run dev
# Should output: Server running on port 3000
```

### 4. Test login endpoint (optional)
```bash
# Open terminal baru, test dengan curl atau Postman

curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@kampus.ac.id",
    "password": "123456"
  }'

# Should return JWT token
```

---

## Step 3: Setup Frontend

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Create `.env` file
```bash
# frontend/.env

# Backend API URL (lokal development)
VITE_API_BASE_URL=http://localhost:3000/api

# Untuk production deployment ke Vercel, ubah ke:
# VITE_API_BASE_URL=https://sistem-krs-backend.vercel.app/api
```

### 3. Test frontend
```bash
npm run dev
# Should show: Local: http://localhost:5173
```

### 4. Open di browser
```
http://localhost:5173
# Redirect ke login page
```

---

## Step 4: Test Full Flow

### 1. Login sebagai Student
```
Email: student1@kampus.ac.id
Password: 123456
```
→ Redirect ke `/student/dashboard`

### 2. Create KRS Draft
- Click "Buka Registrasi" 
- Click "Create KRS Draft"
- Select classes dari available list
- Submit KRS

### 3. Login sebagai Lecturer
```
Email: lecturer1@kampus.ac.id
Password: 123456
```
→ Go to `/lecturer/approval`
- Approve atau Reject student KRS

### 4. Login sebagai Admin
```
Email: admin@kampus.ac.id
Password: 123456
```
→ See courses & classes management

---

## Test Credentials (dari seed data)

### Admin
- Email: `admin@kampus.ac.id`
- Password: `123456`

### Students (20 total)
- Email: `student1@kampus.ac.id` sampai `student20@kampus.ac.id`
- Password: `123456` (semua)

### Lecturers (5 total)
- Email: `lecturer1@kampus.ac.id` sampai `lecturer5@kampus.ac.id`
- Password: `123456` (semua)

---

## Troubleshooting

### ❌ Backend error: "connect ECONNREFUSED"
**Cause**: Database tidak running atau DATABASE_URL salah
**Fix**:
```bash
# Pastikan PostgreSQL running
# Cek DATABASE_URL di backend/.env
# Test connection:
psql -U postgres -d krs_db -c "\dt"
```

### ❌ Frontend error: "Cannot GET /api/..."
**Cause**: Backend belum running
**Fix**:
```bash
cd backend
npm run dev
# Harus lihat: Server running on port 3000
```

### ❌ Login error: "Invalid credentials"
**Cause**: Seed data belum loaded atau email salah
**Fix**:
```bash
# Re-seed database
cd backend/database
psql -U postgres -d krs_db -f seed.sql
```

### ❌ CORS error di frontend
**Cause**: FRONTEND_URL di backend .env tidak sesuai
**Fix**:
```bash
# backend/.env harus sesuai dengan frontend URL
FRONTEND_URL=http://localhost:5173  # jika dev lokal
```

---

## Production Deployment

### Backend → Vercel
```bash
# 1. Push ke GitHub
git add .
git commit -m "backend ready"
git push

# 2. Go to https://vercel.com → Import repository
# 3. Set environment variables:
#    - DATABASE_URL: (Supabase connection string)
#    - JWT_SECRET: (strong random)
#    - FRONTEND_URL: (Vercel frontend domain)
#    - NODE_ENV: production

# 4. Deploy
```

### Frontend → Vercel
```bash
# 1. Update frontend/.env:
#    VITE_API_BASE_URL=https://sistem-krs-backend.vercel.app/api

# 2. Push ke GitHub
# 3. Go to Vercel → Import repository
# 4. Deploy (akan auto-build dengan npm run build)
```

### Database → Supabase
```bash
# Already done in Step 1 Option B
# Make sure connection string di production .env adalah Supabase
```

---

## Quick Start (summary)

```bash
# Terminal 1: Database
psql -U postgres -d krs_db  # atau login ke Supabase

# Terminal 2: Backend
cd backend
npm install
npm run dev  # runs on :3000

# Terminal 3: Frontend
cd frontend
npm install
npm run dev  # runs on :5173

# Open browser: http://localhost:5173
# Login dengan credentials di atas
```

---

## Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  http://localhost:5173                                  │
│  Pages: Login, Dashboard, KRS Registration, Approval    │
└────────────────────────┬────────────────────────────────┘
                         │ Axios HTTP
                         ↓
┌─────────────────────────────────────────────────────────┐
│                  Backend (Express)                       │
│  http://localhost:3000/api                              │
│  Routes: /auth, /students, /lecturers, /krs, /courses  │
└────────────────────────┬────────────────────────────────┘
                         │ pg (PostgreSQL driver)
                         ↓
┌─────────────────────────────────────────────────────────┐
│              Database (PostgreSQL)                       │
│  localhost:5432 / krs_db                                │
│  Tables: users, students, krs, krs_details, etc         │
└─────────────────────────────────────────────────────────┘
```

---

## API Endpoints (Quick Reference)

```
POST   /api/auth/login
GET    /api/auth/profile
GET    /api/students/:id
GET    /api/classes/available
POST   /api/krs
GET    /api/krs/current
POST   /api/krs/:id/add-class
DELETE /api/krs/:id/remove-class
POST   /api/krs/:id/submit
GET    /api/krs/history
POST   /api/krs/:id/approve
POST   /api/krs/:id/reject
GET    /api/courses
GET    /api/lecturers/:id
```

Detail lengkap lihat di `backend/src/modules/*/route.js`

