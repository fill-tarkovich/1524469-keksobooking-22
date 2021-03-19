import './form.js';
import './map.js';
import {getData} from './api.js';
import { renderCard } from './popup.js';

const ADS_COUNT = 10;

getData((ads) => {
  renderCard(ads.slice(0, ADS_COUNT));
});
