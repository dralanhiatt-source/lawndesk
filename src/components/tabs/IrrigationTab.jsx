import { useState, useEffect } from 'react';
import { DEMO_DATA } from '../../data/demoData';

export default function IrrigationTab() {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    setProperties(DEMO_DATA.irrigationProperties);
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Total Properties</p>
          <p className="text-2xl font-bold">{properties.length}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-gray-400 text-sm">Backflow Inspections Due</p>
          <p className="text-2xl font-bold text-yellow-400">2</p>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Winterization Campaign</h3>
        <button className="btn-primary">Send October Winterization Texts</button>
        <p className="text-gray-400 text-sm mt-2">Reaches {properties.length} customers with irrigation</p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Spring Startup Campaign</h3>
        <button className="btn-primary">Send March Startup Texts</button>
        <p className="text-gray-400 text-sm mt-2">Reaches {properties.length} customers with irrigation</p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Properties with Irrigation</h3>
        <div className="space-y-3">
          {properties.map(prop => (
            <div
              key={prop.id}
              className="bg-slate-700 rounded-lg p-4 cursor-pointer hover:bg-slate-600"
              onClick={() => setSelectedProperty(selectedProperty?.id === prop.id ? null : prop)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{prop.customerName}</h4>
                  <p className="text-gray-400 text-sm">{prop.address}</p>
                </div>
                <span className="text-lawn">▼</span>
              </div>

              {selectedProperty?.id === prop.id && (
                <div className="mt-4 pt-4 border-t border-slate-600 space-y-2 text-sm">
                  <p><span className="text-lawn">System Type:</span> {prop.systemType}</p>
                  <p><span className="text-lawn">Controller:</span> {prop.controllerBrand}</p>
                  <p><span className="text-lawn">Zones:</span> {prop.zones.join(', ')}</p>
                  <p><span className="text-lawn">Backflow Type:</span> {prop.backflow.type}</p>
                  <p><span className="text-lawn">Last Winterization:</span> {prop.lastWinterization || 'Never'}</p>
                  <p><span className="text-lawn">Last Startup:</span> {prop.lastStartup || 'Never'}</p>
                  <button className="mt-3 w-full btn-primary text-sm">Edit Property</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
