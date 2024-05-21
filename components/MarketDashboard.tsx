// components/MarketDashboard.tsx

import React, { useState, useEffect } from 'react';
import styles from './MarketDashboard.module.css';

const MarketDashboard: React.FC = () => {
  const [marketData, setMarketData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketData = async () => {
    try {
      const spResponse = await fetch(`https://cloud.iexapis.com/stable/stock/spy/quote?token=${process.env.NEXT_PUBLIC_IEX_API_KEY}`);
      const nasdaqResponse = await fetch(`https://cloud.iexapis.com/stable/stock/qqq/quote?token=${process.env.NEXT_PUBLIC_IEX_API_KEY}`);
      const dowjonesResponse = await fetch(`https://cloud.iexapis.com/stable/stock/dia/quote?token=${process.env.NEXT_PUBLIC_IEX_API_KEY}`);
      const goldResponse = await fetch(`https://cloud.iexapis.com/stable/stock/gld/quote?token=${process.env.NEXT_PUBLIC_IEX_API_KEY}`);
      const oilResponse = await fetch(`https://cloud.iexapis.com/stable/stock/uso/quote?token=${process.env.NEXT_PUBLIC_IEX_API_KEY}`);

      const spData = await spResponse.json();
      const nasdaqData = await nasdaqResponse.json();
      const dowjonesData = await dowjonesResponse.json();
      const goldData = await goldResponse.json();
      const oilData = await oilResponse.json();

      setMarketData({
        sp: spData.latestPrice,
        nasdaq: nasdaqData.latestPrice,
        dowjones: dowjonesData.latestPrice,
        gold: goldData.latestPrice,
        oil: oilData.latestPrice,
      });
      setError(null);
    } catch (error) {
      setError('시장 데이터를 불러올 수 없습니다.');
      console.error('Error fetching market data:', error);
    }
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  return (
    <div className={styles.container}>
      <h2>시장 데이터 대시보드</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <ul>
          <li>S&P 500: {marketData?.sp || 'Data not available'}</li>
          <li>나스닥: {marketData?.nasdaq || 'Data not available'}</li>
          <li>다우존스: {marketData?.dowjones || 'Data not available'}</li>
          <li>금: {marketData?.gold || 'Data not available'}</li>
          <li>유가: {marketData?.oil || 'Data not available'}</li>
        </ul>
      )}
    </div>
  );
};

export default MarketDashboard;
