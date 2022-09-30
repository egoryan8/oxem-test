import React from 'react';
import './CardRange.scss';

const CardRange = ({ title, min, max, value, setValue, char, percents }) => {
  const onBlurChange = (e) => {
    if (e.target.value > max) {
      setValue(max);
    } else if (e.target.value < min) {
      setValue(min);
    } else setValue(e.target.value);
  };

  return (
    <li className="card-range">
      <h2 className="card-range__title">{title}</h2>
      <div className="input-range__wrapper">
        <div className="input-range__value-wrapper">
          <input
            className="input-range__value input-range__value_input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlurChange}
          />
          {percents ? (
            <span className="input-range__percents">{'true'}</span>
          ) : (
            <span className="input-range__value">{char}</span>
          )}
        </div>
        <input
          className="input-range"
          type="range"
          min={min}
          max={max}
          disabled={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </li>
  );
};

export default CardRange;