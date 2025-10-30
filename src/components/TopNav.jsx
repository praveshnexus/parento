// src/components/TopNav.js
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getUserAvatar } from "../utils/avatarHelper";

export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userData, logout } =  useAuth() || {};

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Track", path: "/track" },
    { name: "Consult", path: "/consult" },
    { name: "Community", path: "/community" },
    { name: "Resources", path: "/learningresources" },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/dashboard">
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Parento
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <motion.div
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* User Menu - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            {currentUser && (
              <div className="relative">
                <motion.button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={getUserAvatar(userData, 40)}
                    alt={userData?.fullName || "User"}
                    className="w-10 h-10 rounded-full border-2 border-pink-500"
                  />
                  <div className="text-left hidden xl:block">
                    <p className="font-semibold text-gray-900 text-sm">
                      {userData?.fullName || currentUser?.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500">View Profile</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
                    >
                      <div className="p-4 border-b">
                        <p className="font-semibold text-gray-900">
                          {userData?.fullName || currentUser?.displayName || "User"}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {userData?.email || currentUser?.email}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <motion.div
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                          whileHover={{ x: 5 }}
                        >
                          <User className="w-5 h-5 text-gray-600" />
                          <span className="font-medium text-gray-700">My Profile</span>
                        </motion.div>
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left border-t"
                      >
                        <LogOut className="w-5 h-5 text-red-600" />
                        <span className="font-medium text-red-600">Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="px-6 py-4 space-y-2">
              {/* User Info - Mobile */}
              {currentUser && (
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg mb-4">
                  <img
                    src={getUserAvatar(userData, 50)}
                    alt={userData?.fullName || "User"}
                    className="w-12 h-12 rounded-full border-2 border-pink-500"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">
                      {userData?.fullName || currentUser?.displayName || "User"}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {userData?.email || currentUser?.email}
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation Items - Mobile */}
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                >
                  <motion.div
                    className={`px-4 py-3 rounded-lg font-semibold ${
                      isActive(item.path)
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    whileHover={{ x: 5 }}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}

              {/* Profile & Logout - Mobile */}
              {currentUser && (
                <>
                  <Link to="/profile" onClick={() => setIsOpen(false)}>
                    <motion.div
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
                      whileHover={{ x: 5 }}
                    >
                      <User className="w-5 h-5" />
                      <span className="font-semibold">My Profile</span>
                    </motion.div>
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-semibold">Logout</span>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </nav>
  );
}