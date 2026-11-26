import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer/Footer";

import { getTransfers } from "../Utils/transferUtils";

import "./Transfer.css";

function Transfer() {
  const navigate = useNavigate();

  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const savedTransfers = getTransfers();
    setTransfers(savedTransfers);
  }, []);

  return (
    <div className="transfer-page">
      <main className="transfer-content">
        <button
          className="transfer-back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <h2>Equipment Transfer Records</h2>

        {transfers.length === 0 ? (
          <p className="no-transfers-message">
            No transfer records yet.
          </p>
        ) : (
          <div className="transfer-records">
            {transfers.map((transfer, index) => (
              <div className="transfer-record-card" key={index}>
                <h3>{transfer.equipmentName}</h3>

                <div className="transfer-record-code">
                  <span>Equipment Code</span>
                  <strong>{transfer.equipmentCode}</strong>
                </div>

                <div className="transfer-departments">
                  <div className="transfer-department-box">
                    <span>FROM</span>
                    <strong>{transfer.fromDepartmentName}</strong>
                  </div>

                  <div className="transfer-department-box transfer-to">
                    <span>TO</span>
                    <strong>{transfer.toDepartmentName}</strong>
                  </div>
                </div>

                <div className="transfer-record-details">
                  <div>
                    <span>Transfer Date</span>
                    <strong>{transfer.transferDate}</strong>
                  </div>

                  <div>
                    <span>Reason</span>
                    <strong>{transfer.reason}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Transfer;