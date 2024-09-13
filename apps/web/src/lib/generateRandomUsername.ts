export const generateRandomUsername = () => {
  const adjectives = [
    "Brave",
    "Clever",
    "Loyal",
    "Mighty",
    "Swift",
    "Wise",
    "Happy",
    "Lucky",
    "Fierce",
    "Gentle",
    "Bold",
    "Crazy",
    "Friendly",
    "Daring",
    "Silent",
  ];

  const nouns = [
    "Tiger",
    "Dragon",
    "Wolf",
    "Eagle",
    "Falcon",
    "Panther",
    "Lion",
    "Phoenix",
    "Shark",
    "Bear",
    "Leopard",
    "Hawk",
    "Raven",
    "Cheetah",
    "Fox",
  ];

  function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const adjective = adjectives[getRandomInt(0, adjectives.length - 1)];
  const noun = nouns[getRandomInt(0, nouns.length - 1)];
  const number = getRandomInt(100, 999);

  return `${adjective}${noun}${number}`;
};
