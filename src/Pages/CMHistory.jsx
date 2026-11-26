import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import { getCMFaults } from "../Utils/cmUtils";

import "./CMHistory.css";

function CMHistory() {
  const navigate = useNavigate();

  const [completedFaults, setCompletedFaults] = useState([]);

  // Load completed repair reports
  useEffect(() => {
    const faults = getCMFaults();

    const completed = faults.filter(
      (fault) => fault.status === "Completed" && fault.report !== null
    );

    completed.sort((first, second) => {
      const firstDate = first.report.completionDate.split("/");
      const secondDate = second.report.completionDate.split("/");

      const firstValue = new Date(
        Number(firstDate[2]),
        Number(firstDate[1]) - 1,
        Number(firstDate[0])
      );

      const secondValue = new Date(
        Number(secondDate[2]),
        Number(secondDate[1]) - 1,
        Number(secondDate[0])
      );

      return secondValue - firstValue;
    });

    setCompletedFaults(completed);
  }, []);

  return (
    <div className="cm-page-history">
      <main className="cm-page-history-content">

        {/* Page Header */}
        <div className="cm-page-history-top">
          <button
            type="button"
            className="cm-page-history-back"
            onClick={() => navigate("/cm")}
          >
            ← Back to Corrective Maintenance
          </button>

          <div className="cm-page-history-title">
            <h2>Corrective Maintenance History</h2>
            <p>Completed medical equipment repair reports</p>
          </div>
        </div>

        {/* History Section */}
        <section className="cm-page-history-section">

          <div className="cm-page-history-section-header">
            <div>
              <h3>Repair History Records</h3>
              <p>Review completed corrective maintenance activities</p>
            </div>

            <span className="cm-page-record-count">
              {completedFaults.length} Records
            </span>
          </div>

          {completedFaults.length === 0 ? (
            <div className="cm-page-empty-message">
              No completed repair reports available.
            </div>
          ) : (
            <div className="cm-page-record-list">

              {completedFaults.map((fault) => (
                <article className="cm-page-record-card" key={fault.id}>

                  {/* Equipment Information */}
                  <div className="cm-page-equipment-info">
                    <div className="cm-page-equipment-heading">
                      <span className="cm-page-section-label">
                        EQUIPMENT INFORMATION
                      </span>

                      <h3>{fault.equipmentName}</h3>
                    </div>

                    <div className="cm-page-equipment-details">
                      <div>
                        <span>Equipment Code</span>
                        <strong>{fault.equipmentCode}</strong>
                      </div>

                      <div>
                        <span>Department</span>
                        <strong>{fault.department}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Repair Completion Date */}
                  <div className="cm-page-record-date">
                    <span>REPAIR COMPLETION DATE</span>
                    <strong>{fault.report.completionDate}</strong>
                  </div>

                  {/* Report Summary */}
                  <div className="cm-page-record-summary">
                    <div className="cm-page-summary-item">
                      <span>Reported Date</span>
                      <strong>{fault.reportedDate}</strong>
                    </div>

                    <div className="cm-page-summary-item">
                      <span>Overall Result</span>
                      <strong
                        className={
                          fault.report.overallResult === "Satisfactory"
                            ? "cm-page-result-good"
                            : "cm-page-result-follow"
                        }
                      >
                        {fault.report.overallResult}
                      </strong>
                    </div>
                  </div>

                  {/* Report Details */}
                  <div className="cm-page-report-body">

                    {/* Fault Information */}
                    <div className="cm-page-record-group">
                      <h4>Fault Information</h4>

                      <div className="cm-page-record-grid">
                        <div className="cm-page-record-item full-width">
                          <span>Fault Description</span>
                          <strong>{fault.faultDescription}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Repair Information */}
                    <div className="cm-page-record-group">
                      <h4>Repair Information</h4>

                      <div className="cm-page-record-grid">
                        <div className="cm-page-record-item">
                          <span>Assigned Engineer</span>
                          <strong>{fault.assignedEngineer}</strong>
                        </div>

                        <div className="cm-page-record-item">
                          <span>Performed By</span>
                          <strong>{fault.report.performedBy}</strong>
                        </div>

                        <div className="cm-page-record-item full-width">
                          <span>Equipment Received By</span>
                          <strong>
                            {fault.report.equipmentReceivedBy || "Not specified"}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Inspection and Corrective Actions */}
                    <div className="cm-page-record-group">
                      <h4>Inspection & Corrective Actions</h4>

                      <div className="cm-page-record-grid">
                        <div className="cm-page-record-item full-width">
                          <span>Inspection and Diagnosis</span>
                          <strong>{fault.report.inspectionDiagnosis}</strong>
                        </div>

                        <div className="cm-page-record-item full-width">
                          <span>Corrective Actions</span>
                          <strong>{fault.report.correctiveActions}</strong>
                        </div>
                      </div>
                    </div>

                    {/* Spare Parts */}
                    <div className="cm-page-record-group">
                      <h4>Replaced Spare Parts</h4>

                      {!fault.report.spareParts ||
                      fault.report.spareParts.length === 0 ? (
                        <div className="cm-page-empty-parts">
                          No spare parts replaced.
                        </div>
                      ) : (
                        <div className="cm-page-parts-list">
                          {fault.report.spareParts.map((part, index) => (
                            <div className="cm-page-part-card" key={index}>
                              <div className="cm-page-record-grid">
                                <div className="cm-page-record-item">
                                  <span>Part Name</span>
                                  <strong>{part.partName}</strong>
                                </div>

                                <div className="cm-page-record-item">
                                  <span>Part Number</span>
                                  <strong>{part.partNumber || "Not specified"}</strong>
                                </div>

                                <div className="cm-page-record-item">
                                  <span>Quantity</span>
                                  <strong>{part.quantity}</strong>
                                </div>

                                <div className="cm-page-record-item">
                                  <span>Unit Cost</span>
                                  <strong>{part.unitCost}</strong>
                                </div>

                                <div className="cm-page-record-item full-width">
                                  <span>Total Cost</span>
                                  <strong>{part.totalCost}</strong>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="cm-page-total-cost">
                        <span>Total Spare Parts Cost</span>
                        <strong>{fault.report.totalPartsCost}</strong>
                      </div>
                    </div>

                    {/* Recommendations and Notes */}
                    <div className="cm-page-record-group">
                      <h4>Recommendations & Additional Notes</h4>

                      <div className="cm-page-record-grid">
                        <div className="cm-page-record-item full-width">
                          <span>Recommendations</span>
                          <strong>{fault.report.recommendations || "None"}</strong>
                        </div>

                        <div className="cm-page-record-item full-width">
                          <span>Additional Notes</span>
                          <strong>{fault.report.additionalNotes || "None"}</strong>
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

export default CMHistory;