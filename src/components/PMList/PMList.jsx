import "./PMList.css";

function PMList({
  schedules,
  getScheduleStatus,
  handleCompletePM,
  handleViewRecords,
  handleViewDetails,
  isScheduleCompleted,
  hasCurrentRecord
}) {
  return (
    <section className="pm-list-section">
      <h3>Scheduled Maintenance</h3>

      {schedules.length === 0 ? (
        <p className="pm-empty-message">
          No scheduled maintenance yet.
        </p>
      ) : (
        <div className="pm-table-container">
          <table className="pm-schedule-table">
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Serial Number</th>
                <th>Department</th>
                <th>Last PM</th>
                <th>Next PM</th>
                <th>Interval</th>
                <th>Assigned Engineer</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {schedules.map((schedule) => {
                const status = getScheduleStatus(schedule);
                const completed = isScheduleCompleted(schedule);
                const recordSaved = hasCurrentRecord(schedule);

                let intervalName = schedule.pmInterval;

                if (schedule.pmInterval === "weekly") {
                  intervalName = "Every Week";
                } else if (schedule.pmInterval === "monthly") {
                  intervalName = "Monthly";
                } else if (schedule.pmInterval === "3") {
                  intervalName = "Every 3 Months";
                } else if (schedule.pmInterval === "6") {
                  intervalName = "Every 6 Months";
                } else if (schedule.pmInterval === "12") {
                  intervalName = "Yearly";
                }

                return (
                  <tr key={schedule.equipmentId}>
                    <td>
                      <strong>{schedule.equipmentName}</strong>

                      <span className="pm-equipment-code">
                        Code: {schedule.equipmentCode}
                      </span>
                    </td>

                    <td className="pm-serial-number-cell">
                      {schedule.serialNumber || "—"}
                    </td>

                    <td>{schedule.departmentName}</td>
                    <td>{schedule.lastPMDate}</td>

                    <td className="pm-next-date-cell">
                      {schedule.nextPMDate}
                    </td>

                    <td>{intervalName}</td>
                    <td>{schedule.assignedEngineer}</td>

                    <td>
                      <span className={`pm-status ${status.toLowerCase()}`}>
                        {status}
                      </span>
                    </td>

                    <td>
                      <div className="pm-action-buttons">
                        <button
                          type="button"
                          className="pm-view-button"
                          onClick={() => handleViewRecords(schedule)}
                        >
                          Records
                        </button>

                        <button
                          type="button"
                          className={
                            completed
                              ? "pm-completed-button"
                              : "pm-complete-button"
                          }
                          onClick={() => handleCompletePM(schedule)}
                          disabled={completed || !recordSaved}
                        >
                          {completed ? "Completed ✓" : "Complete PM"}
                        </button>

                        <button
                          type="button"
                          className="pm-view-button"
                          onClick={() => handleViewDetails(schedule)}
                        >
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default PMList;