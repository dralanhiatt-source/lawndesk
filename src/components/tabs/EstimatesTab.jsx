import { useState } from 'react';

export default function EstimatesTab() {
  const [estimates, setEstimates] = useState([
    {
      id: 1,
      customerName: 'John Smith',
      address: '123 Main St',
      date: '2026-05-18',
      services: [{ name: 'Lawn Mowing', qty: 1, unitPrice: 65, total: 65 }],
      total: 65,
      status: 'Pending',
      notes: 'Large property',
    },
    {
      id: 2,
      customerName: 'Sarah Johnson',
      address: '456 Oak Ave',
      date: '2026-05-17',
      services: [{ name: 'Fertilization', qty: 1, unitPrice: 85, total: 85 }],
      total: 85,
      status: 'Accepted',
      notes: 'Needs weed control too',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newEstimate, setNewEstimate] = useState({
    customerName: '',
    address: '',
    services: [],
    notes: '',
  });

  const serviceOptions = [
    { name: 'Lawn Mowing', defaultPrice: 65 },
    { name: 'Edging/Trimming', defaultPrice: 35 },
    { name: 'Fertilization', defaultPrice: 85 },
    { name: 'Weed Control', defaultPrice: 75 },
    { name: 'Leaf Cleanup', defaultPrice: 100 },
    { name: 'Mulching', defaultPrice: 120 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Estimates</p>
          <p className="text-2xl font-bold">{estimates.length}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">{estimates.filter(e => e.status === 'Pending').length}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Value</p>
          <p className="text-2xl font-bold text-lawn">${estimates.reduce((s, e) => s + e.total, 0).toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Create New Estimate</h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : 'New Estimate'}
          </button>
        </div>

        {showForm && (
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Customer Name"
              className="w-full"
              value={newEstimate.customerName}
              onChange={(e) => setNewEstimate({...newEstimate, customerName: e.target.value})}
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full"
              value={newEstimate.address}
              onChange={(e) => setNewEstimate({...newEstimate, address: e.target.value})}
            />
            <select className="w-full">
              <option>Add Service...</option>
              {serviceOptions.map(s => <option key={s.name} value={s.name}>{s.name} - ${s.defaultPrice}</option>)}
            </select>
            <textarea
              placeholder="Notes"
              className="w-full"
              value={newEstimate.notes}
              onChange={(e) => setNewEstimate({...newEstimate, notes: e.target.value})}
              rows={3}
            />
            <button type="submit" className="w-full btn-primary">Create Estimate</button>
          </form>
        )}
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Estimates</h3>
        <div className="space-y-3">
          {estimates.map(est => (
            <div key={est.id} className="bg-slate-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">{est.customerName}</h4>
                  <p className="text-gray-400 text-sm">{est.address}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  est.status === 'Accepted' ? 'bg-lawn text-white' : 'bg-yellow-900 text-yellow-200'
                }`}>
                  {est.status}
                </span>
              </div>
              <div className="mb-3">
                {est.services.map((svc, idx) => (
                  <p key={idx} className="text-gray-400 text-sm">{svc.name}: ${svc.total}</p>
                ))}
              </div>
              <div className="flex justify-between items-center mb-3">
                <p className="text-lawn font-semibold">Total: ${est.total}</p>
                <p className="text-gray-400 text-sm">{est.date}</p>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 btn-primary text-sm">View</button>
                <button className="flex-1 btn-secondary text-sm">Send</button>
                {est.status === 'Accepted' && <button className="flex-1 bg-green-700 text-white hover:bg-green-800 rounded-lg text-sm font-semibold">Convert to Job</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
