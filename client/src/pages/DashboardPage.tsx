// src/pages/DashboardPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: string;
  description?: string;
}

interface Subscription {
  id: string;
  status: string;
  plan: Plan;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const [meRes, subsRes, plansRes] = await Promise.all([
          axios.get("http://localhost:8080/api/graphql/me", { headers }),
          axios.get("http://localhost:8080/api/graphql/subscriptions", { headers }),
          axios.get("http://localhost:8080/api/graphql/plans", { headers }),
        ]);

        setUser(meRes.data);
        setSubscriptions(subsRes.data);
        setPlans(plansRes.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        <p className="animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-primary-dark to-dark text-white px-6 py-10">
      {/* Header */}
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
          Welcome, {user?.name || "User"} 👋
        </h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 font-semibold shadow-md transition"
        >
          Logout
        </button>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-white/10 rounded-2xl shadow-lg border border-white/20">
          <p className="text-gray-400 text-sm">Active Subscriptions</p>
          <h2 className="text-3xl font-bold">{subscriptions.length}</h2>
        </div>
        <div className="p-6 bg-white/10 rounded-2xl shadow-lg border border-white/20">
          <p className="text-gray-400 text-sm">Available Plans</p>
          <h2 className="text-3xl font-bold">{plans.length}</h2>
        </div>
        <div className="p-6 bg-white/10 rounded-2xl shadow-lg border border-white/20">
          <p className="text-gray-400 text-sm">Role</p>
          <h2 className="text-3xl font-bold">{user?.role}</h2>
        </div>
      </section>

      {/* Active Subscriptions */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Your Subscriptions</h2>
        {subscriptions.length === 0 ? (
          <p className="text-gray-400">No active subscriptions yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="p-6 bg-white/10 rounded-xl border border-white/20 shadow-md"
              >
                <h3 className="text-xl font-bold">{sub.plan.name}</h3>
                <p className="text-gray-400">{sub.plan.description}</p>
                <p className="mt-2 font-semibold">
                  ${sub.plan.price}/{sub.plan.interval}
                </p>
                <span
                  className={`inline-block mt-3 px-3 py-1 text-sm rounded-lg ${
                    sub.status === "ACTIVE"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {sub.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Available Plans */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Available Plans</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="p-6 bg-white/10 rounded-xl border border-white/20 shadow-md hover:scale-105 transition"
            >
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="text-gray-400">{plan.description}</p>
              <p className="mt-2 font-semibold">
                ${plan.price}/{plan.interval}
              </p>
              <button className="mt-4 w-full px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition">
                Subscribe
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
