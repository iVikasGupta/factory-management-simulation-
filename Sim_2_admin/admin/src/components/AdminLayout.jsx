import { useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./Navbar";
import "./sidebar.css";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="admin-wrapper">
      {/* Mobile Overlay */}
      {isSidebarOpen && <div className="admin-overlay d-lg-none" onClick={closeSidebar}></div>}

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

      {/* Main Content Area */}
      <div className="admin-content">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="container p-4">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
