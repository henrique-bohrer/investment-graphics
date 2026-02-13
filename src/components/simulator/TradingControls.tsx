import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Target, X } from 'lucide-react';

interface Order {
  id: string;
  price: number;
  amount: number;
  type: 'sell';
}

interface TradingControlsProps {
  currentPrice: number;
  balance: number;
  portfolio: number;
  avgPrice: number;
  onBuy: (amount: number) => void;
  onSell: (amount: number) => void;
  onPlaceOrder: (price: number, amount: number) => void;
  orders: Order[];
  onCancelOrder: (id: string) => void;
}

export const TradingControls: React.FC<TradingControlsProps> = ({
  currentPrice,
  balance,
  portfolio,
  avgPrice,
  onBuy,
  onSell,
  onPlaceOrder,
  orders,
  onCancelOrder,
}) => {
  const [amount, setAmount] = useState<number>(100);
  const [targetPrice, setTargetPrice] = useState<number>(currentPrice * 1.05);

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

      <div className="pt-6 border-t border-slate-800">
        <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
           <Target className="w-5 h-5 text-blue-400" /> Meta de Venda (Take Profit)
        </h3>

        <div className="space-y-4">
            <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Preço Alvo</label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">R$</span>
                <input
                type="number"
                step="0.01"
                value={targetPrice}
                onChange={(e) => setTargetPrice(parseFloat(e.target.value))}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-8 pr-4 py-2 text-slate-100 focus:outline-none focus:border-blue-500"
                />
            </div>
            </div>

            <button
            onClick={() => onPlaceOrder(targetPrice, amount)}
            disabled={!canSell || targetPrice <= currentPrice}
            className={`w-full py-2 rounded-lg font-medium transition-all ${
                canSell
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
            >
            Criar Ordem de Venda
            </button>
        </div>

        {orders.length > 0 && (
            <div className="mt-6">
                <h4 className="text-sm font-medium text-slate-400 mb-2">Ordens Abertas</h4>
                <div className="space-y-2">
                    {orders.map((order) => (
                        <div key={order.id} className="flex justify-between items-center bg-slate-800/50 p-2 rounded border border-slate-700">
                            <div>
                                <span className="text-sm font-bold text-slate-200">Venda {order.amount} un.</span>
                                <span className="text-xs text-slate-400 block">@ R$ {order.price.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={() => onCancelOrder(order.id)}
                                className="p-1 hover:bg-rose-500/20 rounded text-slate-400 hover:text-rose-400 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};
