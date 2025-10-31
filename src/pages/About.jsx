// src/pages/About.js
import { motion } from "framer-motion";
import { Heart, Users, Target, Award, Shield, Sparkles } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { fadeIn, slideUp, staggerContainer, staggerItem } from "../utils/animations";

export default function About() {
  const values = [
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "We understand the joys and challenges of parenting, providing support every step of the way."
    },
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Your family's privacy and security are our top priorities with end-to-end encryption."
    },
    {
      icon: Users,
      title: "Community First",
      description: "Connect with thousands of parents sharing experiences and supporting each other."
    },
    {
      icon: Sparkles,
      title: "Expert Guidance",
      description: "Access to certified pediatricians and child development specialists 24/7."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Mitchell",
      role: "Chief Medical Officer",
      image: "https://i.pravatar.cc/300?img=45"
    },
    {
      name: "John Anderson",
      role: "CEO & Founder",
      image: "https://i.pravatar.cc/300?img=12"
    },
    {
      name: "Emily Chen",
      role: "Head of Community",
      image: "https://i.pravatar.cc/300?img=47"
    },
    {
      name: "Dr. Michael Brown",
      role: "Lead Pediatrician",
      image: "https://i.pravatar.cc/300?img=13"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Happy Parents" },
    { value: "50+", label: "Expert Doctors" },
    { value: "25,000+", label: "Milestones Tracked" },
    { value: "4.8★", label: "Average Rating" }
  ];

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Hero Section */}
        <motion.section
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-20 px-6"
          {...fadeIn}
        >
          <div className="max-w-7xl mx-auto text-center">
            <motion.h1
              className="text-5xl lg:text-7xl font-bold mb-6"
              {...slideUp}
            >
              About Parento
            </motion.h1>
            <motion.p
              className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Empowering parents with the tools, knowledge, and community support to raise happy, healthy children.
            </motion.p>
          </div>
        </motion.section>

        {/* Stats Section */}
        <section className="py-12 px-6">
          <motion.div
            className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8"
            {...staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                className="text-center bg-white rounded-xl p-6 shadow-md"
                {...staggerItem}
              >
                <div className="text-4xl font-bold text-pink-500 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              {...fadeIn}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                To make parenting easier, more informed, and less stressful by providing comprehensive tools and expert support in one beautiful platform.
              </p>
            </motion.div>

            {/* Values Grid */}
            <motion.div
              className="grid md:grid-cols-2 gap-8"
              {...staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {values.map((value, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                  {...staggerItem}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              className="text-center mb-16"
              {...fadeIn}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Passionate experts dedicated to supporting your parenting journey
              </p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              {...staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {team.map((member, idx) => (
                <motion.div
                  key={idx}
                  className="text-center"
                  {...staggerItem}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-pink-500"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6">
          <motion.div
            className="max-w-4xl mx-auto bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl p-12 text-center text-white"
            {...fadeIn}
          >
            <h2 className="text-4xl font-bold mb-6">Join Our Community Today</h2>
            <p className="text-xl text-white/90 mb-8">
              Start your journey with thousands of parents who trust Parento
            </p>
            <a
              href="/signup"
              className="inline-block px-8 py-4 bg-white text-pink-500 rounded-xl font-bold text-lg hover:shadow-xl transition-all"
            >
              Get Started Free
            </a>
          </motion.div>
        </section>
      </div>
    </PageWrapper>
  );
}