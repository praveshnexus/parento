// src/components/TopNav.js
import { Link, useNavigate } from "react-router-dom";
import { Baby, LogOut, Bell, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getUserAvatar } from "../utils/avatarHelper";
import { useState, useEffect } from "react";

export default function TopNav() {
  const { currentUser, userData, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications] = useState(3); // Example notification count
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".profile-dropdown")) setShowProfileMenu(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="hidden md:block bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
              <Baby className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Parento</h1>
              <p className="text-xs text-gray-500">Parenting Made Easy</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {!currentUser ? (
              // BEFORE LOGIN
              <>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-pink-500 font-medium transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-gray-700 hover:text-pink-500 font-medium transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-700 hover:text-pink-500 font-medium transition-colors"
                >
                  Contact
                </Link>
              </>
            ) : (
              // AFTER LOGIN
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-pink-500 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/track"
                  className="text-gray-700 hover:text-pink-500 font-medium transition-colors"
                >
                  Track
                </Link>
                <Link
                  to="/consult"
                  className="text-gray-700 hover:text-pink-500 font-medium transition-colors"
                >
                  Consult
                </Link>
                <Link
                  to="/community"
                  className="text-gray-700 hover:text-pink-500 font-medium transition-colors"
                >
                  Community
                </Link>
                <Link
                  to="/learningresources"
                  className="text-gray-700 hover:text-pink-500 font-medium transition-colors"
                >
                  Learn
                </Link>
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {!currentUser ? (
              // BEFORE LOGIN - Show Get Started
              <Link
                to="/signup"
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Get Started
              </Link>
            ) : (
              // AFTER LOGIN - Notification + Profile
              <>
                {/* Notification Bell */}
                <button className="relative p-2 text-gray-700 hover:text-pink-500 transition-colors">
                  <Bell className="w-6 h-6" />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications}
                    </span>
                  )}
                </button>

                {/* Profile Dropdown */}
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={getUserAvatar(userData, 40)}
                      alt={userData?.fullName || "User"}
                      className="w-10 h-10 rounded-full border-2 border-pink-500"
                    />
                    <ChevronDown
                      className={`w-4 h-4 text-gray-600 transition-transform ${
                        showProfileMenu ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">
                          {userData?.fullName || "User"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {userData?.email || currentUser?.email}
                        </p>
                      </div>

                      <Link
                        to="/profile"
                        onClick={() => setShowProfileMenu(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Profile
                      </Link>

                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          handleLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
