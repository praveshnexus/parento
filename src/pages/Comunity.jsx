// src/pages/Community.js
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Heart,
  MessageCircle,
  Share2,
  MoreVertical,
  Plus,
  TrendingUp,
  Clock,
  Send
} from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { fadeIn, slideUp, cardHover, staggerContainer, staggerItem } from "../utils/animations";
import { useAuth } from "../context/AuthContext";
import { getUserAvatar } from "../utils/avatarHelper";
import { db } from "../firebase/firebase";
import { collection, query, orderBy, getDocs, addDoc, updateDoc, doc, increment, arrayUnion, arrayRemove } from "firebase/firestore";

export default function Community() {
  const { currentUser, userData } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Recent");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");

  const filters = ["Recent", "Popular", "Following"];

  // Load posts from Firestore
  useEffect(() => {
    loadPosts();
  }, [filter]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, "posts"),
        orderBy(filter === "Popular" ? "likes" : "createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setPosts(postsData);
    } catch (error) {
      console.error("Error loading posts:", error);
      // Show sample data if Firestore fails
      setPosts(getSamplePosts());
    } finally {
      setLoading(false);
    }
  };

  // Sample posts for demo
  const getSamplePosts = () => [
    {
      id: "1",
      userName: "Sarah Johnson",
      userPhotoURL: null,
      content: "Just celebrated Emma's first steps today! She walked 5 steps on her own. So proud! 👶🎉",
      timestamp: new Date().toISOString(),
      likes: 24,
      likedBy: [],
      comments: 8,
      shares: 2
    },
    {
      id: "2",
      userName: "Michael Chen",
      userPhotoURL: null,
      content: "Any tips for getting a 2-year-old to sleep through the night? We've tried everything!",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      likes: 15,
      likedBy: [],
      comments: 12,
      shares: 1
    },
    {
      id: "3",
      userName: "Priya Sharma",
      userPhotoURL: null,
      content: "Found this amazing book on toddler nutrition. Highly recommend 'Feeding Your Child' by Dr. Smith!",
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      likes: 31,
      likedBy: [],
      comments: 5,
      shares: 8
    }
  ];

  // Create new post
  const createPost = async () => {
    if (!newPostContent.trim()) return;

    try {
      const postData = {
        userId: currentUser.uid,
        userName: userData?.fullName || currentUser.displayName || "Anonymous",
        userPhotoURL: userData?.photoURL || null,
        content: newPostContent,
        timestamp: new Date().toISOString(),
        likes: 0,
        likedBy: [],
        comments: 0,
        shares: 0
      };

      const docRef = await addDoc(collection(db, "posts"), postData);
      
      setPosts(prev => [{
        id: docRef.id,
        ...postData
      }, ...prev]);

      setNewPostContent("");
      setShowCreatePost(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Toggle like
  const toggleLike = async (postId) => {
    try {
      const post = posts.find(p => p.id === postId);
      const hasLiked = post.likedBy?.includes(currentUser.uid);

      // Update UI optimistically
      setPosts(prev =>
        prev.map(p =>
          p.id === postId
            ? {
                ...p,
                likes: hasLiked ? p.likes - 1 : p.likes + 1,
                likedBy: hasLiked
                  ? p.likedBy.filter(id => id !== currentUser.uid)
                  : [...(p.likedBy || []), currentUser.uid]
              }
            : p
        )
      );

      // If it's real data, update Firestore
      if (post.userId) {
        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, {
          likes: hasLiked ? increment(-1) : increment(1),
          likedBy: hasLiked ? arrayRemove(currentUser.uid) : arrayUnion(currentUser.uid)
        });
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / 60000);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
        {/* Header */}
        <motion.div
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-16 px-6 lg:px-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.h1
              className="text-4xl lg:text-5xl font-bold mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Community
            </motion.h1>
            <motion.p
              className="text-white/90 text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Connect with other parents and share experiences
            </motion.p>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 -mt-12">
          {/* Create Post Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
            {...slideUp}
            {...cardHover}
          >
            <div className="flex items-center gap-4">
              <img
                src={getUserAvatar(userData, 50)}
                alt="You"
                className="w-12 h-12 rounded-full"
              />
              <button
                onClick={() => setShowCreatePost(!showCreatePost)}
                className="flex-1 text-left px-4 py-3 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 transition-colors"
              >
                What's on your mind?
              </button>
            </div>

            {/* Create Post Form */}
            {showCreatePost && (
              <motion.div
                className="mt-4 pt-4 border-t"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Share your thoughts, questions, or tips..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={4}
                />
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    onClick={() => {
                      setShowCreatePost(false);
                      setNewPostContent("");
                    }}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    onClick={createPost}
                    disabled={!newPostContent.trim()}
                    className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: newPostContent.trim() ? 1.05 : 1 }}
                    whileTap={{ scale: newPostContent.trim() ? 0.95 : 1 }}
                  >
                    <Send className="w-4 h-4" />
                    Post
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Filters */}
          <motion.div
            className="flex gap-3 mb-6"
            {...staggerContainer}
            initial="initial"
            animate="animate"
          >
            {filters.map((filterOption, index) => (
              <motion.button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  filter === filterOption
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                {...staggerItem}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filterOption}
              </motion.button>
            ))}
          </motion.div>

          {/* Posts List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading posts...</p>
            </div>
          ) : (
            <motion.div
              className="space-y-6"
              {...staggerContainer}
              initial="initial"
              animate="animate"
            >
              {posts.map((post, index) => {
                const hasLiked = post.likedBy?.includes(currentUser?.uid);
                
                return (
                  <motion.div
                    key={post.id}
                    className="bg-white rounded-xl shadow-md p-6"
                    {...staggerItem}
                    {...cardHover}
                  >
                    {/* Post Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={getUserAvatar({ fullName: post.userName, photoURL: post.userPhotoURL }, 50)}
                        alt={post.userName}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{post.userName}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {formatTimestamp(post.timestamp)}
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Post Content */}
                    <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

                    {/* Post Stats */}
                    <div className="flex items-center gap-6 py-3 border-t border-b">
                      <span className="text-sm text-gray-600">
                        {post.likes} {post.likes === 1 ? "like" : "likes"}
                      </span>
                      <span className="text-sm text-gray-600">
                        {post.comments} {post.comments === 1 ? "comment" : "comments"}
                      </span>
                      <span className="text-sm text-gray-600">
                        {post.shares} {post.shares === 1 ? "share" : "shares"}
                      </span>
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center gap-2 mt-3">
                      <motion.button
                        onClick={() => toggleLike(post.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-colors ${
                          hasLiked
                            ? "text-pink-500 bg-pink-50"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Heart className={`w-5 h-5 ${hasLiked ? "fill-current" : ""}`} />
                        Like
                      </motion.button>
                      
                      <motion.button
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <MessageCircle className="w-5 h-5" />
                        Comment
                      </motion.button>
                      
                      <motion.button
                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Share2 className="w-5 h-5" />
                        Share
                      </motion.button>
                    </div>
                  </motion.div>
                );
              })}

              {posts.length === 0 && (
                <motion.div
                  className="text-center py-12 bg-white rounded-xl shadow-md"
                  {...fadeIn}
                >
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Posts Yet</h3>
                  <p className="text-gray-600 mb-4">
                    Be the first to share something with the community!
                  </p>
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold inline-flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Create Your First Post
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}