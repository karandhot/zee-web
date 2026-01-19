
import React from 'react';
import { Cpu, Zap, Database, Shield, Share2, Activity } from 'lucide-react';
import { TechFeature } from './types';

export const ZEPHYRIA_FEATURES: TechFeature[] = [
  {
    id: 'joyboyvm',
    title: 'JoyboyVM JIT',
    description: 'Our proprietary register-allocated JIT EVM. By moving beyond stack-based execution, we achieve silicon-level efficiency.',
    icon: 'cpu',
    stats: '500k - 1M+ TPS'
  },
  {
    id: 'zephyr-db',
    title: 'Ultra-Fast DB',
    description: 'Custom state storage engine optimized for high-concurrency IO and zero-latency Merkle tree updates.',
    icon: 'database',
    stats: '< 1ms Seek'
  },
  {
    id: 'network',
    title: 'P2P Optimized',
    description: 'A custom networking layer designed for rapid block propagation and massive node scalability.',
    icon: 'share-2',
    stats: '10Gbps Ready'
  },
  {
    id: 'security',
    title: 'Quantum Secure',
    description: 'Post-quantum cryptographic primitives baked into the core protocol for long-term data integrity.',
    icon: 'shield',
    stats: 'AES-GCM-256'
  }
];

export const ICON_MAP = {
  cpu: <Cpu className="w-6 h-6 text-cyan-400" />,
  zap: <Zap className="w-6 h-6 text-yellow-400" />,
  database: <Database className="w-6 h-6 text-indigo-400" />,
  shield: <Shield className="w-6 h-6 text-emerald-400" />,
  'share-2': <Share2 className="w-6 h-6 text-pink-400" />,
  activity: <Activity className="w-6 h-6 text-sky-400" />
};
