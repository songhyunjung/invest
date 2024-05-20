import React from 'react';
import StockChart from '../components/StockChart';
import InvestmentCalculator from '../components/InvestmentCalculator';
import NewsFeed from '../components/NewsFeed';
import MarketDashboard from '../components/MarketDashboard';
import styles from './index.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>투자 포털</h1>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <StockChart />
        </section>
        <section className={styles.section}>
          <InvestmentCalculator />
        </section>
        <section className={styles.section}>
          <MarketDashboard />
        </section>
        <section className={styles.section}>
          <NewsFeed />
        </section>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2024 투자 포털. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
