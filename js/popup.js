import { OFFER_TYPE } from './data.js';

const cardTemplate = document.querySelector('#card').content;
const newCard = cardTemplate.cloneNode(true);

const checkValue = (value, selector) => {
  if (value) {
    newCard.querySelector(selector).textContent = value
  } else {
    newCard.querySelector(selector).remove()
  }
};

const renderCard = ({ author, offer }) => {
  checkValue(offer.title, '.popup__title');
  checkValue(offer.address, '.popup__text--address');
  checkValue(offer.price + ' ₽/ночь', '.popup__text--price');
  checkValue(OFFER_TYPE[offer.type], '.popup__type');
  checkValue(offer.rooms + ' комнаты для ' + offer.guests + ' гостей', '.popup__text--capacity');
  checkValue('Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout, '.popup__text--time');

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

  checkValue(offer.description, '.popup__description');

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
