import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Target,
  Users,
  BookOpen,
  User,
  Info,
  Mail,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  const publicNav = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  const privateNav = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Track", path: "/track", icon: Target },
    { name: "Community", path: "/community", icon: Users },
    { name: "Resources", path: "/learningresources", icon: BookOpen },
    { name: "Profile", path: "/profile", icon: User },
  ];

  const navItems = currentUser ? privateNav : publicNav;
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
      <div className="flex justify-around py-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 text-xs px-3 py-2 rounded-xl ${
              isActive(item.path)
                ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                : "text-gray-500"
            }`}
          >
            <item.icon size={20} />
            {item.name}
          </button>
        ))}
      </div>
    </nav>
  );
}
