/* global L:readonly */

import { renderCard } from './card.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const address = document.querySelector('#address');

const CENTER = {
  lat: '35.68783',
  lng: '139.75662',
};
const ZOOM = 10;

// Функция перехода в неактивное состояние
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
deactivateForm();

// Функция перехода в активное состояние
const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((element) => {
    element.disabled = false;
  });
  mapFilters.classList.remove('map__filters--disabled');
  mapFilters.querySelectorAll('fieldset, select').forEach((element) => {
    element.disabled = false;
  });
};


// Добавление карты
const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
    address.value = `${CENTER.lat}, ${CENTER.lng}`;
  })
  .setView({
    lat: CENTER.lat,
    lng: CENTER.lng,
  }, ZOOM);

// Добавление слоя карты

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Оформление главного маркера
const mainIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Добавление главного маркера
const mainMarker = L.marker(
  {
    lat: CENTER.lat,
    lng: CENTER.lng,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);
mainMarker.addTo(map);

// Изменение поля адресса при перемещении главного маркера

mainMarker.on('move', (evt) => {
  address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
});

// Оформление иконки маркера объявления
const adIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


// Функция добавления маркеров на карту

const renderPins = (data) => {
  data.forEach((marker) => {
    const adMarker = L.marker(
      {
        lat: marker.location.lat,
        lng: marker.location.lng,
      },
      {
        icon: adIcon,
        keepInView: true,
      },
    );
    adMarker
      .addTo(map)
      .bindPopup(renderCard(marker));
  });
};

const resetMap = () => {
  address.value = `${CENTER.lat}, ${CENTER.lng}`;
  mainMarker.setLatLng([CENTER.lat, CENTER.lng]);
  map.setView({
    lat: CENTER.LAT,
    lng: CENTER.LNG,
  }, ZOOM);
}

export {renderPins, resetMap}

