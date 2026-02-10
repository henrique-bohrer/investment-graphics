import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Calculator as CalculatorIcon, DollarSign, Calendar, Percent } from 'lucide-react';

interface ChartData {
  name: string;
  invested: number;
  amount: number;
  interest: number;
}

const Calculator: React.FC = () => {
  const [initialAmount, setInitialAmount] = useState(1000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [interestRate, setInterestRate] = useState(10);
  const [years, setYears] = useState(10);

  const { data, result } = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const months = years * 12;
    let currentAmount = initialAmount;
    let totalInvested = initialAmount;
    const chartData: ChartData[] = [];

    // Add initial point
    chartData.push({
      name: 'Início',
      invested: initialAmount,
      amount: initialAmount,
      interest: 0
    });

    for (let i = 1; i <= months; i++) {
      currentAmount = currentAmount * (1 + monthlyRate) + monthlyContribution;
      totalInvested += monthlyContribution;

      // Add data point every year
      if (i % 12 === 0) {
        chartData.push({
          name: `Ano ${i / 12}`,
          invested: Number(totalInvested.toFixed(2)),
          amount: Number(currentAmount.toFixed(2)),
          interest: Number((currentAmount - totalInvested).toFixed(2))
        });
      }
    }

    return {
      data: chartData,
      result: {
        totalInvested,
        totalInterest: currentAmount - totalInvested,
        totalAmount: currentAmount
      }
    };
  }, [initialAmount, monthlyContribution, interestRate, years]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
          <CalculatorIcon className="w-8 h-8 text-emerald-500" /> Calculadora de Juros Compostos
        </h1>
        <p className="text-slate-400">Simule o poder dos juros compostos ao longo do tempo.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="glass-panel p-6 lg:col-span-1 space-y-6">
          <h2 className="text-xl font-bold text-slate-100">Parâmetros</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Valor Inicial</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="number"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Aporte Mensal</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Taxa de Juros (Anual %)</label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Tempo (Anos)</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-400 text-sm">Total Investido</span>
              <span className="text-slate-200 font-medium">R$ {result.totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-400 text-sm">Juros Acumulados</span>
              <span className="text-emerald-400 font-medium">+ R$ {result.totalInterest.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-800">
              <span className="text-slate-100 font-bold">Valor Final</span>
              <span className="text-xl font-bold text-emerald-400">R$ {result.totalAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="glass-panel p-6 lg:col-span-2 min-h-[400px]">
          <h2 className="text-xl font-bold text-slate-100 mb-6">Projeção de Crescimento</h2>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                  if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
                  return value;
                }}
              />
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.3} vertical={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#f8fafc' }}
                formatter={(value: number | undefined) => [`R$ ${(value ?? 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, '']}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Legend />
              <Area
                name="Montante Total"
                type="monotone"
                dataKey="amount"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorAmount)"
              />
              <Area
                name="Total Investido"
                type="monotone"
                dataKey="invested"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorInvested)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
