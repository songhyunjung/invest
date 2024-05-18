import React, { useState } from 'react';
import styles from './InvestmentCalculator.module.css';

const InvestmentCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState<number | null>(null);
  const [rate, setRate] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);
  const [finalAmount, setFinalAmount] = useState<number | null>(null);
  const [compoundResult, setCompoundResult] = useState<number | null>(null);
  const [simpleResult, setSimpleResult] = useState<number | null>(null);
  const [annualReturn, setAnnualReturn] = useState<number | null>(null);

  const calculateCompoundInterest = () => {
    if (principal !== null && rate !== null && time !== null) {
      const result = principal * Math.pow((1 + rate / 100), time);
      setCompoundResult(result);
    }
  };

  const calculateSimpleInterest = () => {
    if (principal !== null && rate !== null && time !== null) {
      const result = principal + (principal * rate / 100 * time);
      setSimpleResult(result);
    }
  };

  const calculateAnnualReturn = () => {
    if (principal !== null && finalAmount !== null && time !== null) {
      const result = ((finalAmount / principal) ** (1 / time) - 1) * 100;
      setAnnualReturn(result);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>투자 계산기</h2>
      <div className={styles.inputGroup}>
        <label>
          원금:
          <input 
            type="number" 
            value={principal !== null ? principal : ''} 
            onChange={(e) => setPrincipal(parseFloat(e.target.value))} 
            className={styles.input} 
          />
        </label>
      </div>
      <div className={styles.inputGroup}>
        <label>
          이자율 (%):
          <input 
            type="number" 
            value={rate !== null ? rate : ''} 
            onChange={(e) => setRate(parseFloat(e.target.value))} 
            className={styles.input} 
          />
        </label>
      </div>
      <div className={styles.inputGroup}>
        <label>
          기간 (년):
          <input 
            type="number" 
            value={time !== null ? time : ''} 
            onChange={(e) => setTime(parseFloat(e.target.value))} 
            className={styles.input} 
          />
        </label>
      </div>
      <div className={styles.calculationGroup}>
        <h3>이자 계산</h3>
        <div className={styles.buttonGroup}>
          <button onClick={calculateCompoundInterest} className={styles.button}>
            복리 계산
          </button>
          <button onClick={calculateSimpleInterest} className={styles.button}>
            단리 계산
          </button>
        </div>
        <div className={styles.resultGroup}>
          <p>복리 계산 결과: {compoundResult !== null ? compoundResult.toFixed(2) : '-'}</p>
          <p>단리 계산 결과: {simpleResult !== null ? simpleResult.toFixed(2) : '-'}</p>
        </div>
      </div>
      <div className={styles.inputGroup}>
        <label>
          최종 금액:
          <input 
            type="number" 
            value={finalAmount !== null ? finalAmount : ''} 
            onChange={(e) => setFinalAmount(parseFloat(e.target.value))} 
            className={styles.input} 
          />
        </label>
      </div>
      <div className={styles.calculationGroup}>
        <h3>연평균 수익률 계산</h3>
        <button onClick={calculateAnnualReturn} className={styles.button}>
          연평균 수익률 계산
        </button>
        <div className={styles.resultGroup}>
          <p>연평균 수익률: {annualReturn !== null ? annualReturn.toFixed(2) : '-'}%</p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;
