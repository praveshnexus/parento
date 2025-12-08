// src/pages/Track.jsx - FULLY FUNCTIONAL VERSION
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Baby,
  Calendar,
  Award,
  Plus,
  Activity,
  Brain,
  Smile,
  Heart,
  CheckCircle,
  Circle,
  X,
  Loader
} from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import {
  fadeIn,
  slideUp,
  cardHover,
  staggerContainer,
  staggerItem,
} from "../utils/animations";
import { useAuth } from "../context/AuthContext";
import { getChildAvatar } from "../utils/avatarHelper";
import { db } from "../firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export default function Track() {
  const { currentUser, userData } = useAuth();
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [saving, setSaving] = useState(false);

  // New milestone form state
  const [newMilestone, setNewMilestone] = useState({
    category: "Physical",
    title: "",
    description: "",
    expectedAge: "",
  });

  // Milestone categories
  const categories = ["All", "Physical", "Cognitive", "Social", "Emotional"];

  // Child info (from userData or default)
  const child = userData?.children?.[0] || {
    name: "Emma Johnson",
    age: "2 years 4 months",
    gender: "Female",
  };

  // Load milestones from Firestore
  useEffect(() => {
    if (currentUser) {
      loadMilestones();
    }
  }, [currentUser]);

  const loadMilestones = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);
      const q = query(
        collection(db, "milestones"),
        where("userId", "==", currentUser.uid),
        orderBy("createdAt", "desc")
      );

      const querySnapshot = await getDocs(q);
      const milestonesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setMilestones(milestonesData);
    } catch (error) {
      // If no milestones or permission error, start with empty array
      setMilestones([]);
    } finally {
      setLoading(false);
    }
  };

  // Toggle milestone completion
  const toggleMilestone = async (milestoneId) => {
    try {
      const milestone = milestones.find((m) => m.id === milestoneId);
      const newCompletedState = !milestone.completed;

      // Update Firestore
      const milestoneRef = doc(db, "milestones", milestoneId);
      await updateDoc(milestoneRef, {
        completed: newCompletedState,
        completedAt: newCompletedState ? serverTimestamp() : null,
        ageAtCompletion: newCompletedState ? child.age : null,
      });

      // Update local state
      setMilestones((prev) =>
        prev.map((m) =>
          m.id === milestoneId
            ? {
                ...m,
                completed: newCompletedState,
                completedAt: newCompletedState ? new Date().toISOString() : null,
                ageAtCompletion: newCompletedState ? child.age : null,
              }
            : m
        )
      );
    } catch (error) {
      alert("Failed to update milestone. Please try again.");
    }
  };

  // Add new milestone
  const handleAddMilestone = async (e) => {
    e.preventDefault();

    if (!newMilestone.title.trim()) {
      alert("Please enter a milestone title");
      return;
    }

    try {
      setSaving(true);

      const milestoneData = {
        userId: currentUser.uid,
        category: newMilestone.category,
        title: newMilestone.title.trim(),
        description: newMilestone.description.trim(),
        expectedAge: newMilestone.expectedAge.trim(),
        completed: false,
        completedAt: null,
        ageAtCompletion: null,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "milestones"), milestoneData);

      // Add to local state
      setMilestones((prev) => [
        {
          id: docRef.id,
          ...milestoneData,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);

      // Reset form and close modal
      setNewMilestone({
        category: "Physical",
        title: "",
        description: "",
        expectedAge: "",
      });
      setShowAddModal(false);
    } catch (error) {
      alert("Failed to add milestone. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Filter milestones by category
  const filteredMilestones =
    selectedCategory === "All"
      ? milestones
      : milestones.filter((m) => m.category === selectedCategory);

  const completedCount = milestones.filter((m) => m.completed).length;
  const completionPercentage =
    milestones.length > 0
      ? Math.round((completedCount / milestones.length) * 100)
      : 0;

  // Category icons
  const categoryIcons = {
    Physical: Activity,
    Cognitive: Brain,
    Social: Smile,
    Emotional: Heart,
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
        {/* Header */}
        <motion.div
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-16 px-6 lg:px-20"
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
              Track Development
            </motion.h1>
            <motion.p
              className="text-white/90 text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Monitor your child's growth milestones
            </motion.p>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 lg:px-20 -mt-12">
          {/* Child Summary Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            {...slideUp}
            {...cardHover}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src={getChildAvatar(child, 100)}
                alt={child.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {child.name}
                </h2>
                <p className="text-gray-600 text-lg mb-4">{child.age}</p>

                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Overall Progress
                    </span>
                    <span className="text-sm font-bold text-blue-600">
                      {completionPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${completionPercentage}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  {completedCount} of {milestones.length} milestones completed
                </p>
              </div>

              {/* Add Milestone Button */}
              <motion.button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5" />
                Add Milestone
              </motion.button>
            </div>
          </motion.div>

          {/* Category Filters */}
          <motion.div
            className="flex flex-wrap gap-3 mb-8"
            {...staggerContainer}
            initial="initial"
            animate="animate"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
                {...staggerItem}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Milestones List */}
          {loading ? (
            <div className="text-center py-12">
              <Loader className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600">Loading milestones...</p>
            </div>
          ) : (
            <motion.div
              className="space-y-4"
              {...staggerContainer}
              initial="initial"
              animate="animate"
            >
              {filteredMilestones.map((milestone) => {
                const Icon = categoryIcons[milestone.category] || Activity;

                return (
                  <motion.div
                    key={milestone.id}
                    className={`bg-white rounded-xl shadow-md p-6 ${
                      milestone.completed ? "border-l-4 border-green-500" : ""
                    }`}
                    {...staggerItem}
                    {...cardHover}
                  >
                    <div className="flex items-start gap-4">
                      {/* Checkbox */}
                      <button
                        onClick={() => toggleMilestone(milestone.id)}
                        className="flex-shrink-0 mt-1"
                      >
                        {milestone.completed ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-400" />
                        )}
                      </button>

                      {/* Category Icon */}
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                          milestone.completed ? "bg-green-100" : "bg-blue-100"
                        }`}
                      >
                        <Icon
                          className={`w-6 h-6 ${
                            milestone.completed
                              ? "text-green-600"
                              : "text-blue-600"
                          }`}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3
                            className={`text-lg font-bold ${
                              milestone.completed
                                ? "text-gray-500 line-through"
                                : "text-gray-900"
                            }`}
                          >
                            {milestone.title}
                          </h3>
                          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                            {milestone.category}
                          </span>
                        </div>

                        {milestone.description && (
                          <p className="text-gray-600 mb-3">
                            {milestone.description}
                          </p>
                        )}

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {milestone.completed
                              ? `Completed: ${new Date(
                                  milestone.completedAt
                                ).toLocaleDateString()}`
                              : `Expected: ${
                                  milestone.expectedAge || "Track progress"
                                }`}
                          </span>
                          {milestone.ageAtCompletion && (
                            <span className="flex items-center gap-1">
                              <Baby className="w-4 h-4" />
                              Age: {milestone.ageAtCompletion}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {filteredMilestones.length === 0 && (
                <motion.div
                  className="text-center py-12 bg-white rounded-xl shadow-md"
                  {...fadeIn}
                >
                  <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No Milestones Yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {selectedCategory === "All"
                      ? "Start tracking your child's development milestones"
                      : `No ${selectedCategory} milestones found`}
                  </p>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold inline-flex items-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Add Your First Milestone
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>

        {/* Add Milestone Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
            >
              <motion.div
                className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Add New Milestone
                  </h3>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleAddMilestone} className="space-y-5">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={newMilestone.category}
                      onChange={(e) =>
                        setNewMilestone({
                          ...newMilestone,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    >
                      {categories.slice(1).map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Milestone Title *
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
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Description (Optional)
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
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none"
                    />
                  </div>

                  {/* Expected Age */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Expected Age (Optional)
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
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50"
                      disabled={saving}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold disabled:opacity-50"
                    >
                      {saving ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader className="w-5 h-5 animate-spin" />
                          Saving...
                        </span>
                      ) : (
                        "Add Milestone"
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
}