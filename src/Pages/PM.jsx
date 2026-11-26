import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import PMScheduleForm from "../components/PMScheduleForm/PMScheduleForm";
import PMCalendarSection from "../components/PMCalendarSection/PMCalendarSection";
import PMSummary from "../components/PMSummary/PMSummary";

import { getEquipment } from "../Utils/equipmentUtils";

import {
  getPMSchedules,
  savePMSchedules,
  addPMSchedule,
  updatePMSchedule
} from "../Utils/pmUtils";

import {
  formatDate,
  calculateNextPMDate
} from "../Utils/pmDateUtils";

import "./PM.css";

function PM() {
  const navigate = useNavigate();

  const [equipment, setEquipment] = useState([]);
  const [pmSchedules, setPMSchedules] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Load equipment and PM schedules
  useEffect(() => {
    const savedEquipment = getEquipment();
    const savedSchedules = getPMSchedules();

    const updatedSchedules = savedSchedules.map((schedule) => {
      const equipmentItem = savedEquipment.find(
        (item) =>
          String(item.id) === String(schedule.equipmentId)
      );

      if (equipmentItem) {
        return {
          ...schedule,
          serialNumber: equipmentItem.serialNumber
        };
      }

      return schedule;
    });

    setEquipment(savedEquipment);
    setPMSchedules(updatedSchedules);

    savePMSchedules(updatedSchedules);
  }, []);

  // Add a new PM schedule
  const handleAddSchedule = (event, equipmentId) => {
    const selectedEquipment = equipment.find(
      (item) => String(item.id) === equipmentId
    );

    if (!selectedEquipment) {
      return false;
    }

    const lastPMDate = event.target.elements.lastPMDate.value;
    const pmInterval = event.target.elements.pmInterval.value;
    const assignedEngineer =
      event.target.elements.assignedEngineer.value;

    const nextPMDate = calculateNextPMDate(
      lastPMDate,
      pmInterval
    );

    if (!nextPMDate) {
      return false;
    }

    const newSchedule = {
      equipmentId: selectedEquipment.id,
      equipmentName: selectedEquipment.equipmentName,
      equipmentCode: selectedEquipment.equipmentCode,
      serialNumber: selectedEquipment.serialNumber,
      departmentName: selectedEquipment.departmentName,
      lastPMDate: lastPMDate,
      pmInterval: pmInterval,
      nextPMDate: nextPMDate,
      assignedEngineer: assignedEngineer,
      completed: false,
      recordPendingCompletion: false
    };

    const updatedSchedules = addPMSchedule(
      pmSchedules,
      newSchedule
    );

    if (updatedSchedules.length === pmSchedules.length) {
      return false;
    }

    setPMSchedules(updatedSchedules);
    savePMSchedules(updatedSchedules);

    return true;
  };

  // Determine maintenance status
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

  // Check whether the schedule is completed
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

  // Open PM records
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

  // Open maintenance history
  const handleViewDetails = (schedule) => {
    navigate(`/pm-history/${schedule.equipmentId}`);
  };

  // Open all PM schedules page
  const handleViewAllSchedules = () => {
    navigate("/pm-schedules");
  };

  // Count schedules according to status
  const upcomingCount = pmSchedules.filter(
    (schedule) => getScheduleStatus(schedule) === "Upcoming"
  ).length;

  const dueCount = pmSchedules.filter(
    (schedule) => getScheduleStatus(schedule) === "Due"
  ).length;

  const overdueCount = pmSchedules.filter(
    (schedule) => getScheduleStatus(schedule) === "Overdue"
  ).length;

  // Find schedules for the selected date
  const selectedDateSchedules = pmSchedules.filter(
    (schedule) =>
      schedule.nextPMDate === formatDate(selectedDate)
  );

  const handleSelectedDate = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <div className="pm-page">
      <main className="pm-content">
        <button
          type="button"
          className="pm-back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h2>Preventive Maintenance</h2>

        <PMSummary
          upcomingCount={upcomingCount}
          dueCount={dueCount}
          overdueCount={overdueCount}
        />

        <PMScheduleForm
          equipment={equipment}
          handleAddSchedule={handleAddSchedule}
          handleViewAllSchedules={handleViewAllSchedules}
        />

        <PMCalendarSection
          selectedDate={selectedDate}
          handleSelectedDate={handleSelectedDate}
          selectedDateSchedules={selectedDateSchedules}
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

export default PM;