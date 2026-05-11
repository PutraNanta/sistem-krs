import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import LoadingState from "../components/common/LoadingState.jsx";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingState label="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
