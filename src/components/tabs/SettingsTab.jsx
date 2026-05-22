import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function SettingsTab() {
  const [businessInfo, setBusinessInfo] = useState({
    businessName: 'Mowing by Cody',
    owner: 'Cody Hiatt',
    phone: '479-228-6770',
    email: 'hiatt.codya@gmail.com',
    address: 'Northwest Arkansas',
    website: 'www.mowingbycody.com',
  });

  const [miaSettings, setMiaSettings] = useState({
    assistantName: 'MIA',
    welcomeGreeting: 'Hi! Ready to book your lawn care?',
    language: 'EN',
    voice: 'female',
    cancellationPolicy: 'Free cancellation up to 24 hours before service',
    hours: 'Mon-Sat 7AM-6PM',
    afterHoursMessage: 'Outside service hours. We\'ll respond ASAP.',
  });

  const [services, setServices] = useState([
    { id: 1, name: 'Lawn Mowing', price: '$45-85' },
    { id: 2, name: 'Fertilization', price: '$65-120' },
    { id: 3, name: 'Weed Control', price: '$55-95' },
    { id: 4, name: 'Leaf Cleanup', price: '$75-150' },
    { id: 5, name: 'Irrigation Winterization', price: '$85-125' },
    { id: 6, name: 'Spring Startup', price: '$75-110' },
  ]);

  const [qrValue, setQrValue] = useState('https://dralanhiatt-source.github.io/lawndesk/book');

  const handleBusinessUpdate = () => {
    alert('Business info saved!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Business Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Business Name</label>
            <input
              type="text"
              value={businessInfo.businessName}
              onChange={(e) => setBusinessInfo({...businessInfo, businessName: e.target.value})}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Owner Name</label>
            <input
              type="text"
              value={businessInfo.owner}
              onChange={(e) => setBusinessInfo({...businessInfo, owner: e.target.value})}
              className="w-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Phone</label>
              <input
                type="tel"
                value={businessInfo.phone}
                onChange={(e) => setBusinessInfo({...businessInfo, phone: e.target.value})}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <input
                type="email"
                value={businessInfo.email}
                onChange={(e) => setBusinessInfo({...businessInfo, email: e.target.value})}
                className="w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Service Area</label>
            <input
              type="text"
              value={businessInfo.address}
              onChange={(e) => setBusinessInfo({...businessInfo, address: e.target.value})}
              className="w-full"
            />
          </div>
          <button onClick={handleBusinessUpdate} className="w-full btn-primary">Save Changes</button>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">MIA Assistant Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Assistant Name</label>
            <input
              type="text"
              value={miaSettings.assistantName}
              onChange={(e) => setMiaSettings({...miaSettings, assistantName: e.target.value})}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Welcome Greeting</label>
            <textarea
              value={miaSettings.welcomeGreeting}
              onChange={(e) => setMiaSettings({...miaSettings, welcomeGreeting: e.target.value})}
              className="w-full"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Language</label>
              <select
                value={miaSettings.language}
                onChange={(e) => setMiaSettings({...miaSettings, language: e.target.value})}
                className="w-full"
              >
                <option value="EN">English</option>
                <option value="ES">Español</option>
                <option value="BOTH">Both</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Voice</label>
              <select
                value={miaSettings.voice}
                onChange={(e) => setMiaSettings({...miaSettings, voice: e.target.value})}
                className="w-full"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Business Hours</label>
            <input
              type="text"
              value={miaSettings.hours}
              onChange={(e) => setMiaSettings({...miaSettings, hours: e.target.value})}
              className="w-full"
            />
          </div>
          <button className="w-full btn-primary">Save Settings</button>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Services & Pricing</h3>
        <div className="space-y-3 mb-4">
          {services.map(svc => (
            <div key={svc.id} className="bg-slate-700 rounded-lg p-3 flex justify-between items-center">
              <span className="font-semibold">{svc.name}</span>
              <div className="flex gap-2">
                <span className="text-lawn">{svc.price}</span>
                <button className="btn-secondary text-sm">Edit</button>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full btn-primary">Add Service</button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Booking Link & QR Code</h3>
        <div className="bg-slate-700 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-400 mb-2">Booking URL:</p>
          <input
            type="text"
            value={qrValue}
            readOnly
            className="w-full bg-slate-600"
          />
          <button className="mt-2 w-full btn-secondary">Copy Link</button>
        </div>
        <div className="flex justify-center bg-white rounded-lg p-4 mb-4">
          <QRCodeSVG value={qrValue} size={200} />
        </div>
        <button className="w-full btn-primary">Download QR Code</button>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Account</h3>
        <div className="space-y-2">
          <button className="w-full btn-secondary">Connected Services</button>
          <button className="w-full btn-secondary">Subscription Plans</button>
          <button className="w-full btn-secondary">Export Data</button>
          <button className="w-full btn-danger">Delete Account</button>
        </div>
      </div>
    </div>
  );
}
