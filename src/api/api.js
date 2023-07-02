/* eslint-disable no-undef */
const apiMain = process.env.REACT_APP_API_URL;
const apiFlats = process.env.REACT_APP_API_FLATS;
const apiFlatItem = process.env.REACT_APP_API_FLAT_ITEM;

export const getFlats = (search) =>
  fetch(apiMain + apiFlats + search).then((response) => response.json());

export const getFlatById = (id) =>
  fetch(apiMain + apiFlatItem + id).then((response) => response.json());
