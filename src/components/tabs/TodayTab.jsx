import { useState, useEffect } from 'react';
import { DEMO_DATA } from '../../data/demoData';

export default function TodayTab() {
  const [jobs, setJobs] = useState([]);
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    const todayJobs = DEMO_DATA.jobs.filter(job => {
      const jobDate = new Date(job.date);
      const today = new Date();
      return jobDate.toDateString() === today.toDateString();
    }).sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

    setJobs(todayJobs);

    const todayRevenue = todayJobs
      .filter(j => j.status === 'Complete')
      .reduce((sum, j) => sum + j.price, 0);
    setRevenue(todayRevenue);
  }, []);

  const updateJobStatus = (jobId, newStatus) => {
    const updated = jobs.map(j => j.id === jobId ? { ...j, status: newStatus } : j);
    setJobs(updated);
  };

  const getStatusColor = (status) => {
    const colors = {
      'Scheduled': 'bg-blue-900 text-blue-200',
      'En Route': 'bg-yellow-900 text-yellow-200',
      'In Progress': 'bg-purple-900 text-purple-200',
      'Complete': 'bg-lawn text-white',
      'Cancelled': 'bg-red-900 text-red-200',
    };
    return colors[status] || 'bg-slate-700 text-gray-300';
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h2 className="text-2xl mb-2">Today's Revenue</h2>
        <p className="text-4xl font-bold text-lawn">${revenue.toFixed(2)}</p>
        <p className="text-gray-400 text-sm mt-2">{jobs.filter(j => j.status === 'Complete').length} jobs completed</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Scheduled Jobs</h3>
        {jobs.length === 0 ? (
          <p className="text-gray-400">No jobs scheduled for today</p>
        ) : (
          jobs.map(job => (
            <div key={job.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-lg">{job.customerName}</h4>
                  <p className="text-gray-400 text-sm">{job.address}</p>
                  <p className="text-lawn font-semibold">{job.service}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(job.status)}`}>
                  {job.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-400">
                <div>
                  <p className="font-semibold text-white">Time</p>
                  <p>{job.startTime} - {job.endTime}</p>
                </div>
                <div>
                  <p className="font-semibold text-white">Price</p>
                  <p className="text-lawn font-semibold">${job.price}</p>
                </div>
              </div>

              <div className="flex gap-2">
                {job.status !== 'Complete' && job.status !== 'Cancelled' && (
                  <>
                    <button
                      onClick={() => updateJobStatus(job.id, 'In Progress')}
                      className="flex-1 btn-primary text-sm"
                    >
                      Start Job
                    </button>
                    <button
                      onClick={() => updateJobStatus(job.id, 'Complete')}
                      className="flex-1 bg-green-700 text-white hover:bg-green-800 rounded-lg px-3 py-2 text-sm font-semibold"
                    >
                      Complete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
