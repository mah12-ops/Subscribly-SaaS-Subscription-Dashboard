// src/pages/DashboardPage.tsx
import { useQuery } from "@apollo/client/react";
import { GET_SUBSCRIPTIONS } from "../lib/api";

// ---------- GraphQL Types ----------
interface Plan {
  id: string;
  name: string;
  price: number;
  interval: string;
}

interface Subscription {
  id: string;
  status: string;
  plan: Plan;
}

interface MeResponse {
  me: {
    id: string;
    subscriptions: Subscription[];
  } | null;
}

// ---------- Component ----------
export default function DashboardPage() {
  const { data, loading, error } = useQuery<MeResponse>(GET_SUBSCRIPTIONS);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark text-white">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark text-red-400">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  const user = data?.me;
  const subscriptions = user?.subscriptions ?? [];

  return (
    <div className="min-h-screen bg-dark text-white p-8">
      <h1 className="text-3xl font-bold mb-6">
        Welcome {user ? `User #${user.id}` : "Guest"}
      </h1>

      {subscriptions.length === 0 ? (
        <p className="text-gray-400">You don’t have any subscriptions yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map((sub) => (
            <div
              key={sub.id}
              className="bg-white/10 border border-white/20 rounded-xl p-6 shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{sub.plan.name}</h2>
              <p className="text-gray-300 mb-1">
                ${sub.plan.price} / {sub.plan.interval}
              </p>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
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
    </div>
  );
}
