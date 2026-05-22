import { useState, useEffect } from 'react';
import { DEMO_DATA } from '../../data/demoData';

export default function CustomersTab() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    setCustomers(DEMO_DATA.customers);
  }, []);

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Customer Database</h3>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
          />
          <button className="btn-primary">Import CSV</button>
          <button className="btn-secondary">Export CSV</button>
        </div>

        <div className="space-y-3">
          {filteredCustomers.length === 0 ? (
            <p className="text-gray-400">No customers found</p>
          ) : (
            filteredCustomers.map(customer => (
              <div
                key={customer.id}
                className="bg-slate-700 rounded-lg p-4 cursor-pointer hover:bg-slate-600 transition-colors"
                onClick={() => setSelectedCustomer(selectedCustomer?.id === customer.id ? null : customer)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{customer.name}</h4>
                    <p className="text-gray-400 text-sm">{customer.phone}</p>
                    <p className="text-gray-400 text-sm">{customer.address}</p>
                  </div>
                  {customer.isVip && <span className="text-yellow-400 font-semibold">★ VIP</span>}
                </div>

                {selectedCustomer?.id === customer.id && (
                  <div className="mt-4 pt-4 border-t border-slate-600 space-y-2 text-sm">
                    <p><span className="text-lawn">Email:</span> {customer.email}</p>
                    <p><span className="text-lawn">Property Notes:</span> {customer.propertyNotes}</p>
                    <p><span className="text-lawn">Irrigation:</span> {customer.irrigation ? 'Yes' : 'No'}</p>
                    <p><span className="text-lawn">Referral Source:</span> {customer.referralSource}</p>
                    {customer.birthday && <p><span className="text-lawn">Birthday:</span> {customer.birthday}</p>}
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 btn-primary text-sm">Edit</button>
                      <button className="flex-1 btn-secondary text-sm">History</button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
