import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import {
  Target,
  Users,
  BookOpen,
  Stethoscope,
  Pencil,
  Check,
  X,
  Star,
} from "lucide-react";

export default function Dashboard() {
  const { currentUser, userData, updateUserData } = useAuth();
  const navigate = useNavigate();

  const [editingName, setEditingName] = useState(false);
  const [childName, setChildName] = useState("Your Child");
  const [tempName, setTempName] = useState("");

  const [milestones, setMilestones] = useState([]);
  const [posts, setPosts] = useState([]);

  /* ---------------- INIT CHILD NAME ---------------- */
  useEffect(() => {
    if (!userData) return;
    const firstChild = userData.children?.[0];
    const name = firstChild?.name || "Your Child";
    setChildName(name);
    setTempName(name);
  }, [userData]);

  /* ---------------- LOAD DATA ---------------- */
  useEffect(() => {
    if (!currentUser) return;

    const loadData = async () => {
      const mSnap = await getDocs(
        query(
          collection(db, "milestones"),
          where("userId", "==", currentUser.uid)
        )
      );
      setMilestones(mSnap.docs.map((d) => d.data()));

      const pSnap = await getDocs(collection(db, "posts"));
      setPosts(pSnap.docs.map((d) => d.data()).slice(0, 2));
    };

    loadData();
  }, [currentUser]);

  /* ---------------- SAVE CHILD NAME ---------------- */
  const saveChildName = async () => {
    const updatedChildren =
      userData.children?.length > 0
        ? [{ ...userData.children[0], name: tempName }]
        : [{ name: tempName }];

    await updateUserData(currentUser.uid, {
      children: updatedChildren,
    });

    setChildName(tempName);
    setEditingName(false);
  };

  /* ---------------- PROGRESS (DUMMY) ---------------- */
  const motorProgress = Math.min(75, milestones.length * 10);
  const communicationProgress = Math.min(60, milestones.length * 8);

  /* ---------------- DOCTORS (DASHBOARD PREVIEW) ---------------- */
  const doctors = [
    { name: "Dr. Meera Patel", specialty: "Pediatrician", rating: 4.9 },
    { name: "Dr. Rajesh Gupta", specialty: "Nutritionist", rating: 4.7 },
    { name: "Dr. Ananya Rao", specialty: "Child Psychologist", rating: 4.8 },
    { name: "Dr. Sandeep Verma", specialty: "Physiotherapist", rating: 4.6 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-24 space-y-6"
    >
      {/* GREETING */}
      <section>
        <h2 className="text-lg font-bold text-gray-800">Hello 👋</h2>

        {!editingName ? (
          <p className="text-sm text-gray-600 flex items-center gap-1">
            Let’s track
            <span className="font-semibold text-gray-800">{childName}</span>
            ’s progress today
            <button onClick={() => setEditingName(true)}>
              <Pencil size={14} className="text-gray-400 ml-1" />
            </button>
          </p>
        ) : (
          <div className="flex items-center gap-2 mt-1">
            <input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="px-2 py-1 border rounded-md text-sm"
            />
            <button onClick={saveChildName}>
              <Check size={16} className="text-green-600" />
            </button>
            <button
              onClick={() => {
                setTempName(childName);
                setEditingName(false);
              }}
            >
              <X size={16} className="text-red-500" />
            </button>
          </div>
        )}
      </section>

      {/* TOP SERVICES */}
      <section>
        <h3 className="text-sm font-semibold mb-3">Top Services</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Service
            color="bg-blue-500"
            icon={<Target />}
            label="Track"
            onClick={() => navigate("/track")}
          />
          <Service
            color="bg-green-500"
            icon={<Stethoscope />}
            label="Doctors"
            onClick={() => navigate("/consult")}
          />
          <Service
            color="bg-purple-500"
            icon={<Users />}
            label="Comunity"
            onClick={() => navigate("/comunity")}
          />
          <Service
            color="bg-yellow-500"
            icon={<BookOpen />}
            label="Resources"
            onClick={() => navigate("/learningresources")}
          />
        </div>
      </section>

      {/* TODAY ACTIVITY */}
      <section>
        <h3 className="text-sm font-semibold mb-3">Today’s Activity Plan</h3>
        <motion.div
          whileTap={{ scale: 0.98 }}
          whileHover={{ y: -2 }}
          className="bg-white rounded-2xl shadow-sm overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c"
            className="h-36 w-full object-cover"
            alt="activity"
          />
          <div className="p-3">
            <p className="font-medium text-sm">Motor Skill Development</p>
            <p className="text-xs text-gray-500 mt-1">
              Improve coordination through play
            </p>
          </div>
        </motion.div>
      </section>

      {/* DEVELOPMENT TRACKING */}
      <section>
        <h3 className="text-sm font-semibold mb-3">Development Tracking</h3>
        <div className="space-y-3 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
          <Progress label="Motor Skill" value={motorProgress} />
          <Progress label="Communication Skill" value={communicationProgress} />
        </div>
      </section>

      {/* EXPERT CONNECT — FINAL DESIGN MATCH */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold">Expert Connect</h3>
          <button
            onClick={() => navigate("/consult")}
            className="text-xs text-blue-600 font-medium"
          >
            View all
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-3">
          {doctors.map((doc, i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -2 }}
              className="
          min-w-[170px]
          bg-white
          rounded-2xl
          p-4
          shadow-sm
          flex
          flex-col
          items-center
          text-center
        "
            >
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-lg mb-3">
                {doc.name.split(" ")[1][0]}
              </div>

              {/* Name */}
              <p className="text-sm font-semibold text-gray-800 leading-tight">
                {doc.name}
              </p>

              {/* Specialty */}
              <p className="text-xs text-gray-500 mt-0.5">{doc.specialty}</p>

              {/* Rating */}
              <div className="flex items-center gap-1 text-xs text-yellow-500 mt-2">
                <Star size={12} fill="currentColor" />
                {doc.rating}
              </div>

              {/* BOOK NOW */}
              <button
                onClick={() => navigate("/consult")}
                className="
            mt-3
            text-xs
            font-medium
            text-blue-600
            border
            border-blue-200
            px-4
            py-1.5
            rounded-full
            hover:bg-blue-50
            transition
          "
              >
                Book now
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COMMUNITY */}
      <section>
        <h3 className="text-sm font-semibold mb-3">Community Highlights</h3>
        {posts.map((p, i) => (
          <div key={i} className="bg-white p-3 rounded-2xl shadow-sm mb-2">
            <p className="text-sm font-medium">{p.authorName || "Parent"}</p>
            <p className="text-xs text-gray-600 mt-1 line-clamp-2">
              {p.content || "Our journey with Parento has been amazing."}
            </p>
          </div>
        ))}
      </section>
    </motion.div>
  );
}

/* ---------------- COMPONENTS ---------------- */

const Service = ({ icon, label, color, onClick }) => (
  <motion.div
    whileTap={{ scale: 0.95 }}
    whileHover={{ y: -2 }}
    onClick={onClick}
    className={`${color} text-white p-4 rounded-2xl flex flex-col items-center gap-2 cursor-pointer`}
  >
    {icon}
    <p className="text-xs font-medium">{label}</p>
  </motion.div>
);

const Progress = ({ label, value }) => (
  <div>
    <div className="flex justify-between text-xs mb-1">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-2 bg-gray-200 rounded-full">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.6 }}
        className="h-2 bg-blue-500 rounded-full"
      />
    </div>
  </div>
);
