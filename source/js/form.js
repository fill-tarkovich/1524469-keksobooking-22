import { sendData } from './api.js';
import { showFailPopup, showSuccessPopup } from './popup.js';
import { resetMap, mapFilters, renderLayer } from './map.js'
import { clearPictures } from './pictures.js';

const MinPrice =
{
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000,
};

const adForm = document.querySelector('.ad-form');
const checkIn = adForm.querySelector('#timein');
const checkOut = adForm.querySelector('#timeout');
const venueType = adForm.querySelector('#type');
const venuePrice = adForm.querySelector('#price');
const adTitle = adForm.querySelector('#title');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const reset = adForm.querySelector('.ad-form__reset');

const deactivateForm = () => {
  adForm.classList.add('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((element) => {
    element.disabled = true;
  });
  mapFilters.classList.add('map__filters--disabled');
  mapFilters.querySelectorAll('fieldset, select').forEach((element) => {
    element.disabled = true;
  });
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((element) => {
    element.disabled = false;
  });
};

const validateTitle = () => {
  adTitle.addEventListener('input', () => {
    if (adTitle.validity.tooShort) {
      adTitle.setCustomValidity('Введите еще ' + (30 - adTitle.value.length) + ' символов');
    } else if (adTitle.validity.tooLong) {
      adTitle.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (adTitle.validity.valueMissing) {
      adTitle.setCustomValidity('Обязательное поле');
    } else {
      adTitle.setCustomValidity('');
    }
    adTitle.reportValidity();
  })
};

const adjustTime = () => {
  checkIn.addEventListener('change', () => {
    checkOut.value = checkIn.value;
  });
  checkOut.addEventListener('change', () => {
    checkIn.value = checkOut.value;
  });
};

const adjustPrice = () => {
  venueType.addEventListener('change', () => {
    venuePrice.placeholder = MinPrice[venueType.value.toUpperCase()];
    venuePrice.min = MinPrice[venueType.value.toUpperCase()];
  });
};

const validateCapacity = () => {
  if (roomNumber.value === '100' && capacity.value !== '0') {
    capacity.setCustomValidity('Выберите пункт "Не для гостей ')
  } else if (roomNumber.value === '3' && capacity.value === '0') {
    capacity.setCustomValidity('Вы можете выбрать не более 3 гостей ')
  } else if (roomNumber.value === '2' && (capacity.value > '2' || capacity.value < '1')) {
    capacity.setCustomValidity('Вы можете выбрать не более 2 гостей')
  } else if (roomNumber.value === '1' && capacity.value !== '1') {
    capacity.setCustomValidity('Вы можете выбрать только 1 гостя')
  } else { capacity.setCustomValidity('') }
  capacity.reportValidity();
}

const validateForm = () => {
  validateTitle();
  adjustTime();
  adjustPrice();
  roomNumber.addEventListener('change', () => { validateCapacity() });
  capacity.addEventListener('change', () => { validateCapacity() });
}

const submitForm = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(() => {
      showSuccessPopup();
      adForm.reset();
      clearPictures();
      resetMap();
      mapFilters.reset();
    },
    () => {
      showFailPopup()
    },
    new FormData(adForm))
  });
};

const clickReset = (array) => {
  reset.addEventListener('click', (evt) => {
    evt.preventDefault();
    adForm.reset();
    clearPictures();
    resetMap();
    mapFilters.reset();
    renderLayer(array);
  });
};

export { deactivateForm, activateForm, validateForm, submitForm, clickReset }
