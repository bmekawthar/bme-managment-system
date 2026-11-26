import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Departments from "./Pages/Departments";
import Favorites from "./Pages/Favorites";
import PM from "./Pages/PM";
import PMSchedules from "./Pages/PMSchedules";
import PMHistory from "./Pages/PMHistory";
import PMDetails from "./Pages/PMDetails";
import CM from "./Pages/CM";
import CMReport from "./Pages/CMReport";
import CMHistory from "./Pages/CMHistory";
import Transfer from "./Pages/Transfer";
import Statistics from "./Pages/Statistics";
import Inventory from "./Pages/Inventory";
import EquipmentDetails from "./Pages/EquipmentDetails";
import AddItem from "./Pages/AddItem";

// Main application routes
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/favorites" element={<Favorites />} />

        {/* Preventive Maintenance */}
        <Route path="/pm" element={<PM />} />

        <Route
          path="/pm-schedules"
          element={<PMSchedules />}
        />

        <Route
          path="/pm-details/:equipmentId"
          element={<PMDetails />}
        />

        <Route
          path="/pm-history/:equipmentId"
          element={<PMHistory />}
        />

        {/* Corrective Maintenance */}
        <Route path="/cm" element={<CM />} />

        <Route
          path="/cm-report/:faultId"
          element={<CMReport />}
        />

        <Route
          path="/cm-history"
          element={<CMHistory />}
        />

        {/* Other Pages */}
        <Route
          path="/equipment-transfer"
          element={<Transfer />}
        />

        <Route
          path="/equipment-details"
          element={<EquipmentDetails />}
        />

        <Route path="/statistics" element={<Statistics />} />

        <Route path="/inventory" element={<Inventory />} />
        <Route path="/add-item" element={<AddItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;