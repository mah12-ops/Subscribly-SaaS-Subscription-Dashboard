import { useQuery, useMutation } from "@apollo/client/react";
import { GET_PLANS, SUBSCRIBE } from "../lib/api";
import type { Plan } from "../lib/api";

export default function Plans() {
  const { data } = useQuery<{ plans: Plan[] }>(GET_PLANS);
  const [subscribe] = useMutation(SUBSCRIBE);

  const plans = data?.plans || [];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
        Available Plans
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="p-6 rounded-xl bg-gray-900 text-white shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">{plan.name}</h2>
            <p className="mt-2 text-gray-400">{plan.description}</p>
            <p className="mt-4 font-bold text-lg">${plan.price}/{plan.interval}</p>
            <button
              className="mt-4 px-4 py-2 bg-emerald-600 rounded hover:bg-emerald-700 transition"
              onClick={() => subscribe({ variables: { planId: plan.id } })}
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
