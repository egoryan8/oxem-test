export const calcMonthPay = (price, initialValue, leasingPercents) => {
  return Math.round(
    (price - Number(initialValue)) *
      ((0.035 * Math.pow(1.035, leasingPercents)) / (Math.pow(1.035, leasingPercents) - 1)),
  );
};
