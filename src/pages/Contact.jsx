import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "support@parento.com"
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91 98765 43210"
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Kanpur, India"
    },
    {
      icon: Clock,
      title: "Hours",
      content: "Mon–Sat • 9AM–6PM"
    }
  ];

  const faqs = [
    {
      q: "How do I get started?",
      a: "Sign up for free and start tracking your child’s milestones instantly."
    },
    {
      q: "Is Parento free to use?",
      a: "Yes. Core features are free. Advanced features may come later."
    },
    {
      q: "How can I consult a doctor?",
      a: "After login, go to the Consult page and book an expert."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-24">
      {/* ✅ reduced top padding */}
      <div className="max-w-6xl mx-auto px-4 pt-2">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Contact Us
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions? Need help? We’re here to support you on your parenting journey.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition"
            >
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <item.icon className="text-white w-6 h-6" />
                </div>
              </div>
              <h3 className="font-bold text-gray-800">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Form + FAQ */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-5">
              Send a Message
            </h2>

            {submitted && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                ✅ Message sent successfully
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {["name", "email", "subject"].map((field) => (
                <input
                  key={field}
                  name={field}
                  required
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              ))}

              <textarea
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
            <h2 className="text-2xl font-bold text-gray-800">
              FAQs
            </h2>

            {faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-purple-500" />
                  {f.q}
                </h3>
                <p className="text-gray-600 text-sm mt-2">
                  {f.a}
                </p>
              </div>
            ))}

            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 text-center">
              <h3 className="text-lg font-bold mb-2">
                Need urgent help?
              </h3>
              <p className="text-white/90 text-sm mb-4">
                Our support team is always available.
              </p>
              <a
                href="tel:+919876543210"
                className="inline-block bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold"
              >
                Call Support
              </a>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
