import React from 'react';
import './CardCost.scss';

const CardCost = ({ title, sum }) => {
  return (
    <li className="card-cost">
      <h2 className="card-cost__title">{title}</h2>
      <div className="card-cost__sum">{sum} ₽</div>
    </li>
  );
};

export default CardCost;
