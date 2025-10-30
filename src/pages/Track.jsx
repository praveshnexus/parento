// src/pages/Track.js
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Baby,
  TrendingUp,
  Calendar,
  Award,
  Plus,
  ChevronRight,
  Activity,
  Heart,
  Brain,
  Smile,
  CheckCircle,
  Circle,
  Edit,
  Trash2
} from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { fadeIn, slideUp, cardHover, staggerContainer, staggerItem } from "../utils/animations";
import { useAuth } from "../context/AuthContext";
import { getChildAvatar } from "../utils/avatarHelper";
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy } from "firebase/firestore";

export default function Track() {
  const { currentUser, userData } = useAuth();
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  // Milestone categories
  const categories = ["All", "Physical", "Cognitive", "Social", "Emotional"];

  // Child info (from userData or default)
  const child = userData?.children?.[0] || {
    name: "Emma Johnson",
    age: "2 years 4 months",
    gender: "Female"
  };

  // Load milestones from Firestore
  useEffect(() => {
    loadMilestones();
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
      const milestonesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setMilestones(milestonesData);
    } catch (error) {
      console.error("Error loading milestones:", error);
      
      // If no milestones exist, show sample data
      if (error.code === 'permission-denied' || milestones.length === 0) {
        setMilestones(getSampleMilestones());
      }
    } finally {
      setLoading(false);
    }
  };

  // Sample milestones for demo
  const getSampleMilestones = () => [
    {
      id: "1",
      category: "Physical",
      title: "First Steps",
      description: "Took first steps independently",
      completed: true,
      date: "2024-10-15",
      ageAtCompletion: "12 months"
    },
    {
      id: "2",
      category: "Cognitive",
      title: "Says First Words",
      description: "Said 'mama' and 'dada' clearly",
      completed: true,
      date: "2024-09-20",
      ageAtCompletion: "11 months"
    },
    {
      id: "3",
      category: "Social",
      title: "Waves Bye-Bye",
      description: "Waves when saying goodbye",
      completed: true,
      date: "2024-08-10",
      ageAtCompletion: "10 months"
    },
    {
      id: "4",
      category: "Physical",
      title: "Runs Confidently",
      description: "Can run without falling frequently",
      completed: false,
      expectedAge: "24 months"
    },
    {
      id: "5",
      category: "Cognitive",
      title: "Names Colors",
      description: "Can identify and name basic colors",
      completed: false,
      expectedAge: "30 months"
    }
  ];

  // Toggle milestone completion
  const toggleMilestone = async (milestoneId) => {
    try {
      const milestone = milestones.find(m => m.id === milestoneId);
      
      if (!milestone.userId) {
        // Sample data - just update state
        setMilestones(prev =>
          prev.map(m =>
            m.id === milestoneId
              ? { ...m, completed: !m.completed, date: !m.completed ? new Date().toISOString() : null }
              : m
          )
        );
        return;
      }

      // Real data - update Firestore
      const milestoneRef = doc(db, "milestones", milestoneId);
      await updateDoc(milestoneRef, {
        completed: !milestone.completed,
        date: !milestone.completed ? new Date().toISOString() : null
      });

      // Update local state
      setMilestones(prev =>
        prev.map(m =>
          m.id === milestoneId
            ? { ...m, completed: !m.completed, date: !m.completed ? new Date().toISOString() : null }
            : m
        )
      );
    } catch (error) {
      console.error("Error toggling milestone:", error);
    }
  };

  // Add new milestone
  const addMilestone = async (newMilestone) => {
    try {
      const milestoneData = {
        ...newMilestone,
        userId: currentUser.uid,
        createdAt: new Date().toISOString(),
        completed: false
      };

      const docRef = await addDoc(collection(db, "milestones"), milestoneData);
      
      setMilestones(prev => [{
        id: docRef.id,
        ...milestoneData
      }, ...prev]);

      setShowAddModal(false);
    } catch (error) {
      console.error("Error adding milestone:", error);
    }
  };

  // Filter milestones by category
  const filteredMilestones = selectedCategory === "All"
    ? milestones
    : milestones.filter(m => m.category === selectedCategory);

  const completedCount = milestones.filter(m => m.completed).length;
  const completionPercentage = milestones.length > 0 
    ? Math.round((completedCount / milestones.length) * 100)
    : 0;

  // Category icons
  const categoryIcons = {
    Physical: Activity,
    Cognitive: Brain,
    Social: Smile,
    Emotional: Heart
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
              {/* Child Avatar */}
              <img
                src={getChildAvatar(child, 100)}
                alt={child.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />

              {/* Child Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{child.name}</h2>
                <p className="text-gray-600 text-lg mb-4">{child.age}</p>
                
                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                    <span className="text-sm font-bold text-blue-600">{completionPercentage}%</span>
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
            {categories.map((category, index) => (
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading milestones...</p>
            </div>
          ) : (
            <motion.div
              className="space-y-4"
              {...staggerContainer}
              initial="initial"
              animate="animate"
            >
              {filteredMilestones.map((milestone, index) => {
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
                      <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                        milestone.completed ? "bg-green-100" : "bg-blue-100"
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          milestone.completed ? "text-green-600" : "text-blue-600"
                        }`} />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className={`text-lg font-bold ${
                            milestone.completed ? "text-gray-500 line-through" : "text-gray-900"
                          }`}>
                            {milestone.title}
                          </h3>
                          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-semibold">
                            {milestone.category}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-3">{milestone.description}</p>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {milestone.completed
                              ? `Completed: ${new Date(milestone.date).toLocaleDateString()}`
                              : `Expected: ${milestone.expectedAge || "Track progress"}`
                            }
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
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Milestones Yet</h3>
                  <p className="text-gray-600 mb-4">
                    {selectedCategory === "All"
                      ? "Start tracking your child's development milestones"
                      : `No ${selectedCategory} milestones found`
                    }
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
      </div>
    </PageWrapper>
  );
}