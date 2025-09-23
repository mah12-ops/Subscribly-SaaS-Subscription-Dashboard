import { useQuery, useMutation } from "@apollo/client/react";
import { GET_SUBSCRIPTIONS, CANCEL_SUBSCRIPTION } from "../lib/api";
import type { Subscription } from "../lib/api";

export default function Subscription() {
  const { data, refetch } = useQuery<{ subscriptions: Subscription[] }>(GET_SUBSCRIPTIONS);
  const [cancelSubscription] = useMutation(CANCEL_SUBSCRIPTION, { onCompleted: () => refetch() });

  const subscriptions = data?.subscriptions || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
        Your Subscriptions
      </h1>

      {subscriptions.length === 0 ? (
        <p className="text-gray-400">You have no active subscriptions.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {subscriptions.map((sub) => (
            <div key={sub.id} className="p-4 rounded-xl bg-gray-900 text-white shadow hover:shadow-lg transition">
              <h2 className="text-lg font-semibold">{sub.plan?.name}</h2>
              <p className="mt-1 text-gray-400">Status: {sub.status}</p>
              <button
                className="mt-2 px-3 py-1 bg-red-600 rounded hover:bg-red-700 transition"
                onClick={() => cancelSubscription({ variables: { subscriptionId: sub.id } })}
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
