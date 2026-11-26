import { saveEquipment } from "../Utils/equipmentUtils";

import {
  addTransfer,
  saveTransfers,
} from "../Utils/transferUtils";

function useTransferActions({
  departments,
  equipment,
  setEquipment,
  transfers,
  setTransfers,
  equipmentToTransfer,
  transferDepartmentId,
  transferDate,
  transferReason,
  resetTransferForm,
}) {
  const handleConfirmTransfer = () => {
    const destinationDepartment = departments.find(
      (department) =>
        String(department.id) === transferDepartmentId
    );

    if (
      !equipmentToTransfer ||
      !destinationDepartment ||
      !transferDate ||
      !transferReason.trim()
    ) {
      return;
    }

    const transferRecord = {
      equipmentId: equipmentToTransfer.id,
      equipmentName: equipmentToTransfer.equipmentName,
      equipmentCode: equipmentToTransfer.equipmentCode,
      fromDepartmentId: equipmentToTransfer.departmentId,
      fromDepartmentName: equipmentToTransfer.departmentName,
      toDepartmentId: destinationDepartment.id,
      toDepartmentName: destinationDepartment.name,
      transferDate: transferDate,
      reason: transferReason.trim(),
    };

    const updatedEquipment = equipment.map((item) =>
      item.id === equipmentToTransfer.id
        ? {
            ...item,
            departmentId: destinationDepartment.id,
            departmentName: destinationDepartment.name,
          }
        : item
    );

    const updatedTransfers = addTransfer(transfers, transferRecord);

    setEquipment(updatedEquipment);
    saveEquipment(updatedEquipment);

    setTransfers(updatedTransfers);
    saveTransfers(updatedTransfers);

    resetTransferForm();
  };

  return {
    handleConfirmTransfer,
  };
}

export default useTransferActions;