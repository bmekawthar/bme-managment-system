import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import PMList from "../components/PMList/PMList";

import {
  getPMSchedules,
  savePMSchedules,
  updatePMSchedule
} from "../Utils/pmUtils";

import { formatDate } from "../Utils/pmDateUtils";

import "./PM.css";

function PMSchedules() {
  const navigate = useNavigate();

  const [pmSchedules, setPMSchedules] = useState([]);

  // Load all saved PM schedules
  useEffect(() => {
    const savedSchedules = getPMSchedules();

    setPMSchedules(savedSchedules);
  }, []);

  // Determine the maintenance status
  const getScheduleStatus = (schedule) => {
    const today = formatDate(new Date());

    if (schedule.nextPMDate < today) {
      return "Overdue";
    }

    if (schedule.nextPMDate === today) {
      return "Due";
    }

    return "Upcoming";
  };

  // Check whether the current schedule is completed
  const isScheduleCompleted = (schedule) => {
    const today = formatDate(new Date());

    return (
      schedule.completed === true &&
      schedule.nextPMDate > today
    );
  };

  // Check whether a record has been saved
  const hasCurrentRecord = (schedule) => {
    return schedule.recordPendingCompletion === true;
  };

  // Open the PM record page
  const handleViewRecords = (schedule) => {
    navigate(`/pm-details/${schedule.equipmentId}`);
  };

  // Mark the schedule as completed
  const handleCompletePM = (schedule) => {
    if (!hasCurrentRecord(schedule)) {
      return;
    }

    const updatedSchedule = {
      equipmentId: schedule.equipmentId,
      equipmentName: schedule.equipmentName,
      equipmentCode: schedule.equipmentCode,
      serialNumber: schedule.serialNumber,
      departmentName: schedule.departmentName,
      lastPMDate: schedule.lastPMDate,
      pmInterval: schedule.pmInterval,
      nextPMDate: schedule.nextPMDate,
      assignedEngineer: schedule.assignedEngineer,
      completed: true,
      recordPendingCompletion: false
    };

    const updatedSchedules = updatePMSchedule(
      pmSchedules,
      schedule.equipmentId,
      updatedSchedule
    );

    setPMSchedules(updatedSchedules);
    savePMSchedules(updatedSchedules);
  };

  // Open the maintenance history page
  const handleViewDetails = (schedule) => {
    navigate(`/pm-history/${schedule.equipmentId}`);
  };

  return (
    <div className="pm-page">
      <main className="pm-content">
        <button
          type="button"
          className="pm-back-button"
          onClick={() => navigate("/pm")}
        >
          ← Back to PM
        </button>

        <h2>All Preventive Maintenance Schedules</h2>

        <PMList
          schedules={pmSchedules}
          getScheduleStatus={getScheduleStatus}
          handleCompletePM={handleCompletePM}
          handleViewRecords={handleViewRecords}
          handleViewDetails={handleViewDetails}
          isScheduleCompleted={isScheduleCompleted}
          hasCurrentRecord={hasCurrentRecord}
        />
      </main>

      <Footer />
    </div>
  );
}

export default PMSchedules;