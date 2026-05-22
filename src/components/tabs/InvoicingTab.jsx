import { useState, useEffect } from 'react';
import { DEMO_DATA } from '../../data/demoData';

export default function InvoicingTab() {
  const [invoices, setInvoices] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setInvoices(DEMO_DATA.invoices);
  }, []);

  const getAgeCategory = (daysOld) => {
    if (daysOld <= 0) return 'Current';
    if (daysOld <= 30) return '0-30 days';
    if (daysOld <= 60) return '30-60 days';
    if (daysOld <= 90) return '60-90 days';
    return '90+ days';
  };

  const filteredInvoices = invoices.filter(inv => {
    if (filter === 'outstanding') return inv.status === 'Outstanding';
    if (filter === 'paid') return inv.status === 'Paid';
    return true;
  });

  const totalOutstanding = filteredInvoices
    .filter(i => i.status === 'Outstanding')
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Outstanding</p>
          <p className="text-2xl font-bold text-lawn">${totalOutstanding.toFixed(2)}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Invoices</p>
          <p className="text-2xl font-bold">{filteredInvoices.length}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">This Month</p>
          <p className="text-2xl font-bold text-lawn">${filteredInvoices.slice(0, 3).reduce((s, i) => s + i.amount, 0).toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Invoice Management</h3>
        
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-lawn text-white' : 'btn-secondary'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('outstanding')}
            className={`px-4 py-2 rounded-lg ${filter === 'outstanding' ? 'bg-lawn text-white' : 'btn-secondary'}`}
          >
            Outstanding
          </button>
          <button
            onClick={() => setFilter('paid')}
            className={`px-4 py-2 rounded-lg ${filter === 'paid' ? 'bg-lawn text-white' : 'btn-secondary'}`}
          >
            Paid
          </button>
        </div>

        <div className="space-y-3">
          {filteredInvoices.map(invoice => (
            <div key={invoice.id} className="bg-slate-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">{invoice.customerName}</h4>
                  <p className="text-gray-400 text-sm">Invoice #{invoice.number}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  invoice.status === 'Paid' ? 'bg-lawn text-white' : 'bg-yellow-900 text-yellow-200'
                }`}>
                  {invoice.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm">{getAgeCategory(invoice.daysOld)}</p>
                <p className="font-semibold text-lawn">${invoice.amount.toFixed(2)}</p>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 btn-primary text-sm">View</button>
                {invoice.status === 'Outstanding' && (
                  <>
                    <button className="flex-1 btn-secondary text-sm">Send Reminder</button>
                    <button className="flex-1 bg-green-700 text-white hover:bg-green-800 rounded-lg text-sm font-semibold">Mark Paid</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
