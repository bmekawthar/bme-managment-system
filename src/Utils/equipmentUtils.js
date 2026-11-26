export const saveEquipment = (equipment) => {
  localStorage.setItem("equipment", JSON.stringify(equipment));
};

export const getEquipment = () => {
  const equipment = localStorage.getItem("equipment");
  console.log("get equipment", equipment);
  return equipment ? JSON.parse(equipment) : [];
};