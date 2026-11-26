import "./FavoriteItem.css";

function FavoriteItem({ item, onRemove }) {
  return (
    <div className="favorite-item">
      <div>
        <h3>{item.equipmentName}</h3>
        <p>Equipment Code: {item.equipmentCode}</p>
        <p>Serial Number: {item.serialNumber}</p>
        <p>Department: {item.departmentName}</p>
      </div>

      <button onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </div>
  );
}

export default FavoriteItem;