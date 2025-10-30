// src/pages/Dashboard.js
import { motion } from "framer-motion";
import {
  Activity,
  TrendingUp,
  Calendar,
  Users,
  Heart,
  Stethoscope,
  MessageCircle,
  BookOpen,
  Bell,
  Award,
  Clock,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { staggerContainer, staggerItem, slideUp, fadeIn, cardHover, hoverScale } from "../utils/animations";
import { useAuth } from "../context/AuthContext";
import { getUserAvatar, getChildAvatar } from "../utils/avatarHelper";

export default function Dashboard() {
  const { currentUser, userData } = useAuth();

  // Quick stats data
  const quickStats = [
    { label: "Days Tracked", value: userData?.stats?.daysTracked || 0, icon: Calendar, color: "text-pink-500", bgColor: "bg-pink-50" },
    { label: "Milestones", value: `${userData?.stats?.milestonesCompleted || 0}/12`, icon: Award, color: "text-blue-500", bgColor: "bg-blue-50" },
    { label: "Consultations", value: userData?.stats?.consultationsBooked || 0, icon: Stethoscope, color: "text-green-500", bgColor: "bg-green-50" },
    { label: "Community Posts", value: userData?.stats?.postsCount || 0, icon: MessageCircle, color: "text-purple-500", bgColor: "bg-purple-50" }
  ];

  // Progress data
  const progressData = [
    { skill: "Walking", progress: 85, color: "bg-pink-500" },
    { skill: "Speaking", progress: 60, color: "bg-blue-500" },
    { skill: "Social Skills", progress: 75, color: "bg-green-500" }
  ];

  // Upcoming events
  const upcomingEvents = [
    { title: "Pediatrician Checkup", date: "Mar 15, 2025", time: "10:00 AM", type: "appointment" },
    { title: "Vaccination Due", date: "Mar 20, 2025", time: "2:00 PM", type: "health" },
    { title: "Milestone Review", date: "Mar 25, 2025", time: "11:00 AM", type: "milestone" }
  ];

  // Quick actions
  const quickActions = [
    { label: "Book Consultation", icon: Stethoscope, link: "/consult", color: "from-pink-500 to-pink-600" },
    { label: "Update Milestone", icon: Award, link: "/track", color: "from-blue-500 to-blue-600" },
    { label: "Ask Community", icon: MessageCircle, link: "/community", color: "from-green-500 to-green-600" },
    { label: "Learning Resources", icon: BookOpen, link: "/learningresources", color: "from-purple-500 to-purple-600" }
  ];

  // Recent activity
  const recentActivity = [
    { action: "Completed milestone: First Words", time: "2 hours ago", icon: Award },
    { action: "Booked appointment with Dr. Sarah", time: "1 day ago", icon: Calendar },
    { action: "Posted in Parent Community", time: "2 days ago", icon: MessageCircle }
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
        {/* Header */}
        <motion.div
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white py-12 px-6 lg:px-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl lg:text-5xl font-bold mb-2">
                Welcome back, {userData?.fullName?.split(' ')[0] || currentUser?.displayName?.split(' ')[0] || 'Parent'}! 👋
              </h1>
              <p className="text-white/90 text-lg">Here's your parenting journey at a glance</p>
            </motion.div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 lg:px-20 -mt-8">
          {/* Child Profile Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
            {...slideUp}
            {...cardHover}
          >
            <div className="flex items-center gap-6">
              <motion.img
                src={getChildAvatar({ name: "Emma Johnson" }, 80)}
                alt="Child"
                className="w-20 h-20 rounded-full border-4 border-white shadow-md"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">Emma Johnson</h2>
                <p className="text-gray-600">2 years 4 months old</p>
              </div>
              <Link to="/track">
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold"
                  {...hoverScale}
                >
                  View Progress
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            {...staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {quickStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-md p-6"
                {...staggerItem}
                {...cardHover}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </motion.div>
                  </div>
                </div>
                <motion.div
                  className="text-3xl font-bold text-gray-900 mb-1"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Development Progress & Events */}
            <div className="lg:col-span-2 space-y-8">
              {/* Development Progress */}
              <motion.div
                className="bg-white rounded-xl shadow-md p-6"
                {...fadeIn}
                {...cardHover}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Development Progress</h3>
                  <Link to="/track" className="text-pink-500 hover:text-pink-600 font-medium flex items-center gap-1">
                    View All <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="space-y-6">
                  {progressData.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-700">{item.skill}</span>
                        <span className="text-gray-600">{item.progress}%</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full ${item.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Upcoming Events */}
              <motion.div
                className="bg-white rounded-xl shadow-md p-6"
                {...fadeIn}
                {...cardHover}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-pink-500" />
                    Upcoming Events
                  </h3>
                </div>

                <motion.div
                  className="space-y-4"
                  {...staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {upcomingEvents.map((event, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      {...staggerItem}
                      whileHover={{ x: 10 }}
                    >
                      <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-pink-500" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{event.title}</h4>
                        <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                          <Clock className="w-4 h-4" />
                          {event.date} at {event.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column - Quick Actions & Activity */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <motion.div
                className="bg-white rounded-xl shadow-md p-6"
                {...fadeIn}
                {...cardHover}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>

                <motion.div
                  className="space-y-3"
                  {...staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {quickActions.map((action, index) => (
                    <Link key={index} to={action.link}>
                      <motion.button
                        className={`w-full flex items-center gap-3 p-4 bg-gradient-to-r ${action.color} text-white rounded-lg font-semibold`}
                        {...staggerItem}
                        {...hoverScale}
                      >
                        <action.icon className="w-5 h-5" />
                        {action.label}
                      </motion.button>
                    </Link>
                  ))}
                </motion.div>
              </motion.div>

              {/* Daily Tip */}
              <motion.div
                className="bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl shadow-md p-6 text-white"
                {...fadeIn}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="w-6 h-6" />
                  <h3 className="text-lg font-bold">Daily Tip</h3>
                </div>
                <p className="text-white/90">
                  Establish a consistent bedtime routine to help your child develop healthy sleep habits. This can include reading, bathing, and quiet time.
                </p>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                className="bg-white rounded-xl shadow-md p-6"
                {...fadeIn}
                {...cardHover}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-pink-500" />
                  Recent Activity
                </h3>

                <motion.div
                  className="space-y-4"
                  {...staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {recentActivity.map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      {...staggerItem}
                    >
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-pink-500" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-900">{item.action}</p>
                        <p className="text-xs text-gray-500">{item.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}