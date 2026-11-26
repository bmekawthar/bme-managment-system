import { useState } from "react";
import { initialEquipment } from "../Utils/equipmentFields";

function useEquipmentForm() {
  const [newEquipment, setNewEquipment] = useState(initialEquipment);
  const [editingEquipmentId, setEditingEquipmentId] = useState(null);
  const [showEquipmentForm, setShowEquipmentForm] = useState(false);
  const [calendarField, setCalendarField] = useState(null);

  const resetEquipmentForm = () => {
    setNewEquipment(initialEquipment);
    setEditingEquipmentId(null);
    setShowEquipmentForm(false);
    setCalendarField(null);
  };

  const openNewEquipmentForm = () => {
    resetEquipmentForm();
    setShowEquipmentForm(true);
  };

  const handleEquipmentFieldChange = (fieldName, value) => {
    setNewEquipment({
      ...newEquipment,
      [fieldName]: value,
    });
  };

  const openEditEquipmentForm = (item) => {
    setNewEquipment({
      ...initialEquipment,
      ...item,
    });

    setEditingEquipmentId(item.id);
    setShowEquipmentForm(true);
    setCalendarField(null);
  };

  return {
    newEquipment,
    editingEquipmentId,
    showEquipmentForm,
    calendarField,
    resetEquipmentForm,
    openNewEquipmentForm,
    handleEquipmentFieldChange,
    openEditEquipmentForm,
    setShowEquipmentForm,
    setCalendarField,
  };
}

export default useEquipmentForm;