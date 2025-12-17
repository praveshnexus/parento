import { Search, Star, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { doctors } from "../components/data/doctors";

export default function Consult() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-24">

      {/* HEADER */}
      <div>
        <h1 className="text-xl font-bold">Consult Experts</h1>
        <p className="text-sm text-gray-600">
          Verified child healthcare professionals
        </p>
      </div>

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={16} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search doctors..."
          className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-100 outline-none"
        />
      </div>

      {/* DOCTOR LIST */}
      <div className="space-y-4">
        {filteredDoctors.map((doc) => (
          <motion.div
            key={doc.id}
            whileHover={{ y: -2 }}
            className="bg-white p-5 rounded-2xl shadow-sm"
          >
            <div className="flex gap-4">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-16 h-16 rounded-full"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{doc.name}</h3>
                <p className="text-sm text-blue-600">{doc.specialty}</p>

                <div className="flex gap-3 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    {doc.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {doc.location}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="font-semibold">
                    {doc.consultationFee}
                  </span>

                  <button
                    onClick={() => navigate(`/doctor/${doc.id}`)}
                    className="flex items-center gap-2 text-sm text-white bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg"
                  >
                    <Calendar size={14} />
                    Book
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
