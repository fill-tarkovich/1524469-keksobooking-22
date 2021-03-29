/* global _:readonly */
import { deactivateForm, validateForm, submitForm, clickReset } from './form.js'
import { filterArray, changeFilter, activateFilters } from './filter.js';
import { renderLayer, clearMap, activateMap } from './map.js';
import { getData } from './api.js';
import { createLoadErrorPopup } from './popup.js';
import './pictures.js';
import { uploadAvatar, uploadPhoto } from './pictures.js';

const DELAY = 150;

deactivateForm();
activateMap();
validateForm();
getData((data) => {
  renderLayer(data);
  activateFilters();
  uploadAvatar();
  uploadPhoto();
  changeFilter(_.debounce(() => {
    clearMap();
    let newData = filterArray(data);
    renderLayer(newData);
  }, DELAY));
  clickReset(data);
},
() => createLoadErrorPopup('Ошибка при загрузке данных'),
);
submitForm();
