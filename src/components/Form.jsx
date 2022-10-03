import React, { useState } from 'react';

import { calcMonthPay } from '../helpers/calcMonthPay';
import { calcSum } from '../helpers/calcSum';
import { handleSendRequest } from '../helpers/handleSendRequest';
import { numberWithSpaces } from '../helpers/numberWithSpaces';

import '../scss/CardCost.scss';
import '../scss/CardRange.scss';
import Preloader from './Preloader';

const CAR_PRICE_MIN = 1000000;
const CAR_PRICE_MAX = 6000000;
const PERCENTS_MIN = 10;
const PERCENTS_MAX = 60;
const LEASING_MIN = 1;
const LEASING_MAX = 60;

const Form = () => {
  const [carPrice, setCarPrice] = useState(3300000);
  const [percents, setPercents] = useState(10);
  const [leasing, setLeasing] = useState(60);
  const [initial, setInitial] = useState(Math.round((percents / 100) * carPrice));
  const [monthPay, setMonthPay] = useState(calcMonthPay(carPrice, initial, leasing));
  const [sum, setSum] = useState(calcSum(initial, leasing, monthPay));
  const [isDisabled, setIsDisabled] = useState(false);

  const onBlurChange = (e, min, max, setValue) => {
    if (e.target.value > max) {
      setValue(max);
    } else if (e.target.value < min) {
      setValue(min);
    } else setValue(e.target.value);
  };

  const onChangePercents = (e) => {
    const initialValue = Math.round((e.target.value / 100) * carPrice);
    setInitial(initialValue);
    setPercents(e.target.value);
    const month = calcMonthPay(carPrice, initialValue, leasing);
    setMonthPay(month);
    setSum(calcSum(initialValue, leasing, month));
  };

  const onChangePrice = (e) => {
    const initialValue = Math.round((percents / 100) * e.target.value);
    setCarPrice(e.target.value);
    setInitial(initialValue);
    const month = calcMonthPay(e.target.value, initialValue, leasing);
    setMonthPay(month);
    setSum(calcSum(initialValue, leasing, month));
  };

  const onChangeInitial = (e) => {
    const percents = Math.round((e.target.value / carPrice) * 100);
    setInitial(e.target.value);
    setPercents(percents);
    const month = calcMonthPay(carPrice, e.target.value, leasing);
    setMonthPay(month);
    setSum(calcSum(e.target.value, leasing, month));
  };

  const onChangeLeasing = (e) => {
    setLeasing(e.target.value);
    const month = calcMonthPay(carPrice, initial, e.target.value);
    setMonthPay(month);
    setSum(calcSum(initial, e.target.value, month));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setIsDisabled(true);
    handleSendRequest({ carPrice, initial, percents, leasing, monthPay, sum }).then((res) => {
      setIsDisabled(false);
    });
  };

  return (
    <form className="cards">
      <div className="card-range">
        <h2 className="card-range__title">Стоимость автомобиля</h2>
        <div className="input-range__wrapper">
          <div className="input-range__value-wrapper">
            <input
              pattern="[A-Za-z]{3}"
              className="input-range__value input-range__value_input"
              value={carPrice}
              onChange={onChangePrice}
              onBlur={(e) => {
                onBlurChange(e, CAR_PRICE_MIN, CAR_PRICE_MAX, setCarPrice, onChangePrice);
              }}
              disabled={isDisabled}
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
            disabled={isDisabled}
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
              disabled={isDisabled}
            />
            <span className="input-range__percents">{percents}%</span>
          </div>
          <input
            className="input-range"
            type="range"
            min={PERCENTS_MIN}
            max={PERCENTS_MAX}
            value={percents}
            onChange={onChangePercents}
            step="1"
            disabled={isDisabled}
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
              disabled={isDisabled}
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
            disabled={isDisabled}
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
      <button
        className="send-request-btn"
        disabled={isDisabled}
        onClick={(e) => handleSubmitForm(e)}>
        {isDisabled ? <Preloader /> : 'Оставить заявку'}
      </button>
    </form>
  );
};

export default Form;
