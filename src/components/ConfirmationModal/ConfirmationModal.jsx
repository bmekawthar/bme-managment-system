import "./ConfirmationModal.css";

function ConfirmationModal({ message, onConfirm, onCancel }) {
  return (
    <div className="confirmation-overlay">
      <div className="confirmation-modal">
        <h3>Confirm Action</h3>

        <p>{message}</p>

        <div className="confirmation-buttons">
          <button
            className="confirm-button"
            onClick={onConfirm}
          >
            Confirm
          </button>

          <button
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;