Frontend     : React.js
Backend      : Node.js + Express.js
Database     : PostgreSQL via Supabase
Hosting FE   : Vercel
Hosting BE   : Vercel Serverless Function / Node API
Auth         : Supabase Auth atau JWT custom
ORM/DB Tool  : Prisma / Drizzle / node-postgres

krs-system/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── students/
│   │   │   ├── lecturers/
│   │   │   ├── courses/
│   │   │   ├── classes/
│   │   │   └── krs/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── app.js
│   └── package.json
│
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   └── dummy-data.sql
│
└── .github/
    └── copilot-instructions.md

users
students
lecturers
academic_years
study_programs
courses
course_prerequisites
classes
class_schedules
krs
krs_details

users 1---1 students
users 1---1 lecturers

study_programs 1---N students
study_programs 1---N courses

courses 1---N classes
lecturers 1---N classes

classes 1---N class_schedules

students 1---N krs
krs 1---N krs_details
classes 1---N krs_details