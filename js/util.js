export const randomNumber = (min, max) =>  Math.round(min + Math.random() * (max - min));

export const getRandomFloat = (min, max, decimals) => {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
};

export const getRandomArrayElement = (elements) => elements[randomNumber(0, elements.length - 1)];
