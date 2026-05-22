import { useState, useEffect } from 'react';
import { DEMO_DATA } from '../../data/demoData';

export default function EmployeesTab() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    setEmployees(DEMO_DATA.employees);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Employees</p>
          <p className="text-2xl font-bold">{employees.length}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Certifications Due</p>
          <p className="text-2xl font-bold text-yellow-400">1</p>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Add Employee</h3>
        <form className="space-y-4">
          <input type="text" placeholder="Name" className="w-full" />
          <input type="email" placeholder="Email" className="w-full" />
          <input type="tel" placeholder="Phone" className="w-full" />
          <input type="date" placeholder="Hire Date" className="w-full" />
          <input type="text" placeholder="Emergency Contact" className="w-full" />
          <button type="submit" className="w-full btn-primary">Add Employee</button>
        </form>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Employee Directory</h3>
        <div className="space-y-3">
          {employees.map(emp => (
            <div
              key={emp.id}
              className="bg-slate-700 rounded-lg p-4 cursor-pointer hover:bg-slate-600"
              onClick={() => setSelectedEmployee(selectedEmployee?.id === emp.id ? null : emp)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{emp.name}</h4>
                  <p className="text-gray-400 text-sm">Hired: {emp.hireDate}</p>
                </div>
                <span className="text-lawn">▼</span>
              </div>

              {selectedEmployee?.id === emp.id && (
                <div className="mt-4 pt-4 border-t border-slate-600 space-y-2 text-sm">
                  <p><span className="text-lawn">Email:</span> {emp.email}</p>
                  <p><span className="text-lawn">Phone:</span> {emp.phone}</p>
                  <p><span className="text-lawn">Emergency Contact:</span> {emp.emergencyContact}</p>
                  <div className="mt-3">
                    <p className="text-lawn font-semibold mb-2">Certifications:</p>
                    {emp.certifications?.map((cert, idx) => (
                      <div key={idx} className="bg-slate-600 rounded p-2 mb-1">
                        <p className="font-semibold">{cert.type}</p>
                        <p className="text-gray-400 text-xs">Expires: {cert.expiration}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 btn-primary text-sm">Edit</button>
                    <button className="flex-1 btn-secondary text-sm">Clock In/Out</button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
