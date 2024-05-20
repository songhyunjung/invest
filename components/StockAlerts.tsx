import React, { useState, useEffect } from 'react';

const StockAlerts: React.FC<{ stockSymbol: string }> = ({ stockSymbol }) => {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [targetPrice, setTargetPrice] = useState<number | null>(null);

  useEffect(() => {
    const ws = new WebSocket('wss://your-websocket-server');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.symbol === stockSymbol && targetPrice && data.price >= targetPrice) {
        setAlerts([...alerts, `주식 ${stockSymbol}가 목표가 ${targetPrice}에 도달했습니다.`]);
      }
    };

    return () => {
      ws.close();
    };
  }, [stockSymbol, targetPrice, alerts]);

  return (
    <div>
      <h2>사용자 알림</h2>
      <input
        type="number"
        placeholder="목표 가격 설정"
        value={targetPrice || ''}
        onChange={(e) => setTargetPrice(parseFloat(e.target.value))}
      />
      <ul>
        {alerts.map((alert, index) => (
          <li key={index}>{alert}</li>
        ))}
      </ul>
    </div>
  );
};

export default StockAlerts;
