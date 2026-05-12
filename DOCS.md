# 📚 DOKUMENTASI LENGKAP SISTEM KRS

Panduan lengkap dari development lokal sampai production deployment.

## 🔗 Quick Links

### 📖 Setup & Development
- **[SETUP.md](./SETUP.md)** - Setup lokal (PostgreSQL, Backend, Frontend, Testing)
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deploy ke production (Vercel + Supabase)
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Struktur folder & file

### 🎯 Tech Stack
- **Frontend**: React 18 + Vite + React Router + Axios
- **Backend**: Node.js + Express + PostgreSQL
- **Database**: PostgreSQL (Supabase cloud)
- **Hosting**: Vercel (Frontend & Backend)
- **Auth**: JWT + Role-based access control

### ✨ Features
1. **Authentication** - JWT login dengan 3 roles (admin, student, lecturer)
2. **Student KRS Flow** - Create draft → Add classes → Submit
3. **Validation** - Max SKS, capacity, schedule conflict, duplicate class
4. **Lecturer Approval** - Approve/reject KRS dengan reason
5. **Admin Management** - Course, class, schedule, academic year management
6. **History** - Track KRS history per semester

---

## 📋 START HERE

### For Local Development
```bash
# 1. Setup PostgreSQL database
psql -U postgres -d krs_db -f backend/database/schema.sql
psql -U postgres -d krs_db -f backend/database/seed.sql

# 2. Setup backend
cd backend
npm install
# Edit backend/.env dengan DATABASE_URL, JWT_SECRET, FRONTEND_URL
npm run dev

# 3. Setup frontend (new terminal)
cd frontend
npm install
npm run dev

# 4. Open browser
# http://localhost:5173
```

**See [SETUP.md](./SETUP.md) for detailed instructions**

### For Production Deployment
```bash
# 1. Setup Supabase database
# 2. Push code ke GitHub
# 3. Deploy backend ke Vercel
# 4. Deploy frontend ke Vercel
# 5. Configure environment variables
```

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions**

---

## 🧪 Test Credentials (dari seed data)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@kampus.ac.id | 123456 |
| Student | student1@kampus.ac.id - student20@kampus.ac.id | 123456 |
| Lecturer | lecturer1@kampus.ac.id - lecturer5@kampus.ac.id | 123456 |

---

## 📁 Project Structure

```
sistem-krs/
├── backend/
│   ├── src/
│   │   ├── server.js              # Express app entry point
│   │   ├── config/db.js           # Database connection
│   │   ├── middleware/            # Auth & role middleware
│   │   ├── modules/               # Business logic (6 modules)
│   │   └── utils/response.js      # Response formatter
│   ├── database/
│   │   ├── schema.sql             # PostgreSQL schema (11 tables)
│   │   └── seed.sql               # Dummy data (26 users)
│   ├── package.json
│   ├── .env.example
│   └── .env                       # Keep secret!
│
├── frontend/
│   ├── src/
│   │   ├── pages/                 # 8 pages
│   │   ├── components/            # 10 reusable components
│   │   ├── services/api.js        # Axios + 10 API functions
│   │   ├── context/AuthContext    # Auth state management
│   │   ├── routes/                # Protected & role routes
│   │   ├── layouts/               # Dashboard layout
│   │   └── styles/global.css      # Global styling
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── .env.example
│   └── .env                       # Keep secret!
│
├── database/                      # (Empty, scripts di backend)
├── docs/
│   └── requirement.md
├── SETUP.md                       # Local development guide
├── DEPLOYMENT.md                  # Production deployment guide
├── PROJECT_STRUCTURE.md           # Detailed structure
├── README.md                      # This file
└── .gitignore
```

---

## 🚀 API Endpoints (20+ endpoints)

### Authentication
- `POST /api/auth/login` - Login & get JWT token
- `GET /api/auth/profile` - Get current user profile

### Student
- `GET /api/students/:id` - Get student detail
- `POST /api/krs` - Create KRS draft
- `GET /api/krs/current` - Get current KRS
- `POST /api/krs/:id/add-class` - Add class to KRS
- `DELETE /api/krs/:id/remove-class` - Remove class from KRS
- `POST /api/krs/:id/submit` - Submit KRS
- `GET /api/krs/history` - Get KRS history

### Lecturer/Admin
- `GET /api/krs/pending` - Get pending KRS untuk approval
- `POST /api/krs/:id/approve` - Approve KRS
- `POST /api/krs/:id/reject` - Reject KRS dengan reason

### Admin
- `GET /api/courses` - Get all courses
- `GET /api/classes/available` - Get available classes
- `GET /api/lecturers/:id` - Get lecturer detail

**Full API spec**: See `backend/src/modules/*/route.js`

---

## ✅ Business Logic & Validation

### KRS Validation
- ✅ Max SKS per semester (24 SKS default)
- ✅ Class capacity check
- ✅ Schedule conflict detection
- ✅ Duplicate class prevention
- ✅ Approved KRS cannot be edited
- ✅ Only assigned lecturer can approve

### Role-Based Access
- **Admin**: Can manage all resources, approve any KRS
- **Student**: Can only manage own KRS
- **Lecturer**: Can only approve assigned students

---

## 🔧 Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_BASE_URL=http://localhost:3000/api
```

---

## 📊 Database Schema

11 tables:
- `users` - Login & authentication
- `students` - Student profile
- `lecturers` - Lecturer profile
- `study_programs` - Program definition
- `academic_years` - Year definition
- `courses` - Course definition
- `classes` - Class offering
- `class_schedules` - Day/time/room
- `krs` - Student course registration
- `krs_details` - Individual class in KRS
- `course_prerequisites` - Course dependencies

**Schema**: `backend/database/schema.sql`

---

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check DATABASE_URL format
# psql [DATABASE_URL] -c "SELECT 1"
# Should return: 1
```

### API Error 401 (Unauthorized)
```bash
# Token expired or not included
# Check localStorage.token in browser
# Re-login if needed
```

### CORS Error
```bash
# Check FRONTEND_URL di backend .env
# harus sesuai dengan frontend URL
```

See full troubleshooting: [SETUP.md](./SETUP.md#troubleshooting) & [DEPLOYMENT.md](./DEPLOYMENT.md#troubleshooting)

---

## 📈 Performance & Security

### Security
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ Role-based access control
- ✅ HTTPS on production (Vercel)
- ✅ SQL injection prevention (pg library)

### Performance
- ✅ Database indexes on frequently queried columns
- ✅ Response compression (gzip)
- ✅ Efficient queries (minimize N+1)
- ✅ Client-side caching (React state)

---

## 📞 Support & Next Steps

### Immediate
1. Follow [SETUP.md](./SETUP.md) untuk local development
2. Test semua features lokal
3. Follow [DEPLOYMENT.md](./DEPLOYMENT.md) untuk production

### Future Improvements
- [ ] Email notifications (KRS approval)
- [ ] File upload (academic documents)
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)
- [ ] API rate limiting
- [ ] Advanced search & filters
- [ ] Real-time notifications (WebSocket)

---

## 📄 License

MIT License - Feel free to use & modify

---

## 👥 Team

Built with ❤️ untuk Sistem Informasi Akademik

---

**Last Updated**: May 2026  
**Status**: ✅ Production Ready

Quick access:
- 📖 [Local Setup →](./SETUP.md)
- 🚀 [Deployment →](./DEPLOYMENT.md)
- 🗂️ [Project Structure →](./PROJECT_STRUCTURE.md)
