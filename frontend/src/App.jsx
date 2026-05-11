import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import RoleRoute from "./routes/RoleRoute.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import StudentDashboardPage from "./pages/StudentDashboardPage.jsx";
import KrsRegistrationPage from "./pages/KrsRegistrationPage.jsx";
import KrsDetailPage from "./pages/KrsDetailPage.jsx";
import KrsHistoryPage from "./pages/KrsHistoryPage.jsx";
import AdminCourseManagementPage from "./pages/AdminCourseManagementPage.jsx";
import AdminClassManagementPage from "./pages/AdminClassManagementPage.jsx";
import LecturerApprovalPage from "./pages/LecturerApprovalPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute roles={["student"]}>
              <DashboardLayout>
                <StudentDashboardPage />
              </DashboardLayout>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/krs"
        element={
          <ProtectedRoute>
            <RoleRoute roles={["student"]}>
              <DashboardLayout>
                <KrsRegistrationPage />
              </DashboardLayout>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/krs/detail"
        element={
          <ProtectedRoute>
            <RoleRoute roles={["student"]}>
              <DashboardLayout>
                <KrsDetailPage />
              </DashboardLayout>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/krs/history"
        element={
          <ProtectedRoute>
            <RoleRoute roles={["student"]}>
              <DashboardLayout>
                <KrsHistoryPage />
              </DashboardLayout>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/courses"
        element={
          <ProtectedRoute>
            <RoleRoute roles={["admin"]}>
              <DashboardLayout>
                <AdminCourseManagementPage />
              </DashboardLayout>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/classes"
        element={
          <ProtectedRoute>
            <RoleRoute roles={["admin"]}>
              <DashboardLayout>
                <AdminClassManagementPage />
              </DashboardLayout>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/lecturer/approval"
        element={
          <ProtectedRoute>
            <RoleRoute roles={["lecturer", "admin"]}>
              <DashboardLayout>
                <LecturerApprovalPage />
              </DashboardLayout>
            </RoleRoute>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
