import { Search, Star, Calendar, Clock, Video, Phone, Award, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { staggerContainer, staggerItem, slideUp, fadeIn, cardHover, hoverScale } from "../utils/animations";
import PageWrapper from "../components/PageWrapper";

function Consult() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const specialties = ["All", "Pediatrician", "Nutritionist", "Child Psychologist", "Dentist", "Dermatologist"];

  const doctors = [
    {
      id: 1,
      name: "Dr. Meera Patel",
      specialty: "Pediatrician",
      experience: "15 years",
      rating: 4.9,
      reviews: 234,
      nextAvailable: "Today, 4:00 PM",
      consultationFee: "₹500",
      image: "https://ui-avatars.com/api/?name=Meera+Patel&background=ec4899&color=fff&size=120",
      languages: ["English", "Hindi", "Gujarati"],
      location: "Mumbai, Maharashtra",
      qualifications: "MBBS, MD (Pediatrics)",
      availability: "Mon-Sat: 9 AM - 6 PM"
    },
    {
      id: 2,
      name: "Dr. Rajesh Gupta",
      specialty: "Nutritionist",
      experience: "12 years",
      rating: 4.7,
      reviews: 189,
      nextAvailable: "Tomorrow, 11:30 AM",
      consultationFee: "₹400",
      image: "https://ui-avatars.com/api/?name=Rajesh+Gupta&background=3b82f6&color=fff&size=120",
      languages: ["English", "Hindi"],
      location: "Delhi NCR",
      qualifications: "MSc (Nutrition), RD",
      availability: "Mon-Fri: 10 AM - 7 PM"
    },
    {
      id: 3,
      name: "Dr. Ananya Rao",
      specialty: "Child Psychologist",
      experience: "10 years",
      rating: 4.8,
      reviews: 156,
      nextAvailable: "Monday, 10:00 AM",
      consultationFee: "₹600",
      image: "https://ui-avatars.com/api/?name=Ananya+Rao&background=10b981&color=fff&size=120",
      languages: ["English", "Hindi", "Tamil"],
      location: "Bangalore, Karnataka",
      qualifications: "MA, PhD (Psychology)",
      availability: "Tue-Sat: 11 AM - 5 PM"
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "All" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20">
        {/* Header */}
        <motion.div 
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-12 px-6 md:px-12 lg:px-20"
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
              Consult Doctors
            </motion.h1>
            <motion.p 
              className="text-lg text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Book appointments with trusted child care experts
            </motion.p>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 -mt-8">
          
          {/* Search & Filter */}
          <motion.div 
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
            {...slideUp}
            initial="initial"
            animate="animate"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:outline-none transition"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {specialties.map((specialty) => (
                  <motion.button
                    key={specialty}
                    onClick={() => setSelectedSpecialty(specialty)}
                    className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition ${
                      selectedSpecialty === specialty
                        ? "bg-pink-500 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {specialty}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
            {...staggerContainer}
            initial="initial"
            animate="animate"
          >
            {[
              { value: "50+", label: "Verified Doctors", color: "blue" },
              { value: "1000+", label: "Consultations Done", color: "green" },
              { value: "4.8★", label: "Average Rating", color: "purple" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                className={`bg-white rounded-xl shadow-md p-6 border-l-4 border-${stat.color}-500`}
                {...staggerItem}
                whileHover={{ y: -5 }}
              >
                <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Doctor Cards */}
          <motion.div 
            className="space-y-6"
            {...staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {filteredDoctors.map((doctor) => (
              <motion.div 
                key={doctor.id} 
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                {...staggerItem}
                {...cardHover}
              >
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-64 bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex flex-col items-center justify-center">
                    <motion.img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-32 h-32 rounded-full border-4 border-white shadow-lg mb-4"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-gray-800">{doctor.rating}</span>
                      <span className="text-sm text-gray-500">({doctor.reviews})</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4" />
                      <span>{doctor.experience}</span>
                    </div>
                  </div>

                  <div className="flex-1 p-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
                        <p className="text-pink-600 font-semibold mb-2">{doctor.specialty}</p>
                        <p className="text-sm text-gray-600 mb-1">{doctor.qualifications}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>{doctor.location}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Consultation Fee</p>
                        <p className="text-3xl font-bold text-gray-800">{doctor.consultationFee}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <Clock className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-xs text-gray-600">Next Available</p>
                          <p className="font-semibold text-gray-800">{doctor.nextAvailable}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="text-xs text-gray-600">Availability</p>
                          <p className="font-semibold text-gray-800">{doctor.availability}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-2">Languages:</p>
                      <div className="flex flex-wrap gap-2">
                        {doctor.languages.map((lang, idx) => (
                          <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <motion.button 
                        className="flex-1 md:flex-none px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl font-semibold transition shadow-md flex items-center justify-center gap-2"
                        {...hoverScale}
                      >
                        <Calendar className="w-5 h-5" />
                        Book Appointment
                      </motion.button>
                      <motion.button 
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition shadow-md flex items-center gap-2"
                        {...hoverScale}
                      >
                        <Video className="w-5 h-5" />
                        Video Call
                      </motion.button>
                      <motion.button 
                        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition shadow-md flex items-center gap-2"
                        {...hoverScale}
                      >
                        <Phone className="w-5 h-5" />
                        Call
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Help Section */}
          <motion.div 
            className="mt-8 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl shadow-lg p-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-3">Need Help Choosing a Doctor?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Our support team is available 24/7 to help you find the right specialist for your child's needs.
            </p>
            <motion.button 
              className="px-8 py-3 bg-white text-pink-600 rounded-xl font-semibold hover:bg-gray-50 transition shadow-md"
              {...hoverScale}
            >
              Contact Support
            </motion.button>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Consult;