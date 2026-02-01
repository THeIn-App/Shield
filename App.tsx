
import React, { useState, useEffect } from 'react';
import { ShieldKey, PenaltyEvent, Stats, TierType } from './types';
import { INITIAL_KEYS, INITIAL_PENALTIES, PAYPAL_TIERS } from './constants';
import StatCard from './components/StatCard';
import RevenueChart from './components/RevenueChart';
import KeyTable from './components/KeyTable';
import PenaltyFeed from './components/PenaltyFeed';
import TierCard from './components/TierCard';
import { getSecurityAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [keys, setKeys] = useState<ShieldKey[]>(INITIAL_KEYS);
  const [penalties, setPenalties] = useState<PenaltyEvent[]>(INITIAL_PENALTIES);
  const [advice, setAdvice] = useState<string>("Analyzing your security posture...");
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tiers' | 'logs'>('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const stats: Stats = {
    totalRevenue: keys.reduce((acc, k) => acc + k.revenue, 0),
    activeKeys: keys.filter(k => k.status === 'active').length,
    penaltiesApplied: penalties.length,
    blockedAttempts: penalties.length * 8
  };

  useEffect(() => {
    const fetchAdvice = async () => {
      const msg = await getSecurityAdvice(stats);
      setAdvice(msg);
    };
    fetchAdvice();
  }, [stats.totalRevenue]);

  const handleRevoke = (id: string) => {
    setKeys(prev => prev.map(k => k.id === id ? { ...k, status: 'revoked' as const } : k));
  };

  const createShieldKey = () => {
    const name = prompt("Key Reference Name (e.g., 'Production Search API'):");
    if (!name) return;
    const raw = prompt("Raw API Key to protect:");
    if (!raw) return;
    
    const tierInput = prompt("Select Tier: TRIAL, STUDENT, PRO, ENTERPRISE (Default: PRO)")?.toUpperCase() as TierType;
    const tier = PAYPAL_TIERS[tierInput] ? tierInput : 'PRO';
    const config = PAYPAL_TIERS[tier];

    const newKey: ShieldKey = {
      id: `k${Date.now()}`,
      name,
      shieldKey: `IAD_${tier}_${Math.random().toString(16).slice(2, 10)}`,
      rawKey: raw,
      tier,
      penaltyMultiplier: config.multiplier,
      usageCount: 0,
      revenue: 0,
      createdAt: Date.now(),
      status: 'active'
    };
    setKeys(prev => [newKey, ...prev]);
  };

  return (
    <div className="flex min-h-screen bg-[#0b0e14]">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 bg-[#0d1117] border-r border-gray-800 transition-all duration-300 z-50 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex flex-col h-full">
          <div className="p-6 flex items-center gap-3 border-b border-gray-800 h-20">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white flex-shrink-0 animate-glow">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            {isSidebarOpen && <span className="text-xl font-extrabold tracking-tighter text-white">IAD PayShield</span>}
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: 'fa-gauge-high' },
              { id: 'tiers', label: 'PayPal Tiers', icon: 'fa-box-open' },
              { id: 'logs', label: 'Violation Logs', icon: 'fa-receipt' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-emerald-500/10 text-emerald-400' : 'text-gray-500 hover:text-gray-200 hover:bg-gray-800'}`}
              >
                <i className={`fa-solid ${item.icon} w-6 text-center text-lg`}></i>
                {isSidebarOpen && <span className="text-sm font-semibold">{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-800">
             <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full flex items-center justify-center text-gray-500 hover:text-white transition-all"
            >
              <i className={`fa-solid ${isSidebarOpen ? 'fa-angle-left' : 'fa-angle-right'} text-xl`}></i>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'} p-8`}>
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {activeTab === 'dashboard' ? 'Security Overview' : activeTab === 'tiers' ? 'Subscription Plans' : 'Violation Feed'}
            </h1>
            <p className="text-gray-500 font-medium">Monitoring {stats.activeKeys} active IAD safe keys</p>
          </div>
          <div className="flex items-center gap-4">
             <button 
              onClick={createShieldKey}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/20"
            >
              <i className="fa-solid fa-shield-cat"></i>
              Convert to Safe Key
            </button>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <>
            {/* AI Advisor */}
            <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                 <i className="fa-solid fa-robot text-white"></i>
              </div>
              <p className="text-sm font-medium text-emerald-100 italic">
                &quot;{advice}&quot;
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard label="Total Penalty Rev" value={`$${stats.totalRevenue.toFixed(2)}`} icon="fa-solid fa-hand-holding-dollar" color="emerald" trend="+15% wk" />
              <StatCard label="Active IAD Keys" value={stats.activeKeys} icon="fa-solid fa-key" color="blue" />
              <StatCard label="Live Penalties" value={stats.penaltiesApplied} icon="fa-solid fa-bolt" color="amber" trend="Active" />
              <StatCard label="Security Blocks" value={stats.blockedAttempts} icon="fa-solid fa-user-shield" color="rose" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-8">
                <div className="p-6 bg-[#161b22] border border-gray-800 rounded-2xl">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                    <i className="fa-solid fa-chart-area text-emerald-500"></i> Revenue Trend
                  </h3>
                  <RevenueChart />
                </div>
                <div className="p-6 bg-[#161b22] border border-gray-800 rounded-2xl">
                  <h3 className="text-lg font-bold text-white mb-6">Safe Key Inventory</h3>
                  <KeyTable keys={keys} onRevoke={handleRevoke} />
                </div>
              </div>
              <div className="xl:col-span-1">
                <div className="p-6 bg-[#161b22] border border-gray-800 rounded-2xl sticky top-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-white">Real-time Violations</h3>
                    <span className="animate-pulse w-2 h-2 rounded-full bg-rose-500"></span>
                  </div>
                  <PenaltyFeed penalties={penalties} />
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'tiers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(PAYPAL_TIERS).map((tier) => (
              <TierCard key={tier.name} config={tier} isActive={tier.name === 'PRO'} />
            ))}
            <div className="lg:col-span-4 p-8 rounded-2xl border border-blue-500/20 bg-blue-500/5 mt-8">
               <div className="flex items-start gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-3xl text-white">
                    <i className="fa-brands fa-paypal"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">PayPal Merchant Integration</h3>
                    <p className="text-gray-400 max-w-2xl mb-4">
                      Your IAD PayShield account is connected to <strong>ps_merchant_8892</strong>. 
                      70% of all penalty revenue is settled directly to your PayPal account every 24 hours.
                    </p>
                    <div className="flex gap-4">
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-bold text-sm">Update Credentials</button>
                      <button className="px-4 py-2 border border-gray-700 hover:bg-gray-800 rounded-lg text-gray-300 font-bold text-sm">View Settlement History</button>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="bg-[#161b22] border border-gray-800 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Master Violation Log</h3>
            <div className="space-y-4">
              {penalties.map(p => (
                 <div key={p.id} className="flex items-center justify-between p-4 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-emerald-500/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-500">
                         <i className="fa-solid fa-triangle-exclamation"></i>
                      </div>
                      <div>
                         <div className="font-bold text-gray-200">{p.keyName}</div>
                         <div className="text-xs text-gray-500 font-mono">{p.violatorIp} &bull; {p.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                       <div className="text-emerald-400 font-bold font-mono">+${p.amount.toFixed(2)}</div>
                       <div className="text-[10px] text-gray-600 uppercase font-bold">{new Date(p.timestamp).toLocaleString()}</div>
                    </div>
                 </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
