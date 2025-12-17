import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  Target,
  Users,
  User,
  Stethoscope,
} from "lucide-react";
import { motion } from "framer-motion";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/dashboard", icon: Home },
    { name: "Track", path: "/track", icon: Target },
    { name: "Doctors", path: "/consult", icon: Stethoscope },
    { name: "Community", path: "/community", icon: Users },
    { name: "Profile", path: "/profile", icon: User },
  ];

  // ✅ Better active detection (section-based)
  const isActive = (path) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/");

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-40">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;

          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl text-[11px] font-medium transition-colors
                ${
                  active
                    ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                    : "text-gray-500"
                }`}
            >
              <Icon size={20} />
              {item.name}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
