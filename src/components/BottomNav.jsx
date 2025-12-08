// src/components/BottomNav.js
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  TrendingUp,
  Stethoscope,
  MessageSquare,
  GraduationCap,
  User,
  Info,
  Mail,
  Home
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function BottomNav() {
  const location = useLocation();
  const { currentUser } = useAuth();

  // Navigation items based on login status
  const publicNavItems = [
    {
      name: "Home",
      path: "/",
      icon: Home
    },
    {
      name: "About",
      path: "/about",
      icon: Info
    },
    {
      name: "Contact",
      path: "/contact",
      icon: Mail
    }
  ];

  const authenticatedNavItems = [
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
      name: "About",
      path: "/about",
      icon: Info
    },
    {
      name: "Contact",
      path: "/contact",
      icon: Mail
    },
    {
      name: "Profile",
      path: "/profile",
      icon: User
    }
  ];

  // Choose nav items based on login status
  const navItems = currentUser ? authenticatedNavItems : publicNavItems;

  // Calculate grid columns based on number of items
  const gridCols = navItems.length <= 4 ? 'grid-cols-3' : navItems.length <= 6 ? 'grid-cols-4' : 'grid-cols-4';

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-safe">
      <div className={`grid ${gridCols} gap-1 px-2 py-2`}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-2 px-1 transition-all rounded-lg ${
                isActive
                  ? "text-pink-500 bg-pink-50"
                  : "text-gray-600 hover:text-pink-400 hover:bg-gray-50"
              }`}
            >
              <Icon 
                className={`w-6 h-6 mb-1 ${isActive ? "scale-110" : ""}`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-xs ${isActive ? "font-semibold" : "font-medium"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}