// src/components/TopNav.js
import { Link, useNavigate } from "react-router-dom";
import { Baby, LogOut, Bell, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getUserAvatar } from "../utils/avatarHelper";
import { useState } from "react";

export default function TopNav() {
  const { currentUser, userData, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications] = useState(3); // Mock notification count

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
            {/* Public Links - Always visible */}
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

            {/* Authenticated User Links - Only show if logged in */}
            {currentUser && (
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
                  Resources
                </Link>
              </>
            )}
          </div>

          {/* Right Side - Auth Buttons or User Menu */}
          <div className="flex items-center gap-4">
            {currentUser ? (
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

                {/* User Profile Icon */}
                <Link 
                  to="/profile" 
                  className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                >
                  <img
                    src={getUserAvatar(userData, 40)}
                    alt={userData?.fullName || "User"}
                    className="w-10 h-10 rounded-full border-2 border-pink-500"
                  />
                </Link>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-pink-500 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                {/* Login/Signup buttons - show when not logged in */}
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-pink-500 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}