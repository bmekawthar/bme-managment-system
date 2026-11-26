import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import EquipmentInfo from "../components/EquipmentDetails/EquipmentInfo";
import { getEquipment } from "../Utils/equipmentUtils";

import "./EquipmentDetails.css";

function EquipmentDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialEquipment =
    location.state && location.state.equipment;

  const [equipment] = useState(() => {
    const savedEquipment = getEquipment();

    const currentEquipment = savedEquipment.find(
      (item) =>
        initialEquipment &&
        item.id === initialEquipment.id
    );

    return currentEquipment || initialEquipment;
  });

  const [openSection, setOpenSection] = useState("general");

  function toggleSection(section) {
    if (openSection === section) {
      setOpenSection("");
    } else {
      setOpenSection(section);
    }
  }

  const usageHistory =
    equipment && equipment.usageHistory
      ? equipment.usageHistory
      : [];

  return (
    <main className="equipment-details-page">
      <button
        className="equipment-details-back-button"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h1 className="equipment-details-title">
        Equipment Details
      </h1>

      <div className="equipment-accordion">

        <div className="equipment-accordion-item">
          <button
            className="equipment-accordion-header"
            onClick={() => toggleSection("general")}
          >
            <span>General Information</span>
            <span className="accordion-arrow">
              {openSection === "general" ? "−" : "⌄"}
            </span>
          </button>

          {openSection === "general" && (
            <div className="equipment-accordion-content">
              <EquipmentInfo equipment={equipment} />
            </div>
          )}
        </div>

        <div className="equipment-accordion-item">
          <button
            className="equipment-accordion-header"
            onClick={() => toggleSection("pm")}
          >
            <span>PM Details</span>
            <span className="accordion-arrow">
              {openSection === "pm" ? "−" : "⌄"}
            </span>
          </button>

          {openSection === "pm" && (
            <div className="equipment-accordion-content">
              <p>Preventive maintenance records will appear here.</p>
            </div>
          )}
        </div>

        <div className="equipment-accordion-item">
          <button
            className="equipment-accordion-header"
            onClick={() => toggleSection("cm")}
          >
            <span>CM Details</span>
            <span className="accordion-arrow">
              {openSection === "cm" ? "−" : "⌄"}
            </span>
          </button>

          {openSection === "cm" && (
            <div className="equipment-accordion-content">
              <p>Corrective maintenance records will appear here.</p>
            </div>
          )}
        </div>

        <div className="equipment-accordion-item">
          <button
            className="equipment-accordion-header"
            onClick={() => toggleSection("history")}
          >
            <span>Equipment History</span>
            <span className="accordion-arrow">
              {openSection === "history" ? "−" : "⌄"}
            </span>
          </button>

          {openSection === "history" && (
            <div className="equipment-accordion-content">

              {usageHistory.length === 0 ? (
                <p>No equipment history available yet.</p>
              ) : (
                <div className="equipment-history-container">
                  <h3>Inventory Usage History</h3>

                  <table className="equipment-history-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Item</th>
                        <th>Condition</th>
                        <th>Quality</th>
                        <th>Quantity</th>
                        <th>Department</th>
                        <th>Reason</th>
                      </tr>
                    </thead>

                    <tbody>
                      {usageHistory.map((record, index) => (
                        <tr key={index}>
                          <td>{record.usageDate}</td>
                          <td>{record.itemName}</td>
                          <td>{record.condition}</td>
                          <td>{record.quality}</td>
                          <td>{record.quantity}</td>
                          <td>{record.departmentName}</td>
                          <td>{record.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </main>
  );
}

export default EquipmentDetails;