//Функция для форматирования числа (добавления пробелов)

export const numberWithSpaces = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
