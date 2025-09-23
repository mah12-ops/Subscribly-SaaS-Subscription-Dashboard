// src/pages/Dashboard.tsx
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ME,
  GET_PLANS,
 GET_SUBSCRIPTIONS,
  GET_INVOICES,
  SUBSCRIBE,
  CANCEL_SUBSCRIPTION,
  Me,
  Plan,
  Subscription,
  Invoice,
} from "../lib/api";

export default function Dashboard() {
  const { data: meData } = useQuery<{ me: Me }>(GET_ME);
  const { data: planData } = useQuery<{ plans: Plan[] }>(GET_PLANS);
  const { data: subsData, refetch: refetchSubs } = useQuery<{ subscriptions: Subscription[] }>(GET_SUBSCRIPTIONS);
  const { data: invoiceData } = useQuery<{ invoices: Invoice[] }>(GET_INVOICES);

  const [subscribe] = useMutation(SUBSCRIBE, { onCompleted: () => refetchSubs() });
  const [cancelSubscription] = useMutation(CANCEL_SUBSCRIPTION, { onCompleted: () => refetchSubs() });

  const me = meData?.me;
  const plans = planData?.plans || [];
  const subscriptions = subsData?.subscriptions || [];
  const invoices = invoiceData?.invoices || [];

  return (
    <div className="p-6 space-y-10">
      {/* Banner */}
      <div className="bg-emerald-700 text-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold">Welcome back, {me?.name || "User"} 👋</h1>
        <p className="text-emerald-100">Manage subscriptions, plans, and billing all in one place</p>
      </div>

      {/* Plans */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.id} className="border rounded-xl p-5 shadow hover:shadow-lg transition">
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <p className="text-gray-600">{plan.description}</p>
              <p className="text-xl font-semibold mt-2">
                ${plan.price}/{plan.interval}
              </p>
              <button
                onClick={() => subscribe({ variables: { planId: plan.id } })}
                className="mt-3 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700"
              >
                Subscribe
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Subscriptions */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Subscriptions</h2>
        {subscriptions.length === 0 ? (
          <p className="text-gray-500">No active subscriptions.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {subscriptions.map((sub) => (
              <div key={sub.id} className="p-4 border rounded-xl shadow">
                <h3 className="text-lg font-bold">{sub.plan?.name}</h3>
                <p className="text-sm text-gray-600">Status: {sub.status}</p>
                <button
                  onClick={() => cancelSubscription({ variables: { subscriptionId: sub.id } })}
                  className="mt-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Invoices */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Recent Invoices</h2>
        {invoices.length === 0 ? (
          <p className="text-gray-500">No invoices found.</p>
        ) : (
          <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-600">ID</th>
                <th className="px-4 py-2 text-left text-gray-600">Amount</th>
                <th className="px-4 py-2 text-left text-gray-600">Date</th>
                <th className="px-4 py-2 text-left text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-t">
                  <td className="px-4 py-2">{inv.id}</td>
                  <td className="px-4 py-2">${inv.amount}</td>
                  <td className="px-4 py-2">{inv.date}</td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      inv.status === "PAID" ? "text-emerald-600" : "text-red-500"
                    }`}
                  >
                    {inv.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
