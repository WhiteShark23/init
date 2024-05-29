const cardAnnouncementTemplate = document.querySelector('#card').content;

const typeHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

let announcements = [];

export const renderAnnouncements = (announcement) => {
  const cardAnnouncement = cardAnnouncementTemplate.cloneNode(true);
  cardAnnouncement.querySelector('.popup__photos').innerHTML = '';
  cardAnnouncement.querySelector('.popup__features').innerHTML = '';

  cardAnnouncement.querySelector('.popup__title').textContent = announcement.offer.title;
  cardAnnouncement.querySelector('.popup__text--address').textContent = announcement.offer.address;
  cardAnnouncement.querySelector('.popup__text--price').innerHTML = `${announcement.offer.price} <span>₽/ночь</span>`;
  cardAnnouncement.querySelector('.popup__type').innerHTML = `${typeHousing[announcement.offer.type]}`;
  cardAnnouncement.querySelector('.popup__text--capacity').innerHTML = `${announcement.offer.rooms} комнаты для ${announcement.offer.guests} гостей`;
  cardAnnouncement.querySelector('.popup__text--time').innerHTML = `Заезд после ${announcement.offer.checkin}, выезд до ${announcement.offer.checkout}`;
  announcement.offer.features.forEach((feature) => (cardAnnouncement.querySelector('.popup__features').insertAdjacentHTML('beforeend', `<li class="popup__feature popup__feature--${feature}">${feature}</li>`)));
  cardAnnouncement.querySelector('.popup__description').textContent = announcement.offer.description;
  announcement.offer.photos.forEach((photo) => (cardAnnouncement.querySelector('.popup__photos').insertAdjacentHTML('beforeend', `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`)));
  cardAnnouncement.querySelector('.popup__avatar').remove();
  cardAnnouncement.querySelector('.popup').insertAdjacentHTML('afterbegin', `<img src="${announcement.author.avatar}" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">`);
  return cardAnnouncement;
};

export const initAnnouncements = (data) => {
  announcements = data.slice();
  renderAnnouncements(announcements[0]);
};
