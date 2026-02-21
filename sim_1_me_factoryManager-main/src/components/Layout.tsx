import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import {
  Factory,
  LayoutDashboard,
  FileText,
  Send,
  BarChart3,
  TrendingUp,
  BookOpen,
  LogOut,
  Trophy,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/submit-decision', icon: Send, label: 'Submit Decision' },
    { to: '/results', icon: FileText, label: 'Results' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/cost-curves', icon: TrendingUp, label: 'Cost Curves' },
    { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { to: '/guide', icon: BookOpen, label: 'Strategy Guide' },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6 border-b border-blue-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Factory className="w-8 h-8 text-orange-500" />
            <div>
              <h1 className="text-xl font-bold">Factory Manager</h1>
              <p className="text-xs text-blue-300">{user?.role === 'instructor' ? 'Instructor' : 'Student'} Portal</p>
            </div>
          </div>
          <button
            className="lg:hidden p-2 text-white hover:bg-blue-800 rounded-lg"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="p-4 bg-blue-800">
        <div className="text-sm">
          <div className="font-semibold">{user?.name}</div>
          <div className="text-blue-300 text-xs">{user?.email}</div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors"
            onClick={() => setIsSidebarOpen(false)}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-blue-800">
        <button
          onClick={handleSignOut}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-blue-800 transition-colors w-full text-left"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <header className="md:hidden bg-blue-900 text-white p-4 flex items-center justify-between shadow-md sticky top-0 z-20">
        <div className="flex items-center space-x-2">
          <Factory className="w-6 h-6 text-orange-500" />
          <span className="font-bold">Factory Manager</span>
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Tablet Drawer */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-blue-900 text-white flex flex-col transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <SidebarContent />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto w-full">
        {children}
      </main>
    </div>
  );
};
