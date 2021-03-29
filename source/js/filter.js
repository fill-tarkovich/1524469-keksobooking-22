import { mapFilters } from './map.js';

const priceRange = {
  low: {
    min: 0,
    max: 10000,
  },
  middle:{
    min: 10000,
    max: 50000,
  },
  high:{
    min: 50000,
    max: 1000000,
  },
};

const housingType = document.querySelector('#housing-type');
const housingRooms = document.querySelector('#housing-rooms');
const housingGuests = document.querySelector('#housing-guests');
const housingPrice = document.querySelector('#housing-price');

const sortFilters = (object) => {
  let isType = true;
  let isRooms = true;
  let isGuests = true;
  let isPrice = true;
  let isFeatures = true;

  if (housingType.value !== 'any') {
    isType = object.offer.type === housingType.value;
  }

  if (housingRooms.value !== 'any') {
    isRooms = object.offer.rooms.toString() === housingRooms.value;
  }

  if (housingGuests.value !== 'any') {
    isGuests = object.offer.guests.toString() === housingGuests.value;
  }

  let selectedPrice = housingPrice.value;
  if (selectedPrice !== 'any') {
    isPrice = object.offer.price >= priceRange[selectedPrice].min && object.offer.price < priceRange[selectedPrice].max
  }

  let checkedFeatures = document.querySelectorAll('input[type="checkbox"]:checked');
  if (checkedFeatures) {
    checkedFeatures.forEach((feature) => {
      if (object.offer.features.indexOf(feature.value) === -1) {
        isFeatures = false;
      }
    });
  }

  return (isType && isRooms && isGuests && isPrice && isFeatures);
};

const filterArray = (array) => {

  const filtredArray = [];

  array.forEach((object) => {
    if (sortFilters(object)) {
      filtredArray.push(object);
    }
  })
  return filtredArray;
};

const changeFilter = (action) => {
  mapFilters.addEventListener('change', () => {
    action();
  })
};

const activateFilters = () => {
  mapFilters.classList.remove('map__filters--disabled');
  mapFilters.querySelectorAll('fieldset, select').forEach((element) => {
    element.disabled = false;
  });
};

export { filterArray, changeFilter, activateFilters }
