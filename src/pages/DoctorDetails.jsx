import {
  Star,
  MapPin,
  Award,
  Clock,
  Video,
  Phone,
  ArrowLeft,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { doctors } from "../components/data/doctors";
import { motion } from "framer-motion";

export default function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor = doctors.find((d) => d.id === id);
  if (!doctor) return <p>Doctor not found</p>;

  return (
    <div className="space-y-6 pb-24">

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-600"
      >
        <ArrowLeft size={16} /> Back
      </button>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-5 rounded-2xl shadow-sm"
      >
        <div className="flex gap-4">
          <img
            src={doctor.image}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h1 className="font-bold text-lg">{doctor.name}</h1>
            <p className="text-blue-600">{doctor.specialty}</p>
            <p className="text-xs text-gray-500">{doctor.qualifications}</p>

            <div className="flex gap-3 text-xs mt-2 text-gray-600">
              <span className="flex items-center gap-1">
                <Star size={12} className="text-yellow-500 fill-yellow-500" />
                {doctor.rating} ({doctor.reviews})
              </span>
              <span className="flex items-center gap-1">
                <Award size={12} />
                {doctor.experience}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {doctor.location}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ABOUT */}
      <div className="bg-white p-5 rounded-2xl shadow-sm">
        <h3 className="font-semibold mb-2">About Doctor</h3>
        <p className="text-sm text-gray-600">{doctor.about}</p>
      </div>

      {/* AVAILABILITY */}
      <div className="bg-white p-5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 text-green-600 text-sm">
          <Clock size={16} />
          Next Available: {doctor.nextAvailable}
        </div>
      </div>

      {/* CONSULT MODE */}
      <div className="bg-white p-5 rounded-2xl shadow-sm flex gap-3">
        {doctor.modes.includes("video") && (
          <div className="flex-1 border rounded-xl p-3 flex items-center justify-center gap-2 text-blue-600">
            <Video size={16} /> Video
          </div>
        )}
        {doctor.modes.includes("call") && (
          <div className="flex-1 border rounded-xl p-3 flex items-center justify-center gap-2 text-green-600">
            <Phone size={16} /> Call
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-white p-5 rounded-2xl shadow-sm flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">Consultation Fee</p>
          <p className="font-bold text-lg">{doctor.consultationFee}</p>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold">
          Confirm Booking
        </button>
      </div>
    </div>
  );
}
