import { typeHousingPrice, typeHousing } from './valid-form.js';

const priceSlider = document.querySelector('.ad-form__slider');
const priceValue = document.querySelector('.price');


noUiSlider.create(priceSlider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 1,
  connect: 'lower',
});

priceSlider.noUiSlider.on('update', () => {
  priceValue.value = priceSlider.noUiSlider.get();
});

const OnTypeHousingChange = () => {
  priceSlider.noUiSlider.updateOptions({
    range: {
      min: +typeHousingPrice[typeHousing.value],
      max: 100000,
    },
    start: +typeHousingPrice[typeHousing.value],
  });
};

export const initPriceSlider = () => {
  typeHousing.addEventListener('change', OnTypeHousingChange);
};
