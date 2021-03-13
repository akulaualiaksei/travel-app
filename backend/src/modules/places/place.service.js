const placeRepo = require('./place.repository');

const getAll = async (country, lang) => {
  const places = await placeRepo.getAllByLang(country, lang);
  return places;
};

const getOne = async (id, lang) => {
  const place = await placeRepo.getOneByLang(id, lang);
  return place;
};

const savePlace = async (body) => placeRepo.savePlace(body);

module.exports = {
  getAll,
  getOne,
  savePlace,
};