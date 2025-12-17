// src/components/BookingModal.jsx
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Video, Phone, CheckCircle } from "lucide-react";
import { useState } from "react";

const dates = ["Today", "Tomorrow", "Mon, 23", "Tue, 24"];
const slots = ["10:00 AM", "11:30 AM", "2:00 PM", "4:00 PM"];

export default function BookingModal({ open, onClose, doctor }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [mode, setMode] = useState("video");
  const [confirmed, setConfirmed] = useState(false);

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/40 flex items-end md:items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-full md:max-w-md rounded-t-2xl md:rounded-2xl p-5"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Book Appointment</h3>
            <button onClick={onClose}>
              <X />
            </button>
          </div>

          {confirmed ? (
            <div className="text-center py-10">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
              <p className="text-lg font-semibold">
                Appointment Confirmed
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {doctor.name} • {selectedDate} • {selectedSlot}
              </p>

              <button
                onClick={onClose}
                className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* DOCTOR */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={doctor.image}
                  className="w-12 h-12 rounded-full"
                  alt={doctor.name}
                />
                <div>
                  <p className="text-sm font-semibold">{doctor.name}</p>
                  <p className="text-xs text-gray-500">
                    {doctor.specialty}
                  </p>
                </div>
              </div>

              {/* DATE */}
              <div className="mb-4">
                <p className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Calendar size={16} /> Select Date
                </p>
                <div className="flex gap-2 overflow-x-auto">
                  {dates.map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDate(d)}
                      className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap ${
                        selectedDate === d
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              {/* TIME */}
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">
                  Select Time
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {slots.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSlot(s)}
                      className={`py-2 rounded-lg text-sm ${
                        selectedSlot === s
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* MODE */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">
                  Consultation Mode
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setMode("video")}
                    className={`flex-1 py-2 rounded-lg text-sm flex items-center justify-center gap-2 ${
                      mode === "video"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <Video size={16} /> Video
                  </button>
                  <button
                    onClick={() => setMode("call")}
                    className={`flex-1 py-2 rounded-lg text-sm flex items-center justify-center gap-2 ${
                      mode === "call"
                        ? "bg-green-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <Phone size={16} /> Call
                  </button>
                </div>
              </div>

              {/* CONFIRM */}
              <button
                disabled={!selectedDate || !selectedSlot}
                onClick={() => setConfirmed(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
              >
                Confirm Booking
              </button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
