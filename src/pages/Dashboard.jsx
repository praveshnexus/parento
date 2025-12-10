import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Users,
  Target,
  Award,
  Calendar,
  MessageCircle,
  ChevronRight,
  Sparkles,
  Edit2,
  Check,
  X,
} from "lucide-react";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalMilestones: 0,
    completedMilestones: 0,
    totalPosts: 0,
    recentActivity: [],
  });

  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("");

  // ✅ Child name (v1: single child)
  const [childName, setChildName] = useState("Your Child");
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState("");

  /* ---------- Greeting ---------- */
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  /* ---------- Fetch Child Name ---------- */
  useEffect(() => {
    if (!currentUser) return;

    const fetchChildName = async () => {
      try {
        const userRef = doc(db, "users", currentUser.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          const name = snap.data().childName || "Your Child";
          setChildName(name);
          setTempName(name);
        }
      } catch (err) {
        console.error("Failed to load child name", err);
      }
    };

    fetchChildName();
  }, [currentUser]);

  /* ---------- Save Edited Child Name ---------- */
  const saveChildName = async () => {
    if (!tempName.trim()) return;

    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        childName: tempName.trim(),
      });
      setChildName(tempName.trim());
      setEditingName(false);
    } catch (err) {
      console.error("Failed to update child name", err);
    }
  };

  /* ---------- Fetch Dashboard Stats ---------- */
  useEffect(() => {
    const fetchStats = async () => {
      if (!currentUser) return;

      try {
        // Milestones
        const milestonesQuery = query(
          collection(db, "milestones"),
          where("userId", "==", currentUser.uid)
        );
        const milestonesSnap = await getDocs(milestonesQuery);
        const milestones = milestonesSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const completed = milestones.filter((m) => m.isCompleted).length;

        // Posts
        const postsQuery = query(
          collection(db, "posts"),
          where("userId", "==", currentUser.uid)
        );
        const postsSnap = await getDocs(postsQuery);

        const recent = milestones
          .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds)
          .slice(0, 3);

        setStats({
          totalMilestones: milestones.length,
          completedMilestones: completed,
          totalPosts: postsSnap.size,
          recentActivity: recent,
        });
      } catch (err) {
        console.error("Error fetching stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [currentUser]);

  const completionRate =
    stats.totalMilestones > 0
      ? Math.round(
          (stats.completedMilestones / stats.totalMilestones) * 100
        )
      : 0;

  /* ---------- Stat Card Component ---------- */
  const StatCard = ({ icon: Icon, label, value, color, onClick }) => (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-6 cursor-pointer hover:scale-105 transition shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-800">{value}</p>
        </div>
        <div className={`${color} p-4 rounded-xl`}>
          <Icon className="text-white" size={26} />
        </div>
      </div>
    </div>
  );

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
        <div className="space-y-6 max-w-7xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-white rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pb-24">
      {/* ---------- HEADER ---------- */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-blue-100 text-sm">{greeting}</p>

          {/* Child Name + Edit */}
          {!editingName ? (
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold">{childName}</h1>
              <button
                onClick={() => setEditingName(true)}
                className="bg-white/20 p-2 rounded-full hover:bg-white/30"
              >
                <Edit2 size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="px-3 py-1 rounded-lg text-gray-800 outline-none"
                autoFocus
              />
              <button
                onClick={saveChildName}
                className="bg-green-500 p-2 rounded-full"
              >
                <Check size={14} />
              </button>
              <button
                onClick={() => {
                  setTempName(childName);
                  setEditingName(false);
                }}
                className="bg-red-500 p-2 rounded-full"
              >
                <X size={14} />
              </button>
            </div>
          )}

          <p className="text-blue-100 mt-2">
            Track milestones and celebrate progress 🌱
          </p>
        </div>
      </div>

      {/* ---------- CONTENT ---------- */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            icon={Target}
            label="Milestones"
            value={stats.totalMilestones}
            color="bg-blue-500"
            onClick={() => navigate("/track")}
          />
          <StatCard
            icon={Award}
            label="Completed"
            value={stats.completedMilestones}
            color="bg-green-500"
            onClick={() => navigate("/track")}
          />
          <StatCard
            icon={TrendingUp}
            label="Progress"
            value={`${completionRate}%`}
            color="bg-purple-500"
          />
          <StatCard
            icon={MessageCircle}
            label="Comunity"
            value={stats.totalPosts}
            color="bg-pink-500"
            onClick={() => navigate("/comunity")}
          />
        </div>

        {/* Recent Milestones */}
        {stats.recentActivity.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Recent Milestones</h3>
            <div className="space-y-3">
              {stats.recentActivity.map((m) => (
                <div
                  key={m.id}
                  onClick={() => navigate("/track")}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      m.isCompleted ? "bg-green-100" : "bg-blue-100"
                    }`}
                  >
                    {m.isCompleted ? (
                      <Award className="text-green-600" size={18} />
                    ) : (
                      <Calendar className="text-blue-600" size={18} />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{m.title}</p>
                    <p className="text-sm text-gray-500">
                      {m.category} • {m.expectedAge}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
