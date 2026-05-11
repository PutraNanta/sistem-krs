import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

export default function RoleRoute({ roles, children }) {
  const { user } = useAuth();

  const userRole = user?.role;
  if (!roles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
