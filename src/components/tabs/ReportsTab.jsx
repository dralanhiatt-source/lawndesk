import { PieChart, Pie, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ReportsTab() {
  const revenueByMonth = [
    { month: 'Jan', revenue: 4200 },
    { month: 'Feb', revenue: 3800 },
    { month: 'Mar', revenue: 5100 },
    { month: 'Apr', revenue: 4900 },
    { month: 'May', revenue: 5400 },
  ];

  const revenueByService = [
    { name: 'Lawn Mowing', value: 8500 },
    { name: 'Fertilization', value: 4200 },
    { name: 'Irrigation', value: 3100 },
    { name: 'Other', value: 2200 },
  ];

  const topCustomers = [
    { name: 'John Smith', revenue: 1200 },
    { name: 'Sarah Johnson', revenue: 950 },
    { name: 'Mike Davis', revenue: 850 },
    { name: 'Lisa Brown', revenue: 720 },
    { name: 'Tom Wilson', revenue: 650 },
  ];

  const COLORS = ['#16a34a', '#22c55e', '#84cc16', '#eab308'];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Revenue</p>
          <p className="text-2xl font-bold text-lawn">$18,000</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Jobs Completed</p>
          <p className="text-2xl font-bold">45</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Avg Job Value</p>
          <p className="text-2xl font-bold text-lawn">$400</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Customer Retention</p>
          <p className="text-2xl font-bold text-green-400">92%</p>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Revenue Trend (Monthly)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueByMonth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
        <button className="mt-4 btn-secondary">Export as PDF</button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Revenue by Service Type</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={revenueByService}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: $${value}`}
              outerRadius={100}
              fill="#16a34a"
              dataKey="value"
            >
              {revenueByService.map((entry, index) => (
                <Pie key={`pie-${index}`} dataKey="value" fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Top 5 Customers</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topCustomers}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="name" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
            <Bar dataKey="revenue" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Key Metrics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Completion Rate</p>
            <p className="text-2xl font-bold text-lawn">97.5%</p>
          </div>
          <div className="bg-slate-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Route Efficiency</p>
            <p className="text-2xl font-bold">2.5 mi/$100</p>
          </div>
          <div className="bg-slate-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Top Referral Source</p>
            <p className="text-lg font-bold">Google Reviews</p>
          </div>
          <div className="bg-slate-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm">Google Reviews</p>
            <p className="text-2xl font-bold text-yellow-400">4.8 ⭐</p>
          </div>
        </div>
      </div>
    </div>
  );
}
