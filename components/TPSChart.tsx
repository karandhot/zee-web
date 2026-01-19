import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { ChartDataPoint } from '../types.ts';

const TPSChart: React.FC = () => {
  const [data, setData] = useState<ChartDataPoint[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const generateInitialData = () => {
      const initial = [];
      for (let i = 0; i < 20; i++) {
        initial.push({
          time: i.toString(),
          tps: 500000 + Math.random() * 200000,
          latency: 20 + Math.random() * 10
        });
      }
      setData(initial);
    };

    generateInitialData();

    const interval = setInterval(() => {
      setData(prev => {
        if (prev.length === 0) return prev;
        const newData = [...prev.slice(1)];
        const lastTime = parseInt(prev[prev.length - 1].time);
        const burst = Math.random() > 0.8 ? 300000 : 0;
        newData.push({
          time: (lastTime + 1).toString(),
          tps: 500000 + Math.random() * 150000 + burst,
          latency: 18 + Math.random() * 5
        });
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) return <div className="w-full h-96 bg-slate-900/50 rounded-3xl" />;

  const currentTps = data.length > 0 ? data[data.length - 1].tps : 0;

  return (
    <div className="w-full h-96 bg-slate-900/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-800 shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-indigo-500" />
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">Live Performance</h3>
          <p className="text-slate-400 text-sm">JoyboyVM execution metrics</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-black text-cyan-400 tabular-nums">
            {(currentTps / 1000).toFixed(1)}k <span className="text-xs uppercase">TPS</span>
          </div>
          <div className="text-emerald-400 text-xs font-mono">STABLE OPS</div>
        </div>
      </div>
      
      <div className="w-full h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTps" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="time" hide />
            <YAxis 
              domain={[400000, 1100000]} 
              tickFormatter={(val) => `${Math.floor(val/1000)}k`} 
              stroke="#475569" 
              fontSize={10}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#fff' }}
              itemStyle={{ color: '#0ea5e9' }}
            />
            <Area 
              type="monotone" 
              dataKey="tps" 
              stroke="#0ea5e9" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorTps)" 
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TPSChart;