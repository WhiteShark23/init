import { renderAnnouncements } from './init-announcements.js';

const map = document.querySelector('.map__canvas');
export const address = document.querySelector('#address');

export const mainMarker = {
  lat: 35.67898,
  lng: 139.74564,
};

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const icon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

export const lMap = L.map(map);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(lMap);

export const markerGroup = L.layerGroup().addTo(lMap);

const mainPinMarker = L.marker(
  {
    lat: mainMarker.lat,
    lng: mainMarker.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(lMap);

mainPinMarker.on('moveend', (evt) => {
  address.value = `${evt.target._latlng.lat.toFixed(5)}, ${evt.target._latlng.lng.toFixed(5)}`;
});

export const createMarker = (announcement) => {
  const marker = L.marker(
    {
      lat: announcement.location.lat,
      lng: announcement.location.lng,
    },
    {
      icon,
    },
  );
  marker.addTo(markerGroup).bindPopup(renderAnnouncements(announcement));
};
