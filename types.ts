
export interface ShieldKey {
  id: string;
  name: string;
  shieldKey: string;
  rawKey: string;
  penaltyRate: number;
  usageCount: number;
  revenue: number;
  createdAt: number;
  status: 'active' | 'revoked';
}

export interface PenaltyEvent {
  id: string;
  keyId: string;
  keyName: string;
  amount: number;
  violatorIp: string;
  timestamp: number;
  location: string;
  method: string;
  path: string;
}

export interface Stats {
  totalRevenue: number;
  activeKeys: number;
  penaltiesApplied: number;
  blockedAttempts: number;
}
