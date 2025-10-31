// src/components/Layout.js
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* TopNav - Always visible on desktop */}
      <TopNav />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer - Only on desktop */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* BottomNav - Only visible on mobile when logged in */}
      <BottomNav />
    </div>
  );
}