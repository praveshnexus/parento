import { Menu, Bell, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SearchBar from "./SearchBar";

export default function MobileHeader({
  onMenuOpen,
  searchQuery,
  setSearchQuery,
}) {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b md:hidden">
      <div className="px-4 pt-3 pb-2">
        {/* TOP ROW */}
        <div className="flex items-center justify-between h-10">
          <div
            onClick={() => navigate(currentUser ? "/dashboard" : "/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Heart size={14} className="text-white" />
            </div>
            <span className="font-bold text-lg">Parento</span>
          </div>

          <div className="flex items-center gap-3">
            <Bell
              size={20}
              className="text-gray-600"
              onClick={() => navigate("/notifications")}
            />
            <Menu
              size={22}
              className="text-gray-700"
              onClick={onMenuOpen}
            />
          </div>
        </div>

        {/* SEARCH (ALWAYS VISIBLE) */}
        <div className="mt-3">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search doctors here..."
          />
        </div>
      </div>
    </header>
  );
}
