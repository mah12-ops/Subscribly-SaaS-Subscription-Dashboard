import React, { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_INVOICES } from "../lib/api";
import type { Invoice } from "../lib/api";

export default function Invoices() {
  const { data, loading, error, refetch } = useQuery<{ invoices: Invoice[] }>(GET_INVOICES);
  const [refreshing, setRefreshing] = useState(false);
  const invoices = data?.invoices || [];

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (err) {
      console.error("Error refreshing invoices:", err);
    } finally {
      setRefreshing(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return "Invalid Date";
    }
  };

  const formatAmount = (amount: number) => {
    try {
      return `$${amount.toFixed(2)}`;
    } catch {
      return "$0.00";
    }
  };

  if (loading) return <p className="text-gray-400 p-6">Loading invoices...</p>;
  
  if (error) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Invoices
        </h1>
        <div className="bg-red-900/50 text-red-300 p-4 rounded-lg border border-red-700">
          <p className="font-semibold">Error fetching invoices:</p>
          <p>{error.message}</p>
          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition disabled:opacity-50"
          >
            {refreshing ? "Retrying..." : "Try Again"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
          Invoices
        </h1>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {invoices.length === 0 ? (
        <div className="bg-gray-900 p-8 rounded-xl text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-400 text-lg">No invoices found</p>
          <p className="text-gray-500 text-sm mt-2">Your invoices will appear here once you have active subscriptions</p>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-white">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Invoice ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {invoices.map((inv, index) => (
                  <tr key={inv.id || index} className="hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">
                      {inv.id ? `#${inv.id.slice(-8)}` : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">
                        {inv.subscription?.plan?.name || "Unknown Plan"}
                      </div>
                      {inv.subscription?.plan?.interval && (
                        <div className="text-xs text-gray-400">
                          {inv.subscription.plan.interval.toLowerCase()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                      {formatAmount(inv.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatDate(inv.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          inv.subscription?.status === "ACTIVE"
                            ? "bg-green-900/50 text-green-300 border border-green-700"
                            : inv.subscription?.status === "CANCELLED"
                            ? "bg-red-900/50 text-red-300 border border-red-700"
                            : "bg-gray-700 text-gray-300 border border-gray-600"
                        }`}
                      >
                        {inv.subscription?.status || "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {inv.pdfUrl ? (
                        <a
                          href={inv.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          PDF
                        </a>
                      ) : (
                        <span className="text-gray-500 text-xs">No PDF</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-gray-800 px-6 py-3 border-t border-gray-700">
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>Total invoices: {invoices.length}</span>
              <span>
                Total amount: {formatAmount(invoices.reduce((sum, inv) => sum + (inv.amount || 0), 0))}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
