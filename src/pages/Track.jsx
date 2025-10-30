import { motion } from "framer-motion";
import { Baby, Heart, Activity, Scale, Ruler, Syringe, CheckCircle, Clock, TrendingUp, Calendar } from "lucide-react";
import { staggerContainer, staggerItem, slideUp, fadeIn, cardHover, hoverScale } from "../utils/animations";
import PageWrapper from "../components/PageWrapper";

function Track() {
  const milestones = [
    {
      category: "Physical",
      icon: Activity,
      color: "pink",
      items: [
        { name: "First Steps", status: "completed", date: "Jan 15, 2024", description: "Walking independently for 10+ steps" },
        { name: "Running", status: "in-progress", progress: 75, description: "Short bursts of running, improving balance" },
        { name: "Jumping", status: "upcoming", description: "Expected in next 2 months" }
      ]
    },
    {
      category: "Cognitive",
      icon: Baby,
      color: "blue",
      items: [
        { name: "Speaking Words", status: "completed", date: "Dec 20, 2023", description: "Vocabulary of 50+ words" },
        { name: "Forming Sentences", status: "in-progress", progress: 60, description: "2-3 word phrases consistently" },
        { name: "Counting", status: "upcoming", description: "Learning numbers 1-10" }
      ]
    },
    {
      category: "Social & Emotional",
      icon: Heart,
      color: "green",
      items: [
        { name: "Recognizing Faces", status: "completed", date: "Nov 10, 2023", description: "Identifies family members and close friends" },
        { name: "Playing with Others", status: "in-progress", progress: 80, description: "Engaging in parallel play" },
        { name: "Sharing Toys", status: "in-progress", progress: 50, description: "Learning to take turns" }
      ]
    }
  ];

  const healthRecords = [
    { type: "Height", value: "92 cm", percentile: "75th", date: "Mar 1, 2024", icon: Ruler, color: "blue", change: "+3cm" },
    { type: "Weight", value: "13.5 kg", percentile: "70th", date: "Mar 1, 2024", icon: Scale, color: "green", change: "+0.5kg" },
    { type: "Head Circumference", value: "49 cm", percentile: "80th", date: "Mar 1, 2024", icon: Activity, color: "purple", change: "+1cm" }
  ];

  const vaccinations = [
    { name: "MMR Dose 2", date: "Feb 15, 2024", status: "completed" },
    { name: "Varicella", date: "Apr 10, 2024", status: "upcoming" },
    { name: "DTaP Booster", date: "May 5, 2024", status: "upcoming" }
  ];

  const colorClasses = {
    pink: "bg-pink-100 text-pink-600 border-pink-200",
    blue: "bg-blue-100 text-blue-600 border-blue-200",
    green: "bg-green-100 text-green-600 border-green-200",
    purple: "bg-purple-100 text-purple-600 border-purple-200"
  };

  const progressColors = {
    pink: "bg-pink-500",
    blue: "bg-blue-500",
    green: "bg-green-500"
  };

  const iconBgColors = {
    pink: "bg-pink-50",
    blue: "bg-blue-50",
    green: "bg-green-50",
    purple: "bg-purple-50"
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
        {/* Header Section */}
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
              Track Progress 📊
            </motion.h1>
            <motion.p 
              className="text-lg text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Monitor Aarav's growth, development, and health milestones
            </motion.p>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 -mt-8">
          {/* Child Profile Overview */}
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
            {...slideUp}
            initial="initial"
            animate="animate"
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <motion.img
                src="https://ui-avatars.com/api/?name=Aarav+Sharma&background=f472b6&color=fff&size=120"
                alt="Child"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-pink-200"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Aarav Sharma</h2>
                <p className="text-lg text-gray-600 mb-4">2 years 3 months old • Born: January 5, 2022</p>
                
                {/* Health Metrics */}
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
                  {...staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {healthRecords.map((record, idx) => (
                    <motion.div 
                      key={idx} 
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border"
                      {...staggerItem}
                      {...cardHover}
                    >
                      <div className={`w-14 h-14 ${iconBgColors[record.color]} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <record.icon className={`w-7 h-7 text-${record.color}-500`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">{record.type}</p>
                        <p className="text-2xl font-bold text-gray-800">{record.value}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-green-600 font-medium">{record.change} this month</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              <div className="flex flex-col gap-3">
                <motion.button 
                  className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-medium transition shadow-sm"
                  {...hoverScale}
                >
                  Add New Record
                </motion.button>
                <motion.button 
                  className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 rounded-xl font-medium transition"
                  {...hoverScale}
                >
                  View Growth Chart
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            
            {/* Left: Milestones */}
            <div className="xl:col-span-3 space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800">Development Milestones</h3>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> 8 Completed
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium flex items-center gap-1">
                    <Clock className="w-4 h-4" /> 4 In Progress
                  </span>
                </div>
              </div>
              
              <motion.div
                {...staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {milestones.map((category, idx) => (
                  <motion.div 
                    key={idx} 
                    className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
                    {...staggerItem}
                  >
                    {/* Category Header */}
                    <motion.div 
                      className={`${colorClasses[category.color]} border-b-2 p-6 flex items-center gap-4`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <category.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold">{category.category} Development</h4>
                        <p className="text-sm opacity-80 mt-1">
                          {category.items.filter(i => i.status === 'completed').length} of {category.items.length} milestones achieved
                        </p>
                      </div>
                    </motion.div>

                    {/* Milestone Items */}
                    <div className="p-6 space-y-6">
                      {category.items.map((item, itemIdx) => (
                        <motion.div 
                          key={itemIdx} 
                          className="flex gap-6"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: itemIdx * 0.1 }}
                        >
                          {/* Status Indicator */}
                          <div className="flex flex-col items-center">
                            <motion.div 
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                item.status === 'completed' ? 'bg-green-100' : 
                                item.status === 'in-progress' ? 'bg-orange-100' : 'bg-gray-100'
                              }`}
                              whileHover={{ scale: 1.2, rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              {item.status === 'completed' && <CheckCircle className="w-6 h-6 text-green-600" />}
                              {item.status === 'in-progress' && <Clock className="w-6 h-6 text-orange-600" />}
                              {item.status === 'upcoming' && <Calendar className="w-6 h-6 text-gray-400" />}
                            </motion.div>
                            {itemIdx < category.items.length - 1 && (
                              <div className="w-0.5 h-16 bg-gray-200 mt-2"></div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="flex-1 pb-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h5 className="text-lg font-semibold text-gray-800">{item.name}</h5>
                                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                              </div>
                              {item.status === 'completed' && (
                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium whitespace-nowrap">
                                  {item.date}
                                </span>
                              )}
                            </div>
                            
                            {item.status === 'in-progress' && (
                              <motion.div 
                                className="mt-3 bg-gray-50 rounded-lg p-4"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                              >
                                <div className="flex justify-between text-sm mb-2">
                                  <span className="text-gray-600 font-medium">Progress</span>
                                  <span className="text-gray-800 font-bold">{item.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                  <motion.div
                                    className={`${progressColors[category.color]} h-3 rounded-full`}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${item.progress}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                  />
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              
              {/* Vaccinations Card */}
              <motion.div 
                className="bg-white rounded-2xl shadow-lg p-6"
                {...slideUp}
                initial="initial"
                animate="animate"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Syringe className="w-6 h-6 text-purple-500" />
                  <h4 className="text-lg font-bold text-gray-800">Vaccinations</h4>
                </div>
                <motion.div 
                  className="space-y-3"
                  {...staggerContainer}
                  initial="initial"
                  animate="animate"
                >
                  {vaccinations.map((vacc, idx) => (
                    <motion.div 
                      key={idx} 
                      className={`p-4 rounded-xl border-2 ${
                        vacc.status === 'completed' ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'
                      }`}
                      {...staggerItem}
                      whileHover={{ scale: 1.05, x: 5 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold text-gray-800 text-sm">{vacc.name}</p>
                        {vacc.status === 'completed' && (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600">{vacc.date}</p>
                      <span className={`text-xs font-medium ${
                        vacc.status === 'completed' ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {vacc.status === 'completed' ? 'Completed' : 'Scheduled'}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.button 
                  className="w-full mt-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition"
                  {...hoverScale}
                >
                  Schedule Vaccination
                </motion.button>
              </motion.div>

              {/* Growth Trend Card */}
              <motion.div 
                className="bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-2xl shadow-lg p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="w-6 h-6" />
                  <h4 className="text-lg font-bold">Growth Trend</h4>
                </div>
                <p className="text-sm text-pink-100 mb-4">
                  Aarav is growing well! Height and weight are tracking in the 70-75th percentile consistently.
                </p>
                <motion.button 
                  className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-lg font-medium transition"
                  {...hoverScale}
                >
                  View Full Report
                </motion.button>
              </motion.div>

              {/* Tip Card */}
              <motion.div 
                className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-2xl shadow-lg p-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <h4 className="font-bold mb-2 text-lg">💡 Parenting Tip</h4>
                <p className="text-sm text-blue-50 leading-relaxed">
                  Take photos and videos at each milestone! These memories become precious as your child grows. 
                  Use our photo journal feature to document special moments.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Track;