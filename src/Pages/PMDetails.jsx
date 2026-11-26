import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import PMRecord from "../components/PMRecord/PMRecord";

import {
  getPMSchedules,
  savePMSchedules,
  updatePMSchedule,
  getPMRecords,
  savePMRecords,
  addPMRecord
} from "../Utils/pmUtils";

import { calculateNextPMDate } from "../Utils/pmDateUtils";

import "./PM.css";

// Display and save the maintenance record for the selected equipment
function PMDetails() {
  const navigate = useNavigate();
  const { equipmentId } = useParams();

  const [schedule, setSchedule] = useState(null);
  const [pmSchedules, setPMSchedules] = useState([]);
  const [pmRecords, setPMRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load the selected equipment schedule and previous records
  useEffect(() => {
    const savedSchedules = getPMSchedules();
    const savedRecords = getPMRecords();

    const selectedSchedule = savedSchedules.find(
      (item) => String(item.equipmentId) === String(equipmentId)
    );

    setPMSchedules(savedSchedules);
    setPMRecords(savedRecords);
    setSchedule(selectedSchedule || null);
    setLoading(false);
  }, [equipmentId]);

  // Save the maintenance record and update the next PM date
  const handleSaveRecord = (event, selectedSchedule) => {
    const completionDate =
      event.target.elements.completionDate.value;

    const performedBy =
      event.target.elements.performedBy.value;

    const newRecord = {
      equipmentId: selectedSchedule.equipmentId,
      equipmentName: selectedSchedule.equipmentName,
      equipmentCode: selectedSchedule.equipmentCode,
      departmentName: selectedSchedule.departmentName,
      completionDate: completionDate,
      performedBy: performedBy,
      workPerformed: event.target.elements.workPerformed.value,
      inspectionResults: event.target.elements.inspectionResults.value,
      findings: event.target.elements.findings.value,
      actionsTaken: event.target.elements.actionsTaken.value,
      recommendations: event.target.elements.recommendations.value,
      notes: event.target.elements.notes.value,
      overallResult: event.target.elements.overallResult.value
    };

    // Add and save the new maintenance record
    const updatedRecords = addPMRecord(pmRecords, newRecord);

    setPMRecords(updatedRecords);
    savePMRecords(updatedRecords);

    // Update the schedule when the completion date is valid
    if (completionDate >= selectedSchedule.lastPMDate) {
      const nextPMDate = calculateNextPMDate(
        completionDate,
        selectedSchedule.pmInterval
      );

      const updatedSchedule = {
        equipmentId: selectedSchedule.equipmentId,
        equipmentName: selectedSchedule.equipmentName,
        equipmentCode: selectedSchedule.equipmentCode,
        serialNumber: selectedSchedule.serialNumber,
        departmentName: selectedSchedule.departmentName,
        lastPMDate: completionDate,
        pmInterval: selectedSchedule.pmInterval,
        nextPMDate: nextPMDate,
        assignedEngineer: performedBy,
        completed: false,
        recordPendingCompletion: true
      };

      const updatedSchedules = updatePMSchedule(
        pmSchedules,
        selectedSchedule.equipmentId,
        updatedSchedule
      );

      setPMSchedules(updatedSchedules);
      savePMSchedules(updatedSchedules);
    }

    // Return to the main PM page after saving
    navigate("/pm");
  };

  // Return to the main PM page without saving
  const handleCancel = () => {
    navigate("/pm");
  };

  return (
    <div className="pm-page">
      <main className="pm-content">
        <button
          type="button"
          className="pm-back-button"
          onClick={handleCancel}
        >
          ← Back
        </button>

        <h2>Preventive Maintenance Record</h2>

        {loading ? (
          <p>Loading...</p>
        ) : schedule ? (
          <PMRecord
            schedule={schedule}
            handleSaveRecord={handleSaveRecord}
            handleCancel={handleCancel}
          />
        ) : (
          <p>PM schedule not found.</p>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default PMDetails;