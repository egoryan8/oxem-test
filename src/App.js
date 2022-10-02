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
  const [monthPay, setMonthPay] = useState(
    Math.round(
      (carPrice - initial) * ((0.035 * Math.pow(1.035, leasing)) / (Math.pow(1.035, leasing) - 1)),
    ),
  );
  const [sum, setSum] = useState(initial + leasing * monthPay);
  const CAR_PRICE_MIN = 1000000;
  const CAR_PRICE_MAX = 6000000;
  const PERCENTS_MIN = 10;
  const PERCENTS_MAX = 60;
  const LEASING_MIN = 1;
  const LEASING_MAX = 60;

  const calcMonthPay = (price, initialValue, leasingPercents) => {
    return Math.round(
      (price - Number(initialValue)) *
        ((0.035 * Math.pow(1.035, leasingPercents)) / (Math.pow(1.035, leasingPercents) - 1)),
    );
  };

  const calcSum = (initialValue, leasingPercents, month) => {
    return Number(initialValue) + leasingPercents * month;
  };

  const onBlurChange = (e, min, max, setValue) => {
    if (e.target.value > max) {
      setValue(max);
    } else if (e.target.value < min) {
      setValue(min);
    } else setValue(e.target.value);
  };

  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  const onChangePercents = (e) => {
    const initialValue = Math.round((e.target.value / 100) * carPrice);
    setInitial(initialValue);
    setPercents(e.target.value);
    const month = calcMonthPay(carPrice, initialValue, leasing);
    setMonthPay(month);
    const sum = calcSum(initialValue, leasing, month);
    setSum(sum);
  };

  const onChangePrice = (e) => {
    const initialValue = Math.round((percents / 100) * e.target.value);
    setCarPrice(e.target.value);
    setInitial(initialValue);
    const month = calcMonthPay(e.target.value, initialValue, leasing);
    setMonthPay(month);
    const sum = calcSum(initialValue, leasing, month);
    setSum(sum);
  };

  const onChangeInitial = (e) => {
    const percents = Math.round((e.target.value / carPrice) * 100);
    setInitial(e.target.value);
    setPercents(percents);
    const month = calcMonthPay(carPrice, e.target.value, leasing);
    setMonthPay(month);
    const sum = calcSum(e.target.value, leasing, month);
    setSum(sum);
  };

  const onChangeLeasing = (e) => {
    setLeasing(e.target.value);
    const month = calcMonthPay(carPrice, initial, e.target.value);
    setMonthPay(month);
    const sum = calcSum(initial, e.target.value, month);
    setSum(sum);
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
                onBlur={(e) => {
                  onBlurChange(e, CAR_PRICE_MIN, CAR_PRICE_MAX, setCarPrice);
                }}
              />
              <span className="input-range__value">&#8381;</span>
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
                onBlur={(e) => {
                  onBlurChange(e, PERCENTS_MIN, PERCENTS_MAX, setPercents);
                  setInitial();
                }}
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
                onBlur={(e) => onBlurChange(e, LEASING_MIN, LEASING_MAX, setLeasing)}
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
