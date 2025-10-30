import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, TrendingUp, Stethoscope, MessageSquare, BookOpen, Bell, Heart, Activity, Users } from "lucide-react";
import { staggerContainer, staggerItem, cardHover, slideUp, fadeIn, hoverScale } from "../utils/animations";
import PageWrapper from "../components/PageWrapper";

function Dashboard() {
  const upcomingEvents = [
    { id: 1, title: "Dr. Meera Patel - Pediatric Checkup", time: "Today, 4:00 PM", type: "doctor", color: "blue" },
    { id: 2, title: "Varicella Vaccination Due", time: "Tomorrow, 11:00 AM", type: "health", color: "purple" },
    { id: 3, title: "Parent Community Meetup", time: "Saturday, 10:00 AM", type: "community", color: "green" },
    { id: 4, title: "Growth Measurement Reminder", time: "Next Monday", type: "reminder", color: "pink" }
  ];

  const childProgress = [
    { milestone: "Physical Development", progress: 85, color: "bg-pink-500", icon: Activity },
    { milestone: "Cognitive Skills", progress: 68, color: "bg-blue-500", icon: TrendingUp },
    { milestone: "Social & Emotional", progress: 75, color: "bg-green-500", icon: Heart }
  ];

  const quickStats = [
    { label: "Days Tracked", value: "127", icon: Calendar, color: "pink", gradient: "from-pink-500 to-rose-500" },
    { label: "Milestones Hit", value: "8/12", icon: TrendingUp, color: "blue", gradient: "from-blue-500 to-cyan-500" },
    { label: "Consultations", value: "3", icon: Stethoscope, color: "purple", gradient: "from-purple-500 to-indigo-500" },
    { label: "Community Posts", value: "15", icon: Users, color: "green", gradient: "from-green-500 to-emerald-500" }
  ];

  const recentActivity = [
    { action: "Updated milestone: First Steps", time: "2 days ago", icon: TrendingUp, color: "green" },
    { action: "Joined discussion: Toddler Sleep Tips", time: "4 days ago", icon: MessageSquare, color: "blue" },
    { action: "Read article: Nutrition Guide", time: "1 week ago", icon: BookOpen, color: "orange" }
  ];

  const quickActions = [
    {
      title: "Book Consultation",
      description: "Schedule with pediatricians",
      link: "/consult",
      icon: Stethoscope,
      gradient: "from-blue-500 to-blue-600",
      hoverGradient: "hover:from-blue-600 hover:to-blue-700"
    },
    {
      title: "Track Milestone",
      description: "Update development progress",
      link: "/track",
      icon: TrendingUp,
      gradient: "from-green-500 to-green-600",
      hoverGradient: "hover:from-green-600 hover:to-green-700"
    },
    {
      title: "Ask Community",
      description: "Connect with other parents",
      link: "/community",
      icon: MessageSquare,
      gradient: "from-purple-500 to-purple-600",
      hoverGradient: "hover:from-purple-600 hover:to-purple-700"
    },
    {
      title: "Learning Resources",
      description: "Expert articles and guides",
      link: "/learningresources",
      icon: BookOpen,
      gradient: "from-pink-500 to-pink-600",
      hoverGradient: "hover:from-pink-600 hover:to-pink-700"
    }
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
        {/* Hero Header */}
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
              Welcome back, Neha! 👋
            </motion.h1>
            <motion.p 
              className="text-lg text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Here's how Aarav is doing today
            </motion.p>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 -mt-8">
          
          {/* Child Profile Card - Wide */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100"
            {...slideUp}
            initial="initial"
            animate="animate"
            whileHover={{ y: -5, boxShadow: "0 25px 50px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <motion.img
                src="https://ui-avatars.com/api/?name=Aarav+Sharma&background=f472b6&color=fff&size=100"
                alt="Child"
                className="w-24 h-24 rounded-full border-4 border-pink-200 shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Aarav Sharma</h2>
                <p className="text-lg text-gray-600 mb-4">2 years 3 months old • Born: January 5, 2022</p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <motion.span 
                    className="px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    Height: 92cm
                  </motion.span>
                  <motion.span 
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    Weight: 13.5kg
                  </motion.span>
                  <motion.span 
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium"
                    whileHover={{ scale: 1.05 }}
                  >
                    8 Milestones ✓
                  </motion.span>
                </div>
              </div>
              <motion.div {...hoverScale}>
                <Link
                  to="/track"
                  className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-semibold transition shadow-lg"
                >
                  View Full Progress
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Stats - 4 Cards */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            {...staggerContainer}
            initial="initial"
            animate="animate"
          >
            {quickStats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                {...staggerItem}
                {...cardHover}
              >
                <motion.div 
                  className={`w-14 h-14 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center mb-4 shadow-md`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-7 h-7 text-white" />
                </motion.div>
                <motion.p 
                  className="text-3xl font-bold text-gray-800 mb-1"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            
            {/* Left Column - Takes 2 columns on XL */}
            <div className="xl:col-span-2 space-y-8">
              
              {/* Development Progress */}
              <motion.div 
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                {...fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-800">Development Overview</h3>
                  <Link to="/track" className="text-pink-500 hover:text-pink-600 font-medium text-sm">
                    View Details →
                  </Link>
                </div>
                
                <motion.div 
                  className="space-y-6"
                  {...staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {childProgress.map((item, index) => (
                    <motion.div key={index} {...staggerItem}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 ${item.color.replace('bg-', 'bg-').replace('-500', '-100')} rounded-lg flex items-center justify-center`}>
                          <item.icon className={`w-5 h-5 ${item.color.replace('bg-', 'text-')}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <span className="text-base font-semibold text-gray-800">{item.milestone}</span>
                            <span className="text-sm font-bold text-gray-600">{item.progress}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className={`${item.color} h-3 rounded-full shadow-sm`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.progress}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.2, duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Upcoming Events */}
              <motion.div 
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                {...fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <Bell className="w-6 h-6 text-gray-700" />
                    <h3 className="text-2xl font-bold text-gray-800">Upcoming Events</h3>
                  </div>
                  <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm font-medium">
                    {upcomingEvents.length} scheduled
                  </span>
                </div>
                
                <motion.div 
                  className="space-y-4"
                  {...staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {upcomingEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100"
                      {...staggerItem}
                      whileHover={{ x: 5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className={`w-12 h-12 bg-${event.color}-100 rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Calendar className={`w-6 h-6 text-${event.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{event.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{event.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div 
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
                {...fadeIn}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h3>
                <motion.div 
                  className="space-y-4"
                  {...staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  {recentActivity.map((activity, idx) => (
                    <motion.div 
                      key={idx} 
                      className="flex items-center gap-4 pb-4 border-b last:border-0"
                      {...staggerItem}
                    >
                      <div className={`w-10 h-10 bg-${activity.color}-100 rounded-full flex items-center justify-center`}>
                        <activity.icon className={`w-5 h-5 text-${activity.color}-600`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Right Sidebar - Quick Actions & Tips */}
            <div className="space-y-6">
              
              {/* Quick Actions */}
              <motion.div 
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
                {...slideUp}
                initial="initial"
                animate="animate"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
                <motion.div 
                  className="space-y-4"
                  {...staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {quickActions.map((action, idx) => (
                    <motion.div key={idx} {...staggerItem} {...hoverScale}>
                      <Link
                        to={action.link}
                        className={`block p-4 bg-gradient-to-r ${action.gradient} ${action.hoverGradient} text-white rounded-xl transition shadow-md hover:shadow-lg group`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <action.icon className="w-6 h-6" />
                          <span className="font-semibold text-lg">{action.title}</span>
                        </div>
                        <p className="text-sm text-white/90">{action.description}</p>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Health Tip */}
              <motion.div 
                className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white rounded-2xl shadow-lg p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-bold text-lg mb-3 flex items-center gap-2">
                  💡 Daily Parenting Tip
                </h4>
                <p className="text-sm text-white/90 leading-relaxed">
                  Encourage your toddler to drink water regularly throughout the day. 
                  Proper hydration supports healthy development, better sleep, and improved mood. 
                  Aim for 4-6 cups daily for ages 2-3.
                </p>
              </motion.div>

              {/* Support Card */}
              <motion.div 
                className="bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-2xl shadow-lg p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-bold text-lg mb-3">Need Help? 🤝</h4>
                <p className="text-sm text-white/90 mb-4">
                  Our community and experts are here to support you on your parenting journey.
                </p>
                <motion.div {...hoverScale}>
                  <Link
                    to="/community"
                    className="block w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-center rounded-lg font-medium transition"
                  >
                    Join Community
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Dashboard;