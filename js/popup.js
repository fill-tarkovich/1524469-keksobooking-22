import { OFFER_TYPE } from './data.js';

const cardTemplate = document.querySelector('#card').content;
const newCard = cardTemplate.cloneNode(true);

const checkValue = (selector, value) => {
  if (value) {
    newCard.querySelector(selector).textContent = value;
  } else {
    newCard.querySelector(selector).remove()
  }
};

const renderCard = ({ author, offer }) => {
  checkValue('.popup__title', offer.title);
  newCard.querySelector('.popup__title').textContent = offer.title;
  // checkValue('.popup__text--address', offer.address);
  newCard.querySelector('.popup__text--address').textContent = offer.address;
  // checkValue('.popup__text--price', offer.price + ' ₽/ночь');
  newCard.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь'
  // checkValue('.popup__type', OFFER_TYPE[offer.type]);
  newCard.querySelector('.popup__type').textContent = OFFER_TYPE[offer.type];
  // checkValue('.popup__text--capacity', offer.rooms + ' комнаты для ' + offer.guests + ' гостей');
  newCard.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей';
  // checkValue('.popup__text--time', 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout);
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;

  const featuresList = newCard.querySelector('.popup__features');
  featuresList.innerHTML = '';
  if (offer.features) {
    offer.features.forEach((feature) => {
      const add = feature;
      const newElement = document.createElement('li');
      newElement.classList.add('popup__feature', 'popup__feature--' + add);
      featuresList.append(newElement);
    });
  } else {
    featuresList.remove;
  }

  checkValue('.popup__description', offer.description);

  const popupPhotos = newCard.querySelector('.popup__photos');
  popupPhotos.innerHTML = '';

  if (offer.photos) {
    offer.photos.forEach((photo) => {
      const newPhoto = document.createElement('img');
      newPhoto.className = 'popup__photo';
      newPhoto.src = photo;
      newPhoto.width = 45;
      newPhoto.height = 40;
      newPhoto.alt = 'Фотография жилья';
      popupPhotos.appendChild(newPhoto);
    });
  } else {
    popupPhotos.remove;
  }

  if (author.avatar) {
    newCard.querySelector('.popup__avatar').src = author.avatar;
  } else {
    newCard.querySelector('.popup__avatar').remove;
  }

  return newCard;
};

export { renderCard }
