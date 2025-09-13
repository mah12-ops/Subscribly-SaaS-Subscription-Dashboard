// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 z-50 bg-white/10 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Subscribly
        </Link>
        <div className="space-x-4">
          <Link to="/login" className="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition">Login</Link>
          <Link to="/signup" className="px-4 py-2 text-sm font-medium text-indigo-500 border border-indigo-500 rounded-lg hover:bg-indigo-500 hover:text-white transition">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}
