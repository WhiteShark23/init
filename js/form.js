const form = document.querySelector('.ad-form');
const mapForm = document.querySelector('.map__filters');

const inputMapList = [...mapForm];
const inputList = [...form];

export const disabledForm = () => {
  if(form) {
    form.classList.add('ad-form--disabled');
    for( let i = 0; i < inputList.length; i++){
      inputList[i].disabled = true;
    }
  }

  if (mapForm) {
    mapForm.classList.add('ad-form--disabled');
    for( let i = 0; i < inputMapList.length; i++){
      inputMapList[i].disabled = true;
    }
  }
};

export const initForm = () => {
  form.classList.remove('ad-form--disabled');
  for( let i = 0; i < inputList.length; i++){
    inputList[i].disabled = false;
  }

  mapForm.classList.remove('ad-form--disabled');
  for( let i = 0; i < inputMapList.length; i++){
    inputMapList[i].disabled = false;
  }
};

