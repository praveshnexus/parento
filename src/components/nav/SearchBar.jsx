import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search doctors, resources...",
  className = "",
}) {
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value)}`);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
