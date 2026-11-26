import { useState } from "react";

function useTransferForm() {
  const [equipmentToTransfer, setEquipmentToTransfer] = useState(null);
  const [transferDepartmentId, setTransferDepartmentId] = useState("");
  const [transferDate, setTransferDate] = useState("");
  const [transferReason, setTransferReason] = useState("");

  const openTransferForm = (item) => {
    setEquipmentToTransfer(item);
    setTransferDepartmentId("");
    setTransferDate("");
    setTransferReason("");
  };

  const resetTransferForm = () => {
    setEquipmentToTransfer(null);
    setTransferDepartmentId("");
    setTransferDate("");
    setTransferReason("");
  };

  return {
    equipmentToTransfer,
    transferDepartmentId,
    setTransferDepartmentId,
    transferDate,
    setTransferDate,
    transferReason,
    setTransferReason,
    openTransferForm,
    resetTransferForm,
  };
}

export default useTransferForm;