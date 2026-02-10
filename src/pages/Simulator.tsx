import React, { useState } from 'react';
import { TradingChart } from '../components/simulator/TradingChart';
import { TradingControls } from '../components/simulator/TradingControls';
import { candlestickData } from '../data/simulatorData';

const Simulator: React.FC = () => {
  const [balance, setBalance] = useState<number>(10000);
  const [portfolio, setPortfolio] = useState<number>(0);
  const [avgPrice, setAvgPrice] = useState<number>(0);
  const [currentPrice] = useState<number>(candlestickData[candlestickData.length - 1].close);

  const handleBuy = (amount: number) => {
    const totalCost = amount * currentPrice;
    if (balance >= totalCost) {
      const newPortfolio = portfolio + amount;
      const totalInvested = portfolio * avgPrice + totalCost;
      const newAvgPrice = totalInvested / newPortfolio;

      setBalance(balance - totalCost);
      setPortfolio(newPortfolio);
      setAvgPrice(newAvgPrice);
    }
  };

  const handleSell = (amount: number) => {
    if (portfolio >= amount) {
      const totalSale = amount * currentPrice;
      const newPortfolio = portfolio - amount;

      setBalance(balance + totalSale);
      setPortfolio(newPortfolio);

      if (newPortfolio === 0) {
        setAvgPrice(0);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Simulador de Trading</h1>
        <p className="text-slate-400">Pratique suas estratégias de mercado sem risco.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TradingChart currentPrice={currentPrice} />
        </div>
        <div className="lg:col-span-1">
          <TradingControls
            currentPrice={currentPrice}
            balance={balance}
            portfolio={portfolio}
            avgPrice={avgPrice}
            onBuy={handleBuy}
            onSell={handleSell}
          />
        </div>
      </div>
    </div>
  );
};

export default Simulator;
