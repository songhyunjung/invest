import dynamic from "next/dynamic";
import React from 'react';

//const StockChart = dynamic(import("../components/StockChart"));
//const InvestmentCalculator = dynamic(import("../components/InvestmentCalculator"));

import StockChart from '../components/StockChart';
import InvestmentCalculator from '../components/InvestmentCalculator';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Stock Prices and Investment Calculator</h1>
      <StockChart />
      <InvestmentCalculator />
    </div>
  );
};

export default Home;
