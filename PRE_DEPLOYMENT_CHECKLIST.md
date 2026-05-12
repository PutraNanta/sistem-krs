# ✅ PRE-DEPLOYMENT CHECKLIST

## Code Quality & Safety

- [ ] No `.env` files di Git (check .gitignore)
  ```bash
  git status | grep -i env
  # Should return: .gitignore
  ```

- [ ] No secrets hardcoded di code
  ```bash
  grep -r "password\|secret\|token" backend/src --exclude-dir=node_modules
  # Should return: no hardcoded values (only env var references)
  ```

- [ ] Backend .env.example sudah updated
- [ ] Frontend .env.example sudah updated
- [ ] Dependencies sudah di-lock
  ```bash
  # Verify package-lock.json exists
  ls backend/package-lock.json frontend/package-lock.json
  ```

---

## Testing

- [ ] Backend sudah ditest lokal
  ```bash
  cd backend
  npm run dev
  # Wait for: Server running on port 3000
  ```

- [ ] Frontend sudah ditest lokal
  ```bash
  cd frontend
  npm run dev
  # Wait for: Local: http://localhost:5173
  ```

- [ ] Login functionality working
  ```bash
  # Buka http://localhost:5173/login
  # Login dengan admin@kampus.ac.id / 123456
  # Harus redirect ke /admin/courses
  ```

- [ ] Database seed data ada
  ```bash
  psql -U postgres -d krs_db -c "SELECT COUNT(*) FROM users;"
  # Should return: 26
  ```

---

## GitHub Preparation

- [ ] Local repo clean (no uncommitted changes)
  ```bash
  git status
  # Should say: nothing to commit, working tree clean
  ```

- [ ] README, SETUP.md, DEPLOYMENT.md sudah complete
- [ ] .gitignore properly configured
- [ ] Vercel.json di backend dan frontend
- [ ] All commits pushed to main branch
  ```bash
  git log --oneline -5
  git push origin main
  ```

---

## Supabase Setup

- [ ] Create Supabase project
  - [ ] Project name: krs-sistem
  - [ ] Region: Southeast Asia (Indonesia)
  - [ ] Save password!

- [ ] Load schema ke Supabase
  ```bash
  # SQL Editor → New Query
  # Copy-paste: backend/database/schema.sql
  # Click Run
  ```

- [ ] Load seed data ke Supabase
  ```bash
  # SQL Editor → New Query
  # Copy-paste: backend/database/seed.sql
  # Click Run
  ```

- [ ] Verify data
  ```bash
  # Supabase SQL Editor
  SELECT COUNT(*) FROM users;
  # Should return: 26
  ```

- [ ] Get connection string
  ```bash
  # Settings → Database → Connection pooling
  # Copy URI: postgresql://postgres.[id]:[password]@...
  # Simpan ke temp file
  ```

---

## Vercel Backend Deployment

- [ ] GitHub repo sudah public & linked ke Vercel
- [ ] Create Vercel project
  - [ ] Select repository: sistem-krs
  - [ ] Root Directory: backend
  - [ ] Framework: Other
  - [ ] Install: npm install
  - [ ] Build: (kosong)
  - [ ] Start: node src/server.js

- [ ] Set environment variables:
  ```
  DATABASE_URL = [Supabase connection string]
  JWT_SECRET = [generate random 64-char string]
  FRONTEND_URL = [akan di-update nanti setelah frontend deploy]
  NODE_ENV = production
  ```

- [ ] Deploy & test
  ```bash
  curl https://[backend-vercel].vercel.app/health
  # Should return: {"success":true,"message":"KRS backend is running"}
  ```

- [ ] Catat URL backend: _________________________

---

## Vercel Frontend Deployment

- [ ] Create Vercel project
  - [ ] Select repository: sistem-krs
  - [ ] Root Directory: frontend
  - [ ] Framework: Vite
  - [ ] Build: npm run build
  - [ ] Output: dist

- [ ] Set environment variables:
  ```
  VITE_API_BASE_URL = https://[backend-vercel]/api
  ```

- [ ] Deploy & test
  ```
  1. Buka https://[frontend-vercel].vercel.app
  2. Lihat login page
  3. Login dengan admin@kampus.ac.id / 123456
  4. Harus redirect ke /admin/courses
  ```

- [ ] Catat URL frontend: _________________________

---

## Backend Environment Update

- [ ] Update backend FRONTEND_URL di Vercel
  ```
  Go to Vercel → Backend Project → Settings → Environment Variables
  Update: FRONTEND_URL = https://[frontend-vercel].vercel.app
  
  Redeploy backend (click Redeploy button)
  ```

---

## Production Verification

- [ ] Frontend bisa akses
  - [ ] https://[frontend-vercel].vercel.app/login
  - [ ] Lihat login page tanpa error

- [ ] Backend health check
  - [ ] curl https://[backend-vercel].vercel.app/health
  - [ ] Return: {"success":true,...}

- [ ] End-to-end login test
  - [ ] Email: admin@kampus.ac.id
  - [ ] Password: 123456
  - [ ] Redirect ke /admin/courses

- [ ] Student flow test
  - [ ] Login sebagai student1@kampus.ac.id
  - [ ] Create KRS draft
  - [ ] Add class
  - [ ] Submit KRS

- [ ] Lecturer approval test
  - [ ] Login sebagai lecturer1@kampus.ac.id
  - [ ] Go to /lecturer/approval
  - [ ] See pending KRS
  - [ ] Approve one KRS

- [ ] Database integrity
  - [ ] Supabase: SELECT COUNT(*) FROM krs; (Should > 0)
  - [ ] Supabase: SELECT COUNT(*) FROM krs_details; (Should > 0)

---

## Documentation

- [ ] SETUP.md complete
- [ ] DEPLOYMENT.md complete
- [ ] DOCS.md created
- [ ] .env.example files updated
- [ ] API endpoints documented
- [ ] Credentials documented

---

## Security Check

- [ ] No .env in Git
  ```bash
  git log --all --full-history -- backend/.env frontend/.env
  # Should return: nothing (or only .env.example)
  ```

- [ ] Secrets not in code
  - [ ] No hardcoded JWT_SECRET
  - [ ] No hardcoded DATABASE_URL
  - [ ] No hardcoded passwords

- [ ] HTTPS enabled (Vercel default)
- [ ] CORS properly configured
- [ ] JWT properly validated

---

## Final Checklist

- [ ] Semuanya di atas sudah ✅
- [ ] Semua links tested & working
- [ ] Dokumentasi lengkap
- [ ] Team informed tentang URLs & credentials

---

## URLs untuk Production (Catat di Sini!)

```
Frontend: https://________________________________.vercel.app
Backend:  https://________________________________.vercel.app

Test Admin Login:
Email: admin@kampus.ac.id
Password: 123456

Supabase Project:
https://supabase.com/projects/[project-id]
```

---

## Go-Live! 🚀

Setelah semua checklist selesai:

1. Notify team tentang live URLs
2. Monitor Vercel & Supabase dashboards 24/7 pertama kali
3. Keep backups of database
4. Set up error monitoring (Sentry, LogRocket)
5. Celebrate! 🎉

---

Untuk troubleshooting selengkapnya, lihat:
- [SETUP.md Troubleshooting](./SETUP.md#troubleshooting)
- [DEPLOYMENT.md Troubleshooting](./DEPLOYMENT.md#troubleshooting)
