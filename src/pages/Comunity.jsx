import { MessageSquare, Heart, Send, TrendingUp, Users, Plus, Search } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { staggerContainer, staggerItem, slideUp, fadeIn, cardHover, hoverScale } from "../utils/animations";
import PageWrapper from "../components/PageWrapper";

function Community() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Health", "Nutrition", "Development", "Education", "Tips & Tricks"];

  const posts = [
    {
      id: 1,
      author: "Neha Sharma",
      avatar: "https://ui-avatars.com/api/?name=Neha+Sharma&background=ec4899&color=fff&size=60",
      time: "2 hours ago",
      category: "Nutrition",
      title: "Healthy lunch ideas for picky eaters?",
      content: "My 3-year-old refuses to eat anything green! Looking for creative ways to include vegetables in his meals. What has worked for you?",
      likes: 23,
      comments: 8,
      trending: true
    },
    {
      id: 2,
      author: "Amit Verma",
      avatar: "https://ui-avatars.com/api/?name=Amit+Verma&background=3b82f6&color=fff&size=60",
      time: "5 hours ago",
      category: "Health",
      title: "Just finished vaccination appointment!",
      content: "Glad to see our little one growing healthy 💪 The doctor said everything is on track. Feeling relieved and grateful!",
      likes: 45,
      comments: 12,
      trending: false
    },
    {
      id: 3,
      author: "Priya Nair",
      avatar: "https://ui-avatars.com/api/?name=Priya+Nair&background=10b981&color=fff&size=60",
      time: "1 day ago",
      category: "Tips & Tricks",
      title: "Indoor activities for rainy days?",
      content: "Looking for fun and educational activities to keep my 2-year-old engaged when we can't go outside. Any recommendations?",
      likes: 30,
      comments: 15,
      trending: true
    }
  ];

  const trendingTopics = [
    { topic: "Sleep Training", posts: 45 },
    { topic: "Potty Training", posts: 38 },
    { topic: "Teething Tips", posts: 32 },
    { topic: "First Day of School", posts: 28 },
    { topic: "Healthy Snacks", posts: 25 }
  ];

  const filteredPosts = selectedCategory === "All" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
        {/* Header */}
        <motion.div 
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white py-12 px-6 md:px-12 lg:px-20"
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
              Parent Community 👥
            </motion.h1>
            <motion.p 
              className="text-lg text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Connect, share, and learn from other parents
            </motion.p>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 -mt-8">
          
          {/* Stats Bar */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-6 mb-8 grid grid-cols-2 md:grid-cols-4 gap-6"
            {...slideUp}
            initial="initial"
            animate="animate"
          >
            {[
              { value: "2,547", label: "Active Members", color: "pink" },
              { value: "1,234", label: "Discussions", color: "purple" },
              { value: "8,901", label: "Total Posts", color: "blue" },
              { value: "4.8★", label: "Community Rating", color: "green" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                className="text-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.1, type: "spring" }}
              >
                <p className={`text-3xl font-bold text-${stat.color}-600`}>{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            
            {/* Main Feed */}
            <div className="xl:col-span-3 space-y-6">
              
              {/* Create Post */}
              <motion.div 
                className="bg-white rounded-2xl shadow-lg p-6"
                {...fadeIn}
                initial="initial"
                animate="animate"
              >
                <div className="flex gap-4 mb-4">
                  <img
                    src="https://ui-avatars.com/api/?name=You&background=ec4899&color=fff&size=50"
                    alt="You"
                    className="w-12 h-12 rounded-full"
                  />
                  <input
                    type="text"
                    placeholder="Share your thoughts with the community..."
                    className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-pink-500 focus:outline-none"
                  />
                  <motion.button 
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-semibold transition shadow-md flex items-center gap-2"
                    {...hoverScale}
                  >
                    <Plus className="w-5 h-5" />
                    Post
                  </motion.button>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition ${
                        selectedCategory === category
                          ? "bg-pink-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Posts Feed */}
              <motion.div 
                className="space-y-6"
                {...staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {filteredPosts.map((post) => (
                  <motion.div 
                    key={post.id} 
                    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                    {...staggerItem}
                    {...cardHover}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-12 h-12 rounded-full border-2 border-gray-200"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-800">{post.author}</h3>
                          {post.trending && (
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-600 rounded-full text-xs font-medium flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" /> Trending
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>{post.time}</span>
                          <span>•</span>
                          <span className="px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{post.content}</p>
                    </div>

                    <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                      <motion.button 
                        className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition group"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Heart className="w-5 h-5 group-hover:fill-pink-500" />
                        <span className="font-medium">{post.likes}</span>
                      </motion.button>
                      <motion.button 
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition"
                        whileHover={{ scale: 1.1 }}
                      >
                        <MessageSquare className="w-5 h-5" />
                        <span className="font-medium">{post.comments} Comments</span>
                      </motion.button>
                      <motion.button 
                        className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition ml-auto"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Send className="w-5 h-5" />
                        <span className="font-medium">Share</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Trending Topics */}
              <motion.div 
                className="bg-white rounded-2xl shadow-lg p-6"
                {...slideUp}
                initial="initial"
                animate="animate"
              >
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <h3 className="text-lg font-bold text-gray-800">Trending Topics</h3>
                </div>
                <motion.div 
                  className="space-y-3"
                  {...staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {trendingTopics.map((topic, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-pink-50 hover:from-orange-100 hover:to-pink-100 rounded-lg cursor-pointer transition"
                      {...staggerItem}
                      whileHover={{ x: 5 }}
                    >
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{topic.topic}</p>
                        <p className="text-xs text-gray-500">{topic.posts} discussions</p>
                      </div>
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">
                        {idx + 1}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Guidelines */}
              <motion.div 
                className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl shadow-lg p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Community Guidelines
                </h3>
                <ul className="space-y-2 text-sm text-white/90">
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Be respectful and supportive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Share genuine experiences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>No spam or advertisements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span>Protect privacy and safety</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Community;