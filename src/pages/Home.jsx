import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Users, Heart, TrendingUp, Star, ArrowRight, PlayCircle } from "lucide-react";
import { 
  heroAnimation, 
  staggerContainer, 
  staggerItem, 
  fadeIn, 
  slideUp,
  cardHover,
  hoverScale,
  floatAnimation,
  imageReveal
} from "../utils/animations";
import PageWrapper from "../components/PageWrapper";

function Home() {
  const features = [
    {
      icon: TrendingUp,
      title: "Track Development",
      description: "Monitor your child's milestones, growth, and health records in one secure place.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Users,
      title: "Expert Consultations",
      description: "Book appointments with certified pediatricians and specialists anytime, anywhere.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Heart,
      title: "Parent Community",
      description: "Connect with thousands of parents, share experiences, and get support 24/7.",
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai",
      avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=ec4899&color=fff&size=80",
      rating: 5,
      text: "Parento has been a lifesaver! The milestone tracking and doctor consultations have given me so much peace of mind."
    },
    {
      name: "Amit Verma",
      location: "Delhi",
      avatar: "https://ui-avatars.com/api/?name=Amit+Verma&background=3b82f6&color=fff&size=80",
      rating: 5,
      text: "The community feature is amazing. I've learned so much from other parents and the expert advice is invaluable."
    },
    {
      name: "Sneha Patel",
      location: "Bangalore",
      avatar: "https://ui-avatars.com/api/?name=Sneha+Patel&background=10b981&color=fff&size=80",
      rating: 5,
      text: "Best parenting app ever! The learning resources section has helped me become a more confident parent."
    }
  ];

  const stats = [
    { value: "10,000+", label: "Happy Parents" },
    { value: "50+", label: "Expert Doctors" },
    { value: "15,000+", label: "Milestones Tracked" },
    { value: "4.8★", label: "App Rating" }
  ];

  const steps = [
    { step: "1", title: "Create Your Profile", desc: "Sign up in 2 minutes and add your child's information" },
    { step: "2", title: "Track & Monitor", desc: "Log milestones, schedule appointments, and track growth" },
    { step: "3", title: "Connect & Learn", desc: "Join the community and access expert resources" }
  ];

  return (
    <PageWrapper>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 pt-20 pb-16 px-6 md:px-12 lg:px-20 overflow-hidden">
          {/* Animated background circles */}
          <motion.div 
            className="absolute top-20 right-20 w-96 h-96 bg-pink-200 rounded-full filter blur-3xl opacity-30"
            {...floatAnimation}
          />
          <motion.div 
            className="absolute bottom-20 left-20 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-30"
            animate={{
              y: [10, -10, 10],
              transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          />

          <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div 
                className="text-center lg:text-left"
                {...heroAnimation}
              >
                <motion.div 
                  className="inline-block px-4 py-2 bg-pink-100 text-pink-600 rounded-full text-sm font-semibold mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  🎉 India's #1 Parenting Platform
                </motion.div>
                
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Empowering Every Parent's
                  <motion.span 
                    className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    Journey
                  </motion.span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-gray-600 mb-8 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  Track milestones, consult experts, and connect with a supportive community. 
                  Everything you need for your child's healthy development in one place.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <motion.div {...hoverScale}>
                    <Link
                      to="/signup"
                      className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2"
                    >
                      Get Started Free
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </motion.div>
                  
                  <motion.div {...hoverScale}>
                    <Link
                      to="/login"
                      className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-300 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition"
                    >
                      Sign In
                    </Link>
                  </motion.div>
                </motion.div>
                
                <motion.p 
                  className="text-sm text-gray-500 mt-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                >
                  ✓ Free forever · ✓ No credit card required · ✓ 2-minute setup
                </motion.p>
              </motion.div>

              {/* Right Image */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <motion.div className="relative z-10" {...imageReveal}>
                  <img
                    src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=600&h=800&fit=crop"
                    alt="Happy parent with child"
                    className="rounded-3xl shadow-2xl w-full"
                  />
                  
                  {/* Floating Stats Card */}
                  <motion.div 
                    className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-800">15,000+</p>
                        <p className="text-sm text-gray-600">Milestones Tracked</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              {...staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.3 }}
            >
              {stats.map((stat, idx) => (
                <motion.div key={idx} className="text-center" {...staggerItem}>
                  <motion.p 
                    className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2"
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Everything You Need in One Place
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Parento brings together expert guidance, health tracking, and community support 
                to make parenting easier and more joyful.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              {...staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
            >
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white rounded-2xl shadow-lg p-8 group"
                  {...staggerItem}
                  {...cardHover}
                >
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <motion.div 
              className="text-center mb-16"
              {...slideUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                How Parento Works
              </h2>
              <p className="text-xl text-gray-600">Simple, intuitive, and powerful</p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-12"
              {...staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
            >
              {steps.map((item, idx) => (
                <motion.div key={idx} className="text-center relative" {...staggerItem}>
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {item.step}
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                  {idx < 2 && (
                    <motion.div 
                      className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-pink-300 to-purple-300"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <motion.div 
              className="text-center mb-16"
              {...fadeIn}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Loved by Parents Everywhere ❤️
              </h2>
              <p className="text-xl text-gray-600">See what parents are saying about Parento</p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              {...staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.2 }}
            >
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white rounded-2xl shadow-lg p-8"
                  {...staggerItem}
                  {...cardHover}
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + i * 0.1 }}
                      >
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full border-2 border-pink-200"
                    />
                    <div>
                      <p className="font-bold text-gray-800">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white">
          <div className="max-w-4xl mx-auto text-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Start Your Parenting Journey?
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Join thousands of parents who trust Parento for their child's development and well-being.
              </p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                {...staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.div {...staggerItem} {...hoverScale}>
                  <Link
                    to="/signup"
                    className="px-8 py-4 bg-white text-pink-600 hover:bg-gray-50 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition inline-block"
                  >
                    Create Free Account
                  </Link>
                </motion.div>
                <motion.div {...staggerItem} {...hoverScale}>
                  <Link
                    to="/learningresources"
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 rounded-xl font-semibold text-lg transition flex items-center justify-center gap-2"
                  >
                    <PlayCircle className="w-5 h-5" />
                    Explore Resources
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}

export default Home;