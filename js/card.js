const OfferTypes = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
}

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const renderCard = ({ author, offer }) => {

  const checkValue = (selector, value) => {
    if (newCard.querySelector(selector).textContent !== null) {
      return newCard.querySelector(selector).textContent = value
    } else {
      return newCard.querySelector(selector).remove();
    }
  };

  const newCard = cardTemplate.cloneNode(true);
  checkValue('.popup__title', offer.title);
  checkValue('.popup__text--address', offer.address);
  checkValue('.popup__text--price', offer.price + ' ₽/ночь');
  checkValue('.popup__type', OfferTypes[offer.type]);
  checkValue('.popup__text--capacity', offer.rooms + ' комнаты для ' + offer.guests + ' гостей');
  checkValue('.popup__text--time', 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout);

  const featuresList = newCard.querySelector('.popup__features');
  featuresList.innerHTML = '';
  if (offer.features) {
    offer.features.forEach((feature) => {
      const addition = feature;
      const newElement = document.createElement('li');
      newElement.classList.add('popup__feature', 'popup__feature--' + addition);
      featuresList.append(newElement);
    });
  } else {
    featuresList.remove();
  }

  checkValue('.popup__description', offer.description);

  const popupPhotos = newCard.querySelector('.popup__photos');
  popupPhotos.innerHTML = '';
  if (offer.photos.length > 0) {
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
    popupPhotos.remove();
  }
  if (author.avatar) {
    newCard.querySelector('.popup__avatar').src = author.avatar;
  } else {
    newCard.querySelector('.popup__avatar').remove();
  }

  return newCard;
};

export { renderCard }
