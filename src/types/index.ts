export interface Asset {
  id: string;
  ticker: string;
  name: string;
  price: number;
  change: number;
  changeValue: number;
  sector?: string;
  dy?: number;
  p_vp?: number;
  liquidity?: string;
  type: 'stock' | 'fii' | 'index';
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}

// Novos Tipos
export interface PortfolioData {
  name: string;
  value: number;
  color: string;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'dividend';
  asset: string;
  amount: number;
  quantity?: number;
  date: string;
  time: string;
}