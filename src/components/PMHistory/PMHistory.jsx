import "./PMHistory.css";

function PMHistory({ schedule, records, handleClose }) {
  const equipmentRecords = records
    .filter(
      (record) =>
        String(record.equipmentId) === String(schedule.equipmentId)
    )
    .sort((a, b) =>
      b.completionDate.localeCompare(a.completionDate)
    );

  return (
    <section className="pm-history-section">

      <div className="pm-history-header">
        <div className="pm-history-heading">
          <h3>Preventive Maintenance History</h3>
          <p>
            {schedule.equipmentName} - {schedule.equipmentCode}
          </p>
        </div>

        <button
          type="button"
          className="pm-history-close-button"
          onClick={handleClose}
        >
          Close
        </button>
      </div>

      {equipmentRecords.length === 0 ? (
        <p className="pm-empty-message">
          No preventive maintenance records for this equipment yet.
        </p>
      ) : (
        <div className="pm-history-list">

          {equipmentRecords.map((record, index) => (
            <article className="pm-history-card" key={index}>

              <div className="pm-history-card-header">

                <div className="pm-history-summary-item pm-history-date">
                  <span>PM Completion Date</span>
                  <strong>{record.completionDate}</strong>
                </div>

                <div className="pm-history-summary-item pm-history-result">
                  <span>Overall Result</span>

                  <strong
                    className={
                      record.overallResult === "Satisfactory"
                        ? "pm-result-satisfactory"
                        : "pm-result-follow-up"
                    }
                  >
                    {record.overallResult}
                  </strong>
                </div>

                <div className="pm-history-summary-item pm-history-engineer">
                  <span>Performed By</span>
                  <strong>{record.performedBy}</strong>
                </div>

              </div>

              <div className="pm-history-group">
                <h4>Maintenance Details</h4>

                <div className="pm-history-details">

                  <div className="pm-history-detail-item">
                    <span>Work Performed</span>
                    <p>{record.workPerformed}</p>
                  </div>

                  <div className="pm-history-detail-item">
                    <span>Inspection Results</span>
                    <p>{record.inspectionResults}</p>
                  </div>

                </div>
              </div>

              <div className="pm-history-group">
                <h4>Findings and Follow-up</h4>

                <div className="pm-history-details">

                  <div className="pm-history-detail-item">
                    <span>Findings</span>
                    <p>{record.findings || "None"}</p>
                  </div>

                  <div className="pm-history-detail-item">
                    <span>Actions Taken</span>
                    <p>{record.actionsTaken || "None"}</p>
                  </div>

                  <div className="pm-history-detail-item">
                    <span>Recommendations</span>
                    <p>{record.recommendations || "None"}</p>
                  </div>

                  <div className="pm-history-detail-item">
                    <span>Additional Notes</span>
                    <p>{record.notes || "None"}</p>
                  </div>

                </div>
              </div>

            </article>
          ))}

        </div>
      )}

    </section>
  );
}

export default PMHistory;