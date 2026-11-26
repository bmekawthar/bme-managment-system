import "./CMFormList.css";

function CMFormList({
  activeFaults,
  onStartRepair,
  onOpenReport
}) {
  return (
    <section className="cm-faults-section">
      <div className="cm-section-header">
        <h2>Reported Equipment Faults</h2>
      </div>

      {activeFaults.length === 0 ? (
        <p className="cm-empty-message">
          No active equipment faults have been reported.
        </p>
      ) : (
        <div className="cm-faults-grid">
          {activeFaults.map((fault) => (
            <article className="cm-fault-card" key={fault.id}>
              <h3>{fault.equipmentName}</h3>

              <p>
                <strong>Equipment Code:</strong> {fault.equipmentCode}
              </p>

              <p>
                <strong>Department:</strong> {fault.department}
              </p>

              <p>
                <strong>Reported Date:</strong> {fault.reportedDate}
              </p>

              <p>
                <strong>Reported By:</strong>{" "}
                {fault.reportedBy || "Not specified"}
              </p>

              <p>
                <strong>Assigned Engineer:</strong>{" "}
                {fault.assignedEngineer}
              </p>

              <p>
                <strong>Fault Description:</strong>
                <span className="cm-fault-description">
                  {fault.faultDescription}
                </span>
              </p>

              <div className="cm-fault-status">
                <strong>Status: </strong>

                <span
                  className={
                    fault.status === "Open"
                      ? "cm-status-open"
                      : "cm-status-in-progress"
                  }
                >
                  {fault.status}
                </span>
              </div>

              <div className="cm-fault-actions">
                {fault.status === "Open" && (
                  <button
                    type="button"
                    className="cm-primary-button"
                    onClick={() => onStartRepair(fault)}
                  >
                    Start Repair
                  </button>
                )}

                {fault.status === "In Progress" && (
                  <button
                    type="button"
                    className="cm-primary-button"
                    onClick={() => onOpenReport(fault)}
                  >
                    Repair Report
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default CMFormList;