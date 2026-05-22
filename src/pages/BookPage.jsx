import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function BookPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedServices: [],
    preferredDay: '',
    propertyDescription: '',
    name: '',
    phone: '',
    email: '',
    address: '',
  });

  const services = [
    { id: 1, name: 'Lawn Mowing', price: '$45-85' },
    { id: 2, name: 'Edging/Trimming', price: 'Included' },
    { id: 3, name: 'Fertilization', price: '$65-120' },
    { id: 4, name: 'Weed Control', price: '$55-95' },
    { id: 5, name: 'Leaf Cleanup', price: '$75-150' },
    { id: 6, name: 'Mulching', price: '$85-200' },
    { id: 7, name: 'Irrigation Winterization', price: '$85-125' },
    { id: 8, name: 'Spring Startup', price: '$75-110' },
    { id: 9, name: 'Irrigation Repair', price: '$75/hr + parts' },
    { id: 10, name: 'Backflow Inspection', price: '$65' },
  ];

  const handleServiceToggle = (serviceId) => {
    setFormData({
      ...formData,
      selectedServices: formData.selectedServices.includes(serviceId)
        ? formData.selectedServices.filter(id => id !== serviceId)
        : [...formData.selectedServices, serviceId],
    });
  };

  const handleSubmit = () => {
    alert('Booking submitted! Mowing by Cody will contact you shortly.');
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-lawn text-white p-6 text-center">
          <h1 className="text-4xl font-bold">Mowing by Cody</h1>
          <p className="mt-2 text-green-100">Book Your Lawn Care Service</p>
        </div>

        <div className="p-6">
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Select Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map(service => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceToggle(service.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      formData.selectedServices.includes(service.id)
                        ? 'border-lawn bg-green-50'
                        : 'border-gray-300 hover:border-lawn'
                    }`}
                  >
                    <div className="font-semibold text-slate-900">{service.name}</div>
                    <div className="text-sm text-lawn font-bold">{service.price}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={formData.selectedServices.length === 0}
                className="w-full bg-lawn text-white font-bold py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
              >
                Next: Schedule
              </button>
            </div>
          )}

          {/* Step 2: Schedule & Property Info */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Preferred Day & Property</h2>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Day</label>
                <select
                  value={formData.preferredDay}
                  onChange={(e) => setFormData({...formData, preferredDay: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3"
                >
                  <option value="">Select a day...</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Property Description</label>
                <textarea
                  value={formData.propertyDescription}
                  onChange={(e) => setFormData({...formData, propertyDescription: e.target.value})}
                  placeholder="Gate code, dogs, parking notes, mower size needed, etc."
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3"
                  rows={4}
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border-2 border-lawn text-lawn font-bold py-3 rounded-lg hover:bg-green-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-lawn text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Next: Contact Info
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact Information */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Information</h2>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 border-2 border-lawn text-lawn font-bold py-3 rounded-lg hover:bg-green-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.phone || !formData.address}
                  className="flex-1 bg-lawn text-white font-bold py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                >
                  Submit Booking
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {step === 4 && (
            <div className="text-center space-y-6">
              <div className="text-6xl">✅</div>
              <h2 className="text-3xl font-bold text-slate-900">Booking Submitted!</h2>
              <p className="text-xl text-slate-700">
                MIA will text you shortly to confirm your appointment.
              </p>
              <div className="bg-green-50 border-2 border-lawn rounded-lg p-6 space-y-4">
                <h3 className="font-semibold text-slate-900">Share This Booking Link</h3>
                <input
                  type="text"
                  value="https://dralanhiatt-source.github.io/lawndesk/book"
                  readOnly
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-sm"
                />
                <div className="flex justify-center">
                  <QRCodeSVG value="https://dralanhiatt-source.github.io/lawndesk/book" size={150} />
                </div>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-lawn text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                New Booking
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
