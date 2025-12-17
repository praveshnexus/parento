import { X, Home, Target, Users, BookOpen, Stethoscope } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function MobileMenu({ onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Lock background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: Home },
    { name: "Track", path: "/track", icon: Target },
    { name: "Doctors", path: "/consult", icon: Stethoscope },
    { name: "Comunity", path: "/comunity", icon: Users },
    { name: "Resources", path: "/learningresources", icon: BookOpen },
  ];

  return (
    <>
      {/* OVERLAY */}
      <motion.div
        className="fixed inset-0 z-50 bg-black/40 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
      />

      {/* MENU PANEL */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 md:hidden bg-white rounded-b-2xl p-4 space-y-3"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -80, opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-lg">Menu</span>
          <X size={22} onClick={onClose} className="cursor-pointer" />
        </div>

        {links.map((l) => (
          <motion.button
            key={l.path}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              navigate(l.path);
              onClose();
            }}
            className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 ${
              location.pathname.startsWith(l.path)
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <l.icon size={18} />
            {l.name}
          </motion.button>
        ))}
      </motion.div>
    </>
  );
}
