// src/pages/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  X,
  AlertCircle,
  User,
  Phone,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

/* ============================
   ✅ Validation Helper
   ============================ */
const validateSignupForm = (formData) => {
  if (
    !formData.fullName ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword
  ) {
    return "Please fill in all required fields";
  }

  if (formData.password.length < 6) {
    return "Password must be at least 6 characters long";
  }

  if (formData.password !== formData.confirmPassword) {
    return "Passwords do not match";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    return "Please enter a valid email address";
  }

  return null;
};

export default function Signup() {
  const navigate = useNavigate();
  const { signup, signInWithGoogle } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  /* ============================
     ✅ Handlers
     ============================ */

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return; // ✅ Prevent double submit

    const validationError = validateSignupForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      await signup(
        formData.email,
        formData.password,
        formData.fullName,
        formData.phone // optional metadata
      );
      navigate("/dashboard");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered. Please login instead");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        case "auth/weak-password":
          setError("Password is too weak");
          break;
        default:
          setError("Failed to create account. Please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    if (loading) return;
    try {
      setLoading(true);
      setError("");
      await signInWithGoogle();
      navigate("/dashboard");
    } catch {
      setError("Failed to sign up with Google. Please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    const hasData = Object.values(formData).some(Boolean);
    if (hasData && !window.confirm("Discard your changes?")) return;
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-6">
      <motion.div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {/* Close Button */}
        <motion.button
          onClick={handleClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full z-10"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-6 h-6" />
        </motion.button>

        {/* Header */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 p-8 text-white text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              P
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Join Parento Today!</h1>
          <p className="text-white/90">Start your parenting journey with us</p>
        </div>

        {/* Form */}
        <div className="p-8">
          {error && (
            <motion.div
              role="alert"
              aria-live="assertive"
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Full Name *
              </label>
              <div className="relative mt-1">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 outline-none"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Email *
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 outline-none"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Phone (Optional metadata only) */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Phone (Optional)
              </label>
              <div className="relative mt-1">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 outline-none"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Password *
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 outline-none"
                  disabled={loading}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Confirm Password *
              </label>
              <div className="relative mt-1">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:border-pink-500 outline-none"
                  disabled={loading}
                />
                <button
                  type="button"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Google */}
          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full mt-4 border-2 border-gray-200 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 transition"
          >
            Continue with Google
          </button>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-500 font-bold">
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
