import { useMemo } from "react";
import useAuth from "../../hooks/useAuth.js";

export default function Navbar() {
  const { user, logout } = useAuth();

  const roleLabel = useMemo(() => {
    if (!user?.role) return "Guest";
    return user.role.charAt(0).toUpperCase() + user.role.slice(1);
  }, [user]);

  return (
    <header className="navbar">
      <div>
        <p className="eyebrow">Sistem Akademik</p>
        <h2>Kartu Rencana Studi</h2>
      </div>
      <div className="navbar-meta">
        <div>
          <p className="meta-name">{user?.name || "User"}</p>
          <p className="meta-role">{roleLabel}</p>
        </div>
        <button className="btn btn-outline" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}
