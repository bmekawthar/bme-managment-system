import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import FavoriteItem from "../components/FavoriteItem/FavoriteItem";
import { getFavorites, removeFavorite } from "../Utils/favoriteUtils";
import { getEquipment } from "../Utils/equipmentUtils";
import "./Favorites.css";

function Favorites() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedFavorites = getFavorites();
    const savedEquipment = getEquipment();

    const merged = savedFavorites.map((favorite) => {
      const equipmentItem = savedEquipment.find(
        (item) => item.id === favorite.id
      );

      return equipmentItem;
    });

    setItems(merged.filter((item) => item));
  }, []);

  const handleRemove = (equipmentId) => {
    removeFavorite(equipmentId);

    const updatedItems = items.filter(
      (item) => item.id !== equipmentId
    );

    setItems(updatedItems);
  };

  return (
    <div className="favorites-page">
      <Header />

      <main className="favorites-content">
        <h2>Equipment Requiring Review</h2>

        {items.length === 0 ? (
          <p>NO Flagged equipment at the moment.</p>
        ) : (
          items.map((item) => (
            <FavoriteItem
              key={item.id}
              item={item}
              onRemove={handleRemove}
            />
          ))
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Favorites;