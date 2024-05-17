import React, { useState } from 'react';
import styles from './InvestmentCalculator.module.css';

const InvestmentCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState(0);
  const [rate, setRate] = useState(0);
  const [time, setTime] = useState(0);
  const [compoundResult, setCompoundResult] = useState(0);
  const [simpleResult, setSimpleResult] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const calculateCompoundInterest = () => {
    const result = principal * Math.pow((1 + rate / 100), time);
    setCompoundResult(result);
  };

  const calculateSimpleInterest = () => {
    const result = principal + (principal * rate / 100 * time);
    setSimpleResult(result);
  };

  const calculateAnnualReturn = () => {
    const result = ((finalAmount / principal) ** (1 / time) - 1) * 100;
    setFinalAmount(result);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>투자 계산기</h2>
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          원금:
          <input type="number" value={principal} onChange={(e) => setPrincipal(parseFloat(e.target.value))} className={styles.input} />
        </label>
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          이자율 (%):
          <input type="number" value={rate} onChange={(e) => setRate(parseFloat(e.target.value))} className={styles.input} />
        </label>
      </div>
      <div className={styles.inputGroup}>
        <label className={styles.label}>
          기간 (년):
          <input type="number" value={time} onChange={(e) => setTime(parseFloat(e.target.value))} className={styles.input} />
        </label>
      </div>
      <div className={styles.buttons}>
        <button onClick={calculateCompoundInterest} className={styles.button}>복리 계산</button>
        <button onClick={calculateSimpleInterest} className={styles.button}>단리 계산</button>
        <button onClick={calculateAnnualReturn} className={styles.button}>연평균 수익률 계산</button>
      </div>
      <div className={styles.results}>
        <p>복리 계산 결과: {compoundResult.toFixed(2)}</p>
        <p>단리 계산 결과: {simpleResult.toFixed(2)}</p>
        <p>연평균 수익률: {finalAmount.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
