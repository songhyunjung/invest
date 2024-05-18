
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


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import styles from './StockChart.module.css';

const StockChart: React.FC = () => {
  const [symbol, setSymbol] = useState('IBM');
  const [interval, setInterval] = useState('5min');
  const [chartData, setChartData] = useState<any>(null);
  const [timeRange, setTimeRange] = useState('1d');

  const fetchStockData = async () => {
    const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`
      );
      console.log('API 응답:', response.data);
      const timeSeriesKey = `Time Series (${interval})`;
      const timeSeries = response.data[timeSeriesKey];

      if (!timeSeries) {
        console.error('시간 시리즈 데이터를 찾을 수 없습니다.');
        setChartData(null);
        return;
      }

      const chartLabels = Object.keys(timeSeries).reverse();
      const chartValues = chartLabels.map((key) => parseFloat(timeSeries[key]['4. close']));

      const data = {
        labels: chartLabels,
        datasets: [
          {
            label: `${symbol} 주가`,
            data: chartValues,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: false,
          },
        ],
      };
      setChartData(data);
    } catch (error) {
      console.error('주식 데이터를 가져오는 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, [symbol, interval]);

  const handleSymbolChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSymbol(event.target.value.toUpperCase());
  };

  const handleTimeRangeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRange = event.target.value;
    setTimeRange(selectedRange);

    switch (selectedRange) {
      case '1d':
        setInterval('5min');
        break;
      case '1w':
        setInterval('60min');
        break;
      case '1m':
        setInterval('daily');
        break;
      case '1y':
        setInterval('monthly');
        break;
      default:
        setInterval('5min');
        break;
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>실시간 주식 시세 차트</h2>
      <div className={styles.controls}>
        <label>
          종목:
          <input type="text" value={symbol} onChange={handleSymbolChange} className={styles.input} />
        </label>
        <label>
          시간 범위:
          <select value={timeRange} onChange={handleTimeRangeChange} className={styles.dropdown}>
            <option value="1d">1일</option>
            <option value="1w">1주</option>
            <option value="1m">1개월</option>
            <option value="1y">1년</option>
          </select>
        </label>
      </div>
      {chartData ? (
        <Line data={chartData} />
      ) : (
        <p>선택한 주식과 시간 범위에 대한 데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default StockChart;
