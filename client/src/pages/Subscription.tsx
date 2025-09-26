// src/pages/Subscriptions.tsx
import React from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_SUBSCRIPTIONS, CANCEL_SUBSCRIPTION } from "../lib/api";
import type { Subscription } from "../lib/api";

export default function Subscriptions() {
  const { data, loading, error, refetch } = useQuery<{ subscriptions: Subscription[] }>(GET_SUBSCRIPTIONS);
  const [cancelSubscription, { loading: cancelling }] = useMutation(CANCEL_SUBSCRIPTION, {
    onCompleted: () => refetch(),
    onError: (err) => {
      console.error("Cancel failed:", err.message);
      alert("Failed to cancel subscription. Please try again.");
    },
  });

  if (loading) return <p className="text-gray-400 p-6">Loading subscriptions...</p>;
  if (error) return <p className="text-red-500 p-6">Error fetching subscriptions: {error.message}</p>;

  const activeSubscriptions = data?.subscriptions?.filter(sub => sub.status === "ACTIVE") || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
        Your Subscriptions
      </h1>

      {activeSubscriptions.length === 0 ? (
        <p className="text-gray-400 mt-6">You have no active subscriptions.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {activeSubscriptions.map((sub) => (
            <div
              key={sub.id}
              className="p-6 bg-gray-900 rounded-xl shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold">{sub.plan?.name}</h2>
                <p className="text-gray-400 mt-2">Status: <span className="text-green-400">{sub.status}</span></p>
                {sub.plan?.price && (
                  <p className="mt-2 font-bold text-lg">${sub.plan.price}/{sub.plan.interval}</p>
                )}
              </div>

              <button
                disabled={cancelling}
                onClick={() =>
                  cancelSubscription({ variables: { subscriptionId: sub.id } })
                }
                className={`mt-4 px-4 w-48 py-2 rounded-lg transition text-white ${
                  cancelling
                    ? "bg-gray-600  cursor-not-allowed"
                    : "bg-purple-500 hover:bg-purple-700"
                }`}
              >
                {cancelling ? "Cancelling..." : "Cancel Subscription"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
