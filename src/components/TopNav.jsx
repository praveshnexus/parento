import { NavLink } from "react-router-dom";
import { Baby } from "lucide-react";

function TopNav() {
  const navLinkClasses =
    "transition font-medium hover:text-pink-500 relative after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-pink-500 after:left-0 after:-bottom-1 hover:after:w-full after:transition-all after:duration-300";
  const activeLinkClasses = "text-pink-500 after:w-full after:bg-pink-500";

  return (
    <header className="hidden md:flex fixed top-0 left-0 right-0 bg-white shadow-sm z-50 items-center justify-between px-10 py-4">
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-3 group">
        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition">
          <Baby className="w-7 h-7 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
            Parento
          </span>
          <span className="text-xs text-gray-500 -mt-1">Parenting Made Easy</span>
        </div>
      </NavLink>

      {/* Navigation Links */}
      <nav className="flex gap-8 text-gray-700">
        {[
          { to: "/dashboard", label: "Dashboard" },
          { to: "/track", label: "Track" },
          { to: "/consult", label: "Consult" },
          { to: "/community", label: "Community" },
          { to: "/learningresources", label: "Learn" },
          { to: "/profile", label: "Profile" },
        ].map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `${navLinkClasses} ${isActive ? activeLinkClasses : ""}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* CTA Button */}
      <NavLink
        to="/login"
        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold transition shadow-md hover:shadow-lg"
      >
        Get Started
      </NavLink>
    </header>
  );
}

export default TopNav;