// src/components/BottomNav.js
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  Stethoscope,
  MessageSquare,
  GraduationCap,
  User
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function BottomNav() {
  const location = useLocation();
  const { currentUser } = useAuth();

  // Don't show bottom nav if not logged in
  if (!currentUser) return null;

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      name: "Track",
      path: "/track",
      icon: TrendingUp
    },
    {
      name: "Consult",
      path: "/consult",
      icon: Stethoscope
    },
    {
      name: "Community",
      path: "/community",
      icon: MessageSquare
    },
    {
      name: "Resources",
      path: "/learningresources",
      icon: GraduationCap
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User
    }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-6 gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-1 transition-all ${
                isActive
                  ? "text-pink-500"
                  : "text-gray-600 hover:text-pink-400"
              }`}
            >
              <Icon 
                className={`w-6 h-6 mb-1 ${isActive ? "scale-110" : ""}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-xs ${isActive ? "font-semibold" : "font-medium"}`}>
                {item.name}
              </span>
              {isActive && (
                <div className="absolute bottom-0 w-10 h-1 bg-pink-500 rounded-t-full"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}