// src/pages/Contact.js
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { fadeIn, slideUp, staggerContainer, staggerItem } from "../utils/animations";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the form data to your backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "support@parento.com",
      link: "mailto:support@parento.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 98765 43210",
      link: "tel:+919876543210"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Chennai, Tamil Nadu, India",
      link: "#"
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "Mon - Sat: 9AM - 6PM",
      link: "#"
    }
  ];

  const faqs = [
    {
      question: "How do I get started?",
      answer: "Simply sign up for a free account and start tracking your child's development immediately."
    },
    {
      question: "Is Parento free?",
      answer: "Yes! Basic features are completely free. Premium features are available with our subscription plans."
    },
    {
      question: "How do I book a consultation?",
      answer: "After logging in, navigate to the 'Consult' page and choose from our available doctors."
    }
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
              Get In Touch
            </motion.h1>
            <motion.p
              className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              We're here to help! Reach out to us for any questions or support.
            </motion.p>
          </div>
        </motion.section>

        {/* Contact Info Cards */}
        <section className="py-12 px-6 -mt-12">
          <motion.div
            className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            {...staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {contactInfo.map((info, idx) => (
              <motion.a
                key={idx}
                href={info.link}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all text-center"
                {...staggerItem}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-gray-600 text-sm">{info.content}</p>
              </motion.a>
            ))}
          </motion.div>
        </section>

        {/* Main Content */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-8"
              {...fadeIn}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>

              {submitted && (
                <motion.div
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✅ Thank you! Your message has been sent successfully.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </button>
              </form>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              className="space-y-8"
              {...fadeIn}
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                  {faqs.map((faq, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-white rounded-xl p-6 shadow-md"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-pink-500" />
                        {faq.question}
                      </h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Need Immediate Help */}
              <motion.div
                className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-8 text-white"
                {...fadeIn}
              >
                <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
                <p className="mb-6 text-white/90">
                  Our support team is available 24/7 to assist you with any urgent concerns.
                </p>
                <a
                  href="tel:+919876543210"
                  className="inline-block px-6 py-3 bg-white text-pink-500 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Call Support Now
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Map Section (Optional - you can add Google Maps here) */}
        <section className="py-12 px-6 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
            <p className="text-gray-600 mb-8">
              Located in the heart of Chennai, Tamil Nadu
            </p>
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <p className="text-gray-500">Map Placeholder - Add Google Maps Integration</p>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}