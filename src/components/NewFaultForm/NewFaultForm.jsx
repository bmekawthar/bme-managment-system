import { useState } from "react";

import Calendar from "../Calendar/Calendar";

import "./NewFaultForm.css";

function NewFaultForm({
  equipment,
  departments,
  onAddFault,
  onCancel
}) {
  const [selectedEquipmentId, setSelectedEquipmentId] = useState("");
  const [reportedBy, setReportedBy] = useState("");
  const [faultDescription, setFaultDescription] = useState("");
  const [assignedEngineer, setAssignedEngineer] = useState("");

  const [reportedDate, setReportedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const selectedEquipment = equipment.find(
    (item) => String(item.id) === selectedEquipmentId
  );

  const selectedDepartment = selectedEquipment
    ? departments.find(
        (department) =>
          String(department.id) ===
          String(selectedEquipment.departmentId)
      )
    : null;

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function handleSelectedDate(date) {
    if (date) {
      setReportedDate(date);
      setShowCalendar(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (
      !selectedEquipment ||
      !reportedBy.trim() ||
      !faultDescription.trim() ||
      !assignedEngineer.trim()
    ) {
      return;
    }

    const newFault = {
      equipmentId: selectedEquipment.id,
      equipmentName: selectedEquipment.equipmentName,
      equipmentCode: selectedEquipment.equipmentCode,
      department: selectedDepartment
        ? selectedDepartment.name
        : "Unknown",
      reportedDate: formatDate(reportedDate),
      reportedBy: reportedBy.trim(),
      faultDescription: faultDescription.trim(),
      assignedEngineer: assignedEngineer.trim()
    };

    onAddFault(newFault);
    onCancel();
  }

  return (
    <section className="cm-form-card">
      <div className="cm-form-header">
        <h2>Register New Equipment Fault</h2>
        <p>Enter the reported equipment fault details</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="cm-form-grid">
          <div className="cm-form-group">
            <label htmlFor="cm-equipment">
              Select Equipment
            </label>

            <select
              id="cm-equipment"
              value={selectedEquipmentId}
              onChange={(event) =>
                setSelectedEquipmentId(event.target.value)
              }
              required
            >
              <option value="">Select Equipment</option>

              {equipment.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.equipmentName}
                </option>
              ))}
            </select>
          </div>

          <div className="cm-form-group">
            <label>Reported Date</label>

            <button
              type="button"
              className="cm-date-button"
              onClick={() => setShowCalendar(!showCalendar)}
            >
              {formatDate(reportedDate)}
            </button>

            {showCalendar && (
              <div className="cm-calendar-container">
                <Calendar
                  date={reportedDate}
                  handleSelectedDate={handleSelectedDate}
                />
              </div>
            )}
          </div>

          <div className="cm-form-group">
            <label htmlFor="cm-equipment-name">
              Equipment Name
            </label>

            <input
              id="cm-equipment-name"
              type="text"
              value={
                selectedEquipment
                  ? selectedEquipment.equipmentName
                  : ""
              }
              readOnly
              placeholder="Automatically displayed"
            />
          </div>

          <div className="cm-form-group">
            <label htmlFor="cm-equipment-code">
              Equipment Code
            </label>

            <input
              id="cm-equipment-code"
              type="text"
              value={
                selectedEquipment
                  ? selectedEquipment.equipmentCode
                  : ""
              }
              readOnly
              placeholder="Automatically displayed"
            />
          </div>

          <div className="cm-form-group">
            <label htmlFor="cm-department">
              Department
            </label>

            <input
              id="cm-department"
              type="text"
              value={
                selectedDepartment
                  ? selectedDepartment.name
                  : ""
              }
              readOnly
              placeholder="Automatically displayed"
            />
          </div>

          <div className="cm-form-group">
            <label htmlFor="cm-reported-by">
              Reported By
            </label>

            <input
              id="cm-reported-by"
              type="text"
              value={reportedBy}
              onChange={(event) =>
                setReportedBy(event.target.value)
              }
              placeholder="Enter the name of the person reporting"
              required
            />
          </div>

          <div className="cm-form-group cm-form-group-full">
            <label htmlFor="cm-assigned-engineer">
              Assigned Engineer
            </label>

            <input
              id="cm-assigned-engineer"
              type="text"
              value={assignedEngineer}
              onChange={(event) =>
                setAssignedEngineer(event.target.value)
              }
              placeholder="Enter responsible engineer"
              required
            />
          </div>

          <div className="cm-form-group cm-form-group-full">
            <label htmlFor="cm-fault-description">
              Fault Description
            </label>

            <textarea
              id="cm-fault-description"
              value={faultDescription}
              onChange={(event) =>
                setFaultDescription(event.target.value)
              }
              placeholder="Describe the reported equipment fault"
              rows="4"
              required
            />
          </div>
        </div>

        <div className="cm-form-actions">
          <button
            type="submit"
            className="cm-primary-button"
          >
            Register Fault
          </button>

          <button
            type="button"
            className="cm-cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default NewFaultForm;