
import React, { useState, useEffect, useCallback } from 'react';
import { ShieldKey, PenaltyEvent, Stats } from './types';
import { INITIAL_KEYS, INITIAL_PENALTIES } from './constants';
import StatCard from './components/StatCard';
import RevenueChart from './components/RevenueChart';
import KeyTable from './components/KeyTable';
import PenaltyFeed from './components/PenaltyFeed';
import { getSecurityAdvice } from './services/geminiService';

const App: React.FC = () => {
  const [keys, setKeys] = useState<ShieldKey[]>(INITIAL_KEYS);
  const [penalties, setPenalties] = useState<PenaltyEvent[]>(INITIAL_PENALTIES);
  const [advice, setAdvice] = useState<string>("Analyzing your security posture...");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const stats: Stats = {
    totalRevenue: keys.reduce((acc, k) => acc + k.revenue, 0),
    activeKeys: keys.filter(k => k.status === 'active').length,
    penaltiesApplied: penalties.length,
    blockedAttempts: penalties.length * 12 // Simulated block stat
  };

  useEffect(() => {
    const fetchAdvice = async () => {
      const msg = await getSecurityAdvice(stats);
      setAdvice(msg);
    };
    fetchAdvice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRevoke = (id: string) => {
    setKeys(prev => prev.map(k => k.id === id ? { ...k, status: 'revoked' as const } : k));
  };

  const createShieldKey = () => {
    const name = prompt("Key Reference Name (e.g., 'Main Production API'):");
    if (!name) return;
    const raw = prompt("Raw API Key to protect:");
    if (!raw) return;

    const newKey: ShieldKey = {
      id: `k${Date.now()}`,
      name,
      shieldKey: `ps_shield_${Math.random().toString(16).slice(2, 10)}_${Math.random().toString(16).slice(2, 8)}`,
      rawKey: raw,
      penaltyRate: 3.0,
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
            {isSidebarOpen && <span className="text-xl font-extrabold tracking-tighter text-white">PenaltyShield</span>}
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {[
              { label: 'Dashboard', icon: 'fa-gauge-high', active: true },
              { label: 'Shielded Keys', icon: 'fa-key', active: false },
              { label: 'Violation Logs', icon: 'fa-receipt', active: false },
              { label: 'Integrations', icon: 'fa-plug', active: false },
              { label: 'Settings', icon: 'fa-sliders', active: false },
            ].map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all ${item.active ? 'bg-emerald-500/10 text-emerald-400' : 'text-gray-500 hover:text-gray-200 hover:bg-gray-800'}`}
              >
                <i className={`fa-solid ${item.icon} w-6 text-center text-lg`}></i>
                {isSidebarOpen && <span className="text-sm font-semibold">{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-800">
            <div className={`p-4 rounded-xl bg-gray-900 border border-emerald-500/20 text-xs ${isSidebarOpen ? 'block' : 'hidden'}`}>
              <div className="flex items-center gap-2 mb-2">
                <i className="fa-solid fa-bolt text-emerald-400"></i>
                <span className="font-bold text-emerald-400 uppercase tracking-widest">Pro Version</span>
              </div>
              <p className="text-gray-400 mb-3 leading-relaxed">Upgrade to unlock real-time IP ban automation.</p>
              <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white font-bold transition-all">
                Upgrade Now
              </button>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="w-full mt-4 flex items-center justify-center text-gray-500 hover:text-white transition-all"
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
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Security Overview</h1>
            <p className="text-gray-500 font-medium">Monitoring {stats.activeKeys} active shielded API keys</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-gray-900/50 rounded-full border border-gray-800">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-mono text-emerald-400">System Online: Live Penalty Mode</span>
            </div>
            <button 
              onClick={createShieldKey}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/20"
            >
              <i className="fa-solid fa-plus"></i>
              Shield New Key
            </button>
          </div>
        </header>

        {/* AI Insight Bar */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
             <i className="fa-solid fa-brain text-white"></i>
          </div>
          <p className="text-sm font-medium text-emerald-100 italic">
            &quot;{advice}&quot;
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard 
            label="Total Revenue" 
            value={`$${stats.totalRevenue.toLocaleString()}`} 
            icon="fa-solid fa-money-bill-trend-up" 
            color="emerald" 
            trend="+12.5%" 
          />
          <StatCard 
            label="Active Keys" 
            value={stats.activeKeys} 
            icon="fa-solid fa-shield-check" 
            color="blue" 
          />
          <StatCard 
            label="Penalties Applied" 
            value={stats.penaltiesApplied} 
            icon="fa-solid fa-bolt-lightning" 
            color="amber" 
            trend="+5 today"
          />
          <StatCard 
            label="Violations Blocked" 
            value={stats.blockedAttempts.toLocaleString()} 
            icon="fa-solid fa-user-slash" 
            color="rose" 
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Chart Area */}
          <div className="xl:col-span-2 space-y-8">
            <div className="p-6 bg-[#161b22] border border-gray-800 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <i className="fa-solid fa-chart-line text-emerald-500"></i>
                  Revenue Growth
                </h3>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-xs font-bold rounded-lg bg-gray-800 text-gray-400 hover:text-white transition-all">7D</button>
                  <button className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-500 text-white transition-all">1M</button>
                </div>
              </div>
              <RevenueChart />
            </div>

            <div className="p-6 bg-[#161b22] border border-gray-800 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <i className="fa-solid fa-shield-virus text-amber-500"></i>
                  Shielded Inventory
                </h3>
                <button className="text-sm text-emerald-400 hover:text-emerald-300 font-bold transition-all">View All</button>
              </div>
              <KeyTable keys={keys} onRevoke={handleRevoke} />
            </div>
          </div>

          {/* Right Sidebar Area */}
          <div className="xl:col-span-1 space-y-8">
            <div className="p-6 bg-[#161b22] border border-gray-800 rounded-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <i className="fa-solid fa-rss text-rose-500"></i>
                  Live Feed
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 text-[10px] font-bold uppercase tracking-widest">Real-time</span>
              </div>
              <PenaltyFeed penalties={penalties} />
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-gray-800">
               <h4 className="text-sm font-bold text-white mb-4">PayPal Integration</h4>
               <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-xl">
                    <i className="fa-brands fa-paypal text-white"></i>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-200 uppercase tracking-tighter">Status: Connected</div>
                    <div className="text-xs text-gray-500">Merchant Account: ps_m_99823</div>
                  </div>
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Pending Settlement</span>
                    <span className="text-emerald-400 font-bold">$245.50</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[70%]"></div>
                  </div>
                  <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white text-xs font-bold transition-all mt-4">
                    Withdraw to PayPal
                  </button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
