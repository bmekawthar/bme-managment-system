export const equipmentFields = [
  { name: "equipmentCode", label: "Equipment Code" },
  { name: "equipmentName", label: "Equipment Name" },
  { name: "category", label: "Category" },
  { name: "serialNumber", label: "Serial Number" },
  { name: "model", label: "Model" },
  { name: "manufacturer", label: "Manufacturer" },
  { name: "supplier", label: "Supplier" },
  { name: "dateReceived", label: "Date Received", type: "date" },
  { name: "location", label: "Location" },
  { name: "status", label: "Status" },
  { name: "accessories", label: "Accessories" },
  { name: "warrantyExpiryDate", label: "Warranty Expiry Date", type: "date" },
  { name: "equipmentCost", label: "Equipment Cost (USD)", type: "number" },
];

export const initialEquipment = {
  equipmentCode: "",
  equipmentName: "",
  category: "",
  serialNumber: "",
  model: "",
  manufacturer: "",
  supplier: "",
  dateReceived: "",
  location: "",
  status: "",
  accessories: "",
  warrantyExpiryDate: "",
  equipmentCost: "",
};

export const equipmentOptions = {
  category: ["Medical", "Electrical", "Mechanical"],
  status: [
    "Available",
    "In Use",
    "Under Maintenance",
    "Out of Service",
  ],
};