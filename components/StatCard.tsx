
import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color: 'emerald' | 'amber' | 'rose' | 'blue';
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color, trend }) => {
  const colorMap = {
    emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    amber: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    rose: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
    blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  };

  return (
    <div className={`p-6 rounded-2xl border ${colorMap[color]} bg-[#161b22] shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium uppercase tracking-wider opacity-80">{label}</span>
        <i className={`${icon} text-xl`}></i>
      </div>
      <div className="flex items-end gap-3">
        <h2 className="text-3xl font-bold tracking-tight">{value}</h2>
        {trend && (
          <span className="text-xs font-semibold mb-1 opacity-70">
            <i className="fa-solid fa-arrow-up mr-1"></i> {trend}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatCard;
