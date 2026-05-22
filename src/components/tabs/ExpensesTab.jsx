import { useState } from 'react';

export default function ExpensesTab() {
  const [expenses, setExpenses] = useState([
    { id: 1, date: '2026-05-20', category: 'Fuel', amount: 45.50, vendor: 'Shell', description: 'Gas', receipt: null },
    { id: 2, date: '2026-05-19', category: 'Equipment', amount: 120.00, vendor: 'Home Depot', description: 'New mower blade', receipt: null },
  ]);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: 'Fuel',
    amount: '',
    vendor: '',
    description: '',
  });

  const categories = ['Fuel', 'Maintenance', 'Insurance', 'Equipment', 'Supplies', 'Fertilizer', 'Irrigation Parts', 'Uniforms', 'Software', 'Education', 'Meals', 'Advertising', 'Subcontractors', 'Rent', 'Other'];

  const handleAddExpense = () => {
    if (formData.amount && formData.vendor) {
      setExpenses([...expenses, {
        id: expenses.length + 1,
        ...formData,
        amount: parseFloat(formData.amount),
      }]);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        category: 'Fuel',
        amount: '',
        vendor: '',
        description: '',
      });
    }
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const mileageExpenses = 2500 * 0.70; // Sample mileage

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Expenses</p>
          <p className="text-2xl font-bold text-lawn">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Mileage (Sample)</p>
          <p className="text-2xl font-bold text-lawn">${mileageExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Tax Estimate (Quarterly)</p>
          <p className="text-2xl font-bold text-yellow-400">$2,450</p>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Add Expense</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({...formData, date: e.target.value})}
            className="col-span-2"
          />
          <select
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
            className="col-span-2"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            step="0.01"
          />
          <input
            type="text"
            placeholder="Vendor"
            value={formData.vendor}
            onChange={(e) => setFormData({...formData, vendor: e.target.value})}
          />
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="col-span-2"
          />
          <button onClick={handleAddExpense} className="col-span-2 btn-primary">Add Expense</button>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Expenses</h3>
        <div className="space-y-2">
          {expenses.map(expense => (
            <div key={expense.id} className="bg-slate-700 rounded-lg p-3 flex justify-between items-center">
              <div>
                <p className="font-semibold">{expense.category}</p>
                <p className="text-gray-400 text-sm">{expense.vendor}</p>
              </div>
              <p className="font-semibold">${expense.amount.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Mileage Log</h3>
        <input type="number" placeholder="Miles driven today" className="w-full mb-4" />
        <p className="text-gray-400 text-sm mb-4">IRS Rate 2026: $0.70/mi</p>
        <button className="w-full btn-primary">Log Mileage</button>
      </div>
    </div>
  );
}
