import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls, Stars, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar.tsx';
import FloatingCore from './components/FloatingCore.tsx';
import TPSChart from './components/TPSChart.tsx';
import { ZEPHYRIA_FEATURES, ICON_MAP } from './constants.tsx';
import { Zap, Rocket, ChevronRight, Github, Activity, Database } from 'lucide-react';

const OrbitControls = DreiOrbitControls as any;

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500/30">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Background 3D */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <Suspense fallback={null}>
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
              <FloatingCore />
              <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} color="#0ea5e9" />
              <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
            </Suspense>
          </Canvas>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-6 tracking-widest uppercase">
              <Zap className="w-3 h-3 fill-cyan-400" /> JIT JoyboyVM Protocol
            </span>
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none tracking-tight">
              Scale Beyond <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600">
                1 Million TPS
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Zephyria is the world's first register-allocated EVM blockchain. 
              Sub-second finality. Zero optimization debt. Silicon-level efficiency.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-cyan-500/20 transition-all group">
                Launch Explorer <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-slate-300 rounded-2xl font-bold border border-slate-800 flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
                Read Whitepaper
              </button>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest font-bold">Protocol Active</span>
          <div className="w-px h-8 bg-gradient-to-b from-cyan-500 to-transparent" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6 relative bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white mb-4">Engineered for Velocity</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              We've rewritten the core blockchain stack to eliminate bottlenecks at every layer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ZEPHYRIA_FEATURES.map((feature, idx) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800 hover:border-cyan-500/50 transition-all group relative overflow-hidden"
              >
                <div className="mb-6 w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center">
                  {ICON_MAP[feature.icon as keyof typeof ICON_MAP]}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{feature.description}</p>
                <div className="text-xs font-mono font-bold text-cyan-400/80 bg-cyan-400/5 px-2 py-1 rounded inline-block">
                  {feature.stats}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real-time Stats Section */}
      <section className="py-32 px-6 bg-slate-950/50 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Unrivaled Throughput, <br />
              <span className="text-cyan-400">Zero Execution Lag.</span>
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <Activity size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold">JoyboyVM JIT Core</h4>
                  <p className="text-slate-400 text-sm">Translates EVM bytecode into optimized machine code in real-time.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Database size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold">ZephyrDB Architecture</h4>
                  <p className="text-slate-400 text-sm">State management optimized for 1M+ concurrent read/write ops.</p>
                </div>
              </div>
            </div>
          </div>
          <TPSChart />
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-b from-slate-900 to-slate-950 p-16 rounded-[3rem] border border-slate-800 relative group overflow-hidden">
          <Rocket className="w-16 h-16 text-cyan-500 mx-auto mb-8 animate-pulse" />
          <h2 className="text-4xl font-bold text-white mb-6">Build the Future</h2>
          <p className="text-slate-400 mb-10 text-lg">
            Fully EVM compatible. Deploy in seconds. Scale forever.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-10 py-4 bg-white text-slate-950 rounded-2xl font-bold hover:scale-105 transition-all">
              Get Started
            </button>
            <button className="px-10 py-4 bg-slate-800 text-white rounded-2xl font-bold border border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-2">
              <Github size={20} /> GitHub
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;