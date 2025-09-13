// src/components/Hero.jsx
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
        Manage Subscriptions Smarter
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-gray-300">
        Subscribly helps SaaS businesses track customers, automate billing, and scale effortlessly with a beautiful dashboard.
      </p>
      <div className="mt-8 flex gap-4">
        <Link to="/signup" className="px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transition">Get Started</Link>
        <Link to="/login" className="px-6 py-3 rounded-lg border border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white font-semibold transition">Login</Link>
      </div>

      <div className="absolute -z-10 top-10 w-[600px] h-[600px] bg-gradient-radial from-indigo-500/40 via-purple-500/30 to-transparent rounded-full blur-3xl animate-pulse" />
    </section>
  );
}
