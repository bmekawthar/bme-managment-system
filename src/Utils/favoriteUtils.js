export const saveFavorites = (favorites) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const getFavorites = () => {
  const favorites = localStorage.getItem("favorites");
  console.log("get favorites", favorites);
  return favorites ? JSON.parse(favorites) : [];
};

export const addToFavorites = (equipmentId) => {
  let favorites = getFavorites();

  const existing = favorites.find(
    (item) => item.id === equipmentId
  );

  if (!existing) {
    favorites.push({ id: equipmentId });
  }

  console.log("added to favorites", favorites);
  saveFavorites(favorites);
};

export const removeFavorite = (equipmentId) => {
  let favorites = getFavorites();

  favorites = favorites.filter(
    (item) => item.id !== equipmentId
  );

  saveFavorites(favorites);
};