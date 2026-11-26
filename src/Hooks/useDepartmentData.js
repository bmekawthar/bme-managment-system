import { useState, useEffect } from "react";

import {
  getDepartments,
  saveDepartments,
} from "../Utils/departmentUtils";

import { getFavorites } from "../Utils/favoriteUtils";

import { getEquipment } from "../Utils/equipmentUtils";

import { getTransfers } from "../Utils/transferUtils";

function useDepartmentData() {
  const [departments, setDepartments] = useState([
    { id: 1, name: "Emergency Department" },
  ]);

  const [equipment, setEquipment] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const savedDepartments = getDepartments();
    const savedEquipment = getEquipment();
    const savedFavorites = getFavorites();
    const savedTransfers = getTransfers();

    if (savedDepartments.length > 0) {
      setDepartments(savedDepartments);
    } else {
      const initialDepartments = [
        { id: 1, name: "Emergency Department" },
      ];

      setDepartments(initialDepartments);
      saveDepartments(initialDepartments);
    }

    const favoriteIds = savedFavorites.map((item) => item.id);

    setEquipment(savedEquipment);
    setFavorites(favoriteIds);
    setTransfers(savedTransfers);
  }, []);

  return {
    departments,
    setDepartments,
    equipment,
    setEquipment,
    favorites,
    setFavorites,
    transfers,
    setTransfers,
  };
}

export default useDepartmentData;