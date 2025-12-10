import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <TopNav />

      <main className="flex-1 pt-12 md:pt-14 pb-24">
        {children}
      </main>

      <div className="hidden md:block">
        <Footer />
      </div>

      <BottomNav />
    </div>
  );
}
