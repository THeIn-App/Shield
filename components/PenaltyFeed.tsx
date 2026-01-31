
import React from 'react';
import { PenaltyEvent } from '../types';

interface PenaltyFeedProps {
  penalties: PenaltyEvent[];
}

const PenaltyFeed: React.FC<PenaltyFeedProps> = ({ penalties }) => {
  return (
    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
      {penalties.map((p) => (
        <div key={p.id} className="p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-emerald-500/30 transition-all">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-tighter">Penalty Captured</span>
              <h4 className="text-sm font-semibold text-gray-300 mt-1">{p.keyName}</h4>
            </div>
            <span className="text-lg font-bold text-emerald-500">+${p.amount.toFixed(2)}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500 uppercase tracking-wider">
            <div>
              <i className="fa-solid fa-location-dot mr-1"></i> {p.location}
            </div>
            <div className="text-right">
              <i className="fa-solid fa-clock mr-1"></i> {new Date(p.timestamp).toLocaleTimeString()}
            </div>
            <div className="truncate">
              <i className="fa-solid fa-network-wired mr-1"></i> {p.violatorIp}
            </div>
            <div className="text-right">
              <code className="bg-gray-800 px-1 rounded">{p.method} {p.path}</code>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PenaltyFeed;
