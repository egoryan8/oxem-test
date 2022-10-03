import React from 'react';

import './App.scss';

import Form from './components/Form';

function App() {
  return (
    <div className="page">
      <h1 className="page__header">Рассчитайте стоимость автомобиля в лизинг</h1>
      <Form />
    </div>
  );
}

export default App;
