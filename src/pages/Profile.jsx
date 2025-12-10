import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit3,
  LogOut,
  Save,
  X,
  Award,
  Heart,
  MessageCircle,
  Baby,
  Shield,
  Bell,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebase";
import { doc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import BottomNav from "../components/BottomNav";

export default function Profile() {
  const { currentUser, userData, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);
  const [stats, setStats] = useState({
    milestones: 0,
    posts: 0,
    likes: 0,
    memberSince: "2024",
  });
  const [editData, setEditData] = useState({
    fullName: userData?.fullName || "",
    phone: userData?.phone || "",
    bio: userData?.bio || "",
  });

  // Load real stats from Firestore
  useEffect(() => {
    loadStats();
  }, [currentUser]);

  const loadStats = async () => {
    if (!currentUser) return;

    try {
      setStatsLoading(true);

      // Count milestones
      const milestonesQuery = query(
        collection(db, "milestones"),
        where("userId", "==", currentUser.uid)
      );
      const milestonesSnapshot = await getDocs(milestonesQuery);
      const milestonesCount = milestonesSnapshot.size;

      // Count posts
      const postsQuery = query(
        collection(db, "posts"),
        where("userId", "==", currentUser.uid)
      );
      const postsSnapshot = await getDocs(postsQuery);
      const postsCount = postsSnapshot.size;

      // Count likes given
      const allPostsQuery = query(collection(db, "posts"));
      const allPostsSnapshot = await getDocs(allPostsQuery);
      let likesCount = 0;
      allPostsSnapshot.forEach((doc) => {
        const postData = doc.data();
        if (postData.likes && postData.likes.includes(currentUser.uid)) {
          likesCount++;
        }
      });

      // Get member since year
      const memberSince = currentUser.metadata?.creationTime
        ? new Date(currentUser.metadata.creationTime).getFullYear()
        : "2024";

      setStats({
        milestones: milestonesCount,
        posts: postsCount,
        likes: likesCount,
        memberSince: memberSince.toString(),
      });
    } catch (error) {
      toast.error("Failed to load stats");
    } finally {
      setStatsLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!confirm("Are you sure you want to logout?")) return;

    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const handleSaveProfile = async () => {
    if (!editData.fullName.trim()) {
      toast.error("Name cannot be empty!");
      return;
    }

    const loadingToast = toast.loading("Saving profile...");

    try {
      setLoading(true);
      const userRef = doc(db, "users", currentUser.uid);

      await updateDoc(userRef, {
        fullName: editData.fullName.trim(),
        phone: editData.phone.trim(),
        bio: editData.bio.trim(),
      });

      toast.success("Profile updated successfully!", {
        id: loadingToast,
      });
      setIsEditing(false);
      
      // Reload page to fetch updated data
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error("Error updating profile", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditData({
      fullName: userData?.fullName || "",
      phone: userData?.phone || "",
      bio: userData?.bio || "",
    });
    setIsEditing(false);
  };

  const statsData = [
    { icon: Baby, label: "Milestones", value: stats.milestones, color: "blue" },
    { icon: MessageCircle, label: "Posts", value: stats.posts, color: "purple" },
    { icon: Heart, label: "Likes Given", value: stats.likes, color: "pink" },
    { icon: Award, label: "Member Since", value: stats.memberSince, color: "green" },
  ];

  const settingsOptions = [
    {
      icon: Shield,
      label: "Privacy Settings",
      description: "Manage your privacy preferences",
      action: () => toast("Privacy settings coming soon!", { icon: "🔒" }),
    },
    {
      icon: Bell,
      label: "Notifications",
      description: "Configure notification preferences",
      action: () => toast("Notification settings coming soon!", { icon: "🔔" }),
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      description: "Get help and contact support",
      action: () => toast("Help center coming soon!", { icon: "❓" }),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-20">
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-6"
        >
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-5xl font-bold">
                {userData?.fullName?.charAt(0).toUpperCase() ||
                  currentUser?.email?.charAt(0).toUpperCase() ||
                  "U"}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white"></div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              {!isEditing ? (
                <>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {userData?.fullName ||
                      currentUser?.email?.split("@")[0] ||
                      "User"}
                  </h1>
                  <p className="text-gray-600 mb-4">
                    {userData?.bio ||
                      "Loving parent on a journey of growth and discovery"}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 items-center md:items-start">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{currentUser?.email}</span>
                    </div>
                    {userData?.phone && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm">{userData.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        Joined{" "}
                        {new Date(
                          currentUser?.metadata?.creationTime
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editData.fullName}
                      onChange={(e) =>
                        setEditData({ ...editData, fullName: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      value={editData.bio}
                      onChange={(e) =>
                        setEditData({ ...editData, bio: e.target.value })
                      }
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center gap-2 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancelEdit}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {statsLoading ? (
            // Loading skeleton
            Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 shadow-sm animate-pulse"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-3"></div>
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))
          ) : (
            statsData.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm text-center hover:shadow-md transition"
                >
                  <div
                    className={`w-12 h-12 bg-${stat.color}-100 rounded-full flex items-center justify-center mx-auto mb-3`}
                  >
                    <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                  <div
                    className={`text-2xl font-bold text-${stat.color}-600 mb-1`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => navigate("/track")}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-left"
            >
              <Baby className="w-8 h-8 text-blue-500 mb-2" />
              <h3 className="font-semibold text-gray-800">Track Milestones</h3>
              <p className="text-sm text-gray-600">
                Monitor your child's development
              </p>
            </button>

            <button
              onClick={() => navigate("/community")}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-left"
            >
              <MessageCircle className="w-8 h-8 text-purple-500 mb-2" />
              <h3 className="font-semibold text-gray-800">Join Community</h3>
              <p className="text-sm text-gray-600">
                Connect with other parents
              </p>
            </button>

            <button
              onClick={() => navigate("/learningresources")}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-left"
            >
              <Award className="w-8 h-8 text-green-500 mb-2" />
              <h3 className="font-semibold text-gray-800">Learning Hub</h3>
              <p className="text-sm text-gray-600">
                Access expert resources
              </p>
            </button>

            <button
              onClick={() => navigate("/consult")}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition text-left"
            >
              <Heart className="w-8 h-8 text-pink-500 mb-2" />
              <h3 className="font-semibold text-gray-800">Consult Doctors</h3>
              <p className="text-sm text-gray-600">
                Get expert medical advice
              </p>
            </button>
          </div>
        </motion.div>

        {/* Settings & Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4">Settings</h2>
          <div className="space-y-3">
            {settingsOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.label}
                  onClick={option.action}
                  className="w-full p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition text-left flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition">
                      <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {option.label}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {option.description}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition" />
                </button>
              );
            })}

            <button
              onClick={handleLogout}
              className="w-full p-4 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition text-left flex items-center gap-3 text-red-600 font-semibold group"
            >
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition">
                <LogOut className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">Logout</h3>
                <p className="text-sm text-red-500 font-normal">
                  Sign out of your account
                </p>
              </div>
            </button>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}