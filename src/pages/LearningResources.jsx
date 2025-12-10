import {
  BookOpen,
  Video,
  FileText,
  Headphones,
  Clock,
  Star,
  Search,
} from "lucide-react";
import { motion } from "framer-motion";
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
      featured: true,
    },
    {
      id: 2,
      title: "Understanding Child Development Milestones",
      type: "Article",
      category: "Development",
      duration: "8 min read",
      rating: 4.9,
      author: "Dr. Rajesh Kumar",
      featured: true,
    },
    {
      id: 3,
      title: "Healthy Sleep Habits for Kids",
      type: "Video",
      category: "Health",
      duration: "12 min",
      rating: 4.7,
      author: "Sleep Experts",
      featured: true,
    },
    {
      id: 4,
      title: "Managing Screen Time Effectively",
      type: "Article",
      category: "Behavior",
      duration: "6 min read",
      rating: 4.6,
      author: "Parenting Council",
      featured: false,
    },
    {
      id: 5,
      title: "Positive Discipline Techniques",
      type: "Guide",
      category: "Behavior",
      duration: "10 min read",
      rating: 4.8,
      author: "Dr. Neha Sharma",
      featured: false,
    },
    {
      id: 6,
      title: "Early Learning Through Play",
      type: "Video",
      category: "Education",
      duration: "14 min",
      rating: 4.7,
      author: "Early Ed Team",
      featured: false,
    },
    {
      id: 7,
      title: "Balanced Diet for School Kids",
      type: "Article",
      category: "Nutrition",
      duration: "7 min read",
      rating: 4.5,
      author: "Nutrition India",
      featured: false,
    },
    {
      id: 8,
      title: "Handling Tantrums Calmly",
      type: "Guide",
      category: "Behavior",
      duration: "9 min read",
      rating: 4.6,
      author: "Child Psych Assoc.",
      featured: false,
    },
    {
      id: 9,
      title: "Vaccination Schedule Explained",
      type: "Article",
      category: "Health",
      duration: "5 min read",
      rating: 4.9,
      author: "WHO India",
      featured: false,
    },
    {
      id: 10,
      title: "Helping Kids Build Confidence",
      type: "Podcast",
      category: "Development",
      duration: "18 min",
      rating: 4.7,
      author: "Mindful Parenting",
      featured: false,
    },
    {
      id: 11,
      title: "Speech Development Basics",
      type: "Video",
      category: "Development",
      duration: "11 min",
      rating: 4.8,
      author: "Speech Experts",
      featured: false,
    },
    {
      id: 12,
      title: "Healthy Morning Routines",
      type: "Guide",
      category: "Health",
      duration: "6 min read",
      rating: 4.5,
      author: "Wellness Team",
      featured: false,
    },
    {
      id: 13,
      title: "Teaching Emotional Intelligence",
      type: "Article",
      category: "Behavior",
      duration: "8 min read",
      rating: 4.7,
      author: "Child Mind Org",
      featured: false,
    },
    {
      id: 14,
      title: "Lunch Box Ideas for Kids",
      type: "Video",
      category: "Nutrition",
      duration: "9 min",
      rating: 4.6,
      author: "Healthy Eats",
      featured: false,
    },
    {
      id: 15,
      title: "Mindful Parenting Practices",
      type: "Podcast",
      category: "Development",
      duration: "22 min",
      rating: 4.8,
      author: "Mindful Moms",
      featured: false,
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
    const matchSearch =
      r.title.toLowerCase().includes(search.toLowerCase());
    return matchType && matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-24">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Learning Resources
          </h1>
          <p className="text-gray-600">
            Expert articles, videos, guides & podcasts for parents
          </p>
        </motion.div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search resources..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedType === t
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                  selectedCategory === c
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="space-y-4">
          {filtered.map((r, i) => {
            const Icon = getIcon(r.type);
            return (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{r.title}</h3>
                    <p className="text-sm text-gray-600">
                      {r.author} • {r.category}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {r.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {r.rating}
                      </span>
                    </div>
                  </div>
                  <button className="text-blue-600 font-semibold hover:underline">
                    View →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
