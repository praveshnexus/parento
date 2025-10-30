// ============================================
// PROFILE.JS - FULLY ANIMATED
// File: src/pages/Profile.js
// ============================================

import { User, Mail, Phone, MapPin, Calendar, Baby, Edit3, Settings, LogOut, Bell, Shield, HelpCircle, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { staggerContainer, staggerItem, slideUp, fadeIn, cardHover, hoverScale } from "../utils/animations";
import PageWrapper from "../components/PageWrapper";

function Profile() {
  const user = {
    name: "Neha Sharma",
    email: "neha.sharma@example.com",
    phone: "+91 98765 43210",
    location: "Mumbai, Maharashtra",
    memberSince: "January 2024",
    avatar: "https://ui-avatars.com/api/?name=Neha+Sharma&background=ec4899&color=fff&size=150",
  };

  const children = [
    {
      name: "Aarav Sharma",
      age: "2 years 3 months",
      dob: "January 5, 2022",
      gender: "Male",
      avatar: "https://ui-avatars.com/api/?name=Aarav+Sharma&background=3b82f6&color=fff&size=100"
    }
  ];

  const stats = [
    { label: "Posts", value: "15", color: "pink" },
    { label: "Milestones", value: "8", color: "blue" },
    { label: "Consultations", value: "3", color: "purple" },
    { label: "Days Active", value: "127", color: "green" }
  ];

  const settingsSections = [
    {
      title: "Account Settings",
      items: [
        { icon: User, label: "Edit Profile", description: "Update your personal information", link: "#" },
        { icon: Shield, label: "Privacy & Security", description: "Manage your privacy settings", link: "#" },
        { icon: Bell, label: "Notifications", description: "Configure notification preferences", link: "#" }
      ]
    },
    {
      title: "Support & Help",
      items: [
        { icon: HelpCircle, label: "Help Center", description: "Browse FAQs and guides", link: "#" },
        { icon: Mail, label: "Contact Support", description: "Get help from our team", link: "#" },
        { icon: Settings, label: "App Settings", description: "Customize your experience", link: "#" }
      ]
    }
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
        {/* Header */}
        <motion.div 
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-12 px-6 md:px-12 lg:px-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              My Profile 👤
            </motion.h1>
            <motion.p 
              className="text-lg text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Manage your account and preferences
            </motion.p>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 -mt-8">
          
          {/* Profile Overview Card */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100"
            {...slideUp}
            initial="initial"
            animate="animate"
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Avatar */}
              <div className="relative">
                <motion.img
                  src={user.avatar}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-pink-200 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.button 
                  className="absolute bottom-0 right-0 w-10 h-10 bg-pink-500 hover:bg-pink-600 text-white rounded-full flex items-center justify-center shadow-lg transition"
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Camera className="w-5 h-5" />
                </motion.button>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{user.name}</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Member since {user.memberSince}</span>
                  </div>
                </div>
                
                {/* Stats */}
                <motion.div 
                  className="grid grid-cols-4 gap-4 mt-6"
                  {...staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {stats.map((stat, idx) => (
                    <motion.div 
                      key={idx} 
                      className="text-center"
                      {...staggerItem}
                    >
                      <motion.p 
                        className={`text-2xl font-bold text-${stat.color}-600`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: idx * 0.1, type: "spring" }}
                      >
                        {stat.value}
                      </motion.p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Edit Button */}
              <motion.button 
                className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-semibold transition shadow-md flex items-center gap-2"
                {...hoverScale}
              >
                <Edit3 className="w-5 h-5" />
                Edit Profile
              </motion.button>
            </div>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Left Column */}
            <div className="xl:col-span-2 space-y-8">
              
              {/* Children Section */}
              <motion.div 
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                {...fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <Baby className="w-6 h-6 text-pink-500" />
                    Children
                  </h3>
                  <motion.button 
                    className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg font-medium transition text-sm"
                    {...hoverScale}
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
                  {children.map((child, idx) => (
                    <motion.div 
                      key={idx} 
                      className="flex items-center gap-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-100"
                      {...staggerItem}
                      {...cardHover}
                    >
                      <motion.img
                        src={child.avatar}
                        alt={child.name}
                        className="w-20 h-20 rounded-full border-4 border-white shadow-md"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      />
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-800 mb-1">{child.name}</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                          <div><span className="font-medium">Age:</span> {child.age}</div>
                          <div><span className="font-medium">DOB:</span> {child.dob}</div>
                          <div><span className="font-medium">Gender:</span> {child.gender}</div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <motion.button 
                          className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-lg font-medium transition text-sm"
                          {...hoverScale}
                        >
                          Edit
                        </motion.button>
                        <motion.div {...hoverScale}>
                          <Link
                            to="/track"
                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition text-sm text-center block"
                          >
                            Track
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Settings Sections */}
              {settingsSections.map((section, idx) => (
                <motion.div 
                  key={idx} 
                  className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">{section.title}</h3>
                  <motion.div 
                    className="space-y-4"
                    {...staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                  >
                    {section.items.map((item, itemIdx) => (
                      <motion.a
                        key={itemIdx}
                        href={item.link}
                        className="flex items-center gap-4 p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition group"
                        {...staggerItem}
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition">
                          <item.icon className="w-6 h-6 text-gray-600 group-hover:text-pink-500 transition" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800 group-hover:text-pink-600 transition">{item.label}</p>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <span className="text-gray-400 group-hover:text-pink-500 transition">→</span>
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              
              {/* Quick Links */}
              <motion.div 
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                {...slideUp}
                initial="initial"
                animate="animate"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Links</h3>
                <motion.div 
                  className="space-y-3"
                  {...staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {[
                    { to: "/dashboard", label: "Dashboard", color: "pink" },
                    { to: "/track", label: "Track Progress", color: "blue" },
                    { to: "/consult", label: "Consultations", color: "purple" },
                    { to: "/community", label: "Community", color: "green" }
                  ].map((link, idx) => (
                    <motion.div key={idx} {...staggerItem}>
                      <Link
                        to={link.to}
                        className={`block p-3 bg-${link.color}-50 hover:bg-${link.color}-100 rounded-lg text-${link.color}-700 font-medium transition`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Premium Card */}
              <motion.div 
                className="bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-2xl shadow-lg p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-bold text-lg mb-3">Premium Features</h4>
                <p className="text-sm text-white/90 mb-4">
                  Upgrade to unlock unlimited consultations, AI insights, and exclusive content.
                </p>
                <motion.button 
                  className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg font-medium transition"
                  {...hoverScale}
                >
                  Upgrade Now
                </motion.button>
              </motion.div>

              {/* Logout */}
              <motion.button 
                className="w-full flex items-center justify-center gap-2 py-3 bg-white hover:bg-red-50 text-red-600 border-2 border-red-200 rounded-xl font-semibold transition shadow-sm"
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

export default Profile;


// ============================================
// LEARNINGRESOURCES.JS - FULLY ANIMATED
// File: src/pages/LearningResources.js
// ============================================

