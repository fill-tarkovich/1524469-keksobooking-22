import { getRandomInt, getRandomFloat, createRandomArray } from './util.js';

const TYPE = ['place', 'flat', 'house', 'bungalow'];
const TIME = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];


const createAuthor = () => {
  return {
    avatar: 'img/avatars/user0' + getRandomInt(1, 8) + '.png',
  };
};

const createOffer = (location) => {
  return {
    title: 'Жилье для вас',
    address: location.lat + ', ' + location.lng,
    price: getRandomInt(1, 1000000),
    type: TYPE[getRandomInt(0, TYPE.length - 1)],
    rooms: getRandomInt(1, 10),
    guests: getRandomInt(1, 20),
    checkin: TIME[getRandomInt(0, TIME.length - 1)],
    checkout: TIME[getRandomInt(0, TIME.length - 1)],
    features: createRandomArray(FEATURES),
    description: 'Уютное жилье с прекрасным расположением',
    photos: createRandomArray(PHOTOS),
  };
};

const createLocation = () => {
  return {
    lat: getRandomFloat(35.65000, 35.70000, 5),
    lng: getRandomFloat(139.70000, 139.80000, 5),
  };
};

const createAdvertisement = () => {
  const location = createLocation();
  return {
    author: createAuthor(),
    offer: createOffer(location),
    location: location,
  }
}
const createAdvertisements = (count) => new Array(count).fill(null).map(() => createAdvertisement());

export {createAdvertisements}
