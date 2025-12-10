import {
  Search,
  Star,
  Calendar,
  Clock,
  Video,
  Phone,
  Award,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Consult() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const specialties = [
    "All",
    "Pediatrician",
    "Nutritionist",
    "Child Psychologist",
    "Dentist",
    "Dermatologist",
  ];

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
      image: "https://ui-avatars.com/api/?name=Meera+Patel&background=3b82f6&color=fff",
      location: "Mumbai",
      qualifications: "MBBS, MD (Pediatrics)",
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
      image: "https://ui-avatars.com/api/?name=Rajesh+Gupta&background=6366f1&color=fff",
      location: "Delhi NCR",
      qualifications: "MSc Nutrition, RD",
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
      image: "https://ui-avatars.com/api/?name=Ananya+Rao&background=8b5cf6&color=fff",
      location: "Bangalore",
      qualifications: "MA, PhD (Psychology)",
    },
    {
      id: 4,
      name: "Dr. Sandeep Verma",
      specialty: "Dentist",
      experience: "9 years",
      rating: 4.6,
      reviews: 98,
      nextAvailable: "Today, 6:30 PM",
      consultationFee: "₹350",
      image: "https://ui-avatars.com/api/?name=Sandeep+Verma&background=2563eb&color=fff",
      location: "Pune",
      qualifications: "BDS, MDS",
    },
    {
      id: 5,
      name: "Dr. Neha Sharma",
      specialty: "Dermatologist",
      experience: "11 years",
      rating: 4.8,
      reviews: 143,
      nextAvailable: "Tomorrow, 2:00 PM",
      consultationFee: "₹550",
      image: "https://ui-avatars.com/api/?name=Neha+Sharma&background=7c3aed&color=fff",
      location: "Jaipur",
      qualifications: "MBBS, MD (Dermatology)",
    },
    {
      id: 6,
      name: "Dr. Arjun Iyer",
      specialty: "Pediatrician",
      experience: "8 years",
      rating: 4.5,
      reviews: 87,
      nextAvailable: "Monday, 5:00 PM",
      consultationFee: "₹450",
      image: "https://ui-avatars.com/api/?name=Arjun+Iyer&background=4f46e5&color=fff",
      location: "Chennai",
      qualifications: "MBBS, DCH",
    },
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "All" ||
      doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 pb-24">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Consult Experts
          </h1>
          <p className="text-gray-600">
            Talk to verified child care specialists
          </p>
        </motion.div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {specialties.map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedSpecialty(item)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    selectedSpecialty === item
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Doctors */}
        <div className="space-y-4">
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-20 h-20 rounded-full"
                />

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">
                    {doctor.name}
                  </h3>
                  <p className="text-blue-600 font-semibold">
                    {doctor.specialty}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {doctor.qualifications}
                  </p>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {doctor.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      {doctor.experience}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      {doctor.rating} ({doctor.reviews})
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <Clock className="w-4 h-4 text-green-600" />
                    Next: {doctor.nextAvailable}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-lg font-semibold flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Book
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                      <Video className="w-4 h-4" />
                      Video
                    </button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Call
                    </button>

                    <span className="ml-auto font-bold text-lg text-gray-800">
                      {doctor.consultationFee}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ✅ HELP SECTION (OPTION A) */}
        <div className="mt-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 text-center shadow-md">
          <h3 className="text-2xl font-bold mb-2">
            Need help choosing a doctor?
          </h3>
          <p className="text-white/90 mb-4 max-w-xl mx-auto">
            Our support team is available 24/7 to guide you to the right
            specialist for your child.
          </p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
