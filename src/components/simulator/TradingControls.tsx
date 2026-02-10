import React, { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface TradingControlsProps {
  currentPrice: number;
  balance: number;
  portfolio: number;
  avgPrice: number;
  onBuy: (amount: number) => void;
  onSell: (amount: number) => void;
}

export const TradingControls: React.FC<TradingControlsProps> = ({
  currentPrice,
  balance,
  portfolio,
  avgPrice,
  onBuy,
  onSell,
}) => {
  const [amount, setAmount] = useState<number>(100);

  const totalValue = amount * currentPrice;
  const canBuy = balance >= totalValue;
  const canSell = portfolio >= amount;

  const currentPositionValue = portfolio * currentPrice;
  const investedValue = portfolio * avgPrice;
  const profitLoss = currentPositionValue - investedValue;
  const profitLossPercent = investedValue > 0 ? (profitLoss / investedValue) * 100 : 0;

  return (
    <div className="glass-panel p-6 space-y-6">
      <div>
        <h3 className="text-lg font-bold text-slate-100 mb-4">Painel de Negociação</h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-800/50 p-3 rounded-lg">
            <span className="text-xs text-slate-400 block">Saldo Disponível</span>
            <span className="text-lg font-bold text-slate-100">R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="bg-slate-800/50 p-3 rounded-lg">
            <span className="text-xs text-slate-400 block">Posição Atual</span>
            <div className="flex justify-between items-baseline">
              <span className="text-lg font-bold text-slate-100">{portfolio} ações</span>
            </div>
            {portfolio > 0 && (
              <div className={`text-xs font-medium mt-1 ${profitLoss >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {profitLoss >= 0 ? '+' : ''}R$ {profitLoss.toFixed(2)} ({profitLossPercent.toFixed(2)}%)
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Quantidade</label>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(Math.max(1, parseInt(e.target.value) || 0))}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="text-sm text-slate-400 flex justify-between">
            <span>Valor Total:</span>
            <span className="text-slate-200 font-medium">R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <button
              onClick={() => onBuy(amount)}
              disabled={!canBuy}
              className={`flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${
                canBuy
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <ArrowUp className="w-5 h-5" /> Comprar
            </button>

            <button
              onClick={() => onSell(amount)}
              disabled={!canSell}
              className={`flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${
                canSell
                  ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <ArrowDown className="w-5 h-5" /> Vender
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
