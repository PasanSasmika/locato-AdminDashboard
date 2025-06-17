import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaWrench, FaUsers } from 'react-icons/fa';

const AdminHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { 
      path: 'service-requests', 
      name: 'Service Requests', 
      icon: <FaWrench className="mr-3" /> 
    },
    { 
      path: 'users', 
      name: 'Users', 
      icon: <FaUsers className="mr-3" /> 
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Sidebar Toggle */}
      <button 
        className="fixed top-4 left-4 z-50 lg:hidden bg-[var(--color-accent)] p-2 rounded-md text-white"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 w-64 bg-[var(--color-accent)] text-white transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static z-40`}
      >
        <div className="p-5 border-b border-[var(--color-primary)]">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="mt-5">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-5 py-3 ${
                location.pathname.includes(item.path)
                  ? 'bg-[var(--color-primary)] border-l-4 border-[var(--color-secondary)]'
                  : 'hover:bg-[var(--color-primary)]'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 lg:ml-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;