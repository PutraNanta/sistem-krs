# KRS Academic Information System - Project Structure

## Recommended Folder Structure

```
sistem-krs/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js                 # PostgreSQL connection
│   │   │   └── environment.js        # Environment variables
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js     # JWT verification
│   │   │   ├── roleMiddleware.js     # Role-based access control
│   │   │   └── errorHandler.js       # Global error handler
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.route.js
│   │   │   │   ├── auth.controller.js
│   │   │   │   ├── auth.service.js
│   │   │   │   └── auth.validation.js
│   │   │   ├── students/
│   │   │   │   ├── student.route.js
│   │   │   │   ├── student.controller.js
│   │   │   │   ├── student.service.js
│   │   │   │   ├── student.repository.js
│   │   │   │   └── student.validation.js
│   │   │   ├── lecturers/
│   │   │   │   ├── lecturer.route.js
│   │   │   │   ├── lecturer.controller.js
│   │   │   │   ├── lecturer.service.js
│   │   │   │   ├── lecturer.repository.js
│   │   │   │   └── lecturer.validation.js
│   │   │   ├── courses/
│   │   │   │   ├── course.route.js
│   │   │   │   ├── course.controller.js
│   │   │   │   ├── course.service.js
│   │   │   │   ├── course.repository.js
│   │   │   │   └── course.validation.js
│   │   │   ├── classes/
│   │   │   │   ├── class.route.js
│   │   │   │   ├── class.controller.js
│   │   │   │   ├── class.service.js
│   │   │   │   ├── class.repository.js
│   │   │   │   └── class.validation.js
│   │   │   ├── krs/
│   │   │   │   ├── krs.route.js
│   │   │   │   ├── krs.controller.js
│   │   │   │   ├── krs.service.js
│   │   │   │   ├── krs.repository.js
│   │   │   │   ├── krs.validation.js
│   │   │   │   └── krs.validator.js   # Complex business logic validation
│   │   │   ├── academicYears/
│   │   │   │   ├── academicYear.route.js
│   │   │   │   ├── academicYear.controller.js
│   │   │   │   ├── academicYear.service.js
│   │   │   │   ├── academicYear.repository.js
│   │   │   │   └── academicYear.validation.js
│   │   │   └── users/
│   │   │       ├── user.route.js
│   │   │       ├── user.controller.js
│   │   │       ├── user.service.js
│   │   │       └── user.repository.js
│   │   ├── utils/
│   │   │   ├── helpers.js            # Utility functions
│   │   │   ├── errorResponse.js      # Error formatting
│   │   │   └── successResponse.js    # Success formatting
│   │   └── server.js                 # Express app entry point
│   ├── database/
│   │   ├── schema.sql                # Database schema
│   │   └── seed.sql                  # Dummy data
│   ├── tests/                        # Unit & integration tests
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── README.md
│   └── server.js                     # Server entry point

├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── KrsRegistration.jsx
│   │   │   ├── KrsDetail.jsx
│   │   │   ├── KrsHistory.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminStudentManagement.jsx
│   │   │   ├── AdminCourseManagement.jsx
│   │   │   ├── AdminClassManagement.jsx
│   │   │   ├── AdminAcademicYearManagement.jsx
│   │   │   ├── LecturerDashboard.jsx
│   │   │   ├── LecturerApproval.jsx
│   │   │   ├── NotFound.jsx
│   │   │   └── Unauthorized.jsx
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── LoadingState.jsx
│   │   │   │   ├── ErrorAlert.jsx
│   │   │   │   └── SuccessAlert.jsx
│   │   │   ├── forms/
│   │   │   │   ├── FormInput.jsx
│   │   │   │   ├── SelectInput.jsx
│   │   │   │   └── DateInput.jsx
│   │   │   ├── tables/
│   │   │   │   ├── DataTable.jsx
│   │   │   │   └── PaginatedTable.jsx
│   │   │   ├── modals/
│   │   │   │   ├── ConfirmModal.jsx
│   │   │   │   └── FormModal.jsx
│   │   │   └── krs/
│   │   │       ├── KrsSummaryCard.jsx
│   │   │       ├── ClassScheduleCard.jsx
│   │   │       ├── AvailableClassesList.jsx
│   │   │       └── SelectedClassesList.jsx
│   │   ├── services/
│   │   │   ├── api.js                # Axios instance with interceptor
│   │   │   ├── authService.js
│   │   │   ├── studentService.js
│   │   │   ├── lecturerService.js
│   │   │   ├── courseService.js
│   │   │   ├── classService.js
│   │   │   ├── krsService.js
│   │   │   └── academicYearService.js
│   │   ├── contexts/
│   │   │   ├── AuthContext.jsx       # Auth state management
│   │   │   └── NotificationContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useApi.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── helpers.js
│   │   │   └── validators.js
│   │   ├── styles/
│   │   │   ├── index.css
│   │   │   └── tailwind.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md

├── docs/
│   ├── requirement.md                # Project requirements
│   ├── database-schema.md
│   ├── api-documentation.md
│   ├── deployment-guide.md
│   └── architecture.md

├── .gitignore
├── README.md
└── PROJECT_STRUCTURE.md              # This file

```

## Key Architectural Decisions

### Backend (Node.js + Express)

- **MVC Pattern**: Separation of concerns with Routes → Controllers → Services → Repositories
- **Modular Structure**: Each feature (auth, KRS, students, etc.) is a self-contained module
- **Validation Layer**: Input validation with Zod before business logic
- **Error Handling**: Centralized error handler middleware
- **Database Access**: Repository pattern for data access
- **Transactions**: PostgreSQL transactions for critical operations (KRS submission)

### Frontend (React)

- **Page-Based Routing**: React Router for navigation
- **Component Organization**: Grouped by functionality (common, forms, tables, krs, etc.)
- **Service Layer**: Axios-based API service layer for backend communication
- **Context API**: Global auth state management
- **Custom Hooks**: Reusable logic (useAuth, useApi)
- **UI Framework**: TailwindCSS for styling (optional: can use other frameworks)

### Database

- **Normalized Schema**: Proper normalization to avoid redundancy
- **Foreign Keys**: Data integrity with constraints
- **Indexes**: On frequently queried columns for performance
- **Timestamps**: created_at, updated_at for audit trail

## Environment Variables

### Backend (.env)

```
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_key
JWT_EXPIRATION=24h
```

### Frontend (.env)

```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=KRS Academic Information System
```

## Dependencies

### Backend

- express
- pg (PostgreSQL client)
- jsonwebtoken
- bcrypt
- dotenv
- zod
- cors
- helmet

### Frontend

- react
- react-router-dom
- axios
- tailwindcss
- react-icons (or similar)

---

## Next Steps

1. ✅ **Folder Structure** (Current)
2. ⏳ **PostgreSQL Database Schema** - Tables, foreign keys, constraints
3. ⏳ **Dummy Seed Data** - Sample data for testing
4. ⏳ **Backend API Structure** - Implementation
5. ⏳ **Frontend Page Structure** - Implementation
6. ⏳ **Deployment Checklist** - Vercel & Supabase
