import { useState, useEffect } from 'react';
import TodayTab from '../components/tabs/TodayTab';
import SchedulerTab from '../components/tabs/SchedulerTab';
import CustomersTab from '../components/tabs/CustomersTab';
import InvoicingTab from '../components/tabs/InvoicingTab';
import IrrigationTab from '../components/tabs/IrrigationTab';
import ExpensesTab from '../components/tabs/ExpensesTab';
import EmployeesTab from '../components/tabs/EmployeesTab';
import EstimatesTab from '../components/tabs/EstimatesTab';
import ReportsTab from '../components/tabs/ReportsTab';
import SettingsTab from '../components/tabs/SettingsTab';
import '../styles/Dashboard.css';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(0);
  const [pinSet, setPinSet] = useState(false);
  const [pin, setPin] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [businessData, setBusinessData] = useState({
    businessName: 'Mowing by Cody',
    businessLogo: null,
  });

  useEffect(() => {
    const storedPin = localStorage.getItem('lawndesk_pin');
    const isAuth = localStorage.getItem('lawndesk_auth');
    setPinSet(!!storedPin);
    setAuthenticated(!!isAuth);
  }, []);

  const handleSetPin = () => {
    if (pin.length === 4 && /^\d+$/.test(pin)) {
      localStorage.setItem('lawndesk_pin', pin);
      localStorage.setItem('lawndesk_auth', 'true');
      setPinSet(true);
      setAuthenticated(true);
      setPin('');
    } else {
      alert('PIN must be 4 digits');
    }
  };

  const handleAuthPin = () => {
    const storedPin = localStorage.getItem('lawndesk_pin');
    if (pin === storedPin) {
      localStorage.setItem('lawndesk_auth', 'true');
      setAuthenticated(true);
      setPin('');
    } else {
      alert('Invalid PIN');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('lawndesk_auth');
    setAuthenticated(false);
    setPin('');
  };

  if (!authenticated) {
    return (
      <div className="dashboard-container">
        <div className="auth-screen">
          <div className="auth-card">
            <h1 className="text-lawn font-bold text-4xl mb-6">LawnDesk</h1>
            <p className="mb-4 text-gray-300">Business: {businessData.businessName}</p>
            
            {!pinSet ? (
              <div>
                <h2 className="mb-4">Set Dashboard PIN</h2>
                <input
                  type="password"
                  maxLength="4"
                  placeholder="Enter 4-digit PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full mb-4 text-center text-2xl tracking-widest"
                />
                <button
                  onClick={handleSetPin}
                  className="w-full btn-primary"
                >
                  Set PIN
                </button>
              </div>
            ) : (
              <div>
                <h2 className="mb-4">Enter PIN to Continue</h2>
                <input
                  type="password"
                  maxLength="4"
                  placeholder="Enter PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full mb-4 text-center text-2xl tracking-widest"
                />
                <button
                  onClick={handleAuthPin}
                  className="w-full btn-primary"
                >
                  Unlock
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { name: '📅 Today', component: TodayTab },
    { name: '📆 Scheduler', component: SchedulerTab },
    { name: '👥 Customers', component: CustomersTab },
    { name: '📋 Invoicing', component: InvoicingTab },
    { name: '💧 Irrigation', component: IrrigationTab },
    { name: '💰 Expenses', component: ExpensesTab },
    { name: '👔 Employees', component: EmployeesTab },
    { name: '✏️ Estimates', component: EstimatesTab },
    { name: '📊 Reports', component: ReportsTab },
    { name: '⚙️ Settings', component: SettingsTab },
  ];

  const ActiveTabComponent = tabs[activeTab].component;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="text-lawn font-bold">{businessData.businessName}</h1>
        <button
          onClick={handleLogout}
          className="btn-secondary text-sm"
        >
          Logout
        </button>
      </div>

      <div className="tabs-nav">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`tab-button ${activeTab === idx ? 'tab-active' : ''}`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="tabs-content">
        <ActiveTabComponent />
      </div>
    </div>
  );
}
