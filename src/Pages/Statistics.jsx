import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import { getDepartments } from "../Utils/departmentUtils";
import { getEquipment } from "../Utils/equipmentUtils";

import "./Statistics.css";

export default function Statistics() {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setDepartments(getDepartments());
    setEquipment(getEquipment());
  }, []);

  const filteredEquipment =
    selectedCategory === "All"
      ? equipment
      : equipment.filter(
          (item) => item.category === selectedCategory
        );

  const workingEquipment = filteredEquipment.filter(
    (item) =>
      item.status === "Available" ||
      item.status === "In Use"
  );

  const outOfServiceEquipment = filteredEquipment.filter(
    (item) => item.status === "Out of Service"
  );

  return (
    <>
      <main className="statistics-page">
        <div className="statistics-container">

          <button
            className="statistics-back-button"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <h1>Statistics</h1>

          <p className="statistics-description">
            Overview of medical equipment across Akalil Hospital.
          </p>

          <div className="statistics-filter">
            <label htmlFor="category-filter">
              Equipment Category:
            </label>

            <select
              id="category-filter"
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(event.target.value)
              }
            >
              <option value="All">All</option>
              <option value="Medical">Medical</option>
              <option value="Electrical">Electrical</option>
              <option value="Mechanical">Mechanical</option>
            </select>
          </div>

          <div className="statistics-cards">
            <div className="statistics-card total-equipment-card">
              <h3>Total Equipment</h3>
              <p>{filteredEquipment.length}</p>
            </div>

            <div className="statistics-card working-equipment-card">
              <h3>Working Equipment</h3>
              <p>{workingEquipment.length}</p>
            </div>

            <div className="statistics-card out-of-service-card">
              <h3>Out of Service</h3>
              <p>{outOfServiceEquipment.length}</p>
            </div>
          </div>

          <section className="department-statistics">
            <h2>Department Statistics</h2>

            {departments.length === 0 ? (
              <p>No departments available.</p>
            ) : (
              <div className="statistics-table-container">
                <table className="statistics-table">
                  <thead>
                    <tr>
                      <th>Department</th>
                      <th>Total Equipment</th>
                      <th>Working</th>
                      <th>Out of Service</th>
                    </tr>
                  </thead>

                  <tbody>
                    {departments.map((department) => {
                      const departmentEquipment =
                        filteredEquipment.filter(
                          (item) =>
                            item.departmentId === department.id
                        );

                      const departmentWorking =
                        departmentEquipment.filter(
                          (item) =>
                            item.status === "Available" ||
                            item.status === "In Use"
                        );

                      const departmentOutOfService =
                        departmentEquipment.filter(
                          (item) =>
                            item.status === "Out of Service"
                        );

                      return (
                        <tr key={department.id}>
                          <td>{department.name}</td>
                          <td>{departmentEquipment.length}</td>
                          <td>{departmentWorking.length}</td>
                          <td>{departmentOutOfService.length}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>

        </div>
      </main>

      <Footer />
    </>
  );
}