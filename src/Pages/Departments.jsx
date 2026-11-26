import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ConfirmationModal from "../components/ConfirmationModal/ConfirmationModal";
import EquipmentCard from "../components/EquipmentCard/EquipmentCard";
import EquipmentForm from "../components/EquipmentForm/EquipmentForm";
import TransferForm from "../components/TransferForm/TransferForm";

import useEquipmentForm from "../Hooks/useEquipmentForm";
import useTransferForm from "../Hooks/useTransferForm";
import useDepartmentData from "../Hooks/useDepartmentData";
import useEquipmentActions from "../Hooks/useEquipmentActions";
import useTransferActions from "../Hooks/useTransferActions";

import {
  addDepartment,
  saveDepartments,
} from "../Utils/departmentUtils";

import {
  addToFavorites,
  removeFavorite,
} from "../Utils/favoriteUtils";

import { getLastTransfer } from "../Utils/transferUtils";

import "./Departments.css";

function Departments() {
  const navigate = useNavigate();

  const {
    departments,
    setDepartments,
    equipment,
    setEquipment,
    favorites,
    setFavorites,
    transfers,
    setTransfers,
  } = useDepartmentData();

  const [showForm, setShowForm] = useState(false);
  const [newDepartment, setNewDepartment] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [equipmentToDelete, setEquipmentToDelete] = useState(null);

  const {
    newEquipment,
    editingEquipmentId,
    showEquipmentForm,
    calendarField,
    resetEquipmentForm,
    openNewEquipmentForm,
    handleEquipmentFieldChange,
    openEditEquipmentForm,
    setCalendarField,
  } = useEquipmentForm();

  const {
    equipmentToTransfer,
    transferDepartmentId,
    setTransferDepartmentId,
    transferDate,
    setTransferDate,
    transferReason,
    setTransferReason,
    openTransferForm,
    resetTransferForm,
  } = useTransferForm();

  const {
    handleSaveEquipment,
    handleDeleteEquipment,
  } = useEquipmentActions({
    equipment,
    setEquipment,
    newEquipment,
    editingEquipmentId,
    selectedDepartment,
    resetEquipmentForm,
    favorites,
    setFavorites,
  });

  const { handleConfirmTransfer } = useTransferActions({
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
  });

  const handleAddDepartment = () => {
    const updatedDepartments = addDepartment(departments, newDepartment);

    if (updatedDepartments === departments) return;

    setDepartments(updatedDepartments);
    saveDepartments(updatedDepartments);
    setNewDepartment("");
    setShowForm(false);
  };

  const handleConfirmDelete = () => {
    handleDeleteEquipment(equipmentToDelete);
    setEquipmentToDelete(null);
  };

  const handleSelectedDate = (selectedDate) => {
    if (selectedDate !== undefined && calendarField !== null) {
      handleEquipmentFieldChange(
        calendarField,
        format(selectedDate, "yyyy-MM-dd")
      );

      setCalendarField(null);
    }
  };

  const handleFavorite = (equipmentId) => {
    const existingFavorite = favorites.find(
      (id) => id === equipmentId
    );

    if (existingFavorite !== undefined) {
      removeFavorite(equipmentId);

      const updatedFavorites = favorites.filter(
        (id) => id !== equipmentId
      );

      setFavorites(updatedFavorites);
    } else {
      addToFavorites(equipmentId);

      const updatedFavorites = favorites.concat(equipmentId);
      setFavorites(updatedFavorites);
    }
  };

  const selectedEquipment = selectedDepartment
    ? equipment.filter(
        (item) => item.departmentId === selectedDepartment.id
      )
    : [];

  const openEquipmentDetails = (item) => {
    navigate("/equipment-details", {
      state: { equipment: item },
    });
  };

  return (
    <div className="departments-page">
      {!selectedDepartment && <Header />}

      <main className="departments-content">
        {!selectedDepartment ? (
          <>
            <h2>Departments & Medical Equipment</h2>

            <div className="departments-list">
              {departments.map((department) => (
                <div
                  className="department-box"
                  key={department.id}
                  onClick={() => setSelectedDepartment(department)}
                >
                  {department.name}
                </div>
              ))}

              <button
                className="department-box add-department-box"
                onClick={() => setShowForm(!showForm)}
              >
                <span>+</span>
                Add Department
              </button>
            </div>

            {showForm && (
              <div className="department-form">
                <input
                  type="text"
                  placeholder="Enter department name"
                  value={newDepartment}
                  onChange={(e) => setNewDepartment(e.target.value)}
                />

                <button onClick={handleAddDepartment}>Add</button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="equipment-header-row">
              <button
                className="back-button"
                onClick={() => {
                  setSelectedDepartment(null);
                  resetEquipmentForm();
                }}
              >
                Back to Departments
              </button>

              <h2 className="equipment-section-title">
                {selectedDepartment.name} - Medical Equipment
              </h2>

              <button
                className="add-equipment-button"
                onClick={() => {
                  if (showEquipmentForm) {
                    resetEquipmentForm();
                  } else {
                    openNewEquipmentForm();
                  }
                }}
              >
                + Add Equipment
              </button>
            </div>

            <EquipmentForm
              newEquipment={newEquipment}
              handleEquipmentFieldChange={handleEquipmentFieldChange}
              showEquipmentForm={showEquipmentForm}
              editingEquipmentId={editingEquipmentId}
              calendarField={calendarField}
              setCalendarField={setCalendarField}
              handleSelectedDate={handleSelectedDate}
              resetEquipmentForm={resetEquipmentForm}
              handleSaveEquipment={handleSaveEquipment}
            />

            <div className="equipment-cards">
              {selectedEquipment.length === 0 ? (
                <p className="no-equipment-message">
                  No equipment added yet.
                </p>
              ) : (
                selectedEquipment.map((item) => (
                  <EquipmentCard
                    key={item.id}
                    item={item}
                    isFavorite={
                      favorites.find((id) => id === item.id) !== undefined
                    }
                    lastTransfer={getLastTransfer(transfers, item.id)}
                    onOpen={openEquipmentDetails}
                    onEdit={openEditEquipmentForm}
                    onDelete={setEquipmentToDelete}
                    onFavorite={handleFavorite}
                    onTransfer={openTransferForm}
                  />
                ))
              )}
            </div>
          </>
        )}
      </main>

      <TransferForm
        equipment={equipmentToTransfer}
        departments={departments}
        transferDepartmentId={transferDepartmentId}
        setTransferDepartmentId={setTransferDepartmentId}
        transferDate={transferDate}
        setTransferDate={setTransferDate}
        transferReason={transferReason}
        setTransferReason={setTransferReason}
        onCancel={resetTransferForm}
        onConfirm={handleConfirmTransfer}
      />

      {equipmentToDelete !== null && (
        <ConfirmationModal
          message="Are you sure you want to delete this equipment?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setEquipmentToDelete(null)}
        />
      )}

      <Footer />
    </div>
  );
}

export default Departments;