const form = document.querySelector('.ad-form');
const price = form.querySelector('.price');
const title = form.querySelector('#title');
const rooms = form.querySelector('#room_number');
const capacity = form.querySelector('#capacity');
export const typeHousing = form.querySelector('#type');
const timeIn = form.querySelector('#timein');
const timeOut = form.querySelector('#timeout');

const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'ad-form__element__error'
}, false);

const сheckOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

export const typeHousingPrice = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000',
};

const isQuantityRomms = (value) => {
  let quantityRomms;
  switch (value) {
    case '1':
      quantityRomms = 'комнату';
      break;
    case '2':
    case '3':
    case '100':
      quantityRomms = 'комнат';
      break;
  }
  return quantityRomms;
};

const isQuantityPeople = (people) => {
  let quantityPeople;
  switch (people) {
    case '1':
      quantityPeople = 'человека';
      break;
    case '2':
    case '3':
    case '100':
      quantityPeople = 'человек';
      break;
  }
  return quantityPeople;
};

const errorMessage = {
  errorMessageTitle: 'От 30 до 100 колличество букв',
  errorMessagePrice: 'Максимальная цена 100,000',
  errorMessageCheckOption: () => `Заезд невозможен для ${capacity.value} ${isQuantityPeople(capacity.value)} в ${rooms.value} ${isQuantityRomms(rooms.value)}`,
  errorMinPrice: () => `Минимальная цена ${typeHousingPrice[typeHousing.value]}`,
};

const isValidTitle = (value) => value.length >= 30 && value.length <= 100;
const isValidPrice = (value) => value < 100000;
const isValidCheckOption = () =>  сheckOption[rooms.value].includes(capacity.value);
const isValidPriceMin = (value) => value === typeHousingPrice[typeHousing.value];

const onTypeHousingChange = () => pristine.validate(price);

const onTimeInChange = () => {
  timeOut.value = timeIn.value;
};

const onTimeOutChange = () => {
  timeIn.value = timeOut.value;
};

export const initValidForm = () => {
  pristine.addValidator(title, isValidTitle, errorMessage.errorMessageTitle);
  pristine.addValidator(price, isValidPrice, errorMessage.errorMessagePrice);
  pristine.addValidator(price, isValidPriceMin , errorMessage.errorMinPrice);
  pristine.addValidator(rooms, isValidCheckOption, errorMessage.errorMessageCheckOption);
  pristine.addValidator(capacity, isValidCheckOption, errorMessage.errorMessageCheckOption);

  typeHousing.addEventListener('change', onTypeHousingChange);
  timeIn.addEventListener('change', onTimeInChange);
  timeOut.addEventListener('change', onTimeOutChange);
};

export const setOnFormSubmit = (cb) => {
  initValidForm();

  form.addEventListener ('submit', async (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      await cb(new FormData(form));
    }
  });
};
