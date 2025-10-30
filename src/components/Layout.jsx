import TopNav from "./TopNav";
import BottomNav from "./BottomNav";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <TopNav />
      <main className="flex-1 pt-20">{children}</main>
      <div className="hidden md:block">
        <Footer />
      </div>
      <BottomNav />
    </div>
  );
}

export default Layout;
