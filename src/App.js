import React, { useState } from 'react';

import './App.scss';
import './components/card-cost/CardCost.scss';
import './components/card-cost/CardRange.scss';

function App() {
  const [carPrice, setCarPrice] = useState(3300000);
  const [percents, setPercents] = useState(13);
  const percentsTo = percents / 100;
  const [leasing, setLeasing] = useState(60);
  const [initial, setInitial] = useState(Math.round(percentsTo * carPrice));
  const [monthPay, setMonthPay] = useState(0);
  const [sum, setSum] = useState(0);
  const CAR_PRICE_MIN = 1000000;
  const CAR_PRICE_MAX = 6000000;
  const PERCENTS_MIN = 10;
  const PERCENTS_MAX = 60;
  const LEASING_MIN = 1;
  const LEASING_MAX = 60;
  const calcMonthPay = () => {
    setMonthPay(
      Math.round(
        (carPrice - initial) *
          ((0.035 * Math.pow(1.035, leasing)) / (Math.pow(1.035, leasing) - 1)),
      ),
    );
  };

  const calcSum = () => {
    setSum(initial + leasing * monthPay);
  };

  const onBlurChange = (e, min, max) => {
    if (e.target.value > max) {
      return max;
    }
    if (e.target.value < min) {
      return min;
    }
    return e.target.value;
  };

  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  const onChangePercents = (e) => {
    setInitial(Math.round((e.target.value / 100) * carPrice));
    setPercents(e.target.value);
    calcMonthPay();
    calcSum();
  };

  const onChangePrice = (e) => {
    setCarPrice(e.target.value);
    setInitial(Math.round((percents / 100) * e.target.value));
    calcMonthPay();
    calcSum();
  };

  const onChangeInitial = (e) => {
    setInitial(e.target.value);
    setPercents(Math.round((e.target.value / carPrice) * 100));
    calcMonthPay();
    calcSum();
  };

  const onChangeLeasing = (e) => {
    setLeasing(e.target.value);
    calcSum();
    calcMonthPay();
  };

  return (
    <div className="page">
      <h1 className="page__header">Рассчитайте стоимость автомобиля в лизинг</h1>
      <form className="cards">
        <div className="card-range">
          <h2 className="card-range__title">Стоимость автомобиля</h2>
          <div className="input-range__wrapper">
            <div className="input-range__value-wrapper">
              <input
                className="input-range__value input-range__value_input"
                value={carPrice}
                onChange={onChangePrice}
                onBlur={(e) => onBlurChange(e, CAR_PRICE_MIN, CAR_PRICE_MAX)}
              />
              <span className="input-range__value">₽</span>
            </div>
            <input
              className="input-range"
              type="range"
              min={CAR_PRICE_MIN}
              max={CAR_PRICE_MAX}
              value={carPrice}
              onChange={onChangePrice}
              step="1000"
            />
          </div>
        </div>
        <div className="card-range">
          <h2 className="card-range__title">Первоначальный взнос</h2>
          <div className="input-range__wrapper">
            <div className="input-range__value-wrapper">
              <input
                className="input-range__value input-range__value_input"
                value={initial}
                onChange={onChangeInitial}
              />
              <span className="input-range__percents">{percents}%</span>
            </div>
            <input
              className="input-range"
              type="range"
              min={PERCENTS_MIN}
              max={PERCENTS_MAX}
              disabled={false}
              value={percents}
              onChange={onChangePercents}
              step="1"
            />
          </div>
        </div>
        <div className="card-range">
          <h2 className="card-range__title">Срок лизинга</h2>
          <div className="input-range__wrapper">
            <div className="input-range__value-wrapper">
              <input
                className="input-range__value input-range__value_input"
                value={leasing}
                onChange={onChangeLeasing}
                onBlur={(e) => onBlurChange(e, LEASING_MIN, LEASING_MAX)}
              />
              <span className="input-range__value">мес.</span>
            </div>
            <input
              className="input-range"
              type="range"
              min={LEASING_MIN}
              max={LEASING_MAX}
              value={leasing}
              onChange={onChangeLeasing}
            />
          </div>
        </div>
        <div className="card-cost">
          <h2 className="card-cost__title">Сумма договора лизинга</h2>
          <div className="card-cost__sum">{numberWithSpaces(sum)} ₽</div>
        </div>
        <div className="card-cost">
          <h2 className="card-cost__title">Ежемесячный платеж от</h2>
          <div className="card-cost__sum">{numberWithSpaces(monthPay)} ₽</div>
        </div>
        <button className="send-request-btn">Оставить заявку</button>
      </form>
    </div>
  );
}

export default App;
