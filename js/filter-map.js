/* eslint-disable no-nested-ternary */
import { markerGroup, createMarker } from './init-map.js';

const housingType = document.querySelector('#housing-type');
const housingPrice = document.querySelector('#housing-price');
const housingRooms = document.querySelector('#housing-rooms');
const housingQuests = document.querySelector('#housing-guests');
const housingFeatures = document.querySelector('#housing-features');

let announcements = [];

const housingMiMaxPrice = {
  low: {
    from: 0,
    to: 10000
  },
  middle: {
    from: 10000,
    to: 50000
  },
  high: {
    from: 50000,
    to: Infinity
  }
};

const formFilter = () => {
  const checkedCheckboxes = Array.from(housingFeatures.querySelectorAll('[type="checkbox"]:checked'));
  const checkedCheck = Array.from(checkedCheckboxes, (index) => index.value);

  const announcementsGroup = announcements.filter((index) => checkedCheck.length > 0 ? checkedCheck.every((value) => index.offer.features.includes(value)) : index).
    filter((index) => housingType.value !== 'any' ? index.offer.type.includes(housingType.value) : index).
    filter((index) => housingPrice.value !== 'any' ? index.offer.price >= housingMiMaxPrice[housingPrice.value].from && index.offer.price < housingMiMaxPrice[housingPrice.value].to : index).
    filter((index) => housingRooms.value !== 'any' ? +index.offer.rooms === +housingRooms.value : index).
    filter((index) => housingQuests.value !== 'any' ? +index.offer.guests === +housingQuests.value : index);

  announcementsGroup.forEach((index) => createMarker(index));
};

const onHousingFeaturesChange = (evt) => {
  if (!evt.target.classList.contains('map__checkbox')) {
    return;
  }
  markerGroup.clearLayers();

  formFilter();
};

const onHousingTypeChange = () => {
  markerGroup.clearLayers();

  formFilter();
};

const onHousingPriceChange = () => {
  markerGroup.clearLayers();

  formFilter();
};

const onHousingRoomsChange = () => {
  markerGroup.clearLayers();

  formFilter();
};

const onHousingQuestsChange = () => {
  markerGroup.clearLayers();

  formFilter();
};

export const initFilterMap = (data) => {
  announcements = data.slice();
  announcements.forEach((announcement) => {
    createMarker(announcement);
  });

  housingFeatures.addEventListener('change', onHousingFeaturesChange);
  housingType.addEventListener('change', onHousingTypeChange);
  housingPrice.addEventListener('change', onHousingPriceChange);
  housingRooms.addEventListener('change', onHousingRoomsChange);
  housingQuests.addEventListener('change', onHousingQuestsChange);
};
