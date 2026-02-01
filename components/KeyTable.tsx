
import React from 'react';
import { ShieldKey } from '../types';

interface KeyTableProps {
  keys: ShieldKey[];
  onRevoke: (id: string) => void;
}

const KeyTable: React.FC<KeyTableProps> = ({ keys, onRevoke }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-xs uppercase tracking-wider text-gray-500 border-b border-gray-800">
            <th className="px-4 py-3 font-semibold">Key Reference</th>
            <th className="px-4 py-3 font-semibold">Tier</th>
            <th className="px-4 py-3 font-semibold">Shield Key</th>
            <th className="px-4 py-3 font-semibold text-center">Multiplier</th>
            <th className="px-4 py-3 font-semibold text-right">Revenue</th>
            <th className="px-4 py-3 font-semibold text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((key) => (
            <tr key={key.id} className="group hover:bg-gray-800/30 border-b border-gray-800/50 transition-colors">
              <td className="px-4 py-4">
                <div className="font-medium text-gray-200">{key.name}</div>
                <div className="text-xs text-gray-500 mt-1">{new Date(key.createdAt).toLocaleDateString()}</div>
              </td>
              <td className="px-4 py-4">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  key.tier === 'ENTERPRISE' ? 'bg-purple-500/20 text-purple-400' :
                  key.tier === 'PRO' ? 'bg-emerald-500/20 text-emerald-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {key.tier}
                </span>
              </td>
              <td className="px-4 py-4">
                <code className="text-xs bg-gray-900 px-2 py-1 rounded text-emerald-400 font-mono">
                  {key.shieldKey.slice(0, 16)}...
                </code>
              </td>
              <td className="px-4 py-4 text-center">
                <span className="font-mono font-bold text-amber-500">{key.penaltyMultiplier.toFixed(1)}x</span>
              </td>
              <td className="px-4 py-4 text-right font-mono text-emerald-400 font-bold">
                ${key.revenue.toFixed(2)}
              </td>
              <td className="px-4 py-4 text-center">
                <button 
                  onClick={() => onRevoke(key.id)}
                  className={`transition-colors ${key.status === 'revoked' ? 'text-gray-700 cursor-not-allowed' : 'text-gray-500 hover:text-rose-400'}`}
                  disabled={key.status === 'revoked'}
                >
                  <i className={`fa-solid ${key.status === 'revoked' ? 'fa-lock' : 'fa-ban'}`}></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KeyTable;
