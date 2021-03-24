import './form.js';
import {renderPins} from './map.js';
import {getData} from './api.js';
import {createLoadErrorPopup} from './popup.js';
// import { createAdvertisements } from './data.js';

const ADS_COUNT = 10;

getData((data) => {
  data.slice(0, ADS_COUNT);
  renderPins(data);
},
() => createLoadErrorPopup('Ошибка при загрузке данных'),
);

// let markers = createAdvertisements(10);
// renderPins(markers);
