import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  TrendingUp,
  Search,
  Plus,
  Baby,
  Brain,
  Users,
  MessageCircle,
  CheckCircle2,
  Circle,
  X,
  Trash2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import BottomNav from "../components/BottomNav";

const categories = [
  { id: "all", name: "All Categories", icon: TrendingUp, color: "blue" },
  { id: "physical", name: "Physical", icon: Baby, color: "green" },
  { id: "cognitive", name: "Cognitive", icon: Brain, color: "purple" },
  { id: "social", name: "Social", icon: Users, color: "pink" },
  { id: "language", name: "Language", icon: MessageCircle, color: "red" },
];

export default function Track() {
  const { currentUser } = useAuth();
  const [milestones, setMilestones] = useState([]);
  const [filteredMilestones, setFilteredMilestones] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newMilestone, setNewMilestone] = useState({
    category: "physical",
    title: "",
    description: "",
    expectedAge: "",
  });

  useEffect(() => {
    loadMilestones();
  }, [currentUser]);

  useEffect(() => {
    let filtered = milestones;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (m) => m.category.toLowerCase() === selectedCategory
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMilestones(filtered);
  }, [milestones, selectedCategory, searchQuery]);

  const loadMilestones = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      const q = query(
        collection(db, "milestones"),
        where("userId", "==", currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      const milestonesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
        };
      });

      milestonesData.sort((a, b) => b.createdAt - a.createdAt);
      setMilestones(milestonesData);
    } catch (error) {
      toast.error("Failed to load milestones");
    } finally {
      setLoading(false);
    }
  };

  const toggleMilestone = async (milestoneId, currentStatus) => {
    try {
      const milestoneRef = doc(db, "milestones", milestoneId);
      await updateDoc(milestoneRef, {
        isCompleted: !currentStatus,
      });

      setMilestones((prev) =>
        prev.map((m) =>
          m.id === milestoneId ? { ...m, isCompleted: !currentStatus } : m
        )
      );

      if (!currentStatus) {
        toast.success("🎉 Milestone completed!", {
          icon: "✅",
        });
      } else {
        toast("Milestone marked as incomplete", {
          icon: "⏳",
        });
      }
    } catch (error) {
      toast.error("Failed to update milestone");
    }
  };

  const deleteMilestone = async (milestoneId) => {
    if (!confirm("Are you sure you want to delete this milestone?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "milestones", milestoneId));
      setMilestones((prev) => prev.filter((m) => m.id !== milestoneId));
      toast.success("Milestone deleted successfully");
    } catch (error) {
      toast.error("Failed to delete milestone");
    }
  };

  const handleAddMilestone = async (e) => {
    e.preventDefault();

    if (!newMilestone.title.trim() || !newMilestone.expectedAge.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const loadingToast = toast.loading("Adding milestone...");

    try {
      const milestoneData = {
        userId: currentUser.uid,
        category: newMilestone.category,
        title: newMilestone.title.trim(),
        description: newMilestone.description.trim(),
        expectedAge: newMilestone.expectedAge.trim(),
        isCompleted: false,
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "milestones"), milestoneData);
      await loadMilestones();

      setNewMilestone({
        category: "physical",
        title: "",
        description: "",
        expectedAge: "",
      });
      setShowAddModal(false);

      toast.success("Milestone added successfully!", {
        id: loadingToast,
      });
    } catch (error) {
      toast.error("Failed to add milestone", {
        id: loadingToast,
      });
    }
  };

  const stats = {
    total: milestones.length,
    completed: milestones.filter((m) => m.isCompleted).length,
    pending: milestones.filter((m) => !m.isCompleted).length,
    completionRate:
      milestones.length > 0
        ? Math.round(
            (milestones.filter((m) => m.isCompleted).length /
              milestones.length) *
              100
          )
        : 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-20">
      <Toaster position="top-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-800 mb-2"
          >
            Track Milestones
          </motion.h1>
          <p className="text-gray-600">
            Monitor your child's development journey
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">Total Milestones</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="text-3xl font-bold text-green-600 mb-1">
              {stats.completed}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="text-3xl font-bold text-orange-600 mb-1">
              {stats.pending}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {stats.completionRate}%
            </div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search milestones..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Milestone
            </motion.button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition flex items-center ${
                    selectedCategory === cat.id
                      ? `bg-${cat.color}-500 text-white`
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {cat.name}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Milestones List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading milestones...</p>
          </div>
        ) : filteredMilestones.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm p-12 text-center"
          >
            <Baby className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {searchQuery || selectedCategory !== "all"
                ? "No Milestones Found"
                : "No Milestones Yet"}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedCategory !== "all"
                ? "Try adjusting your filters"
                : "Start tracking your child's development milestones"}
            </p>
            {!searchQuery && selectedCategory === "all" && (
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
              >
                Add Your First Milestone
              </button>
            )}
          </motion.div>
        ) : (
          <div className="grid gap-4">
            <AnimatePresence>
              {filteredMilestones.map((milestone, index) => {
                const category = categories.find(
                  (c) => c.id === milestone.category.toLowerCase()
                );
                const Icon = category?.icon || Baby;

                return (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition ${
                      milestone.isCompleted ? "bg-green-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() =>
                          toggleMilestone(milestone.id, milestone.isCompleted)
                        }
                        className="mt-1 flex-shrink-0"
                      >
                        {milestone.isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-400 hover:text-green-500 transition" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1 min-w-0">
                            <h3
                              className={`text-lg font-semibold ${
                                milestone.isCompleted
                                  ? "text-green-700 line-through"
                                  : "text-gray-800"
                              }`}
                            >
                              {milestone.title}
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              {milestone.description}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium bg-${
                              category?.color || "blue"
                            }-100 text-${category?.color || "blue"}-700 flex-shrink-0`}
                          >
                            <Icon className="w-3 h-3 inline mr-1" />
                            {category?.name || milestone.category}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>Expected: {milestone.expectedAge}</span>
                            {milestone.isCompleted && (
                              <span className="text-green-600 font-medium">
                                ✓ Completed
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => deleteMilestone(milestone.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition flex-shrink-0"
                            title="Delete milestone"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Add Milestone Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowAddModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Add Milestone
                  </h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleAddMilestone} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={newMilestone.category}
                      onChange={(e) =>
                        setNewMilestone({
                          ...newMilestone,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    >
                      {categories
                        .filter((c) => c.id !== "all")
                        .map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={newMilestone.title}
                      onChange={(e) =>
                        setNewMilestone({
                          ...newMilestone,
                          title: e.target.value,
                        })
                      }
                      placeholder="e.g., First Steps"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newMilestone.description}
                      onChange={(e) =>
                        setNewMilestone({
                          ...newMilestone,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe the milestone..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expected Age *
                    </label>
                    <input
                      type="text"
                      value={newMilestone.expectedAge}
                      onChange={(e) =>
                        setNewMilestone({
                          ...newMilestone,
                          expectedAge: e.target.value,
                        })
                      }
                      placeholder="e.g., 12 months"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition"
                    >
                      Add Milestone
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