
import { ShieldKey, PenaltyEvent, TierConfig } from './types';

export const PAYPAL_TIERS: Record<string, TierConfig> = {
  TRIAL: {
    name: 'TRIAL',
    price: 0,
    multiplier: 1.0,
    description: '1 Search - No Source - Limited Access',
    features: ['1 search/day', 'No source access', 'Basic features']
  },
  STUDENT: {
    name: 'STUDENT',
    price: 4.99,
    multiplier: 2.0,
    description: '$4.99 for research works with sources',
    features: ['Research works', 'Sources included', 'Multi-search']
  },
  PRO: {
    name: 'PRO',
    price: 19.99,
    multiplier: 3.0,
    description: 'Multi and Dedicated searches with sources',
    features: ['Unlimited searches', 'API access', 'Priority support']
  },
  ENTERPRISE: {
    name: 'ENTERPRISE',
    price: 99.99,
    multiplier: 5.0,
    description: 'Custom solutions for organizations',
    features: ['Custom integrations', 'SLA guarantees', 'White-label']
  }
};

export const INITIAL_KEYS: ShieldKey[] = [
  {
    id: 'k1',
    name: 'Academic Search Pro',
    shieldKey: 'IAD_PRO_8f2a1b9e_49c3',
    rawKey: 'sk-gemini-v1-k9l...',
    tier: 'PRO',
    penaltyMultiplier: 3.0,
    usageCount: 12450,
    revenue: 845.50,
    createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
    status: 'active'
  },
  {
    id: 'k2',
    name: 'Student Research Bot',
    shieldKey: 'IAD_STUDENT_d5e6f7g8_1a2b',
    rawKey: 'sk-gpt4-test-7hj2...',
    tier: 'STUDENT',
    penaltyMultiplier: 2.0,
    usageCount: 890,
    revenue: 145.20,
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    status: 'active'
  }
];

export const INITIAL_PENALTIES: PenaltyEvent[] = [
  {
    id: 'p1',
    keyId: 'k1',
    keyName: 'Academic Search Pro',
    amount: 59.97, // 19.99 * 3.0
    violatorIp: '192.168.1.45',
    timestamp: Date.now() - 10 * 60 * 1000,
    location: 'Frankfurt, DE',
    method: 'POST',
    path: '/v1/search',
    tier: 'PRO'
  },
  {
    id: 'p2',
    keyId: 'k2',
    keyName: 'Student Research Bot',
    amount: 9.98, // 4.99 * 2.0
    violatorIp: '203.0.113.25',
    timestamp: Date.now() - 3 * 60 * 60 * 1000,
    location: 'New York, US',
    method: 'POST',
    path: '/v1/research',
    tier: 'STUDENT'
  }
];

export const REVENUE_DATA = [
  { name: 'Mon', revenue: 120 },
  { name: 'Tue', revenue: 450 },
  { name: 'Wed', revenue: 380 },
  { name: 'Thu', revenue: 890 },
  { name: 'Fri', revenue: 540 },
  { name: 'Sat', revenue: 1100 },
  { name: 'Sun', revenue: 1245 },
];
