// components/StockChart.tsx

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import styles from './StockChart.module.css';

const StockChart: React.FC = () => {
  const [symbol, setSymbol] = useState('AAPL');
  const [timeRange, setTimeRange] = useState('1d');
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchStockData = async () => {
    try {
      const response = await fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/chart/${timeRange}?token=${process.env.NEXT_PUBLIC_IEX_API_KEY}`);
      const data = await response.json();
      const processedData = {
        labels: data.map((entry: any) => entry.date),
        datasets: [
          {
            label: `${symbol} Price`,
            data: data.map((entry: any) => entry.close),
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false,
          },
        ],
      };
      setChartData(processedData);
      setError(null);
    } catch (error) {
      setError('주식 데이터를 불러올 수 없습니다.');
      console.error('Error fetching stock data:', error);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, [symbol, timeRange]);

  return (
    <div className={styles.container}>
      <h2>실시간 주식 시세 차트</h2>
      <div className={styles.controls}>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="종목 코드 입력"
        />
        <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
          <option value="1d">1일</option>
          <option value="5d">1주</option>
          <option value="1m">1개월</option>
          <option value="1y">1년</option>
        </select>
        <button onClick={fetchStockData}>데이터 불러오기</button>
      </div>
      {chartData ? (
        <Line data={chartData} />
      ) : (
        <p>{error || '선택한 주식과 시간 범위에 대한 데이터가 없습니다.'}</p>
      )}
    </div>
  );
};

export default StockChart;
