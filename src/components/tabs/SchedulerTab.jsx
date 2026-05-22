export default function SchedulerTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Weekly Scheduler</h2>
      <div className="grid grid-cols-7 gap-2">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="bg-slate-800 border border-slate-700 rounded-lg p-4 text-center">
            <h4 className="font-semibold text-lawn">{day}</h4>
            <p className="text-gray-400 text-sm mt-2">0 jobs</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Add Manual Job</h3>
        <form className="space-y-4">
          <input type="text" placeholder="Customer Name" className="w-full" />
          <input type="text" placeholder="Address" className="w-full" />
          <input type="date" className="w-full" />
          <input type="time" placeholder="Start Time" className="w-full" />
          <select className="w-full">
            <option>Select Service</option>
            <option>Lawn Mowing</option>
            <option>Edging/Trimming</option>
            <option>Fertilization</option>
          </select>
          <button type="submit" className="w-full btn-primary">Add Job</button>
        </form>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Recurring Jobs Setup</h3>
        <form className="space-y-4">
          <select className="w-full">
            <option>Select Frequency</option>
            <option>Weekly</option>
            <option>Biweekly</option>
            <option>Monthly</option>
            <option>Seasonal</option>
          </select>
          <input type="text" placeholder="Customer Name" className="w-full" />
          <button type="submit" className="w-full btn-primary">Setup Recurring</button>
        </form>
      </div>
    </div>
  );
}
