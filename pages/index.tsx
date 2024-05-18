import React from 'react';
import StockChart from '../components/StockChart';
import InvestmentCalculator from '../components/InvestmentCalculator';
import styles from './index.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>주식 시세 및 투자 계산기</h1>
      <div className={styles.section}>
        <StockChart />
      </div>
      <div className={styles.section}>
        <InvestmentCalculator />
      </div>
    </div>
  );
};

export default Home;
