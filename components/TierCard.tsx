
import React from 'react';
import { TierConfig } from '../types';

interface TierCardProps {
  config: TierConfig;
  isActive?: boolean;
}

const TierCard: React.FC<TierCardProps> = ({ config, isActive }) => {
  return (
    <div className={`p-5 rounded-2xl border transition-all ${
      isActive 
      ? 'bg-emerald-500/10 border-emerald-500 shadow-lg shadow-emerald-500/10' 
      : 'bg-[#161b22] border-gray-800 hover:border-gray-700'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-lg font-bold text-white tracking-tight">{config.name}</h4>
          <p className="text-xs text-gray-500 font-medium">{config.description}</p>
        </div>
        <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-500 text-white">
          {config.multiplier}x Penalty
        </span>
      </div>
      <div className="mb-6">
        <span className="text-3xl font-bold text-white">${config.price}</span>
        <span className="text-gray-500 text-sm"> / month</span>
      </div>
      <ul className="space-y-2 mb-6">
        {config.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-gray-400">
            <i className="fa-solid fa-check text-emerald-500"></i>
            {f}
          </li>
        ))}
      </ul>
      <button className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
        isActive ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      }`}>
        {isActive ? 'Current Plan' : 'Select Tier'}
      </button>
    </div>
  );
};

export default TierCard;
