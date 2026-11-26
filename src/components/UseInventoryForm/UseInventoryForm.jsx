import { useState } from "react";
import "./UseInventoryForm.css";

function UseInventoryForm({
  item,
  departments,
  equipment,
  onCancel,
  onConfirm,
}) {
  const [quantity, setQuantity] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [equipmentId, setEquipmentId] = useState("");
  const [usageDate, setUsageDate] = useState("");
  const [reason, setReason] = useState("");

  const selectedDepartment = departments.find(
    (department) => String(department.id) === departmentId
  );

  const departmentEquipment = equipment.filter(
    (item) => String(item.departmentId) === departmentId
  );

  const handleDepartmentChange = (value) => {
    setDepartmentId(value);
    setEquipmentId("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      Number(quantity) <= 0 ||
      Number(quantity) > item.quantity ||
      departmentId === "" ||
      equipmentId === ""
    ) {
      return;
    }

    onConfirm({
      quantity: quantity,
      departmentId: departmentId,
      departmentName: selectedDepartment.name,
      equipmentId: equipmentId,
      usageDate: usageDate,
      reason: reason.trim(),
    });
  };

  return (
    <div className="use-inventory-overlay">
      <div className="use-inventory-form">

        <div className="use-inventory-header">
          <h2>Use Inventory Item</h2>
          <p>Biomedical Engineering Department</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="use-inventory-field">
            <label>Item Name</label>
            <input
              type="text"
              value={item.name}
              readOnly
            />
          </div>

          <div className="use-inventory-field">
            <label>Available Quantity</label>
            <input
              type="number"
              value={item.quantity}
              readOnly
            />
          </div>

          <div className="use-inventory-field">
            <label>Quantity to Use</label>
            <input
              type="number"
              min="1"
              max={item.quantity}
              step="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Enter quantity"
              required
            />
          </div>

          <div className="use-inventory-field">
            <label>Department</label>
            <select
              value={departmentId}
              onChange={(e) =>
                handleDepartmentChange(e.target.value)
              }
              required
            >
              <option value="">Select Department</option>

              {departments.map((department) => (
                <option
                  key={department.id}
                  value={department.id}
                >
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div className="use-inventory-field">
            <label>Equipment</label>
            <select
              value={equipmentId}
              onChange={(e) => setEquipmentId(e.target.value)}
              disabled={departmentId === ""}
              required
            >
              <option value="">Select Equipment</option>

              {departmentEquipment.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.equipmentName} - {item.equipmentCode}
                </option>
              ))}
            </select>

            {departmentId !== "" &&
              departmentEquipment.length === 0 && (
                <p className="use-inventory-message">
                  No equipment available in this department.
                </p>
              )}
          </div>

          <div className="use-inventory-field">
            <label>Usage Date</label>
            <input
              type="date"
              value={usageDate}
              onChange={(e) => setUsageDate(e.target.value)}
              required
            />
          </div>

          <div className="use-inventory-field">
            <label>Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason for using this item"
              rows="3"
              required
            />
          </div>

          <div className="use-inventory-actions">
            <button
              type="button"
              className="use-inventory-cancel"
              onClick={onCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="use-inventory-confirm"
              disabled={
                departmentId !== "" &&
                departmentEquipment.length === 0
              }
            >
              Confirm
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default UseInventoryForm;