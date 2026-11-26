export const addDepartment = (departments, newDepartment) => {
  if (!newDepartment.trim()) {
    return departments;
  }

  const department = {
    id: Date.now(),
    name: newDepartment.trim(),
  };

  return [...departments, department];
};

export const saveDepartments = (departments) => {
  localStorage.setItem("departments", JSON.stringify(departments));
};

export const getDepartments = () => {
  const departments = localStorage.getItem("departments");
  console.log("get departments", departments);
  return departments ? JSON.parse(departments) : [];
};