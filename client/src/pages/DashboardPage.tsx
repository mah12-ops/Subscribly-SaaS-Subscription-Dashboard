import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  Settings,
  LogOut,
  PlusCircle,
  Download,
} from "lucide-react";

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  const subscriptions = [
    { id: 1, name: "Pro Plan", status: "Active", renewal: "2025-10-01" },
    { id: 2, name: "Team Add-on", status: "Active", renewal: "2025-10-05" },
  ];

  const billingHistory = [
    { id: 1, date: "2025-09-01", amount: "$29.99", status: "Paid" },
    { id: 2, date: "2025-08-01", amount: "$29.99", status: "Paid" },
  ];

  const upcomingInvoices = [
    { id: 1, date: "2025-10-01", amount: "$29.99", status: "Pending" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-emerald-800 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold">Subscribely</div>
        <nav className="flex-1">
          <ul className="space-y-2 px-4">
            <li>
              <button
                onClick={() => navigate("/dashboard")}
                className="w-full text-left py-2 px-3 rounded-md hover:bg-emerald-700"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/billing")}
                className="w-full text-left py-2 px-3 rounded-md hover:bg-emerald-700"
              >
                Billing
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/settings")}
                className="w-full text-left py-2 px-3 rounded-md hover:bg-emerald-700"
              >
                Settings
              </button>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-emerald-700">
          <button className="flex items-center space-x-2 hover:text-red-400">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* Greeting */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, Mercy 👋
        </h1>
        <p className="text-gray-500 mb-8">
          Here’s an overview of your subscriptions and billing.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">Active Subscriptions</h3>
            <p className="text-2xl font-semibold">{subscriptions.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">Monthly Spend</h3>
            <p className="text-2xl font-semibold">$59.98</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-gray-500">Next Invoice</h3>
            <p className="text-2xl font-semibold">$29.99</p>
          </div>
        </div>

        {/* Active Subscriptions */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Active Subscriptions</h2>
          <div className="bg-white rounded-2xl shadow p-6">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="flex justify-between py-3 border-b last:border-0"
              >
                <span>{sub.name}</span>
                <span className="text-sm text-gray-500">
                  {sub.status} · renews {sub.renewal}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Billing History */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Billing History</h2>
          <div className="bg-white rounded-2xl shadow p-6">
            {billingHistory.map((bill) => (
              <div
                key={bill.id}
                className="flex justify-between py-3 border-b last:border-0"
              >
                <span>
                  {bill.date} — {bill.amount}
                </span>
                <span
                  className={`text-sm font-medium ${
                    bill.status === "Paid" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {bill.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Invoices */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Upcoming Invoices</h2>
          <div className="bg-white rounded-2xl shadow p-6">
            {upcomingInvoices.map((invoice) => (
              <div
                key={invoice.id}
                className="flex justify-between py-3 border-b last:border-0"
              >
                <span>
                  {invoice.date} — {invoice.amount}
                </span>
                <span className="text-sm text-yellow-600">{invoice.status}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex space-x-4">
            <button className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow hover:bg-emerald-700">
              <PlusCircle size={18} />
              <span>New Subscription</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-300">
              <CreditCard size={18} />
              <span>Update Payment</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow hover:bg-gray-300">
              <Download size={18} />
              <span>Download Invoice</span>
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-500 mt-12">
          © {new Date().getFullYear()} Subscribely. All rights reserved.
        </footer>
      </main>
    </div>
  );
};

export default DashboardPage;
