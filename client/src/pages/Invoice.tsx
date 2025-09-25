export default function Invoices() {
  const { data, loading, error } = useQuery(GET_INVOICES);

  if (loading) return <p className="text-gray-400 p-6">Loading invoices...</p>;
  if (error) return <p className="text-red-500 p-6">Error fetching invoices: {error.message}</p>;

  // ✅ flatten invoices from all subscriptions
  const invoices: Invoice[] =
    data?.me?.subscriptions?.flatMap((sub: any) => sub.invoices || []) || [];

  return (
    <div className="p-6 space-y-6">
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
              <th className="px-4 py-2 text-left">Plan</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">PDF</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-t border-gray-700">
                <td className="px-4 py-2">{inv.id}</td>
                <td className="px-4 py-2">{inv.subscription?.plan?.name || "-"}</td>
                <td className="px-4 py-2">${inv.amount.toFixed(2)}</td>
                <td className="px-4 py-2">{new Date(inv.createdAt).toLocaleDateString()}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    inv.subscription?.status === "ACTIVE" ? "text-emerald-400" : "text-red-500"
                  }`}
                >
                  {inv.subscription?.status || "-"}
                </td>
                <td className="px-4 py-2">
                  {inv.pdfUrl ? (
                    <a
                      href={inv.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-400 hover:underline"
                    >
                      View PDF
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}