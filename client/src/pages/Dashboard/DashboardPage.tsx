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
import { BellIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
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

  // Calculate revenue for mini cards
  const totalRevenue = subscriptions.reduce(
    (acc, sub) => acc + (sub.plan?.price || 0),
    0
  );

  return (
    <div className="flex min-h-screen bg-black overflow-x-hidden text-white">
      {/* Sidebar */}
      <Sidebar role={me?.role} />

      {/* Main Content */}
      <div className="flex-1 p-8 space-y-8">
        {/* Top Bar */}
<div className="flex justify-between items-center mb-6">
  {/* Dashboard Title */}
  <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ">
    Dashboard
  </h1>

  {/* Right Controls */}
  <div className="flex items-center gap-4">
    {/* Notifications */}
    <button className="relative">
      <BellIcon className="w-6 h-6 text-gray-300 hover:text-white transition" />
      {/* Red dot for new notifications */}
      {me?.hasNewNotifications && (
        <span className="absolute -top-1 -right-1 bg-red-600 w-2 h-2 rounded-full " />
      )}
    </button>

    {/* Profile Photo & Dropdown */}
    <div className="relative group">
      <img
        src={me?.avatar || "/default-avatar.png"}
        alt={me?.name}
        className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-600 hover:border-emerald-400 transition"
      />
      {/* Dropdown Menu */}
      <div className="absolute right-0 mt-2 w-40 bg-black text-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-10">
        <button className="block w-full text-left px-4 py-2 hover:bg-gray-800">
          Edit Profile
        </button>
        <button className="block w-full text-left px-4 py-2 hover:bg-gray-800">
          Logout
        </button>
      </div>
    </div>
  </div>
</div>


        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 px-8 gap-6">
          <div className="p-6 bg-gray-900 rounded-xl shadow">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Total Plans
            </h2>
            <p className="text-3xl mt-2">{plans.length}</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-xl shadow">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ">
              Your Subscriptions
            </h2>
            <p className="text-3xl mt-2">{subscriptions.length}</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-xl shadow">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ">
              Invoices
            </h2>
            <p className="text-3xl mt-2">{invoices.length}</p>
          </div>
          <div className="p-6 bg-gray-900 rounded-xl shadow">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ">
              Revenue
            </h2>
            <p className="text-3xl mt-2">${totalRevenue}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="bg-gray-900 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ">
            Subscriptions per Plan
          </h2>
          <Bar data={chartData} options={{ responsive: true }} />
        </div>

        {/* Plans Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ">
            Available Plans
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.id} className="border rounded-xl p-5 shadow hover:shadow-lg transition bg-gray-800">
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="text-gray-400">{plan.description}</p>
                <p className="text-xl font-semibold mt-2">${plan.price}/{plan.interval}</p>
                <button
                  onClick={() => subscribe({ variables: { planId: plan.id } })}
                  className="mt-3 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
                >
                  Subscribe
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-xl font-semibold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ">
            Recent Activity
          </h2>
          <ul className="space-y-2 max-h-72 overflow-y-auto">
            {subscriptions.slice(-5).map((sub) => (
              <li key={sub.id} className="p-3 bg-gray-900 rounded flex justify-between">
                <span>
                  Subscribed to <strong>{sub.plan?.name}</strong>
                </span>
                <span className={`font-semibold ${sub.status === "ACTIVE" ? "text-purple-400" : "text-red-500"}`}>
                  {sub.status}
                </span>
              </li>
            ))}
            {invoices.slice(-5).map((inv) => (
              <li key={inv.id} className="p-3 bg-gray-900 rounded flex justify-between">
                <span>Invoice #{inv.id}</span>
                <span className={`font-semibold ${inv.status === "PAID" ? "text-purple-400" : "text-red-500"}`}>
                  {inv.status}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
