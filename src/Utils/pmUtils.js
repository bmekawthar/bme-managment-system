export const savePMSchedules = (schedules) => {
  localStorage.setItem("pmSchedules", JSON.stringify(schedules));
};

export const getPMSchedules = () => {
  const schedules = localStorage.getItem("pmSchedules");

  return schedules ? JSON.parse(schedules) : [];
};

export const hasPMSchedule = (schedules, equipmentId) => {
  return schedules.some(
    (schedule) =>
      String(schedule.equipmentId) === String(equipmentId)
  );
};

export const addPMSchedule = (schedules, newSchedule) => {
  if (hasPMSchedule(schedules, newSchedule.equipmentId)) {
    return schedules;
  }

  return schedules.concat(newSchedule);
};

export const updatePMSchedule = (
  schedules,
  equipmentId,
  updatedSchedule
) => {
  return schedules.map((schedule) => {
    if (
      String(schedule.equipmentId) === String(equipmentId)
    ) {
      return updatedSchedule;
    }

    return schedule;
  });
};

export const savePMRecords = (records) => {
  localStorage.setItem("pmRecords", JSON.stringify(records));
};

export const getPMRecords = () => {
  const records = localStorage.getItem("pmRecords");

  return records ? JSON.parse(records) : [];
};

export const addPMRecord = (records, newRecord) => {
  return records.concat(newRecord);
};