
export interface TechFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  stats?: string;
}

export interface ChartDataPoint {
  time: string;
  tps: number;
  latency: number;
}
