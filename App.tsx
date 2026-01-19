import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls, Stars, ContactShadows } from '@react-three/drei';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar.tsx';
import FloatingCore from './components/FloatingCore.tsx';
import TPSChart from './components/TPSChart.tsx';
import { ZEPHYRIA_FEATURES, ICON_MAP } from './constants.tsx';
import { Zap, Rocket, ChevronRight, Github, Activity, Database } from 'lucide-react';

// Type workarounds for R3F intrinsic elements failing TS checks
const Color = 'color' as any;
const Fog = 'fog' as any;
const AmbientLight = 'ambientLight' as any;
const PointLight = 'pointLight' as any;
// Fix: Shadowed OrbitControls with any to resolve prop type mismatches in this environment
const OrbitControls = DreiOrbitControls as any;

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden">
        {/* Background 3D */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
            <Color attach="background" args={['#020617']} />
            <Fog attach="fog" args={['#020617', 5, 20]} />
            <Suspense fallback={null}>
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
              <FloatingCore />
              <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
              <AmbientLight intensity={0.5} />
              <PointLight position={[10, 10, 10]} intensity={1.5} color="#0ea5e9" />
              <PointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
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
              <Zap className="w-3 h-3 fill-cyan-400" /> JIT JoyboyVM Engine
            </span>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-none tracking-tight">
              Scale Beyond <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-600">
                1 Million TPS
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Zephyria is the world's first register-allocated EVM blockchain. 
              Built for speed, efficiency, and hyper-scale decentralized applications.
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

        {/* Floating Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-cyan-500 to-transparent" />
        </div>
      </section>

      {/* Tech Grid */}
      <section className="py-32 px-6 relative bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-white mb-4">Engineered for Velocity</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              We've re-written the core of the blockchain stack to eliminate bottlenecks at every layer.
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
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full group-hover:bg-cyan-500/10 transition-colors" />
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

      {/* Stats Section */}
      <section className="py-32 px-6 bg-slate-950/50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 blur-[150px] rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Unrivaled Performance, <br />
              <span className="text-cyan-400">Zero Optimization Debt.</span>
            </h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">JoyboyVM JIT Core</h4>
                  <p className="text-slate-400 text-sm">Our JIT compiler achieves up to 10x speedup over standard interpreter-based EVMs by compiling bytecode into optimized machine instructions on the fly.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-full bg-indigo-500/20 flex items-center justify-center">
                  <Database className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Parallel Execution Model</h4>
                  <p className="text-slate-400 text-sm">Optimistic parallelization allows non-conflicting transactions to be processed simultaneously across all CPU cores.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 flex items-center gap-12 border-t border-slate-800 pt-10">
              <div>
                <div className="text-3xl font-black text-white">500k+</div>
                <div className="text-slate-500 text-xs uppercase font-bold tracking-widest">Unoptimized TPS</div>
              </div>
              <div>
                <div className="text-3xl font-black text-cyan-400">1.2M+</div>
                <div className="text-slate-500 text-xs uppercase font-bold tracking-widest">Post-Optimization</div>
              </div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <TPSChart />
          </motion.div>
        </div>
      </section>

      {/* Developer CTA */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-b from-slate-900 to-slate-950 p-16 rounded-[3rem] border border-slate-800 relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Rocket className="w-16 h-16 text-cyan-500 mx-auto mb-8 animate-pulse" />
          <h2 className="text-4xl font-bold text-white mb-6">Build the Future on Zephyria</h2>
          <p className="text-slate-400 mb-10 text-lg">
            Start building sub-second finality dApps today. Fully EVM compatible, 
            zero learning curve for Solidity developers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-10 py-4 bg-white text-slate-950 rounded-2xl font-bold hover:scale-105 transition-all">
              Get Started
            </button>
            <button className="px-10 py-4 bg-slate-800 text-white rounded-2xl font-bold border border-slate-700 hover:bg-slate-700 transition-all flex items-center gap-2">
              <Github className="w-5 h-5" /> View on GitHub
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded flex items-center justify-center font-black text-white text-lg rotate-45">
                <span className="-rotate-45">Z</span>
              </div>
              <span className="text-xl font-bold tracking-tighter text-white">ZEPHYRIA</span>
            </div>
            <p className="text-slate-500 max-w-sm">
              The hyper-performance EVM compatible blockchain network built on JoyboyVM and the custom Zephyr storage engine.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Technology</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">JoyboyVM</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">ZephyrDB</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">P2P Protocol</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Roadmap</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Community</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Twitter / X</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Telegram</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Governance</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-xs">© 2024 Zephyria Foundation. All rights reserved.</p>
          <div className="flex gap-8 text-xs text-slate-600">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;