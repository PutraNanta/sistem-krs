import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth.js";

const menuByRole = {
  student: [
    { to: "/student/dashboard", label: "Dashboard" },
    { to: "/student/krs", label: "KRS Registration" },
    { to: "/student/krs/detail", label: "KRS Detail" },
    { to: "/student/krs/history", label: "KRS History" },
  ],
  admin: [
    { to: "/admin/courses", label: "Course Management" },
    { to: "/admin/classes", label: "Class Management" },
    { to: "/lecturer/approval", label: "KRS Approval" },
  ],
  lecturer: [{ to: "/lecturer/approval", label: "KRS Approval" }],
};

export default function Sidebar() {
  const { user } = useAuth();
  const role = user?.role || "student";
  const menus = menuByRole[role] || [];

  return (
    <aside className="sidebar">
      <div className="brand-box">
        <span className="brand-dot" />
        <div>
          <h1>SIS-KRS</h1>
          <p>Academic Planner</p>
        </div>
      </div>

      <nav className="menu-list">
        {menus.map((menu) => (
          <NavLink
            key={menu.to}
            to={menu.to}
            className={({ isActive }) =>
              `menu-item ${isActive ? "menu-item-active" : ""}`
            }
          >
            {menu.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
