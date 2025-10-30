import { Link } from "react-router-dom";

function Onboarding1() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100 flex flex-col items-center text-center py-20 px-8">
      <img
        src="https://cdn-icons-png.flaticon.com/512/4333/4333727.png"
        alt="Welcome"
        className="w-64 mb-8"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Parento 👶</h1>
      <p className="text-gray-600 max-w-xl mb-10">
        Track milestones, connect with doctors, and grow with a caring community of parents.  
        Let’s make your parenting journey smarter and easier.
      </p>
      <Link
        to="/signup"
        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg text-lg font-medium"
      >
        Get Started
      </Link>
    </div>
  );
}

export default Onboarding1;
