import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import ConfirmationModal from "../components/ConfirmationModal/ConfirmationModal";
import UseInventoryForm from "../components/UseInventoryForm/UseInventoryForm";

import { getDepartments } from "../Utils/departmentUtils";
import { getEquipment, saveEquipment } from "../Utils/equipmentUtils";

import "./Inventory.css";

function Inventory() {
  const [inventoryItems, setInventoryItems] = useState(() => {
    const savedItems = localStorage.getItem("inventoryItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [departments] = useState(() => getDepartments());
  const [equipment] = useState(() => getEquipment());

  const [search, setSearch] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [selectedUseItem, setSelectedUseItem] = useState(null);

  const navigate = useNavigate();

  const filteredItems = inventoryItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalItems = inventoryItems.length;

  const lowStock = inventoryItems.filter(
    (item) => item.condition === "New" && item.stock === "Low Stock"
  ).length;

  const outOfStock = inventoryItems.filter(
    (item) => item.condition === "New" && item.stock === "Out of Stock"
  ).length;

  const handleDeleteItem = (itemIndex) => {
    setSelectedItemIndex(itemIndex);
    setShowConfirmation(true);
  };

  const confirmDeleteItem = () => {
    const updatedItems = inventoryItems.filter(
      (item, index) => index !== selectedItemIndex
    );

    setInventoryItems(updatedItems);
    localStorage.setItem("inventoryItems", JSON.stringify(updatedItems));

    setShowConfirmation(false);
    setSelectedItemIndex(null);
  };

  const cancelDeleteItem = () => {
    setShowConfirmation(false);
    setSelectedItemIndex(null);
  };

  const handleUseItem = (item, itemIndex) => {
    setSelectedUseItem({ item: item, index: itemIndex });
  };

  const handleConfirmUse = (usageData) => {
    const itemIndex = selectedUseItem.index;
    const selectedItem = inventoryItems[itemIndex];
    const usedQuantity = Number(usageData.quantity);

    if (
      usedQuantity <= 0 ||
      usedQuantity > selectedItem.quantity
    ) {
      return;
    }

    const remainingQuantity = selectedItem.quantity - usedQuantity;

    let updatedStock = selectedItem.stock;

    if (selectedItem.condition === "New") {
      if (remainingQuantity === 0) {
        updatedStock = "Out of Stock";
      } else if (remainingQuantity <= 2) {
        updatedStock = "Low Stock";
      } else {
        updatedStock = "In Stock";
      }
    }

    const savedEquipment = getEquipment();

    const selectedEquipment = savedEquipment.find(
      (item) => String(item.id) === String(usageData.equipmentId)
    );

    if (!selectedEquipment) {
      return;
    }

    const updatedItems = inventoryItems.map((item, index) => {
      if (index === itemIndex) {
        return {
          ...item,
          quantity: remainingQuantity,
          stock: updatedStock,
        };
      }

      return item;
    });

    const updatedEquipment = savedEquipment.map((item) => {
      if (String(item.id) === String(usageData.equipmentId)) {
        const usageRecord = {
          itemName: selectedItem.name,
          condition: selectedItem.condition,
          quality: selectedItem.quality,
          quantity: usedQuantity,
          usageDate: usageData.usageDate,
          reason: usageData.reason,
          departmentName: usageData.departmentName,
          equipmentName: item.equipmentName,
          equipmentCode: item.equipmentCode,
        };

        const usageHistory = item.usageHistory
          ? item.usageHistory.concat(usageRecord)
          : [usageRecord];

        return { ...item, usageHistory: usageHistory };
      }

      return item;
    });

    setInventoryItems(updatedItems);
    localStorage.setItem("inventoryItems", JSON.stringify(updatedItems));
    saveEquipment(updatedEquipment);
    setSelectedUseItem(null);
  };

  return (
    <div className="inventory-page">
      <div className="inventory-container">

        <button
          className="inventory-back-button"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

        <div className="inventory-title">
          <h1>Inventory</h1>
          <p>Biomedical Engineering Department</p>
        </div>

        <div className="inventory-summary">

          <div className="inventory-card total-card">
            <h2>{totalItems}</h2>
            <p>Total Items</p>
          </div>

          <div className="inventory-card low-card">
            <h2>{lowStock}</h2>
            <p>Low Stock</p>
          </div>

          <div className="inventory-card out-card">
            <h2>{outOfStock}</h2>
            <p>Out of Stock</p>
          </div>

        </div>

        <div className="inventory-add-container">
          <button
            className="inventory-add-button"
            onClick={() => navigate("/add-item")}
          >
            + Add Item
          </button>
        </div>

        <div className="inventory-section">

          <div className="inventory-section-header">
            <h2>Inventory Items</h2>
          </div>

          <div className="inventory-search">
            <input
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="inventory-table-container">
            <table className="inventory-table">

              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Condition</th>
                  <th>Quality</th>
                  <th>Quantity</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => {
                    const itemIndex = inventoryItems.indexOf(item);

                    return (
                      <tr key={itemIndex}>
                        <td>{item.name}</td>
                        <td>{item.condition}</td>
                        <td>{item.quality}</td>
                        <td>{item.quantity}</td>
                        <td>{item.stock}</td>

                        <td>
                          <div className="inventory-action-buttons">

                            <button
                              className="inventory-use-button"
                              onClick={() =>
                                handleUseItem(item, itemIndex)
                              }
                              disabled={item.quantity <= 0}
                            >
                              Use
                            </button>

                            <button
                              className="inventory-edit-button"
                              onClick={() =>
                                navigate("/add-item", {
                                  state: {
                                    item: item,
                                    editIndex: itemIndex,
                                  },
                                })
                              }
                            >
                              Edit
                            </button>

                            <button
                              className="inventory-delete-button"
                              onClick={() =>
                                handleDeleteItem(itemIndex)
                              }
                            >
                              Delete
                            </button>

                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="inventory-empty">
                      {search
                        ? "No items found"
                        : "No inventory items added yet"}
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

        </div>

      </div>

      <Footer />

      {showConfirmation && (
        <ConfirmationModal
          message="Are you sure you want to delete this inventory item?"
          onConfirm={confirmDeleteItem}
          onCancel={cancelDeleteItem}
        />
      )}

      {selectedUseItem !== null && (
        <UseInventoryForm
          item={selectedUseItem.item}
          departments={departments}
          equipment={equipment}
          onCancel={() => setSelectedUseItem(null)}
          onConfirm={handleConfirmUse}
        />
      )}

    </div>
  );
}

export default Inventory;