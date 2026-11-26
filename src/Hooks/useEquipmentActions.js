import { saveEquipment } from "../Utils/equipmentUtils";
import { removeFavorite } from "../Utils/favoriteUtils";

function useEquipmentActions({
  equipment,
  setEquipment,
  newEquipment,
  editingEquipmentId,
  selectedDepartment,
  resetEquipmentForm,
  favorites,
  setFavorites,
}) {
  const handleSaveEquipment = () => {
    let updatedEquipment;

    if (editingEquipmentId !== null) {
      updatedEquipment = equipment.map((item) =>
        item.id === editingEquipmentId
          ? { ...item, ...newEquipment }
          : item
      );
    } else {
      const equipmentItem = {
        ...newEquipment,
        id: Date.now(),
        departmentId: selectedDepartment.id,
        departmentName: selectedDepartment.name,
      };

      updatedEquipment = equipment.concat(equipmentItem);
    }

    setEquipment(updatedEquipment);
    saveEquipment(updatedEquipment);
    resetEquipmentForm();
  };

  const handleDeleteEquipment = (equipmentId) => {
    const updatedEquipment = equipment.filter(
      (item) => item.id !== equipmentId
    );

    setEquipment(updatedEquipment);
    saveEquipment(updatedEquipment);
    removeFavorite(equipmentId);

    const updatedFavorites = favorites.filter(
      (id) => id !== equipmentId
    );

    setFavorites(updatedFavorites);
  };

  return {
    handleSaveEquipment,
    handleDeleteEquipment,
  };
}

export default useEquipmentActions;