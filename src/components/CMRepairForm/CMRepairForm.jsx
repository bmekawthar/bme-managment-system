import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCMFaults, updateCMFault } from "../../Utils/cmUtils";
import "./CMRepairForm.css";

function CMRepairForm({ selectedFault }) {
  const navigate = useNavigate();

  const [inspectionDiagnosis, setInspectionDiagnosis] = useState("");
  const [correctiveActions, setCorrectiveActions] = useState("");
  const [performedBy, setPerformedBy] = useState("");
  const [receivedBy, setReceivedBy] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [overallResult, setOverallResult] = useState("Successful");

  const [spareParts, setSpareParts] = useState([
    {
      partName: "",
      partNumber: "",
      quantity: "1",
      unitCost: ""
    }
  ]);

  function handleSparePartChange(index, field, value) {
    const updatedParts = spareParts.map((part, i) => {
      if (i === index) {
        return {
          ...part,
          [field]: value
        };
      }

      return part;
    });

    setSpareParts(updatedParts);
  }

  function handleAddSparePart() {
    setSpareParts(
      spareParts.concat({
        partName: "",
        partNumber: "",
        quantity: "1",
        unitCost: ""
      })
    );
  }

  function handleRemoveSparePart(index) {
    const updatedParts = spareParts.filter((part, i) => i !== index);
    setSpareParts(updatedParts);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!selectedFault) {
      alert("Fault information was not found.");
      return;
    }

    if (
      !inspectionDiagnosis.trim() ||
      !correctiveActions.trim() ||
      !performedBy.trim() ||
      !receivedBy.trim()
    ) {
      alert("Please complete all required fields.");
      return;
    }

    const savedParts = [];

    for (let i = 0; i < spareParts.length; i++) {
      const part = spareParts[i];

      const isEmpty =
        !part.partName.trim() &&
        !part.partNumber.trim() &&
        !part.unitCost.trim() &&
        part.quantity === "1";

      if (isEmpty) {
        continue;
      }

      const quantity = Number(part.quantity);
      const unitCost = Number(part.unitCost);

      if (
        !part.partName.trim() ||
        !part.quantity.trim() ||
        !part.unitCost.trim() ||
        quantity <= 0 ||
        unitCost < 0 ||
        Number.isNaN(quantity) ||
        Number.isNaN(unitCost)
      ) {
        alert("Please enter valid spare parts information.");
        return;
      }

      savedParts.push({
        partName: part.partName.trim(),
        partNumber: part.partNumber.trim(),
        quantity: quantity,
        unitCost: unitCost,
        totalCost: quantity * unitCost
      });
    }

    let totalPartsCost = 0;

    for (let i = 0; i < savedParts.length; i++) {
      totalPartsCost = totalPartsCost + savedParts[i].totalCost;
    }

    const today = new Date();
    const completionDate =
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0");

    const report = {
      faultDescription: selectedFault.faultDescription,
      inspectionDiagnosis: inspectionDiagnosis.trim(),
      correctiveActions: correctiveActions.trim(),
      spareParts: savedParts,
      totalPartsCost: totalPartsCost,
      performedBy: performedBy.trim(),
      receivedBy: receivedBy.trim(),
      recommendations: recommendations.trim(),
      additionalNotes: additionalNotes.trim(),
      overallResult: overallResult,
      completionDate: completionDate
    };

    const faults = getCMFaults();

    updateCMFault(faults, selectedFault.id, {
      status: "Completed",
      report: report
    });

    navigate("/cm-history");
  }

  if (!selectedFault) {
    return null;
  }

  return (
    <form className="cm-repair-form" onSubmit={handleSubmit}>

      <div className="cm-report-section cm-report-full-section">
        <label>Fault Description</label>
        <textarea
          value={selectedFault.faultDescription || ""}
          readOnly
          rows="3"
        />
      </div>

      <div className="cm-report-section">
        <label>Inspection and Diagnosis *</label>
        <textarea
          value={inspectionDiagnosis}
          onChange={(e) => setInspectionDiagnosis(e.target.value)}
          rows="4"
          required
        />
      </div>

      <div className="cm-report-section">
        <label>Corrective Actions *</label>
        <textarea
          value={correctiveActions}
          onChange={(e) => setCorrectiveActions(e.target.value)}
          rows="4"
          required
        />
      </div>

      <div className="cm-report-section cm-report-full-section">
        <label>Replaced Spare Parts</label>

        {spareParts.map((part, index) => (
          <div className="cm-report-spare-part" key={index}>

            <div className="cm-report-spare-field">
              <label>Part Name</label>
              <input
                type="text"
                value={part.partName}
                onChange={(e) =>
                  handleSparePartChange(index, "partName", e.target.value)
                }
              />
            </div>

            <div className="cm-report-spare-field">
              <label>Part Number</label>
              <input
                type="text"
                value={part.partNumber}
                onChange={(e) =>
                  handleSparePartChange(index, "partNumber", e.target.value)
                }
              />
            </div>

            <div className="cm-report-spare-field">
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                value={part.quantity}
                onChange={(e) =>
                  handleSparePartChange(index, "quantity", e.target.value)
                }
              />
            </div>

            <div className="cm-report-spare-field">
              <label>Unit Cost</label>
              <input
                type="number"
                min="0"
                step="any"
                value={part.unitCost}
                onChange={(e) =>
                  handleSparePartChange(index, "unitCost", e.target.value)
                }
              />
            </div>

            <button
              type="button"
              className="cm-report-remove-part"
              onClick={() => handleRemoveSparePart(index)}
            >
              Remove
            </button>

          </div>
        ))}

        <button
          type="button"
          className="cm-report-add-part"
          onClick={handleAddSparePart}
        >
          + Add Spare Part
        </button>
      </div>

      <div className="cm-report-section">
        <label>Performed By *</label>
        <input
          type="text"
          value={performedBy}
          onChange={(e) => setPerformedBy(e.target.value)}
          required
        />
      </div>

      <div className="cm-report-section">
        <label>Received By *</label>
        <input
          type="text"
          value={receivedBy}
          onChange={(e) => setReceivedBy(e.target.value)}
          required
        />
      </div>

      <div className="cm-report-section">
        <label>Overall Result *</label>
        <select
          value={overallResult}
          onChange={(e) => setOverallResult(e.target.value)}
        >
          <option value="Successful">Successful</option>
          <option value="Partially Successful">Partially Successful</option>
          <option value="Unsuccessful">Unsuccessful</option>
        </select>
      </div>

      <div className="cm-report-section">
        <label>Recommendations</label>
        <textarea
          value={recommendations}
          onChange={(e) => setRecommendations(e.target.value)}
          rows="3"
        />
      </div>

      <div className="cm-report-section">
        <label>Additional Notes</label>
        <textarea
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          rows="3"
        />
      </div>

      <div className="cm-report-actions cm-report-full-section">
        <button type="submit" className="cm-report-save-button">
          Save CM Report
        </button>

        <button
          type="button"
          className="cm-report-cancel-button"
          onClick={() => navigate("/cm")}
        >
          Cancel
        </button>
      </div>

    </form>
  );
}

export default CMRepairForm;