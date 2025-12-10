import { motion } from "framer-motion";
import { Target, Sparkles, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-24">
      {/* ✅ reduced top padding */}
      <div className="max-w-5xl mx-auto px-4 pt-2">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            About Parento
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A modern parenting platform built to track milestones, connect parents,
            and provide expert guidance — all in one place.
          </p>
        </motion.div>

        {/* Mission Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8 hover:shadow-md transition"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Parento is designed to simplify parenting by giving families reliable
            tools to track child development, learn from trusted resources, and
            connect with a supportive community — securely and beautifully.
          </p>
        </motion.div>

        {/* Built By */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

          {/* Developer */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Target className="w-7 h-7 text-white" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800">
              Pravesh Yadav
            </h3>
            <p className="text-blue-600 font-semibold mb-3">
              Full-Stack Developer
            </p>

            <p className="text-gray-600 leading-relaxed">
              Built Parento end-to-end with a focus on clean architecture,
              performance, scalability, authentication, and real-world usability
              across web and mobile devices.
            </p>
          </motion.div>

          {/* Designer */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition text-center"
          >
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800">
              Pratistha Joshi
            </h3>
            <p className="text-pink-600 font-semibold mb-3">
              UI / UX Designer
            </p>

            <p className="text-gray-600 leading-relaxed">
              Designed Parento’s user experience and interface system with a
              strong emphasis on clarity, accessibility, emotional design,
              and smooth user journeys for parents.
            </p>
          </motion.div>
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 text-center shadow-md"
        >
          <div className="flex justify-center mb-3">
            <Heart className="w-8 h-8 text-pink-200" />
          </div>
          <h3 className="text-2xl font-bold mb-2">
            Built with Care for Real Parents
          </h3>
          <p className="text-white/90 max-w-xl mx-auto">
            Parento is not just an app — it’s a thoughtfully crafted platform
            made to support real parenting journeys, every day.
          </p>
        </motion.div>

      </div>
    </div>
  );
}
