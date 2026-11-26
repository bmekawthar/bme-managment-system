export const saveTransfers = (transfers) => {
  localStorage.setItem("transfers", JSON.stringify(transfers));
};

export const getTransfers = () => {
  const transfers = localStorage.getItem("transfers");
  return transfers ? JSON.parse(transfers) : [];
};

export const addTransfer = (transfers, newTransfer) => {
  return transfers.concat(newTransfer);
};

export const getLastTransfer = (transfers, equipmentId) => {
  const equipmentTransfers = transfers.filter(
    (transfer) => transfer.equipmentId === equipmentId
  );

  if (equipmentTransfers.length === 0) {
    return null;
  }

  return equipmentTransfers[equipmentTransfers.length - 1];
};