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

/* ---------------- CONSTANTS ---------------- */

const categories = [
  {
    id: "all",
    name: "All",
    icon: TrendingUp,
    bg: "bg-blue-100",
    text: "text-blue-700",
  },
  {
    id: "physical",
    name: "Physical",
    icon: Baby,
    bg: "bg-green-100",
    text: "text-green-700",
  },
  {
    id: "cognitive",
    name: "Cognitive",
    icon: Brain,
    bg: "bg-purple-100",
    text: "text-purple-700",
  },
  {
    id: "social",
    name: "Social",
    icon: Users,
    bg: "bg-pink-100",
    text: "text-pink-700",
  },
  {
    id: "language",
    name: "Language",
    icon: MessageCircle,
    bg: "bg-red-100",
    text: "text-red-700",
  },
];

/* ---------------- COMPONENT ---------------- */

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

  /* ---------------- LOAD DATA ---------------- */

  useEffect(() => {
    if (!currentUser) return;
    loadMilestones();
  }, [currentUser]);

  useEffect(() => {
    let data = milestones;

    if (selectedCategory !== "all") {
      data = data.filter((m) => m.category === selectedCategory);
    }

    if (searchQuery) {
      data = data.filter(
        (m) =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMilestones(data);
  }, [milestones, selectedCategory, searchQuery]);

  const loadMilestones = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, "milestones"),
        where("userId", "==", currentUser.uid)
      );
      const snap = await getDocs(q);

      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
        createdAt: d.data().createdAt?.toDate?.() || new Date(),
      }));

      data.sort((a, b) => b.createdAt - a.createdAt);
      setMilestones(data);
    } catch {
      toast.error("Failed to load milestones");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- ACTIONS ---------------- */

  const toggleMilestone = async (id, status) => {
    try {
      await updateDoc(doc(db, "milestones", id), {
        isCompleted: !status,
      });

      setMilestones((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, isCompleted: !status } : m
        )
      );

      toast.success(
        !status ? "Milestone completed 🎉" : "Marked as incomplete"
      );
    } catch {
      toast.error("Update failed");
    }
  };

  const deleteMilestone = async (id) => {
    if (!confirm("Delete this milestone?")) return;

    try {
      await deleteDoc(doc(db, "milestones", id));
      setMilestones((prev) => prev.filter((m) => m.id !== id));
      toast.success("Milestone deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleAddMilestone = async (e) => {
    e.preventDefault();

    if (!newMilestone.title || !newMilestone.expectedAge) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      await addDoc(collection(db, "milestones"), {
        userId: currentUser.uid,
        ...newMilestone,
        isCompleted: false,
        createdAt: Timestamp.now(),
      });

      setShowAddModal(false);
      setNewMilestone({
        category: "physical",
        title: "",
        description: "",
        expectedAge: "",
      });

      loadMilestones();
      toast.success("Milestone added");
    } catch {
      toast.error("Failed to add milestone");
    }
  };

  /* ---------------- STATS ---------------- */

  const completed = milestones.filter((m) => m.isCompleted).length;
  const pending = milestones.length - completed;
  const rate =
    milestones.length > 0
      ? Math.round((completed / milestones.length) * 100)
      : 0;

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">
      <Toaster position="top-center" />

      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold text-gray-800">
          Track Milestones
        </h1>
        <p className="text-sm text-gray-600">
          Monitor your child’s development journey
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Total" value={milestones.length} color="text-blue-600" />
        <Stat label="Completed" value={completed} color="text-green-600" />
        <Stat label="Pending" value={pending} color="text-orange-600" />
        <Stat label="Completion" value={`${rate}%`} color="text-purple-600" />
      </div>

      {/* SEARCH & ADD */}
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search milestones..."
              className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg outline-none"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-lg font-semibold flex items-center gap-2"
          >
            <Plus size={16} />
            Add
          </button>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? `${cat.bg} ${cat.text}`
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <Icon size={14} />
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* LIST */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">
          Loading milestones...
        </div>
      ) : filteredMilestones.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
          <Baby className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="font-semibold text-gray-800">
            No milestones found
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filteredMilestones.map((m) => {
              const cat =
                categories.find((c) => c.id === m.category) ||
                categories[0];
              const Icon = cat.icon;

              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`bg-white rounded-2xl p-4 shadow-sm ${
                    m.isCompleted ? "bg-green-50" : ""
                  }`}
                >
                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleMilestone(m.id, m.isCompleted)}
                    >
                      {m.isCompleted ? (
                        <CheckCircle2 className="text-green-600" />
                      ) : (
                        <Circle className="text-gray-400" />
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex justify-between gap-2">
                        <h3
                          className={`font-semibold ${
                            m.isCompleted
                              ? "line-through text-gray-500"
                              : "text-gray-800"
                          }`}
                        >
                          {m.title}
                        </h3>

                        <span
                          className={`px-2 py-1 rounded-md text-xs ${cat.bg} ${cat.text}`}
                        >
                          <Icon size={12} className="inline mr-1" />
                          {cat.name}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mt-1">
                        {m.description}
                      </p>

                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs text-gray-500">
                          Expected: {m.expectedAge}
                        </span>

                        <button
                          onClick={() => deleteMilestone(m.id)}
                          className="text-red-500 hover:bg-red-50 p-1 rounded"
                        >
                          <Trash2 size={14} />
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

      {/* ADD MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40"
              onClick={() => setShowAddModal(false)}
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <h2 className="font-bold text-lg mb-4">Add Milestone</h2>

                <form onSubmit={handleAddMilestone} className="space-y-3">
                  <select
                    value={newMilestone.category}
                    onChange={(e) =>
                      setNewMilestone({
                        ...newMilestone,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    {categories
                      .filter((c) => c.id !== "all")
                      .map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                  </select>

                  <input
                    placeholder="Title"
                    value={newMilestone.title}
                    onChange={(e) =>
                      setNewMilestone({
                        ...newMilestone,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />

                  <textarea
                    placeholder="Description"
                    rows={3}
                    value={newMilestone.description}
                    onChange={(e) =>
                      setNewMilestone({
                        ...newMilestone,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg resize-none"
                  />

                  <input
                    placeholder="Expected Age"
                    value={newMilestone.expectedAge}
                    onChange={(e) =>
                      setNewMilestone({
                        ...newMilestone,
                        expectedAge: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  />

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 border rounded-lg py-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg py-2"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

const Stat = ({ label, value, color }) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm">
    <div className={`text-xl font-bold ${color}`}>{value}</div>
    <div className="text-xs text-gray-600">{label}</div>
  </div>
);
