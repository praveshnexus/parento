import { BookOpen, Video, FileText, Headphones, Clock, TrendingUp, Star, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { staggerContainer, staggerItem, slideUp, fadeIn, cardHover, hoverScale } from "../utils/animations";
import PageWrapper from "../components/PageWrapper";

function LearningResources() {
  const [selectedType, setSelectedType] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const types = ["All", "Articles", "Videos", "Guides", "Podcasts"];
  const categories = ["All", "Nutrition", "Development", "Health", "Education", "Behavior"];

  const resources = [
    {
      id: 1,
      title: "Complete Guide to Toddler Nutrition",
      type: "Guide",
      category: "Nutrition",
      duration: "15 min read",
      author: "Dr. Priya Mehta",
      rating: 4.8,
      reads: 1234,
      image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop",
      description: "Everything you need to know about feeding your toddler, from portion sizes to dealing with picky eaters.",
      featured: true
    },
    {
      id: 2,
      title: "Understanding Child Development Milestones",
      type: "Article",
      category: "Development",
      duration: "8 min read",
      author: "Dr. Rajesh Kumar",
      rating: 4.9,
      reads: 2156,
      image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop",
      description: "A comprehensive guide to tracking your child's physical, cognitive, and emotional development.",
      featured: true
    },
    {
      id: 3,
      title: "Building Healthy Sleep Habits",
      type: "Video",
      category: "Health",
      duration: "12 min",
      author: "Sleep Specialist Team",
      rating: 4.7,
      reads: 3421,
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=300&fit=crop",
      description: "Expert advice on creating bedtime routines and solving common sleep challenges.",
      featured: false
    }
  ];

  const popularTopics = [
    { name: "Potty Training", count: 45 },
    { name: "First Foods", count: 38 },
    { name: "Screen Time", count: 32 },
    { name: "Speech Development", count: 28 },
    { name: "Bedtime Routines", count: 25 }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesType = selectedType === "All" || resource.type === selectedType;
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    return matchesType && matchesCategory;
  });

  const getTypeIcon = (type) => {
    switch(type) {
      case "Article": return FileText;
      case "Video": return Video;
      case "Guide": return BookOpen;
      case "Podcast": return Headphones;
      default: return FileText;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case "Article": return "blue";
      case "Video": return "red";
      case "Guide": return "green";
      case "Podcast": return "purple";
      default: return "gray";
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
        {/* Header */}
        <motion.div 
          className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 text-white py-12 px-6 md:px-12 lg:px-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Learning Resources 📚
            </motion.h1>
            <motion.p 
              className="text-lg text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Expert articles, guides, and videos for your parenting journey
            </motion.p>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 -mt-8">
          
          {/* Search & Filter */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
            {...slideUp}
            initial="initial"
            animate="animate"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for articles, videos, guides..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {types.map((type) => (
                  <motion.button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition ${
                      selectedType === type
                        ? "bg-green-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {type}
                  </motion.button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                    selectedCategory === category
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
            {...staggerContainer}
            initial="initial"
            animate="animate"
          >
            {[
              { value: "150+", label: "Articles", color: "green" },
              { value: "80+", label: "Videos", color: "red" },
              { value: "50+", label: "Guides", color: "blue" },
              { value: "30+", label: "Podcasts", color: "purple" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                className="bg-white rounded-xl shadow-md p-6 text-center"
                {...staggerItem}
                whileHover={{ y: -5 }}
              >
                <motion.p 
                  className={`text-3xl font-bold text-${stat.color}-600`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: idx * 0.1, type: "spring" }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            
            {/* Resources Grid */}
            <div className="xl:col-span-3">
              {/* Featured */}
              {filteredResources.some(r => r.featured) && (
                <motion.div 
                  className="mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                    Featured Content
                  </h2>
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    {...staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    {filteredResources.filter(r => r.featured).map((resource) => {
                      const TypeIcon = getTypeIcon(resource.type);
                      const color = getTypeColor(resource.type);
                      return (
                        <motion.div 
                          key={resource.id} 
                          className="bg-white rounded-2xl shadow-lg overflow-hidden group border border-gray-100"
                          {...staggerItem}
                          {...cardHover}
                        >
                          <div className="relative h-48 overflow-hidden">
                            <motion.img
                              src={resource.image}
                              alt={resource.title}
                              className="w-full h-full object-cover"
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.3 }}
                            />
                            <div className="absolute top-4 left-4">
                              <span className={`px-3 py-1 bg-${color}-500 text-white rounded-full text-xs font-medium flex items-center gap-1`}>
                                <TypeIcon className="w-3 h-3" />
                                {resource.type}
                              </span>
                            </div>
                          </div>
                          <div className="p-6">
                            <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                              {resource.category}
                            </span>
                            <h3 className="text-lg font-bold text-gray-800 mt-3 mb-2 group-hover:text-green-600 transition">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-4 text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  {resource.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                  {resource.rating}
                                </span>
                              </div>
                              <motion.button 
                                className="text-green-600 font-semibold hover:text-green-700"
                                whileHover={{ x: 5 }}
                              >
                                Read More →
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </motion.div>
              )}

              {/* All Resources */}
              <h2 className="text-2xl font-bold text-gray-800 mb-6">All Resources</h2>
              <motion.div 
                className="grid grid-cols-1 gap-6"
                {...staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {filteredResources.map((resource) => {
                  const TypeIcon = getTypeIcon(resource.type);
                  const color = getTypeColor(resource.type);
                  return (
                    <motion.div 
                      key={resource.id} 
                      className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 flex flex-col md:flex-row gap-6 group"
                      {...staggerItem}
                      {...cardHover}
                    >
                      <motion.img
                        src={resource.image}
                        alt={resource.title}
                        className="w-full md:w-48 h-32 object-cover rounded-xl"
                        whileHover={{ scale: 1.05 }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 bg-${color}-100 text-${color}-600 rounded-lg text-xs font-medium flex items-center gap-1`}>
                            <TypeIcon className="w-3 h-3" />
                            {resource.type}
                          </span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded-lg text-xs font-medium">
                            {resource.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition">
                          {resource.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{resource.author}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {resource.duration}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              {resource.rating}
                            </span>
                          </div>
                          <motion.button 
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition"
                            {...hoverScale}
                          >
                            View
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Popular Topics */}
              <motion.div 
                className="bg-white rounded-2xl shadow-lg p-6"
                {...slideUp}
                initial="initial"
                animate="animate"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  Popular Topics
                </h3>
                <motion.div 
                  className="space-y-3"
                  {...staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {popularTopics.map((topic, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition"
                      {...staggerItem}
                      whileHover={{ x: 5 }}
                    >
                      <div>
                        <span className="text-sm font-medium text-gray-700">{topic.name}</span>
                        <p className="text-xs text-gray-500">{topic.count} resources</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Newsletter */}
              <motion.div 
                className="bg-gradient-to-br from-green-500 to-blue-500 text-white rounded-2xl shadow-lg p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-bold text-lg mb-2">📬 Weekly Newsletter</h4>
                <p className="text-sm text-white/90 mb-4">
                  Get expert parenting tips and new resources delivered to your inbox every week.
                </p>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg mb-3 text-gray-800 focus:outline-none"
                />
                <motion.button 
                  className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg font-medium transition"
                  {...hoverScale}
                >
                  Subscribe
                </motion.button>
              </motion.div>

              {/* Tip */}
              <motion.div 
                className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-2xl shadow-lg p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-bold text-lg mb-2">💡 Expert Tip</h4>
                <p className="text-sm text-white/90 leading-relaxed">
                  Reading to your child for just 15 minutes daily can significantly boost their language development and strengthen your bond.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default LearningResources;