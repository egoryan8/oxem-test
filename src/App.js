import React from 'react';

import './App.scss';
import CardRange from './components/card-range/CardRange';

function App() {
  return (
    <div className="page">
      <h1 className="page__header">Рассчитайте стоимость автомобиля в лизинг</h1>
      <ul className="cards">
        <CardRange
          title="Стоимость автомобиля"
          min={1000000}
          max={6000000}
          initialValue={3300000}
          char="₽"
        />
        <CardRange title="Первоначальный взнос" min={10} max={60} initialValue={13} />
        <CardRange title="Срок лизинга" min={1} max={60} initialValue={60} char="мес" />
      </ul>
    </div>
  );
}

export default App;
