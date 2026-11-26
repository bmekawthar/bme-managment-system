import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer/Footer";
import NewFaultForm from "../components/NewFaultForm/NewFaultForm";
import CMFormList from "../components/CMFormList/CMFormList";

import { getEquipment } from "../Utils/equipmentUtils";
import { getDepartments } from "../Utils/departmentUtils";

import {
  getCMFaults,
  addCMFault,
  updateCMFault
} from "../Utils/cmUtils";

import "./CM.css";

function CM() {
  const navigate = useNavigate();

  const [faults, setFaults] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [showFaultForm, setShowFaultForm] = useState(false);

  useEffect(() => {
    setFaults(getCMFaults());
    setEquipment(getEquipment());
    setDepartments(getDepartments());
  }, []);

  const openFaults = faults.filter(
    (fault) => fault.status === "Open"
  ).length;

  const inProgressFaults = faults.filter(
    (fault) => fault.status === "In Progress"
  ).length;

  const completedFaults = faults.filter(
    (fault) => fault.status === "Completed"
  ).length;

  const activeFaults = faults.filter(
    (fault) =>
      fault.status === "Open" ||
      fault.status === "In Progress"
  );

  function handleAddFault(newFault) {
    const updatedFaults = addCMFault(faults, newFault);

    setFaults(updatedFaults);
  }

  function handleStartRepair(fault) {
    const updatedFaults = updateCMFault(
      faults,
      fault.id,
      {
        status: "In Progress",
        report: fault.report
      }
    );

    setFaults(updatedFaults);
  }

  function handleOpenReport(fault) {
    navigate(`/cm-report/${fault.id}`);
  }

  return (
    <div className="cm-page">
      <main className="cm-content">
        <button
          type="button"
          className="cm-back-button"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

        <div className="cm-page-header">
          <h1>Corrective Maintenance</h1>
          <p>Medical Equipment Faults and Repair Management</p>
        </div>

        <div className="cm-summary">
          <div className="cm-summary-card">
            <h3>Open Faults</h3>
            <p>{openFaults}</p>
          </div>

          <div className="cm-summary-card">
            <h3>In Progress</h3>
            <p>{inProgressFaults}</p>
          </div>

          <div className="cm-summary-card">
            <h3>Completed</h3>
            <p>{completedFaults}</p>
          </div>
        </div>

        <div className="cm-main-actions">
          <button
            type="button"
            className="cm-primary-button cm-action-button"
            onClick={() => setShowFaultForm(!showFaultForm)}
          >
            <span className="cm-action-icon">+</span>

            <span className="cm-action-text">
              <strong>New Fault</strong>
              <small>Register a new equipment fault</small>
            </span>
          </button>

          <button
            type="button"
            className="cm-secondary-button cm-action-button"
            onClick={() => navigate("/cm-history")}
          >
            <span className="cm-action-icon">▤</span>

            <span className="cm-action-text">
              <strong>CM History</strong>
              <small>View completed repair reports</small>
            </span>
          </button>
        </div>

        {showFaultForm && (
          <NewFaultForm
            equipment={equipment}
            departments={departments}
            onAddFault={handleAddFault}
            onCancel={() => setShowFaultForm(false)}
          />
        )}

        <CMFormList
          activeFaults={activeFaults}
          onStartRepair={handleStartRepair}
          onOpenReport={handleOpenReport}
        />
      </main>

      <Footer />
    </div>
  );
}

export default CM;