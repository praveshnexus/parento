import {
  BookOpen,
  Video,
  FileText,
  Headphones,
  Clock,
  Star,
  Search,
} from "lucide-react";
import { useState } from "react";

export default function LearningResources() {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const types = ["All", "Article", "Video", "Guide", "Podcast"];
  const categories = [
    "All",
    "Nutrition",
    "Development",
    "Health",
    "Education",
    "Behavior",
  ];

  const resources = [
    {
      id: 1,
      title: "Complete Guide to Toddler Nutrition",
      type: "Guide",
      category: "Nutrition",
      duration: "15 min read",
      rating: 4.8,
      author: "Dr. Priya Mehta",
    },
    {
      id: 2,
      title: "Understanding Child Development Milestones",
      type: "Article",
      category: "Development",
      duration: "8 min read",
      rating: 4.9,
      author: "Dr. Rajesh Kumar",
    },
    {
      id: 3,
      title: "Healthy Sleep Habits for Kids",
      type: "Video",
      category: "Health",
      duration: "12 min",
      rating: 4.7,
      author: "Sleep Experts",
    },
    {
      id: 4,
      title: "Managing Screen Time Effectively",
      type: "Article",
      category: "Behavior",
      duration: "6 min read",
      rating: 4.6,
      author: "Parenting Council",
    },
    {
      id: 5,
      title: "Positive Discipline Techniques",
      type: "Guide",
      category: "Behavior",
      duration: "10 min read",
      rating: 4.8,
      author: "Dr. Neha Sharma",
    },
  ];

  const getIcon = (type) => {
    switch (type) {
      case "Article":
        return FileText;
      case "Video":
        return Video;
      case "Guide":
        return BookOpen;
      case "Podcast":
        return Headphones;
      default:
        return FileText;
    }
  };

  const filtered = resources.filter((r) => {
    const matchType = selectedType === "All" || r.type === selectedType;
    const matchCategory =
      selectedCategory === "All" || r.category === selectedCategory;
    const matchSearch = r.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchType && matchCategory && matchSearch;
  });

  return (
    <div className="space-y-6 pb-24">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">
          Learning Resources
        </h1>
        <p className="text-sm text-gray-600">
          Expert guidance for your child’s growth
        </p>
      </div>

      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources..."
            className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg outline-none text-sm"
          />
        </div>
      </div>

      {/* TYPE FILTER */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
              selectedType === t
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* CATEGORY FILTER */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
              selectedCategory === c
                ? "bg-purple-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* RESOURCE LIST */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
          <BookOpen className="mx-auto mb-3 text-gray-400" size={40} />
          <p className="text-sm font-semibold text-gray-800">
            No resources found
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => {
            const Icon = getIcon(r.type);
            return (
              <div
                key={r.id}
                className="bg-white rounded-2xl p-4 shadow-sm flex gap-4 items-start"
              >
                {/* ICON */}
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Icon size={22} />
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-800">
                    {r.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {r.author} • {r.category}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {r.duration}
                    </span>
                    <span className="flex items-center gap-1 text-yellow-500">
                      <Star size={12} fill="currentColor" />
                      {r.rating}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
