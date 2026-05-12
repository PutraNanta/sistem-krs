# 🚀 DEPLOYMENT GUIDE - Vercel + Supabase

Panduan lengkap untuk deploy Sistem KRS ke production dengan Vercel (Frontend & Backend) dan Supabase (Database).

---

## 📋 CHECKLIST PRE-DEPLOYMENT

- [ ] GitHub account (https://github.com)
- [ ] Vercel account (https://vercel.com) - link ke GitHub
- [ ] Supabase account (https://supabase.com)
- [ ] Local repo sudah di-git init dan push ke GitHub
- [ ] Backend .env sudah di-setup lokal
- [ ] Frontend .env sudah di-setup lokal
- [ ] Backend & Frontend sudah ditest lokal (npm run dev)

---

## STEP 1: Setup Supabase Database (20 menit)

### 1.1 Create Supabase Project
```
1. Go to https://supabase.com
2. Click "New Project"
3. Select Organization atau create new
4. Project name: "krs-sistem"
5. Database password: Simpan password ini!
6. Region: Indonesia (Southeast Asia)
7. Click "Create new project" (tunggu 2-3 menit)
```

### 1.2 Load Schema ke Supabase
```
1. Di Supabase Dashboard → SQL Editor
2. Click "New Query"
3. Paste seluruh isi dari:
   backend/database/schema.sql
4. Click "Run"
5. Tunggu selesai (seharusnya no error)
```

### 1.3 Load Seed Data ke Supabase
```
1. Di Supabase Dashboard → SQL Editor
2. Click "New Query" (atau new tab)
3. Paste seluruh isi dari:
   backend/database/seed.sql
4. Click "Run"
5. Verifikasi: SELECT COUNT(*) FROM users; → Should return 26
```

### 1.4 Get Supabase Connection String
```
1. Di Supabase Dashboard → Settings → Database
2. Find: URI (PostgreSQL Connection String)
3. Copy & simpan ke temporary text file
   Format: postgresql://postgres.[project-id]:[password]@db.[project-id].supabase.co:5432/postgres
4. Gunakan ini untuk backend DATABASE_URL
```

---

## STEP 2: Push Code ke GitHub

### 2.1 Setup GitHub Repository
```bash
# Jika belum ada GitHub account:
# 1. Go to https://github.com/signup
# 2. Create account
# 3. Verify email

# Jika belum punya repo di GitHub:
# Di GitHub.com → New repository
#   Repository name: sistem-krs
#   Public atau Private (bisa Public)
#   Click "Create repository"
```

### 2.2 Push Code ke GitHub
```bash
cd d:\TugasUnud\Semester\ 6\TOPSUS\KRS\sistem-krs

# Jika belum initialize git:
git init
git branch -M main

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/sistem-krs.git

# Push code
git add .
git commit -m "Initial commit: KRS system with backend, frontend, database"
git push -u origin main

# Tunggu push selesai (1-2 menit)
```

**Verifikasi**: Buka https://github.com/YOUR_USERNAME/sistem-krs → Harus ada file semua

---

## STEP 3: Deploy Backend ke Vercel (15 menit)

### 3.1 Create Vercel Project
```
1. Go to https://vercel.com/new
2. Import dari GitHub repository: sistem-krs
3. Klik repository yang sesuai
4. Configure project:
   - Framework Preset: Other (Node.js)
   - Root Directory: backend
   - Build Command: (kosong, tidak ada build)
   - Output Directory: (kosong)
   - Install Command: npm install
   - Start Command: node src/server.js
5. Click "Deploy"
```

### 3.2 Setup Environment Variables
```
1. Di Vercel → [project] → Settings → Environment Variables
2. Tambahkan 4 variables:

   DATABASE_URL = [Supabase connection string dari Step 1.4]
   JWT_SECRET = generate_random_string_min_64_chars
              (bisa pakai: https://www.random.org/strings/)
   FRONTEND_URL = https://[frontend-vercel-url].vercel.app
   NODE_ENV = production

3. Click "Save"
```

### 3.3 Trigger Redeploy
```
1. Di Vercel → Deployments
2. Click tombol "Redeploy" di latest deployment
3. Tunggu status berubah dari "Building" → "Ready" (2-3 menit)
4. Klik URL untuk test
```

**Test Backend**:
```bash
curl https://[backend-vercel-url].vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@kampus.ac.id",
    "password": "123456"
  }'

# Harus return JWT token
```

Catat URL Backend: `https://[backend-vercel-url].vercel.app`

---

## STEP 4: Deploy Frontend ke Vercel (15 menit)

### 4.1 Create Frontend Vercel Project
```
1. Go to https://vercel.com/new
2. Import dari GitHub repository: sistem-krs
3. Klik repository yang sama (sistem-krs)
4. Configure project:
   - Framework: Vite
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: dist
   - Install Command: npm install
5. Click "Deploy"
```

### 4.2 Setup Environment Variables
```
1. Di Vercel → [project] → Settings → Environment Variables
2. Tambahkan 1 variable:

   VITE_API_BASE_URL = https://[backend-vercel-url].vercel.app/api

3. Click "Save"
```

### 4.3 Trigger Redeploy
```
1. Di Vercel → Deployments
2. Click "Redeploy"
3. Tunggu status "Ready" (3-5 menit)
4. Klik URL untuk test
```

**Test Frontend**:
```
1. Buka https://[frontend-vercel-url].vercel.app
2. Harusnya lihat login page
3. Login dengan: admin@kampus.ac.id / 123456
4. Harusnya redirect ke /admin/courses
```

---

## STEP 5: Final Verification (5 menit)

### ✅ Checklist Production

| Item | Test | Status |
|------|------|--------|
| Frontend URL | Buka di browser | _____ |
| Login page | Muncul di frontend | _____ |
| Login endpoint | `curl /api/auth/login` | _____ |
| Student KRS flow | Create draft → Submit | _____ |
| Lecturer approval | Approve/Reject KRS | _____ |
| Database | Lihat di Supabase SQL | _____ |

### Login Test dengan 3 Role

**Admin:**
```
URL: https://[frontend-vercel-url].vercel.app/login
Email: admin@kampus.ac.id
Password: 123456
Expected: Redirect ke /admin/courses
```

**Student:**
```
Email: student1@kampus.ac.id
Password: 123456
Expected: Redirect ke /student/dashboard
```

**Lecturer:**
```
Email: lecturer1@kampus.ac.id
Password: 123456
Expected: Redirect ke /lecturer/approval
```

---

## TROUBLESHOOTING

### ❌ Backend Deployment Failed
**Symptoms**: Vercel build error

**Fix**:
```bash
# 1. Check build locally
cd backend
npm install
npm run dev

# 2. If error, fix locally then:
git add .
git commit -m "fix backend"
git push

# 3. Vercel should auto-redeploy
```

### ❌ Frontend shows "Cannot connect to API"
**Symptoms**: Frontend loads tapi login gagal

**Fix**:
1. Check Vercel Environment Variable VITE_API_BASE_URL
   - Harus: https://[backend-vercel-url].vercel.app/api (dengan /api)
2. Redeploy frontend setelah ubah env var

### ❌ Login returns 500 error
**Symptoms**: Backend error saat login

**Fix**:
1. Check Supabase SQL:
   ```bash
   SELECT COUNT(*) FROM users;
   # Harus return 26
   ```
2. Check Backend Environment Variables di Vercel:
   - DATABASE_URL harus valid Supabase connection string
   - JWT_SECRET harus ada

### ❌ Database connection failed
**Symptoms**: Backend error "connect ECONNREFUSED"

**Fix**:
1. Verifikasi DATABASE_URL di Vercel
   - Format: postgresql://postgres.[id]:[password]@db.[id].supabase.co:5432/postgres
2. Test connection:
   ```bash
   psql [DATABASE_URL]
   # Harus bisa connect
   ```

---

## DOMAIN CUSTOM (Optional)

Jika ingin custom domain instead of vercel.app:

### Untuk Backend
```
1. Vercel → Project Settings → Domains
2. Add custom domain
3. Point DNS ke Vercel nameservers
4. Update FRONTEND_URL di backend env var
```

### Untuk Frontend
```
1. Vercel → Project Settings → Domains
2. Add custom domain
3. Update VITE_API_BASE_URL di frontend env var
```

---

## PRODUCTION URLS (Catat Di Sini)

```
Frontend URL: https://________________.vercel.app
Backend URL:  https://________________.vercel.app
Supabase Project: https://supabase.com/projects/[project-id]

Test Login:
Email: admin@kampus.ac.id
Password: 123456
```

---

## MONITORING & UPDATES

### Vercel Logs
```
Vercel → Project → Deployments
- Click deployment untuk lihat logs
- Scroll "Logs" tab
- Search error jika ada issue
```

### Supabase Logs
```
Supabase Dashboard → SQL Editor
- Lihat query execution
- Check data validity

Atau via psql:
psql [DATABASE_URL]
SELECT * FROM users LIMIT 5;
```

### Auto-deployment
```
Setiap push ke GitHub main branch:
1. Vercel akan auto-detect
2. Auto-build & deploy
3. Tunggu status "Ready"
```

---

## TIPS & BEST PRACTICES

1. **Keep .env di .gitignore**
   ```
   backend/.env
   frontend/.env
   ```
   (Jangan push secrets ke GitHub!)

2. **Use separate DATABASE_URL untuk lokal vs production**
   - Lokal: localhost (PostgreSQL lokal)
   - Production: Supabase connection string

3. **Monitor Vercel Analytics**
   - Check response time
   - Check error rate
   - Optimize jika lambat

4. **Backup Database**
   - Supabase otomatis backup daily
   - Manual export: SQL Editor → Download

5. **Version Control**
   - Tag setiap release: `git tag v1.0.0`
   - Maintain changelog

---

## NEXT STEPS (Setelah Production)

1. **Monitor uptime**
   - Setup monitoring service (Uptime Robot, StatusPage)

2. **CI/CD Pipeline**
   - Add GitHub Actions untuk automated testing

3. **API Documentation**
   - Setup Swagger/OpenAPI docs

4. **Performance Optimization**
   - Add caching
   - Optimize queries
   - Compress assets

5. **Security**
   - Enable HTTPS (Vercel already does)
   - Setup rate limiting
   - Regular security audit

---

## QUICK REFERENCE - CLI Commands

```bash
# Cek Vercel deployments
vercel ls

# Deploy ulang
vercel --prod

# View logs
vercel logs

# Check env vars
vercel env ls

# Download database
pg_dump [DATABASE_URL] > backup.sql

# Test backend health
curl https://[backend-url].vercel.app/health
```

---

Selesai! Sistem KRS sudah production-ready dan online di Vercel + Supabase. 🎉

Untuk live monitoring dan debugging lebih lanjut, cek:
- Vercel Dashboard: https://vercel.com/dashboard
- Supabase Dashboard: https://supabase.com/projects
- GitHub Actions (untuk CI/CD)
