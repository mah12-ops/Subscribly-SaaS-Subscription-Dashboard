import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_PLANS,
  SUBSCRIBE,
  GET_ACTIVE_SUBSCRIPTION,
  type Plan,
} from "../lib/api";

type ActiveSubscriptionData = {
  activeSubscription: {
    id: string;
    status: string;
    plan: {
      id: string;
      name: string;
      price: number;
      interval: string;
    };
  } | null;
};

export default function Plans() {
  const { data: plansData } = useQuery<{ plans: Plan[] }>(GET_PLANS);
  const { data: subData, refetch } =
    useQuery<ActiveSubscriptionData>(GET_ACTIVE_SUBSCRIPTION);

  const [subscribe, { loading: subscribing }] = useMutation(SUBSCRIBE, {
    onCompleted: () => refetch(),
    onError: (err) => {
      console.error("Subscription failed:", err.message);
      alert("Failed to subscribe. Please try again.");
    },
  });

  const plans = plansData?.plans || [];
  const activePlanId = subData?.activeSubscription?.plan?.id;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
        Available Plans
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isActive = activePlanId === plan.id;

          return (
            <div
              key={plan.id}
              className={`p-6 rounded-xl shadow transition ${
                isActive ? "bg-emerald-800" : "bg-gray-900"
              }`}
            >
              <h2 className="text-xl font-semibold">{plan.name}</h2>
              <p className="mt-2 text-gray-400">{plan.description}</p>
              <p className="mt-4 font-bold text-lg">
                ${plan.price}/{plan.interval}
              </p>

              <button
                disabled={isActive || subscribing}
                className={`mt-4 px-4 py-2 rounded transition ${
                  isActive
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-purple-500 hover:bg-purple-700"
                }`}
                onClick={() => subscribe({ variables: { planId: plan.id } })}
              >
                {isActive
                  ? "Current Plan"
                  : subscribing
                  ? "Subscribing..."
                  : "Subscribe"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
