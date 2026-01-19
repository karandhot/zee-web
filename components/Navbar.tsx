
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-lg flex items-center justify-center font-black text-white text-xl rotate-45">
            <span className="-rotate-45">Z</span>
          </div>
          <span className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            ZEPHYRIA
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-10">
          {['Ecosystem', 'Technology', 'Network', 'Developers'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <button className="px-6 py-2.5 bg-white text-slate-950 rounded-full text-sm font-bold hover:bg-cyan-400 hover:scale-105 transition-all active:scale-95 shadow-lg shadow-white/10">
          Build Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
