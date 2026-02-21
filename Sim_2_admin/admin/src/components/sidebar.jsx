import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const location = useLocation();

  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: "🏠" },
    { path: "/admin/users", label: "Users", icon: "👤" },
    { path: "/admin/groups", label: "Groups", icon: "👥" },
    { path: "/admin/results", label: "Results", icon: "📊" },
  ];

  return (
    <aside className={`admin-sidebar ${isOpen ? "admin-sidebar-mobile-show" : "admin-sidebar-mobile-hidden"} d-lg-block`}>
      <div className="p-4 border-bottom border-secondary mb-4">
        <h4 className="m-0 text-white">🏭 Factory Admin</h4>
      </div>
      <nav className="px-3">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
            onClick={closeSidebar}
          >
            <span className="me-2">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
