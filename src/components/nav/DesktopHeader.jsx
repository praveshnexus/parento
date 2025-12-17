import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Target,
  Users,
  BookOpen,
  Stethoscope,
  Heart,
  User,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import SearchBar from "./SearchBar";

export default function DesktopHeader({ searchQuery, setSearchQuery }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);
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

  const isActive = (path) => location.pathname.startsWith(path);

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Track", path: "/track", icon: Target },
    { name: "Doctors", path: "/consult", icon: Stethoscope },
    { name: "Comunity", path: "/comunity", icon: Users },
    { name: "Resources", path: "/learningresources", icon: BookOpen },
  ];

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <header className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-white border-b h-16 px-8 items-center justify-between">
      {/* LOGO */}
      <div
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
          <Heart size={16} className="text-white" />
        </div>
        <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Parento
        </span>
      </div>

      {/* SEARCH */}
      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        className="w-72"
      />

      {/* NAV */}
      <div className="flex items-center gap-2">
        {links.map((l) => (
          <button
            key={l.path}
            onClick={() => navigate(l.path)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm ${
              isActive(l.path)
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <l.icon size={16} />
            {l.name}
          </button>
        ))}

        {/* PROFILE */}
        <div className="relative ml-2" ref={profileRef}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold"
          >
            {currentUser?.displayName?.[0]?.toUpperCase() || "U"}
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border">
              <button
                onClick={() => navigate("/profile")}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex gap-2"
              >
                <User size={16} /> Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex gap-2"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
