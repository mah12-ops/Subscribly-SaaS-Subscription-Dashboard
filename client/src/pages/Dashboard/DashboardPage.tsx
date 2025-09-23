// src/pages/Dashboard.tsx
import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_ME,
  GET_PLANS,
  GET_SUBSCRIPTIONS,
  GET_INVOICES,
  SUBSCRIBE,
  CANCEL_SUBSCRIPTION,
} from "../../lib/api";
import type { Me,
  Plan,
  Subscription,
  Invoice,} from "../../lib/api"
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Sidebar from "./Sidebar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

  // Chart Data: Subscriptions per plan
  const chartData = {
    labels: plans.map((p) => p.name),
    datasets: [
      {
        label: "Active Subscriptions",
        data: plans.map(
          (plan) =>
            subscriptions.filter((sub) => sub.plan?.id === plan.id && sub.status === "ACTIVE").length
        ),
        backgroundColor: "rgba(20, 184, 166, 0.7)", // Teal accent
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar role={me?.role} />

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-10">
        {/* Header */}
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gradient">Dashboard</h1>
          <div>
            <p>{me?.name}</p>
            <button className="ml-4 px-3 py-1 bg-emerald-600 rounded hover:bg-emerald-700">
              Edit Profile
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-900 rounded-xl shadow">
            <h2 className="text-lg font-semibold">Total Plans</h2>
            <p className="text-3xl mt-2">{plans.length}</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-xl shadow">
            <h2 className="text-lg font-semibold">Your Subscriptions</h2>
            <p className="text-3xl mt-2">{subscriptions.length}</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-xl shadow">
            <h2 className="text-lg font-semibold">Invoices</h2>
            <p className="text-3xl mt-2">{invoices.length}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="bg-gray-900 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Subscriptions per Plan</h2>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>

        {/* Plans Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Available Plans</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.id} className="border rounded-xl p-5 shadow hover:shadow-lg transition bg-gray-800">
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="text-gray-400">{plan.description}</p>
                <p className="text-xl font-semibold mt-2">${plan.price}/{plan.interval}</p>
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
      </div>
    </div>
  );
}