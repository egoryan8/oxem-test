export const addFocus = (e) => {
  e.target.closest('.input-range__wrapper').classList.add('input-range__wrapper_focused');
};

export const removeFocus = (e) => {
  e.target.closest('.input-range__wrapper').classList.remove('input-range__wrapper_focused');
};
