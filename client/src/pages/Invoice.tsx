import { useQuery } from "@apollo/client/react";
import { GET_INVOICES } from "../lib/api";
import type { Invoice } from "../lib/api";

export default function Invoices() {
  const { data } = useQuery<{ invoices: Invoice[] }>(GET_INVOICES);
  const invoices = data?.invoices || [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
        Invoices
      </h1>

      {invoices.length === 0 ? (
        <p className="text-gray-400 mt-4">No invoices found.</p>
      ) : (
        <table className="min-w-full bg-gray-900 text-white rounded-lg shadow mt-4">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-t border-gray-700">
                <td className="px-4 py-2">{inv.id}</td>
                <td className="px-4 py-2">${inv.amount}</td>
                <td className="px-4 py-2">{inv.date}</td>
                <td className={`px-4 py-2 font-semibold ${inv.status === "PAID" ? "text-emerald-400" : "text-red-500"}`}>
                  {inv.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
