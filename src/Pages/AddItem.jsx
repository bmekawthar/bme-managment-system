import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../Hooks/useForm";
import Footer from "../components/Footer/Footer";
import "./AddItem.css";

function AddItem() {
  const navigate = useNavigate();

  const [qualities, setQualities] = useState([
    { quality: "", quantity: "" }
  ]);

  const handleSave = async (values) => {
    const savedItems = localStorage.getItem("inventoryItems");
    const inventoryItems = savedItems
      ? JSON.parse(savedItems)
      : [];

    const newItems = qualities.map((item) => {
      let stock = "—";

      if (values.condition === "New") {
        if (Number(item.quantity) === 0) {
          stock = "Out of Stock";
        } else if (Number(item.quantity) <= 2) {
          stock = "Low Stock";
        } else {
          stock = "In Stock";
        }
      }

      return {
        name: values.name.trim(),
        condition: values.condition,
        quality: item.quality.trim(),
        quantity: Number(item.quantity),
        stock: stock,
        notes: values.notes,
      };
    });

    const updatedItems = inventoryItems.concat(newItems);

    localStorage.setItem(
      "inventoryItems",
      JSON.stringify(updatedItems)
    );

    navigate("/inventory");
  };

  const {
    values,
    handleChange,
    handleSubmit,
  } = useForm(
    {
      name: "",
      condition: "New",
      notes: "",
    },
    handleSave
  );

  const handleQualityChange = (index, field, value) => {
    const updatedQualities = qualities.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          [field]: value,
        };
      }

      return item;
    });

    setQualities(updatedQualities);
  };

  const addQuality = () => {
    setQualities(
      qualities.concat({ quality: "", quantity: "" })
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const hasEmptyQuality = qualities.some(
      (item) =>
        item.quality.trim() === "" || item.quantity === ""
    );

    if (hasEmptyQuality) {
      return;
    }

    handleSubmit(e);
  };

  return (
    <div className="add-item-page">
      <div className="add-item-container">

        <div className="add-item-title">
          <h1>Add Inventory Item</h1>
          <p>Biomedical Engineering Department</p>
        </div>

        <form
          className="add-item-form"
          onSubmit={handleFormSubmit}
        >

          <div className="add-item-field">
            <label>Item Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Enter item name"
              required
            />
          </div>

          <div className="add-item-field">
            <label>Condition</label>
            <select
              name="condition"
              value={values.condition}
              onChange={handleChange}
            >
              <option value="New">New</option>
              <option value="Used">Used</option>
            </select>
          </div>

          <div className="add-item-qualities">
            <h3>Quality and Quantity</h3>

            {qualities.map((item, index) => (
              <div className="add-item-quality-row" key={index}>

                <div className="add-item-field">
                  <label>Quality {index + 1}</label>
                  <input
                    type="text"
                    value={item.quality}
                    onChange={(e) =>
                      handleQualityChange(
                        index,
                        "quality",
                        e.target.value
                      )
                    }
                    placeholder="Enter quality"
                    required
                  />
                </div>

                <div className="add-item-field">
                  <label>Quantity</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQualityChange(
                        index,
                        "quantity",
                        e.target.value
                      )
                    }
                    placeholder="Enter quantity"
                    required
                  />
                </div>

              </div>
            ))}

            <button
              type="button"
              className="add-quality-button"
              onClick={addQuality}
            >
              + Add Another Quality
            </button>
          </div>

          <div className="add-item-field">
            <label>Notes (Optional)</label>
            <textarea
              name="notes"
              value={values.notes}
              onChange={handleChange}
              placeholder="Enter additional notes"
              rows="4"
            />
          </div>

          <div className="add-item-actions">
            <button
              type="button"
              className="add-item-cancel"
              onClick={() => navigate("/inventory")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="add-item-save"
            >
              Save Item
            </button>
          </div>

        </form>
      </div>

      <Footer />
    </div>
  );
}

export default AddItem;