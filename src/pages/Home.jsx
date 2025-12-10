import { useNavigate } from "react-router-dom";
import {
  Target,
  Users,
  BookOpen,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  Heart,
  Baby,
  School,
  Smile
} from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Target,
      title: "Track Milestones",
      description: "Monitor your child's developmental milestones with clarity and confidence",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with parents, share experiences, and learn from others",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: BookOpen,
      title: "Expert Resources",
      description: "Guides and articles curated by doctors and child specialists",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your family data is protected with enterprise-grade security",
      color: "from-green-500 to-green-600"
    }
  ];

  const stages = [
    {
      title: "Infant Care",
      age: "0–2 years",
      img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=600",
      icon: Baby
    },
    {
      title: "Early Childhood",
      age: "3–6 years",
      img: "https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=600",
      icon: Smile
    },
    {
      title: "School Age",
      age: "7–12 years",
      img: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?w=600",
      icon: School
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ---------------- HERO ---------------- */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-32 grid md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={22} className="text-yellow-300" />
              <span className="text-sm bg-white/20 px-4 py-1 rounded-full">
                Trusted by 10,000+ Parents
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Every Milestone
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                Matters
              </span>
            </h1>

            <p className="text-lg text-blue-100 mb-8">
              Track growth, get expert advice, and grow with your child —
              all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:scale-105 transition flex items-center gap-2"
              >
                Get Started Free <ArrowRight size={20} />
              </button>
              <button
                onClick={() => navigate("/login")}
                className="border border-white/30 px-8 py-4 rounded-xl hover:bg-white/10"
              >
                Sign In
              </button>
            </div>

            <div className="flex gap-6 mt-8">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-300" />
                <span className="text-sm">Free forever</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-green-300" />
                <span className="text-sm">No credit card</span>
              </div>
            </div>
          </div>

          {/* Right image */}
          <img
            src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=700"
            alt="Happy parent with child"
            className="hidden md:block rounded-3xl shadow-2xl"
          />
        </div>
      </div>

      {/* ---------------- FEATURES ---------------- */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Everything You Need as a Parent
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Designed to support you at every stage of your child’s life
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl border hover:shadow-xl transition"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center mb-4`}>
                <f.icon className="text-white" size={26} />
              </div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- STAGES ---------------- */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Support at Every Stage
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {stages.map((stage, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                <img src={stage.img} alt={stage.title} className="h-48 w-full object-cover" />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <stage.icon className="text-purple-600" size={20} />
                    <h3 className="font-bold text-lg">{stage.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{stage.age}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- CTA ---------------- */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Heart size={48} className="mx-auto mb-6 text-pink-300" />
          <h2 className="text-3xl font-bold mb-6">
            Join Thousands of Happy Parents
          </h2>
          <p className="text-blue-100 mb-8">
            Start tracking your child’s journey today
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-purple-600 px-10 py-4 rounded-xl font-semibold hover:scale-105 transition"
          >
            Get Started Free
          </button>
        </div>
      </div>
    </div>
  );
}
