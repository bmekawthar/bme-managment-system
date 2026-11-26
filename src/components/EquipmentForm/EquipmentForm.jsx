import "./EquipmentForm.css";
import Calendar from "../Calendar/Calendar";
import { parseISO } from "date-fns";

import {
  equipmentFields,
  equipmentOptions,
} from "../../Utils/equipmentFields";

function EquipmentForm({
  newEquipment,
  handleEquipmentFieldChange,
  showEquipmentForm,
  editingEquipmentId,
  calendarField,
  setCalendarField,
  handleSelectedDate,
  resetEquipmentForm,
  handleSaveEquipment,
}) {
  if (!showEquipmentForm) {
    return null;
  }

  return (
    <div className="equipment-form">
      <h3>
        {editingEquipmentId !== null
          ? "Edit Equipment Information"
          : "Enter Equipment Information"}
      </h3>

      {equipmentFields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>

          {equipmentOptions[field.name] ? (
            <select
              value={newEquipment[field.name]}
              onChange={(e) =>
                handleEquipmentFieldChange(field.name, e.target.value)
              }
            >
              <option value="">Select {field.label}</option>

              {equipmentOptions[field.name].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === "date" ? (
            <>
              <input
                type="text"
                readOnly
                placeholder="Select Date"
                value={newEquipment[field.name]}
                onClick={() =>
                  setCalendarField(
                    calendarField === field.name ? null : field.name
                  )
                }
              />

              {calendarField === field.name && (
                <div className="equipment-calendar">
                  <Calendar
                    date={
                      newEquipment[field.name]
                        ? parseISO(newEquipment[field.name])
                        : undefined
                    }
                    handleSelectedDate={handleSelectedDate}
                  />
                </div>
              )}
            </>
          ) : (
            <input
              type={field.type === "number" ? "number" : "text"}
              min={field.type === "number" ? "0" : undefined}
              step={field.type === "number" ? "0.01" : undefined}
              className={
                field.name === "equipmentCode"
                  ? "equipment-code-input"
                  : ""
              }
              value={newEquipment[field.name]}
              onChange={(e) =>
                handleEquipmentFieldChange(field.name, e.target.value)
              }
            />
          )}
        </div>
      ))}

      <div className="equipment-form-actions">
        <button
          className="cancel-equipment-button"
          onClick={resetEquipmentForm}
        >
          Cancel
        </button>

        <button
          className="save-equipment-button"
          onClick={handleSaveEquipment}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EquipmentForm;