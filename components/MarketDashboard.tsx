import React, { useState, useEffect } from 'react';

const MarketDashboard: React.FC = () => {
  const [marketData, setMarketData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      console.error('Alpha Vantage API key is not defined');
      setError('Alpha Vantage API key is not defined');
      setLoading(false);
      return;
    }

    const fetchMarketData = async () => {
      try {
        const symbols = ['SPY', 'IXIC', 'DIA', 'GC=F', 'CL=F'];
        const responses = await Promise.all(symbols.map(symbol => 
          fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`)
        ));

        const data = await Promise.all(responses.map(response => response.json()));

        const extractPrice = (data: any, symbol: string) => {
          console.log(`Data for ${symbol}:`, data);
          if (data['Global Quote'] && data['Global Quote']['05. price']) {
            return data['Global Quote']['05. price'];
          } else {
            return 'Data not available';
          }
        };

        setMarketData({
          sp500: extractPrice(data[0], 'SPY'),
          nasdaq: extractPrice(data[1], 'IXIC'),
          dowjones: extractPrice(data[2], 'DIA'),
          gold: extractPrice(data[3], 'GC=F'),
          oil: extractPrice(data[4], 'CL=F')
        });
      } catch (error) {
        console.error('Failed to fetch market data', error);
        setError('Failed to fetch market data');
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, [API_KEY]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!marketData) {
    return <div>No market data available</div>;
  }

  return (
    <div>
      <h2>시장 데이터 대시보드</h2>
      <ul>
        <li>S&P 500: {marketData.sp500}</li>
        <li>나스닥: {marketData.nasdaq}</li>
        <li>다우존스: {marketData.dowjones}</li>
        <li>금: {marketData.gold}</li>
        <li>유가: {marketData.oil}</li>
      </ul>
    </div>
  );
};

export default MarketDashboard;
