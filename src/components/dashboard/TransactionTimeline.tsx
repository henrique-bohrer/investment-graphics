import React from 'react';
import { ArrowUpRight, ArrowDownLeft, DollarSign, Clock } from 'lucide-react';
import type { Transaction } from '../../types';

interface TransactionTimelineProps {
  transactions: Transaction[];
}

export const TransactionTimeline: React.FC<TransactionTimelineProps> = ({ transactions }) => {
  return (
    <div className="glass-panel p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-slate-100">Últimas Transações</h2>
        <button className="text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
          Ver todas
        </button>
      </div>

      <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-slate-800 before:via-slate-800 before:to-transparent">
        {transactions.map((transaction, index) => (
          <div
            key={transaction.id}
            className="relative flex items-center gap-4 animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`absolute left-0 ml-5 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full border-4 border-slate-950 ${transaction.type === 'buy' ? 'bg-emerald-500' :
              transaction.type === 'sell' ? 'bg-rose-500' : 'bg-blue-500'
              }`}>
              {transaction.type === 'buy' && <ArrowDownLeft className="h-4 w-4 text-white" />}
              {transaction.type === 'sell' && <ArrowUpRight className="h-4 w-4 text-white" />}
              {transaction.type === 'dividend' && <DollarSign className="h-4 w-4 text-white" />}
            </div>

            <div className="ml-12 flex-1 rounded-lg bg-slate-800/40 p-3 hover:bg-slate-800 transition-colors border border-slate-800/50">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-slate-100">
                    {transaction.type === 'buy' ? 'Compra de' :
                      transaction.type === 'sell' ? 'Venda de' : 'Dividendo recebido'}
                    <span className="text-emerald-400 ml-1">{transaction.asset}</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {transaction.date} às {transaction.time}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${transaction.type === 'sell' || transaction.type === 'dividend'
                    ? 'text-emerald-400'
                    : 'text-slate-200'
                    }`}>
                    {transaction.type === 'sell' || transaction.type === 'dividend' ? '+' : '-'}
                    R$ {transaction.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  {transaction.quantity && (
                    <p className="text-xs text-slate-500">{transaction.quantity} cotas</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};