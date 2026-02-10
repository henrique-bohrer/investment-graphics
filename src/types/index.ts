export interface Asset {
  id: string;
  ticker: string;
  name: string;
  price: number;
  change: number; // Percentage change
  changeValue: number; // Absolute value change
  sector?: string;
  dy?: number; // Dividend Yield
  p_vp?: number; // Price / Book Value
  liquidity?: string;
  type: 'stock' | 'fii' | 'index';
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
}

export interface ChartDataPoint {
  name: string; // date or time
  value: number;
}
