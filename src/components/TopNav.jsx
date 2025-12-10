import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  User,
  LogOut,
  Menu,
  X,
  Home,
  Target,
  Users,
  BookOpen,
  Heart,
  Info,
  Mail,
} from "lucide-react";
import toast from "react-hot-toast";

export default function TopNav() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const profileRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* 🔹 ROUTE CHECK */
  const isActive = (path) => location.pathname === path;

  /* 🔹 NAV CONFIG */
  const publicLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  const privateLinks = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Track", path: "/track", icon: Target },
    { name: "Community", path: "/community", icon: Users },
    { name: "Consult", path: "/consult", icon: Users },
    { name: "Resources", path: "/learningresources", icon: BookOpen },
  ];

  const navLinks = currentUser ? privateLinks : publicLinks;

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate(currentUser ? "/dashboard" : "/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Heart size={18} className="text-white" />
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Parento
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-1 items-center">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-all
                ${
                  isActive(link.path)
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              <link.icon size={16} />
              {link.name}
            </button>
          ))}

          {!currentUser ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className={`ml-2 px-4 py-2 rounded-lg font-semibold ${
                  isActive("/login")
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "text-purple-600 hover:bg-purple-50"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:opacity-90"
              >
                Signup
              </button>
            </>
          ) : (
            <div className="relative ml-2" ref={profileRef}>
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold"
              >
                {currentUser.displayName?.[0]?.toUpperCase() || "U"}
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border">
                  <button
                    onClick={() => navigate("/profile")}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 ${
                      isActive("/profile") ? "text-blue-600 font-semibold" : ""
                    }`}
                  >
                    <User size={16} /> Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden p-2"
        >
          {showMobileMenu ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                navigate(link.path);
                setShowMobileMenu(false);
              }}
              className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all
                ${
                  isActive(link.path)
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              <link.icon size={18} />
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
