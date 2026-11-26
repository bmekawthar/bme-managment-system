import "./TransferForm.css";

function TransferForm({
  equipment,
  departments,
  transferDepartmentId,
  setTransferDepartmentId,
  transferDate,
  setTransferDate,
  transferReason,
  setTransferReason,
  onCancel,
  onConfirm,
}) {
  if (equipment === null) {
    return null;
  }

  return (
    <div className="transfer-modal-overlay">
      <div className="transfer-modal">
        <h3>Transfer Equipment</h3>

        <p>
          <strong>Equipment:</strong> {equipment.equipmentName}
        </p>

        <p>
          <strong>Current Department:</strong> {equipment.departmentName}
        </p>

        <label>New Department</label>
        <select
          value={transferDepartmentId}
          onChange={(e) => setTransferDepartmentId(e.target.value)}
        >
          <option value="">Select Department</option>

          {departments
            .filter(
              (department) => department.id !== equipment.departmentId
            )
            .map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
        </select>

        <label>Transfer Date</label>
        <input
          type="date"
          value={transferDate}
          onChange={(e) => setTransferDate(e.target.value)}
        />

        <label>Transfer Reason</label>
        <textarea
          value={transferReason}
          onChange={(e) => setTransferReason(e.target.value)}
        />

        <div className="transfer-modal-actions">
          <button className="cancel-transfer-button" onClick={onCancel}>
            Cancel
          </button>

          <button className="confirm-transfer-button" onClick={onConfirm}>
            Confirm Transfer
          </button>
        </div>
      </div>
    </div>
  );
}

export default TransferForm;