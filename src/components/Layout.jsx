// src/components/Layout.js
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* TopNav - Always visible */}
      <TopNav />
      
      {/* Main Content - Add top padding for fixed nav */}
      <main className="flex-1 pt-20">
        {children}
      </main>
      
      {/* Footer - Hidden on mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>
      
      {/* BottomNav - Mobile only */}
      <BottomNav />
    </div>
  );
}