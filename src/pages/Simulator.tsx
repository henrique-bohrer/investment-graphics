import React, { useState, useEffect, useRef } from 'react';
import { TradingChart } from '../components/simulator/TradingChart';
import { TradingControls } from '../components/simulator/TradingControls';
import { candlestickData, type Candle } from '../data/simulatorData';

interface Order {
  id: string;
  price: number;
  amount: number;
  type: 'sell';
}

const Simulator: React.FC = () => {
  const [balance, setBalance] = useState<number>(10000);
  const [portfolio, setPortfolio] = useState<number>(0);
  const [avgPrice, setAvgPrice] = useState<number>(0);
  const [data, setData] = useState<Candle[]>(candlestickData);
  const [currentPrice, setCurrentPrice] = useState<number>(candlestickData[candlestickData.length - 1].close);
  const [orders, setOrders] = useState<Order[]>([]);

  // Use ref to keep track of portfolio to avoid dependency loop in simulation
  const portfolioRef = useRef(portfolio);

  // Update ref when portfolio changes and handle avgPrice reset side effect
  useEffect(() => {
    portfolioRef.current = portfolio;
    if (portfolio === 0) {
      // Defer the state update to avoid the lint error and potential render loops
      // although logically safe if guarded by check, setTimeout makes it clearly async
      const timer = setTimeout(() => {
          setAvgPrice(prev => (prev !== 0 ? 0 : prev));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [portfolio]);

  // Clean Real-time simulation logic
  useEffect(() => {
    const interval = setInterval(() => {
        // Calculate movement
        const volatility = 2.0;
        const movement = (Math.random() - 0.5) * volatility;

        // Update price state first to get the next tick value
        setCurrentPrice(prevPrice => {
             const newPrice = Math.max(0.01, prevPrice + movement);

             // Update Data with new price
             setData(currentData => {
                const lastCandle = currentData[currentData.length - 1];
                const updatedCandle = {
                    ...lastCandle,
                    close: newPrice,
                    high: Math.max(lastCandle.high, newPrice),
                    low: Math.min(lastCandle.low, newPrice),
                };

                const shouldClose = Math.random() > 0.9;
                if (shouldClose) {
                     const nextTime = new Date(new Date(lastCandle.time).getTime() + 86400000).toISOString().split('T')[0];
                     const newCandle: Candle = {
                        time: nextTime,
                        open: newPrice,
                        high: newPrice,
                        low: newPrice,
                        close: newPrice,
                     };
                     return [...currentData.slice(0, -1), updatedCandle, newCandle];
                }
                return [...currentData.slice(0, -1), updatedCandle];
             });

             // Check and Process Orders
             setOrders(currentOrders => {
                if (currentOrders.length === 0) return currentOrders;

                const executedOrders: Order[] = [];
                const remainingOrders: Order[] = [];

                currentOrders.forEach(order => {
                    if (order.type === 'sell' && newPrice >= order.price) {
                        if (portfolioRef.current >= order.amount) {
                            executedOrders.push(order);
                        } else {
                            remainingOrders.push(order);
                        }
                    } else {
                        remainingOrders.push(order);
                    }
                });

                if (executedOrders.length > 0) {
                    let totalSale = 0;
                    let amountSold = 0;
                    executedOrders.forEach(o => {
                        totalSale += o.amount * o.price;
                        amountSold += o.amount;
                    });

                    setBalance(b => b + totalSale);
                    setPortfolio(p => Math.max(0, p - amountSold));

                    return remainingOrders;
                }
                return currentOrders;
             });

             return newPrice;
        });

    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
      // Average price remains until portfolio is empty (handled by useEffect)
    }
  };

  const handlePlaceOrder = (price: number, amount: number) => {
    if (portfolio >= amount) {
        const newOrder: Order = {
            id: Math.random().toString(36).substr(2, 9),
            price,
            amount,
            type: 'sell'
        };
        setOrders(prev => [...prev, newOrder]);
    }
  };

  const handleCancelOrder = (id: string) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-100">Simulador de Trading</h1>
        <p className="text-slate-400">Pratique suas estratégias de mercado sem risco.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TradingChart currentPrice={currentPrice} data={data} />
        </div>
        <div className="lg:col-span-1">
          <TradingControls
            currentPrice={currentPrice}
            balance={balance}
            portfolio={portfolio}
            avgPrice={avgPrice}
            onBuy={handleBuy}
            onSell={handleSell}
            onPlaceOrder={handlePlaceOrder}
            orders={orders}
            onCancelOrder={handleCancelOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default Simulator;
