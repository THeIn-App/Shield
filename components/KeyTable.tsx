
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
            <th className="px-4 py-3 font-semibold">Key Name</th>
            <th className="px-4 py-3 font-semibold">Shield Prefix</th>
            <th className="px-4 py-3 font-semibold text-center">Multiplier</th>
            <th className="px-4 py-3 font-semibold text-right">Revenue</th>
            <th className="px-4 py-3 font-semibold text-right">Status</th>
            <th className="px-4 py-3 font-semibold text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {keys.map((key) => (
            <tr key={key.id} className="group hover:bg-gray-800/30 border-b border-gray-800/50 transition-colors">
              <td className="px-4 py-4">
                <div className="font-medium text-gray-200">{key.name}</div>
                <div className="text-xs text-gray-500 mt-1">Created {new Date(key.createdAt).toLocaleDateString()}</div>
              </td>
              <td className="px-4 py-4">
                <code className="text-xs bg-gray-900 px-2 py-1 rounded text-emerald-400 font-mono">
                  {key.shieldKey.slice(0, 14)}...
                </code>
              </td>
              <td className="px-4 py-4 text-center">
                <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-500 text-xs font-bold">
                  {key.penaltyRate}x
                </span>
              </td>
              <td className="px-4 py-4 text-right font-mono text-emerald-400 font-bold">
                ${key.revenue.toFixed(2)}
              </td>
              <td className="px-4 py-4 text-right">
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                  key.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full mr-2 ${key.status === 'active' ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
                  {key.status}
                </span>
              </td>
              <td className="px-4 py-4 text-center">
                <button 
                  onClick={() => onRevoke(key.id)}
                  className="text-gray-500 hover:text-rose-400 transition-colors"
                  title="Revoke Key"
                >
                  <i className="fa-solid fa-ban"></i>
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
