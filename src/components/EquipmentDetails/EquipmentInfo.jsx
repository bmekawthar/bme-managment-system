import { equipmentFields } from "../../Utils/equipmentFields";
import "./EquipmentInfo.css";

function EquipmentInfo({ equipment }) {
  if (!equipment) {
    return <p>Equipment information is not available.</p>;
  }

  const fieldGroups = [
    {
      title: "Equipment Identification",
      description: "Basic identification and classification",
      fields: ["equipmentName", "equipmentCode", "category"],
      department: true,
    },
    {
      title: "Technical Information",
      description: "Technical specifications and accessories",
      fields: ["serialNumber", "model", "accessories"],
    },
    {
      title: "Manufacturer & Supplier",
      description: "Equipment manufacturer and supplier details",
      fields: ["manufacturer", "supplier"],
    },
    {
      title: "Location & Status",
      description: "Current equipment location and availability",
      fields: ["location", "status", "dateReceived"],
    },
    {
      title: "Financial & Warranty Information",
      description: "Purchase cost and warranty details",
      fields: ["equipmentCost", "warrantyExpiryDate"],
    },
  ];

  const displayedFields = [];

  fieldGroups.forEach((group) => {
    group.fields.forEach((name) => {
      displayedFields.push(name);
    });
  });

  const additionalFields = equipmentFields.filter(
    (field) => !displayedFields.includes(field.name)
  );

  function renderField(field) {
    const value = equipment[field.name];

    const hasValue =
      value !== undefined &&
      value !== null &&
      value !== "";

    let displayValue = hasValue ? value : "Not provided";

    if (field.name === "equipmentCost" && hasValue) {
      displayValue = `$${value}`;
    }

    return (
      <div className="equipment-info-item" key={field.name}>
        <span>{field.label}</span>
        <p>{displayValue}</p>
      </div>
    );
  }

  return (
    <div className="equipment-info-sections">

      {fieldGroups.map((group) => (
        <section
          className="equipment-info-section"
          key={group.title}
        >
          <div className="equipment-info-section-heading">
            <h3>{group.title}</h3>
            <p>{group.description}</p>
          </div>

          <div className="equipment-info-grid">

            {group.department && (
              <div className="equipment-info-item">
                <span>Department</span>
                <p>
                  {equipment.departmentName || "Not provided"}
                </p>
              </div>
            )}

            {group.fields.map((fieldName) => {
              const field = equipmentFields.find(
                (item) => item.name === fieldName
              );

              return field ? renderField(field) : null;
            })}

          </div>
        </section>
      ))}

      {additionalFields.length > 0 && (
        <section className="equipment-info-section">
          <div className="equipment-info-section-heading">
            <h3>Additional Information</h3>
            <p>Other equipment information</p>
          </div>

          <div className="equipment-info-grid">
            {additionalFields.map((field) =>
              renderField(field)
            )}
          </div>
        </section>
      )}

    </div>
  );
}

export default EquipmentInfo;