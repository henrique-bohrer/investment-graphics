import type { Asset, ChartDataPoint, MarketIndex } from '../types';

export const marketIndices: MarketIndex[] = [
  { name: 'IBOVESPA', value: 128500.45, change: 0.85 },
  { name: 'IFIX', value: 3380.12, change: -0.15 },
  { name: 'CDI', value: 13.15, change: 0.00 },
  { name: 'Dólar', value: 5.68, change: 0.32 },
];

export const stocks: Asset[] = [
  { id: '1', ticker: 'VALE3', name: 'Vale S.A.', price: 62.45, change: 1.25, changeValue: 0.77, sector: 'Mineração', dy: 12.5, p_vp: 0.85, liquidity: 'High', type: 'stock' },
  { id: '2', ticker: 'PETR4', name: 'Petrobras', price: 38.90, change: -0.45, changeValue: -0.18, sector: 'Petróleo', dy: 18.2, p_vp: 0.95, liquidity: 'High', type: 'stock' },
  { id: '3', ticker: 'ITUB4', name: 'Itaú Unibanco', price: 34.15, change: 0.95, changeValue: 0.32, sector: 'Bancos', dy: 6.8, p_vp: 1.6, liquidity: 'High', type: 'stock' },
  { id: '4', ticker: 'WEGE3', name: 'WEG S.A.', price: 42.10, change: 2.15, changeValue: 0.88, sector: 'Bens Industriais', dy: 3.4, p_vp: 5.4, liquidity: 'High', type: 'stock' },
  { id: '5', ticker: 'BBDC4', name: 'Bradesco', price: 14.50, change: -1.10, changeValue: -0.16, sector: 'Bancos', dy: 7.2, p_vp: 0.9, liquidity: 'High', type: 'stock' },
  { id: '6', ticker: 'BBAS3', name: 'Banco do Brasil', price: 27.80, change: 0.55, changeValue: 0.15, sector: 'Bancos', dy: 9.8, p_vp: 0.88, liquidity: 'High', type: 'stock' },
];

export const fiis: Asset[] = [
  { id: '101', ticker: 'HGLG11', name: 'CSHG Logística', price: 162.50, change: 0.25, changeValue: 0.40, sector: 'Logística', dy: 8.5, p_vp: 1.05, liquidity: 'High', type: 'fii' },
  { id: '102', ticker: 'MXRF11', name: 'Maxi Renda', price: 10.45, change: -0.10, changeValue: -0.01, sector: 'Papel', dy: 12.1, p_vp: 1.02, liquidity: 'High', type: 'fii' },
  { id: '103', ticker: 'KNIP11', name: 'Kinea Índice de Preços', price: 96.80, change: 0.50, changeValue: 0.48, sector: 'Papel', dy: 10.8, p_vp: 0.98, liquidity: 'High', type: 'fii' },
  { id: '104', ticker: 'VISC11', name: 'Vinci Shopping Centers', price: 118.20, change: 0.15, changeValue: 0.18, sector: 'Shopping', dy: 8.9, p_vp: 0.95, liquidity: 'High', type: 'fii' },
  { id: '105', ticker: 'XPLG11', name: 'XP Logística', price: 109.90, change: -0.35, changeValue: -0.39, sector: 'Logística', dy: 9.2, p_vp: 0.92, liquidity: 'High', type: 'fii' },
  { id: '106', ticker: 'BTLG11', name: 'BTG Pactual Logística', price: 101.30, change: 0.12, changeValue: 0.12, sector: 'Logística', dy: 8.8, p_vp: 0.99, liquidity: 'High', type: 'fii' },
];

export const allAssets: Asset[] = [...stocks, ...fiis];

export const chartData: ChartDataPoint[] = [
  { name: 'Jan', value: 4000 },
  { name: 'Fev', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Abr', value: 2780 },
  { name: 'Mai', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];
