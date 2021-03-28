/* global _:readonly */
import { deactivateForm, validateForm, onFormSubmit, onResetClick } from './form.js'
import { filterArray, onFilterChange, activateFilters } from './filter.js';
import { renderLayer, clearMap, activateMap } from './map.js';
import { getData } from './api.js';
import { createLoadErrorPopup } from './popup.js';

const DELAY = 150;

deactivateForm();
activateMap();
validateForm();
getData((data) => {
  renderLayer(data);
  activateFilters();
  onFilterChange(_.debounce(() => {
    clearMap();
    let newData = filterArray(data);
    renderLayer(newData);
  }, DELAY));
  onResetClick(data);
},
() => createLoadErrorPopup('Ошибка при загрузке данных'),
);
onFormSubmit();
