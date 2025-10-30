// src/pages/Profile.js
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Settings,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Edit,
  Camera,
  Baby,
  Award,
  MessageCircle,
  Stethoscope
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { fadeIn, slideUp, cardHover, staggerContainer, staggerItem } from "../utils/animations";
import { useAuth } from "../context/AuthContext";
import { getUserAvatar, getChildAvatar } from "../utils/avatarHelper";

export default function Profile() {
  const { currentUser, userData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // User stats
  const userStats = [
    { label: "Posts", value: userData?.stats?.postsCount || 0, icon: MessageCircle, color: "text-pink-500" },
    { label: "Milestones", value: userData?.stats?.milestonesCompleted || 0, icon: Award, color: "text-blue-500" },
    { label: "Consultations", value: userData?.stats?.consultationsBooked || 0, icon: Stethoscope, color: "text-green-500" }
  ];

  // Children list (mock data - will be from userData.children later)
  const children = userData?.children || [
    { id: 1, name: "Emma Johnson", age: "2 years 4 months", gender: "Female" }
  ];

  // Settings options
  const settingsOptions = [
    { label: "Account Settings", icon: Settings, link: "/settings/account" },
    { label: "Notifications", icon: Bell, link: "/settings/notifications" },
    { label: "Privacy & Security", icon: Shield, link: "/settings/privacy" },
    { label: "Help & Support", icon: HelpCircle, link: "/settings/help" }
  ];

  // Quick links
  const quickLinks = [
    { label: "Dashboard", link: "/dashboard" },
    { label: "Track Progress", link: "/track" },
    { label: "Consultations", link: "/consult" },
    { label: "Community", link: "/community" },
    { label: "Resources", link: "/learningresources" }
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
        {/* Header */}
        <motion.div
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-16 px-6 lg:px-20"
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
              My Profile
            </motion.h1>
            <motion.p
              className="text-white/90 text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Manage your account and preferences
            </motion.p>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 lg:px-20 -mt-12">
          {/* Profile Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
            {...slideUp}
            {...cardHover}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Avatar */}
              <div className="relative">
                <motion.img
                  src={getUserAvatar(userData, 120)}
                  alt={userData?.fullName || "User"}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.button
                  className="absolute bottom-0 right-0 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Camera className="w-5 h-5" />
                </motion.button>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {userData?.fullName || currentUser?.displayName || "User"}
                </h2>
                <p className="text-gray-600 flex items-center gap-2 justify-center md:justify-start mb-4">
                  <Mail className="w-4 h-4" />
                  {userData?.email || currentUser?.email}
                </p>
                {userData?.phone && (
                  <p className="text-gray-600 flex items-center gap-2 justify-center md:justify-start mb-4">
                    <Phone className="w-4 h-4" />
                    {userData.phone}
                  </p>
                )}
                <p className="text-gray-500 text-sm flex items-center gap-2 justify-center md:justify-start">
                  <Calendar className="w-4 h-4" />
                  Member since {new Date(currentUser?.metadata?.creationTime).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>

              {/* Edit Button */}
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Edit className="w-5 h-5" />
                Edit Profile
              </motion.button>
            </div>

            {/* User Stats */}
            <motion.div
              className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t"
              {...staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {userStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  {...staggerItem}
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Children & Quick Links */}
            <div className="lg:col-span-2 space-y-8">
              {/* My Children */}
              <motion.div
                className="bg-white rounded-xl shadow-md p-6"
                {...fadeIn}
                {...cardHover}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Baby className="w-6 h-6 text-pink-500" />
                    My Children
                  </h3>
                  <motion.button
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg font-semibold text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    + Add Child
                  </motion.button>
                </div>

                <motion.div
                  className="space-y-4"
                  {...staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {children.map((child, index) => (
                    <motion.div
                      key={child.id}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      {...staggerItem}
                      {...cardHover}
                    >
                      <img
                        src={getChildAvatar(child, 60)}
                        alt={child.name}
                        className="w-16 h-16 rounded-full border-2 border-pink-500"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{child.name}</h4>
                        <p className="text-sm text-gray-600">{child.age} • {child.gender}</p>
                      </div>
                      <Link to="/track">
                        <motion.button
                          className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-sm hover:bg-gray-50"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Progress
                        </motion.button>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Account Settings */}
              <motion.div
                className="bg-white rounded-xl shadow-md p-6"
                {...fadeIn}
                {...cardHover}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Settings & Preferences</h3>

                <motion.div
                  className="space-y-3"
                  {...staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {settingsOptions.map((option, index) => (
                    <motion.button
                      key={index}
                      className="w-full flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                      {...staggerItem}
                      whileHover={{ x: 5 }}
                    >
                      <option.icon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{option.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column - Quick Links & Logout */}
            <div className="space-y-8">
              {/* Quick Links */}
              <motion.div
                className="bg-white rounded-xl shadow-md p-6"
                {...fadeIn}
                {...cardHover}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>

                <div className="space-y-2">
                  {quickLinks.map((link, index) => (
                    <Link key={index} to={link.link}>
                      <motion.div
                        className="px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors font-medium"
                        whileHover={{ x: 5 }}
                      >
                        {link.label}
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Notifications Settings */}
              <motion.div
                className="bg-white rounded-xl shadow-md p-6"
                {...fadeIn}
                {...cardHover}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-pink-500" />
                  Notifications
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Email Updates</span>
                    <input
                      type="checkbox"
                      defaultChecked={userData?.settings?.emailUpdates}
                      className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Push Notifications</span>
                    <input
                      type="checkbox"
                      defaultChecked={userData?.settings?.notifications}
                      className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Milestone Reminders</span>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-5 h-5 text-pink-500 rounded focus:ring-pink-500"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Logout Button */}
              <motion.button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogOut className="w-5 h-5" />
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}