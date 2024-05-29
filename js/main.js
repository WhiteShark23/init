import { initForm } from './form.js';
import { setOnFormSubmit } from './valid-form.js';
import './init-map.js';
import './price-slider.js';
import { getData, sendData } from './api.js';
import { initFilterMap } from './filter-map.js';
import { initPriceSlider } from './price-slider.js';
import {lMap, address, mainMarker} from './init-map.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
  } catch (err) {
    console.log(err.message);
  }
});

try {
  lMap.on('load', async () => {
    const data = await getData();

    address.value = `${mainMarker.lat}, ${mainMarker.lng}`;
    initFilterMap(data);
    initPriceSlider();
    initForm();
  })
    .setView({
      lat: 35.67898,
      lng: 139.74564,
    }, 13);
} catch (err) {
  console.log(err.message);
}
