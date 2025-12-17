import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";
import MobileMenu from "./MobileMenu";

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <MobileHeader
        onMenuOpen={() => setMenuOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <DesktopHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 🔥 AnimatePresence MUST BE HERE */}
      <AnimatePresence>
        {menuOpen && (
          <MobileMenu onClose={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
