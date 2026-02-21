import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  const { logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg border-bottom bg-white sticky-top">
      <div className="container-fluid">
        <button className="btn btn-link link-dark d-lg-none me-2" onClick={toggleSidebar}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <Link to="/" className="navbar-brand fw-bold d-flex align-items-center me-auto">
          <TrendingUp className="w-6 h-6 text-emerald-600 me-2" />
          <span>TradeAcademy</span>
        </Link>

        {/* <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto gap-2 align-items-center mt-3 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <button onClick={logout} className="btn btn-outline-danger btn-sm">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
