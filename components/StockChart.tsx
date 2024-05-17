import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import styles from './StockChart.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockChart: React.FC = () => {
  const [stockData, setStockData] = useState<any>({});
  const [symbol, setSymbol] = useState('IBM');
  const [timeRange, setTimeRange] = useState('1d');

  const fetchStockData = async () => {
    const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
    const interval = '5min';
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`
      );
      console.log('API 응답:', response.data);

      const timeSeries = response.data['Time Series (5min)'];
      if (!timeSeries) {
        console.error('시간 시리즈 데이터를 찾을 수 없습니다.');
        return;
      }

      const labels = Object.keys(timeSeries).reverse();
      const prices = labels.map(label => parseFloat(timeSeries[label]['1. open']));

      setStockData({
        labels,
        datasets: [
          {
            label: '주식 가격',
            data: prices,
            borderColor: 'rgba(75,192,192,1)',
            fill: false,
          },
        ],
      });
    } catch (error) {
      console.error('주식 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, [symbol, timeRange]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>실시간 주식 차트</h2>
      <div className={styles.controls}>
        <input 
          type="text" 
          value={symbol} 
          onChange={(e) => setSymbol(e.target.value.toUpperCase())} 
          placeholder="주식 종목을 입력하세요" 
          className={styles.input}
        />
        <select 
          onChange={(e) => setTimeRange(e.target.value)} 
          className={styles.select}
        >
          <option value="1d">1일</option>
          <option value="1w">1주</option>
          <option value="1m">1개월</option>
          <option value="1y">1년</option>
        </select>
      </div>
      {stockData && stockData.labels && stockData.labels.length > 0 ? (
        <Line data={stockData} />
      ) : (
        <p className={styles.message}>선택한 주식과 시간 범위에 대한 데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default StockChart;
