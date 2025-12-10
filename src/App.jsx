// src/App.jsx
import { Routes, Route, useLocation,Navigate,Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider,useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";


// Layout
import Layout from "./components/Layout";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Track from "./pages/Track";
import Consult from "./pages/Consult";
import Comunity from "./pages/Comunity";
import Profile from "./pages/Profile";
import LearningResources from "./pages/LearningResources";

export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          {/* -------------------- PUBLIC ROUTES -------------------- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* -------------------- PROTECTED ROUTES -------------------- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/track"
            element={
              <ProtectedRoute>
                <Track />
              </ProtectedRoute>
            }
          />

          <Route
            path="/consult"
            element={
              <ProtectedRoute>
                <Consult />
              </ProtectedRoute>
            }
          />

          <Route
            path="/comunity"
            element={
              <ProtectedRoute>
                <Comunity />
              </ProtectedRoute>
            }
          />

          <Route
            path="/learningresources"
            element={
              <ProtectedRoute>
                <LearningResources />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* -------------------- FALLBACK -------------------- */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}