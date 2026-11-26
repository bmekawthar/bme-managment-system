import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Footer from "../components/Footer/Footer";

import {
  getPMRecords,
  getPMSchedules
} from "../Utils/pmUtils";

import "./PMHistory.css";

function PMHistory() {
  const navigate = useNavigate();
  const { equipmentId } = useParams();

  const [records, setRecords] = useState([]);
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    const savedRecords = getPMRecords();
    const savedSchedules = getPMSchedules();

    setRecords(savedRecords);

    const selectedSchedule = savedSchedules.find(
      (item) => String(item.equipmentId) === equipmentId
    );

    setSchedule(selectedSchedule);
  }, [equipmentId]);

  const equipmentRecords = records
    .filter(
      (record) => String(record.equipmentId) === equipmentId
    )
    .sort((a, b) =>
      b.completionDate.localeCompare(a.completionDate)
    );

  const equipmentInfo = schedule || equipmentRecords[0];

  return (
    <div className="pm-page-history">
      <main className="pm-page-history-content">

        <div className="pm-page-history-top">
          <button
            type="button"
            className="pm-page-history-back"
            onClick={() => navigate("/pm")}
          >
            ← Back to PM
          </button>

          <div className="pm-page-history-title">
            <h2>Preventive Maintenance History</h2>
            <p>Maintenance records and reports</p>
          </div>
        </div>

        {equipmentInfo && (
          <section className="pm-page-equipment-info">
            <div className="pm-page-equipment-heading">
              <span className="pm-page-section-label">
                EQUIPMENT INFORMATION
              </span>

              <h3>{equipmentInfo.equipmentName}</h3>
            </div>

            <div className="pm-page-equipment-details">
              <div>
                <span>Equipment Code</span>
                <strong>{equipmentInfo.equipmentCode}</strong>
              </div>

              <div>
                <span>Department</span>
                <strong>{equipmentInfo.departmentName}</strong>
              </div>
            </div>
          </section>
        )}

        <section className="pm-page-history-section">

          <div className="pm-page-history-section-header">
            <div>
              <h3>PM History Records</h3>
              <p>Preventive maintenance activities and reports</p>
            </div>

            <span className="pm-page-record-count">
              {equipmentRecords.length} Records
            </span>
          </div>

          {equipmentRecords.length === 0 ? (
            <div className="pm-page-empty-message">
              No preventive maintenance records for this equipment yet.
            </div>
          ) : (
            <div className="pm-page-record-list">

              {equipmentRecords.map((record, index) => (
                <article
                  className="pm-page-record-card"
                  key={index}
                >

                  <div className="pm-page-record-date">
                    <span>PM COMPLETION DATE</span>
                    <strong>{record.completionDate}</strong>
                  </div>

                  <div className="pm-page-record-summary">
                    <div className="pm-page-summary-item">
                      <span>Overall Result</span>

                      <strong
                        className={
                          record.overallResult === "Satisfactory"
                            ? "pm-page-result-good"
                            : "pm-page-result-follow"
                        }
                      >
                        {record.overallResult}
                      </strong>
                    </div>

                    <div className="pm-page-summary-item">
                      <span>Performed By</span>
                      <strong>{record.performedBy}</strong>
                    </div>
                  </div>

                  <div className="pm-page-report-body">

                    <div className="pm-page-record-group">
                      <h4>Maintenance Information</h4>

                      <div className="pm-page-record-grid">
                        <div className="pm-page-record-item full-width">
                          <span>Work Performed</span>
                          <strong>{record.workPerformed}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="pm-page-record-group">
                      <h4>Inspection & Results</h4>

                      <div className="pm-page-record-grid">
                        <div className="pm-page-record-item full-width">
                          <span>Inspection Results</span>
                          <strong>{record.inspectionResults}</strong>
                        </div>

                        <div className="pm-page-record-item full-width">
                          <span>Findings</span>
                          <strong>{record.findings || "None"}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="pm-page-record-group">
                      <h4>Actions & Recommendations</h4>

                      <div className="pm-page-record-grid">
                        <div className="pm-page-record-item">
                          <span>Actions Taken</span>
                          <strong>{record.actionsTaken || "None"}</strong>
                        </div>

                        <div className="pm-page-record-item">
                          <span>Recommendations</span>
                          <strong>{record.recommendations || "None"}</strong>
                        </div>

                        <div className="pm-page-record-item full-width">
                          <span>Additional Notes</span>
                          <strong>{record.notes || "None"}</strong>
                        </div>
                      </div>
                    </div>

                  </div>

                </article>
              ))}

            </div>
          )}

        </section>

      </main>

      <Footer />
    </div>
  );
}

export default PMHistory;