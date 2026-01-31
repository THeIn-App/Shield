
import { ShieldKey, PenaltyEvent } from './types';

export const INITIAL_KEYS: ShieldKey[] = [
  {
    id: 'k1',
    name: 'Gemini Pro Production',
    shieldKey: 'ps_shield_8f2a1b9e_49c3...',
    rawKey: 'sk-ant-api03-K9lX...',
    penaltyRate: 3.5,
    usageCount: 12450,
    revenue: 1245.50,
    createdAt: Date.now() - 15 * 24 * 60 * 60 * 1000,
    status: 'active'
  },
  {
    id: 'k2',
    name: 'OpenAI Test Environment',
    shieldKey: 'ps_shield_d5e6f7g8_1a2b...',
    rawKey: 'sk-proj-7Hj2...',
    penaltyRate: 2.0,
    usageCount: 890,
    revenue: 45.20,
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    status: 'active'
  }
];

export const INITIAL_PENALTIES: PenaltyEvent[] = [
  {
    id: 'p1',
    keyId: 'k1',
    keyName: 'Gemini Pro Production',
    amount: 15.00,
    violatorIp: '192.168.1.45',
    timestamp: Date.now() - 10 * 60 * 1000,
    location: 'Frankfurt, DE',
    method: 'POST',
    path: '/v1/generate'
  },
  {
    id: 'p2',
    keyId: 'k1',
    keyName: 'Gemini Pro Production',
    amount: 5.00,
    violatorIp: '89.203.12.44',
    timestamp: Date.now() - 45 * 60 * 1000,
    location: 'London, UK',
    method: 'GET',
    path: '/v1/models'
  },
  {
    id: 'p3',
    keyId: 'k2',
    keyName: 'OpenAI Test Environment',
    amount: 10.50,
    violatorIp: '203.0.113.25',
    timestamp: Date.now() - 3 * 60 * 60 * 1000,
    location: 'New York, US',
    method: 'POST',
    path: '/v1/chat/completions'
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
