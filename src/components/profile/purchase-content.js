const PurchasesContent = ({ purchases, handleViewInvoice }) => {
    return (
      <div>
        <h3 className="text-lg font-bold mb-4">Ostot</h3>
        {purchases.length > 0 ? (
          <table className="w-full table-auto text-sm text-center">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-4 py-3">Päivämäärä</th>
                <th className="px-4 py-3">Viite</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Summa</th>
                <th className="px-4 py-3">Kuitti</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr
                  key={purchase.id}
                  className="bg-[rgba(0,0,0,0.37)] hover:bg-gray-600 transition duration-200 divide-x"
                >
                  <td className="px-4 py-3">
                    {purchase.purchase_date ? new Date(purchase.purchase_date).toLocaleDateString('fi-FI') : '-'}
                  </td>
                  <td className="px-4 py-3">{purchase.reference || '-'}</td>
                  <td className="px-4 py-3">
                    {purchase.status === 'paid'
                      ? 'Maksettu'
                      : purchase.status === 'Odottaa noutoa'
                      ? 'Odottaa noutoa'
                      : '—'}
                  </td>
                  <td className="px-4 py-3">
                    {purchase.amount != null ? `${purchase.amount} EUR` : '—'}
                  </td>
                  <td className="px-4 py-3">
                    {purchase.invoice_url ? (
                      <button
                        onClick={() => handleViewInvoice(purchase.invoice_url)}
                        className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                      >
                        Näytä kuitti
                      </button>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-gray-400">Ei ostotietoja.</p>
        )}
      </div>
    );
  };
  
  export default PurchasesContent;