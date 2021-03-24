import { sendData } from './api.js';
import { showFailPopup, showSuccessPopup } from './popup.js';
import { resetMap } from './map.js'

const adForm = document.querySelector('.ad-form');
const checkIn = adForm.querySelector('#timein');
const checkOut = adForm.querySelector('#timeout');
const venueType = adForm.querySelector('#type');
const venuePrice = adForm.querySelector('#price');
const adTitle = adForm.querySelector('#title');
const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');
const reset = adForm.querySelector('.ad-form__reset');
const MinPrice =
{
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  palace: 10000,
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
validateTitle();

checkIn.addEventListener('change', () => {
  checkOut.value = checkIn.value;
});

checkOut.addEventListener('change', () => {
  checkIn.value = checkOut.value;
});

venueType.addEventListener('change', () => {
  venuePrice.placeholder = MinPrice[venueType.value.toUpperCase()];
  venuePrice.min = MinPrice[venueType.value.toUpperCase()];
});

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
roomNumber.addEventListener('change', () => { validateCapacity() });


adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  sendData(() => {
    showSuccessPopup();
    adForm.reset();
    resetMap();
  },
  () => {
    showFailPopup()
  },
  new FormData(adForm))
});

reset.addEventListener('click', (evt) => {
  evt.preventDefault();
  adForm.reset();
  resetMap();
});
