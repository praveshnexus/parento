import TopNav from "./nav/TopNav";
import BottomNav from "./BottomNav";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">

      {/* FIXED TOP NAV */}
      <TopNav />

      {/* MAIN CONTENT */}
      <main
        className="
          min-h-screen
          pt-[112px]     /* mobile TopNav + search */
          md:pt-[80px]   /* desktop TopNav */
          pb-[80px]      /* BottomNav height */
        "
      >
        <div className="mx-auto w-full max-w-[420px] md:max-w-[768px] lg:max-w-[1200px] px-4">
          {children}
        </div>
      </main>

      {/* DESKTOP FOOTER */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* FIXED BOTTOM NAV */}
      <BottomNav />
    </div>
  );
}
