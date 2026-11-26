import { useParams, useNavigate } from "react-router-dom";
import { getCMFaults } from "../Utils/cmUtils";
import CMRepairForm from "../components/CMRepairForm/CMRepairForm";
import Footer from "../components/Footer/Footer";
import "./CMReport.css";

function CMReport() {
  const { faultId } = useParams();
  const navigate = useNavigate();

  const faults = getCMFaults();

  const selectedFault = faults.find(
    (fault) => fault.id === Number(faultId)
  );

  if (!selectedFault) {
    return (
      <>
        <main className="cm-report-page">
          <button
            className="cm-report-back-button"
            onClick={() => navigate("/cm")}
          >
            ← Back to CM
          </button>

          <div className="cm-report-header">
            <h1>Repair Report</h1>
            <p>Corrective Maintenance Report</p>
          </div>

          <h2>Fault not found.</h2>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <main className="cm-report-page">

        <button
          className="cm-report-back-button"
          onClick={() => navigate("/cm")}
        >
          ← Back to CM
        </button>

        <div className="cm-report-header">
          <h1>Repair Report</h1>
          <p>Complete the repair details below</p>
        </div>

        <div className="cm-report-equipment-card">
          <h2>{selectedFault.equipmentName}</h2>

          <div className="cm-report-equipment-details">
            <p>
              <strong>Equipment Code:</strong>{" "}
              {selectedFault.equipmentCode}
            </p>

            <p>
              <strong>Department:</strong>{" "}
              {selectedFault.department}
            </p>

            <p>
              <strong>Reported Date:</strong>{" "}
              {selectedFault.reportedDate}
            </p>
          </div>
        </div>

        <CMRepairForm selectedFault={selectedFault} />

      </main>

      <Footer />
    </>
  );
}

export default CMReport;
