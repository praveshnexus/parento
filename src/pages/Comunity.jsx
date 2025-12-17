import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  Heart,
  MessageCircle,
  Share2,
  Plus,
  X,
  Send,
  Trash2,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  query,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from "firebase/firestore";
import BottomNav from "../components/BottomNav";

export default function Comunity() {
  const { currentUser, userData } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPost, setNewPost] = useState({ content: "", image: "" });
  const [filter, setFilter] = useState("all");
  const [expandedComments, setExpandedComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "posts"));
      const querySnapshot = await getDocs(q);

      const postsData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate
            ? data.createdAt.toDate()
            : new Date(),
          likes: data.likes || [],
          comments: data.comments || [],
        };
      });

      postsData.sort((a, b) => b.createdAt - a.createdAt);
      setPosts(postsData);
    } catch (error) {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!newPost.content.trim()) {
      toast.error("Please write something!");
      return;
    }

    const loadingToast = toast.loading("Creating post...");

    try {
      const postData = {
        userId: currentUser.uid,
        userName:
          userData?.fullName ||
          currentUser.email?.split("@")[0] ||
          "Anonymous",
        userAvatar: userData?.photoURL || null,
        content: newPost.content.trim(),
        image: newPost.image.trim() || null,
        likes: [],
        comments: [],
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "posts"), postData);
      await loadPosts();

      setNewPost({ content: "", image: "" });
      setShowCreateModal(false);

      toast.success("Post created successfully!", {
        id: loadingToast,
      });
    } catch (error) {
      toast.error("Failed to create post", {
        id: loadingToast,
      });
    }
  };

  const toggleLike = async (postId, currentLikes) => {
    try {
      const postRef = doc(db, "posts", postId);
      const hasLiked = currentLikes.includes(currentUser.uid);

      if (hasLiked) {
        await updateDoc(postRef, {
          likes: arrayRemove(currentUser.uid),
        });
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(currentUser.uid),
        });
        toast("❤️", {
          duration: 1000,
        });
      }

      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? {
                ...post,
                likes: hasLiked
                  ? post.likes.filter((uid) => uid !== currentUser.uid)
                  : [...post.likes, currentUser.uid],
              }
            : post
        )
      );
    } catch (error) {
      toast.error("Failed to update like");
    }
  };

  const deletePost = async (postId, postUserId) => {
    if (postUserId !== currentUser.uid) {
      toast.error("You can only delete your own posts!");
      return;
    }

    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "posts", postId));
      setPosts((prev) => prev.filter((post) => post.id !== postId));
      toast.success("Post deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  const toggleComments = (postId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleAddComment = async (postId) => {
    const commentText = commentInputs[postId]?.trim();

    if (!commentText) {
      toast.error("Comment cannot be empty!");
      return;
    }

    try {
      const postRef = doc(db, "posts", postId);
      const newComment = {
        id: Date.now().toString(),
        userId: currentUser.uid,
        userName:
          userData?.fullName ||
          currentUser.email?.split("@")[0] ||
          "Anonymous",
        text: commentText,
        createdAt: new Date().toISOString(),
      };

      await updateDoc(postRef, {
        comments: arrayUnion(newComment),
      });

      // Update local state
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );

      // Clear input
      setCommentInputs((prev) => ({
        ...prev,
        [postId]: "",
      }));

      toast.success("Comment added!");
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  const deleteComment = async (postId, commentId, commentUserId) => {
    if (commentUserId !== currentUser.uid) {
      toast.error("You can only delete your own comments!");
      return;
    }

    try {
      const post = posts.find((p) => p.id === postId);
      const commentToDelete = post.comments.find((c) => c.id === commentId);

      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        comments: arrayRemove(commentToDelete),
      });

      setPosts((prev) =>
        prev.map((p) =>
          p.id === postId
            ? {
                ...p,
                comments: p.comments.filter((c) => c.id !== commentId),
              }
            : p
        )
      );

      toast.success("Comment deleted!");
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  const filteredPosts = posts.filter((post) => {
    if (filter === "my") return post.userId === currentUser.uid;
    if (filter === "liked") return post.likes.includes(currentUser.uid);
    return true;
  });

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-20">
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-800 mb-2"
          >
            Community
          </motion.h1>
          <p className="text-gray-600">Connect with fellow parents</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === "all"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Posts
              </button>
              <button
                onClick={() => setFilter("my")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === "my"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                My Posts
              </button>
              <button
                onClick={() => setFilter("liked")}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === "liked"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Liked
              </button>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowCreateModal(true)}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Post
            </motion.button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm p-12 text-center"
          >
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {filter === "my"
                ? "You haven't posted yet"
                : filter === "liked"
                ? "No liked posts yet"
                : "No posts yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {filter === "my"
                ? "Share your parenting journey with the community"
                : "Be the first to share something!"}
            </p>
            {filter === "all" && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
              >
                Create First Post
              </button>
            )}
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredPosts.map((post, index) => {
                const hasLiked = post.likes.includes(currentUser.uid);
                const isOwnPost = post.userId === currentUser.uid;
                const isCommentsExpanded = expandedComments[post.id];

                return (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {post.userName?.charAt(0).toUpperCase() || "A"}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {post.userName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {getTimeAgo(post.createdAt)}
                          </p>
                        </div>
                      </div>
                      {isOwnPost && (
                        <button
                          onClick={() => deletePost(post.id, post.userId)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition"
                          title="Delete post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <p className="text-gray-800 mb-4 whitespace-pre-wrap">
                      {post.content}
                    </p>

                    {post.image && (
                      <img
                        src={post.image}
                        alt="Post"
                        className="w-full rounded-lg mb-4 max-h-96 object-cover"
                      />
                    )}

                    <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => toggleLike(post.id, post.likes)}
                        className={`flex items-center gap-2 transition ${
                          hasLiked
                            ? "text-red-500"
                            : "text-gray-600 hover:text-red-500"
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            hasLiked ? "fill-current" : ""
                          }`}
                        />
                        <span className="font-medium">
                          {post.likes.length}
                        </span>
                      </button>

                      <button
                        onClick={() => toggleComments(post.id)}
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span className="font-medium">
                          {post.comments.length}
                        </span>
                        {isCommentsExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>

                      <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition">
                        <Share2 className="w-5 h-5" />
                        <span className="font-medium">Share</span>
                      </button>
                    </div>

                    {/* Comments Section */}
                    <AnimatePresence>
                      {isCommentsExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-gray-100"
                        >
                          {/* Comments List */}
                          <div className="space-y-3 mb-4">
                            {post.comments.length === 0 ? (
                              <p className="text-sm text-gray-500 text-center py-4">
                                No comments yet. Be the first to comment!
                              </p>
                            ) : (
                              post.comments.map((comment) => (
                                <div
                                  key={comment.id}
                                  className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                                >
                                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    {comment.userName?.charAt(0).toUpperCase()}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-sm text-gray-800">
                                          {comment.userName}
                                        </p>
                                        <p className="text-sm text-gray-700 mt-1 break-words">
                                          {comment.text}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                          {getTimeAgo(comment.createdAt)}
                                        </p>
                                      </div>
                                      {comment.userId === currentUser.uid && (
                                        <button
                                          onClick={() =>
                                            deleteComment(
                                              post.id,
                                              comment.id,
                                              comment.userId
                                            )
                                          }
                                          className="text-red-500 hover:text-red-700 p-1 flex-shrink-0"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))
                            )}
                          </div>

                          {/* Add Comment Input */}
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={commentInputs[post.id] || ""}
                              onChange={(e) =>
                                setCommentInputs((prev) => ({
                                  ...prev,
                                  [post.id]: e.target.value,
                                }))
                              }
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  handleAddComment(post.id);
                                }
                              }}
                              placeholder="Write a comment..."
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                            />
                            <button
                              onClick={() => handleAddComment(post.id)}
                              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showCreateModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowCreateModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Create Post
                  </h2>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleCreatePost} className="space-y-4">
                  <div>
                    <textarea
                      value={newPost.content}
                      onChange={(e) =>
                        setNewPost({ ...newPost, content: e.target.value })
                      }
                      placeholder="What's on your mind?"
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL (Optional)
                    </label>
                    <div className="relative">
                      <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="url"
                        value={newPost.image}
                        onChange={(e) =>
                          setNewPost({ ...newPost, image: e.target.value })
                        }
                        placeholder="https://example.com/image.jpg"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCreateModal(false)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition flex items-center justify-center"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}