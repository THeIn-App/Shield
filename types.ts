
export type TierType = 'TRIAL' | 'STUDENT' | 'PRO' | 'ENTERPRISE';

export interface ShieldKey {
  id: string;
  name: string;
  shieldKey: string;
  rawKey: string;
  tier: TierType;
  penaltyMultiplier: number;
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
  tier: TierType;
}

export interface Stats {
  totalRevenue: number;
  activeKeys: number;
  penaltiesApplied: number;
  blockedAttempts: number;
}

export interface TierConfig {
  name: TierType;
  price: number;
  multiplier: number;
  description: string;
  features: string[];
}
