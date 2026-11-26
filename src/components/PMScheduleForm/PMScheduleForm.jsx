import { useState } from "react";
import "./PMScheduleForm.css";

function PMScheduleForm({
  equipment,
  handleAddSchedule,
  handleViewAllSchedules
}) {
  const [selectedEquipmentId, setSelectedEquipmentId] = useState("");
  const [equipmentSearch, setEquipmentSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const selectedEquipment = equipment.find(
    (item) => String(item.id) === selectedEquipmentId
  );

  const filteredEquipment = equipment.filter((item) => {
    const search = equipmentSearch.toLowerCase();

    return (
      String(item.equipmentName || "").toLowerCase().includes(search) ||
      String(item.equipmentCode || "").toLowerCase().includes(search) ||
      String(item.serialNumber || "").toLowerCase().includes(search)
    );
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const saved = handleAddSchedule(
      event,
      selectedEquipmentId
    );

    if (saved) {
      event.target.reset();
      setSelectedEquipmentId("");
      setEquipmentSearch("");
      setShowForm(false);
    }
  };

  return (
    <section className="pm-schedule-form-section">
      <div className="pm-schedule-form-header">
        <h3>Schedule Preventive Maintenance</h3>

        <div className="pm-schedule-header-actions">
          <button
            type="button"
            className="pm-view-all-button"
            onClick={handleViewAllSchedules}
          >
            View All Schedules
          </button>

          <button
            type="button"
            className="pm-schedule-toggle-button"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "−" : "+"}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <label>Search Equipment</label>

          <input
            type="text"
            value={equipmentSearch}
            onChange={(event) =>
              setEquipmentSearch(event.target.value)
            }
            placeholder="Search by name, code or serial number"
          />

          <label>Equipment</label>

          <select
            value={selectedEquipmentId}
            onChange={(event) =>
              setSelectedEquipmentId(event.target.value)
            }
            required
          >
            <option value="">Select Equipment</option>

            {filteredEquipment.map((item) => (
              <option key={item.id} value={item.id}>
                {item.equipmentName}
              </option>
            ))}
          </select>

          {filteredEquipment.length === 0 && (
            <p>No matching equipment found.</p>
          )}

          {selectedEquipment && (
            <div className="pm-equipment-info">
              <p>
                <strong>Equipment Code:</strong>{" "}
                {selectedEquipment.equipmentCode}
              </p>

              <p>
                <strong>Serial Number:</strong>{" "}
                {selectedEquipment.serialNumber || "—"}
              </p>

              <p>
                <strong>Department:</strong>{" "}
                {selectedEquipment.departmentName}
              </p>
            </div>
          )}

          <label>Last PM Date</label>
          <input type="date" name="lastPMDate" required />

          <label>PM Interval</label>

          <select name="pmInterval" defaultValue="weekly">
            <option value="weekly">Every Week</option>
            <option value="monthly">Monthly</option>
            <option value="3">Every 3 Months</option>
            <option value="6">Every 6 Months</option>
            <option value="12">Yearly</option>
          </select>

          <label>Assigned Engineer</label>

          <input
            type="text"
            name="assignedEngineer"
            placeholder="Enter engineer name"
            required
          />

          <button type="submit">Save PM Schedule</button>
        </form>
      )}
    </section>
  );
}

export default PMScheduleForm;