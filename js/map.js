/* global L:readonly */

import { renderCard } from './card.js';
import { activateForm } from './form.js';

const ZOOM = 10;
const ADS_COUNT = 10;
const Center = {
  lat: 35.68783,
  lng: 139.75662,
};

const mapFilters = document.querySelector('.map__filters');
const address = document.querySelector('#address');

const map = L.map('map-canvas');

const mainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: Center.lat,
    lng: Center.lng,
  },
  {
    draggable: true,
    icon: mainIcon,
  },
);

const adIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const activateMap = () => {
  map
    .on('load', () => {
      activateForm();
      address.value = `${Center.lat}, ${Center.lng}`;
    })
    .setView({
      lat: Center.lat,
      lng: Center.lng,
    }, ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainMarker.addTo(map);
  mainMarker.on('move', (evt) => {
    address.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  });
};

const renderPins = (data, layer) => {
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
      .addTo(layer)
      .bindPopup(renderCard(marker));
  });
};

let pinsLayer;

const renderLayer = (data) => {
  pinsLayer = L.layerGroup();
  if (data.length > ADS_COUNT) {
    data.slice(0, ADS_COUNT);
  }
  renderPins(data, pinsLayer);
  pinsLayer.addTo(map);
};

const resetMap = () => {
  address.value = `${Center.lat}, ${Center.lng}`;
  mainMarker.setLatLng([Center.lat, Center.lng]);
  map.setView({
    lat: Center.lat,
    lng: Center.lng,
  }, ZOOM);
}

const clearMap = () => {
  map.removeLayer(pinsLayer);
}

export { renderLayer, resetMap, mapFilters, clearMap, activateMap }

