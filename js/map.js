/* global L:readonly */
import { createAdvertisements } from './data.js';
import { renderCard } from './popup.js';

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const address = document.querySelector('#address');
const CENTER_LAT = 35.68950;
const CENTER_LNG = 139.69171;
const MAP_ZOOM = 12;
const DECIMALS = 5;


adForm.classList.add('ad-form--disabled');
adForm.querySelectorAll('fieldset').forEach((element) => {
  element.disabled = true;
});
mapFilters.classList.add('map__filters--disabled');
mapFilters.querySelectorAll('fieldset, select').forEach((element) => {
  element.disabled = true;
});

const map = L.map('map-canvas');
map.addEventListener('load', () => {
  adForm.classList.remove('ad-form--disabled');
  adForm.querySelectorAll('fieldset').forEach((element) => {
    element.disabled = false
  });
  mapFilters.classList.remove('map__filters--disabled');
  mapFilters.querySelectorAll('fieldset, select').forEach((element) => {
    element.disabled = false;
  });
  address.value = '35.6895, 139.69171';
});
map.setView({ lat: CENTER_LAT, lng: CENTER_LNG }, MAP_ZOOM);

const layer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);
layer.addTo(map);

const mainIcon = L.icon({
  iconUrl: '/img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: CENTER_LAT,
    lng: CENTER_LNG,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);
mainMarker.addTo(map);


mainMarker.addEventListener('move', (evt) => {
  const location = evt.target.getLatLng();
  address.value = location.lat.toFixed(DECIMALS) + ',' + location.lng.toFixed(DECIMALS);
});

const adIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});



// const renderPins = (pinsData) => {
//   pinsData.forEach((advertisement) => {
//     const adMarker = L.marker({
//       lat: advertisement.location.x,
//       lng: advertisement.location.y,
//     },
//     {
//       icon: adIcon,
//     },
//     );
//     adMarker.bindPopup(renderCard(advertisement));
//     adMarker.addTo(map);
//   });
// }
// export {renderPins}



createAdvertisements(10).forEach((advertisement) => {
  const adMarker = L.marker({
    lat: advertisement.location.x,
    lng: advertisement.location.y,
  },
  {
    icon: adIcon,
  },
  );
  adMarker.bindPopup(renderCard(advertisement));
  adMarker.addTo(map);
});
