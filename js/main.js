/* global _:readonly */
import './form.js';
import {deactivateForm} from './form.js'
import { filterArray, onFilterChange, activateFilters } from './filter.js';
import { renderLayer, clearMap, activateMap } from './map.js';
import { getData } from './api.js';
import { createLoadErrorPopup } from './popup.js';

const DELAY = 150;

deactivateForm();
activateMap();
getData((data) => {
  renderLayer(data);
  activateFilters();
  onFilterChange(_.debounce(() => {
    clearMap();
    let newData = filterArray(data);
    renderLayer(newData);
  }, DELAY));
},
() => createLoadErrorPopup('Ошибка при загрузке данных'),
);
