import React, { useState } from 'react';

import './App.scss';
import CardRange from './components/card-range/CardRange';

function App() {
  const [carPrice, setCarPrice] = useState(3300000);

  return (
    <div className="page">
      <h1 className="page__header">Рассчитайте стоимость автомобиля в лизинг</h1>
      <ul className="cards">
        <CardRange
          title="Стоимость автомобиля"
          min={1000000}
          max={6000000}
          char="₽"
          value={carPrice}
          setValue={setCarPrice}
        />
        <CardRange
          title="Первоначальный взнос"
          min={10}
          max={60}
          initialValue={13}
          percents={true}
          value={carPrice}
          setValue={setCarPrice}
        />
        <CardRange title="Срок лизинга" min={1} max={60} initialValue={60} char="мес" />
      </ul>
    </div>
  );
}

export default App;
