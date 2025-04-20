'use client'

import React, { useState, Fragment } from 'react'
import { BadgeCheck, Clock, FileText } from 'lucide-react'

const sampleInvoices = [
  {
    id: 1,
    shipment_identifier: 'LOG-3421',
    invoice_id: 'INV-20240412',
    due_date: '2025-04-30',
    sender_name: 'Oy Rakennusfirma',
    total_price: 129.99,
    payment_status: 'paid', // or 'not_paid'
  },
  {
    id: 2,
    shipment_identifier: 'LOG-3422',
    invoice_id: 'INV-20240413',
    due_date: '2025-04-25',
    sender_name: 'Tukkufirma Oy',
    total_price: 89.50,
    payment_status: 'not_paid',
  },
]

export default function InvoiceContent() {
  const [filterStatus, setFilterStatus] = useState('all')
  const [expandedInvoice, setExpandedInvoice] = useState(null)

  const filteredInvoices = sampleInvoices.filter((invoice) => {
    if (filterStatus === 'all') return true
    return invoice.payment_status === filterStatus
  })

  const handleFilterChange = (status) => {
    setFilterStatus(status)
  }

  const toggleInvoiceDetails = (invoiceId) => {
    if (expandedInvoice === invoiceId) {
      setExpandedInvoice(null)
    } else {
      setExpandedInvoice(invoiceId)
    }
  }

  const downloadInvoice = (invoiceId) => {
    console.log('Download:', invoiceId)
    // Your Supabase or file download logic here
  }

  const viewInvoiceDetails = (invoice) => {
    console.log('Details for:', invoice)
    // Could open a modal or navigate to detail view
  }

  return (
    <div className="p-4 rounded-xl bg-white/5 shadow-md backdrop-blur">
      <h3 className="text-xl font-semibold mb-6 text-white">Laskut</h3>


      <div className="flex gap-4 mb-6">
        <button
          onClick={() => handleFilterChange('all')}
          className={`px-4 py-2 rounded ${filterStatus === 'all' ? 'bg-blue-600' : 'bg-gray-700'} hover:bg-blue-700`}
        >
          Kaikki
        </button>
        <button
          onClick={() => handleFilterChange('paid')}
          className={`px-4 py-2 rounded ${filterStatus === 'paid' ? 'bg-green-600' : 'bg-gray-700'} hover:bg-green-700`}
        >
          Maksettu
        </button>
        <button
          onClick={() => handleFilterChange('not_paid')}
          className={`px-4 py-2 rounded ${filterStatus === 'not_paid' ? 'bg-red-600' : 'bg-gray-700'} hover:bg-red-700`}
        >
          Ei maksettu
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 rounded shadow-md">
          <thead className="text-left text-gray-400 bg-gray-900">
            <tr>
              <th className="py-3 px-4">Lasku ID</th>
              <th className="py-3 px-4">Tilaus</th>
              <th className="py-3 px-4">Asiakas</th>
              <th className="py-3 px-4">Eräpäivä</th>
              <th className="py-3 px-4">Yhteensä (€)</th>
              <th className="py-3 px-4">Tila</th>
              <th className="py-3 px-4">Toiminnot</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <Fragment key={invoice.id}>
                <tr
                  onClick={() => toggleInvoiceDetails(invoice.id)}
                  className="border-t border-gray-700 hover:bg-white/10 cursor-pointer"
                >
                  <td className="py-3 px-4">{invoice.invoice_id}</td>
                  <td className="py-3 px-4">{invoice.shipment_identifier}</td>
                  <td className="py-3 px-4">{invoice.sender_name}</td>
                  <td className="py-3 px-4">{new Date(invoice.due_date).toLocaleDateString()}</td>
                  <td className="py-3 px-4">{invoice.total_price.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                        ${invoice.payment_status === 'paid' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                    >
                      {invoice.payment_status === 'paid' ? (
                        <BadgeCheck size={14} />
                      ) : (
                        <Clock size={14} />
                      )}
                      {invoice.payment_status === 'paid' ? 'Maksettu' : 'Ei maksettu'}
                    </span>
                  </td>
                  <td className="py-3 px-4 space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        downloadInvoice(invoice.invoice_id)
                      }}
                      className="text-blue-400 hover:underline"
                    >
                      Lataa
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        viewInvoiceDetails(invoice)
                      }}
                      className="text-yellow-400 hover:underline"
                    >
                      Näytä
                    </button>
                  </td>
                </tr>

                {expandedInvoice === invoice.id && (
                  <tr className="bg-black text-white shadow-xl rounded-lg">
                    <td colSpan={7} className="px-4 py-6">
                      <div className="space-y-4 p-6 bg-opacity-80 backdrop-blur-md rounded-xl shadow-lg">
                        <h4 className="text-xl font-bold text-indigo-100">Lisätiedot</h4>
                        <p className="text-lg">
                          <strong>Tilausnumero:</strong> {invoice.shipment_identifier}
                        </p>
                        <p className="text-lg">
                          <strong>Lasku ID:</strong> {invoice.invoice_id}
                        </p>
                        <p className="text-lg">
                          <strong>Asiakas:</strong> {invoice.sender_name}
                        </p>
                        <p className="text-lg">
                          <strong>Eräpäivä:</strong> {new Date(invoice.due_date).toLocaleDateString()}
                        </p>
                        <p className="text-lg">
                          <strong>Yhteensä:</strong> {invoice.total_price.toFixed(2)} €
                        </p>
                        <p className="text-lg">
                          <strong>Tila:</strong>{' '}
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                              ${invoice.payment_status === 'paid' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                          >
                            {invoice.payment_status === 'paid' ? 'Maksettu' : 'Ei maksettu'}
                          </span>
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>

        {filteredInvoices.length === 0 && (
          <p className="text-center text-gray-500 mt-4">Ei laskuja tällä statuksella.</p>
        )}
      </div>
    </div>
  )
}