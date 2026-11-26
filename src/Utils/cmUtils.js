const CM_STORAGE_KEY = "cmFaults";

export function getCMFaults() {
  const savedFaults = localStorage.getItem(CM_STORAGE_KEY);

  if (savedFaults) {
    return JSON.parse(savedFaults);
  }

  return [];
}

export function saveCMFaults(faults) {
  localStorage.setItem(
    CM_STORAGE_KEY,
    JSON.stringify(faults)
  );
}

export function addCMFault(faults, newFault) {
  const fault = {
    id: faults.length + 1,
    equipmentId: newFault.equipmentId,
    equipmentName: newFault.equipmentName,
    equipmentCode: newFault.equipmentCode,
    department: newFault.department,
    faultDescription: newFault.faultDescription,
    reportedDate: newFault.reportedDate,
    reportedBy: newFault.reportedBy,
    assignedEngineer: newFault.assignedEngineer,
    status: "Open",
    report: null
  };

  const updatedFaults = faults.concat(fault);

  saveCMFaults(updatedFaults);

  return updatedFaults;
}

export function updateCMFault(faults, faultId, updatedData) {
  const updatedFaults = faults.map((fault) => {
    if (fault.id === faultId) {
      return {
        ...fault,
        ...updatedData
      };
    }

    return fault;
  });

  saveCMFaults(updatedFaults);

  return updatedFaults;
}