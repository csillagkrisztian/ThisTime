const fancyWords = [
  "Fantastic",
  "Awesome",
  "Seductive",
  "Breathtaking",
  "Staggering",
  "Extraordinary",
  "Incredible",
  "Unbelievable",
  "Magnificent",
  "Admirable",
  "Splendid",
];

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

export const getFancyPhrase = () => {
  return `Something ${fancyWords[getRandomInt(0, fancyWords.length)]}`;
};
