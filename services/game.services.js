import { apiUrl, configAPI } from "./api";

const searchGame = searchGame => {
  const data = fetch(
    `${apiUrl}?key=${configAPI}&search=${encodeURI(searchGame)}`
  ).then(res => res.json());

  return data;
};

const getGameDetails = slug => {
  const data = fetch(`${apiUrl}/${slug}?key=${configAPI}`).then(res =>
    res.json()
  );

  return data;
};

export const gameServices = {
  searchGame,
  getGameDetails,
};
