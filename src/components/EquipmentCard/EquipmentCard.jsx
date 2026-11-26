import "./EquipmentCard.css";

function EquipmentCard({
  item,
  isFavorite,
  lastTransfer,
  onOpen,
  onEdit,
  onDelete,
  onFavorite,
  onTransfer,
}) {
  return (
    <div className="equipment-card">
      <div className="equipment-card-info">
        <h3>{item.equipmentName}</h3>

        {lastTransfer && (
          <div className="transferred-info">
            <span className="transferred-label">Transferred</span>
            <p>
              <strong>Last Transfer:</strong>{" "}
              {lastTransfer.transferDate}
            </p>
          </div>
        )}

        <p>
          <strong>Equipment Code:</strong>{" "}
          {item.equipmentCode || "Not specified"}
        </p>

        <p>
          <strong>Category:</strong>{" "}
          {item.category || "Not specified"}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {item.status || "Not specified"}
        </p>
      </div>

      <div className="equipment-card-actions">
        <button
          className="view-equipment-button"
          onClick={() => onOpen(item)}
        >
          View Details
        </button>

        <div className="equipment-card-secondary-actions">
          <button
            className="edit-equipment-button"
            onClick={() => onEdit(item)}
          >
            Edit
          </button>

          <button
            className="delete-equipment-button"
            onClick={() => onDelete(item.id)}
          >
            Delete
          </button>

          <button
            className="transfer-equipment-button"
            onClick={() => onTransfer(item)}
          >
            Transfer
          </button>

          <button
            className={
              isFavorite
                ? "favorite-button active"
                : "favorite-button"
            }
            onClick={() => onFavorite(item.id)}
            title="Add to Favorites"
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EquipmentCard;