import "./PMRecord.css";

function PMRecord({ schedule, handleSaveRecord, handleCancel }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSaveRecord(event, schedule);
  };

  return (
    <section className="pm-record-section">
      <h3>Preventive Maintenance Record</h3>

      <div className="pm-record-equipment">
        <div className="pm-record-equipment-details">
          <div>
            <span>Equipment Name:</span>
            <strong>{schedule.equipmentName}</strong>
          </div>

          <div>
            <span>Equipment Code:</span>
            <strong>{schedule.equipmentCode}</strong>
          </div>

          <div>
            <span>Serial Number:</span>
            <strong>{schedule.serialNumber || "—"}</strong>
          </div>

          <div>
            <span>Department:</span>
            <strong>{schedule.departmentName}</strong>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label>PM Completion Date</label>
        <input type="date" name="completionDate" required />

        <label>Performed By</label>
        <input
          type="text"
          name="performedBy"
          placeholder="Enter engineer name"
          required
        />

        <label>Work Performed</label>
        <textarea
          name="workPerformed"
          rows="3"
          placeholder="Describe the maintenance activities..."
          required
        />

        <label>Inspection Results</label>
        <textarea
          name="inspectionResults"
          rows="3"
          placeholder="Describe inspection and functional test results..."
          required
        />

        <label>Findings</label>
        <textarea
          name="findings"
          rows="3"
          placeholder="Record faults or observations..."
        />

        <label>Actions Taken</label>
        <textarea
          name="actionsTaken"
          rows="3"
          placeholder="Describe repairs or actions performed..."
        />

        <label>Recommendations</label>
        <textarea
          name="recommendations"
          rows="3"
          placeholder="Enter recommendations and follow-up..."
        />

        <label>Additional Notes</label>
        <textarea
          name="notes"
          rows="3"
          placeholder="Additional notes..."
        />

        <label>Overall Result</label>
        <select name="overallResult" defaultValue="Satisfactory">
          <option value="Satisfactory">Satisfactory</option>
          <option value="Needs Follow-up">Needs Follow-up</option>
        </select>

        <div className="pm-record-buttons">
          <button type="submit">Save PM Record</button>

          <button
            type="button"
            className="pm-record-cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default PMRecord;