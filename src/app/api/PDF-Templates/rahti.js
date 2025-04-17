import React from "react";

const FreightLog = () => {
  // Dummy data
  const freightLogs = [
    {
      id: "FL12345",
      customer: "John Doe",
      pickup: "Helsinki, Finland",
      delivery: "Tampere, Finland",
      status: "Pending",
      date: "2024-11-20",
    },
    {
      id: "FL12346",
      customer: "Jane Smith",
      pickup: "Espoo, Finland",
      delivery: "Oulu, Finland",
      status: "In Transit",
      date: "2024-11-19",
    },
    {
      id: "FL12347",
      customer: "Acme Corp.",
      pickup: "Turku, Finland",
      delivery: "Vaasa, Finland",
      status: "Delivered",
      date: "2024-11-18",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Freight Log</h1>

        {/* Filter Section */}
        <div className="mb-4 flex justify-between items-center">
          <input
            type="text"
            placeholder="Search by customer or ID"
            className="border border-gray-300 rounded-lg p-2 w-full md:w-1/3"
          />
          <select
            className="border border-gray-300 rounded-lg p-2 w-full md:w-1/4 ml-2"
          >
            <option value="">Filter by Status</option>
            <option value="Pending">Pending</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        {/* Freight Log Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="border border-gray-200 p-2">ID</th>
                <th className="border border-gray-200 p-2">Customer</th>
                <th className="border border-gray-200 p-2">Pickup</th>
                <th className="border border-gray-200 p-2">Delivery</th>
                <th className="border border-gray-200 p-2">Status</th>
                <th className="border border-gray-200 p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {freightLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-100">
                  <td className="border border-gray-200 p-2">{log.id}</td>
                  <td className="border border-gray-200 p-2">{log.customer}</td>
                  <td className="border border-gray-200 p-2">{log.pickup}</td>
                  <td className="border border-gray-200 p-2">{log.delivery}</td>
                  <td
                    className={`border border-gray-200 p-2 font-semibold ${
                      log.status === "Pending"
                        ? "text-yellow-600"
                        : log.status === "In Transit"
                        ? "text-blue-600"
                        : "text-green-600"
                    }`}
                  >
                    {log.status}
                  </td>
                  <td className="border border-gray-200 p-2">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FreightLog;
