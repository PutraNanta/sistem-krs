import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/common/Alert.jsx";
import FormInput from "../components/common/FormInput.jsx";
import useAuth from "../hooks/useAuth.js";

const roleLanding = {
  student: "/student/dashboard",
  admin: "/admin/courses",
  lecturer: "/lecturer/approval",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, user, isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthenticated && user?.role) {
      navigate(roleLanding[user.role] || "/login", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(email, password);
      const role = response?.data?.user?.role || user?.role;
      navigate(roleLanding[role] || "/login", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrap">
      <section className="login-art">
        <div>
          <h1>Kelola KRS Lebih Cepat dan Terstruktur</h1>
          <p>
            Platform terintegrasi untuk mahasiswa, dosen, dan admin dalam satu alur persetujuan yang jelas.
          </p>
        </div>
      </section>

      <section className="login-form">
        <form className="login-card" onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <p className="eyebrow">Masuk ke akun akademik anda</p>

          <Alert type="error" message={error} />

          <FormInput
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="nama@kampus.ac.id"
            required
          />

          <FormInput
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="********"
            required
          />

          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </section>
    </div>
  );
}
