import { NavLink } from "react-router-dom";
import { Home, Activity, Stethoscope, Users, BookOpen, User } from "lucide-react";

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-inner border-t border-gray-200 flex justify-around py-3 md:hidden z-50">
      
      {/* ✅ Changed from /dashboard to / for Home */}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs transition ${
            isActive ? "text-pink-500" : "text-gray-500"
          }`
        }
      >
        <Home className="w-6 h-6 mb-1" /> Home
      </NavLink>

      <NavLink
        to="/track"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs transition ${
            isActive ? "text-pink-500" : "text-gray-500"
          }`
        }
      >
        <Activity className="w-6 h-6 mb-1" /> Track
      </NavLink>

      <NavLink
        to="/consult"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs transition ${
            isActive ? "text-pink-500" : "text-gray-500"
          }`
        }
      >
        <Stethoscope className="w-6 h-6 mb-1" /> Consult
      </NavLink>

      <NavLink
        to="/community"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs transition ${
            isActive ? "text-pink-500" : "text-gray-500"
          }`
        }
      >
        <Users className="w-6 h-6 mb-1" /> Community
      </NavLink>

      <NavLink
        to="/learningresources"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs transition ${
            isActive ? "text-pink-500" : "text-gray-500"
          }`
        }
      >
        <BookOpen className="w-6 h-6 mb-1" /> Learn
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `flex flex-col items-center text-xs transition ${
            isActive ? "text-pink-500" : "text-gray-500"
          }`
        }
      >
        <User className="w-6 h-6 mb-1" /> Profile
      </NavLink>
    </nav>
  );
}

export default BottomNav;
