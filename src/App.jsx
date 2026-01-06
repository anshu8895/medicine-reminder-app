import { Routes, Route, Link } from "react-router-dom";
import MedicationReminderPage from "./pages/MedicationReminderPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import "./App.css";


export default function App() {
  return (
    <div className="app-container">

      <nav style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "20px" }}>
        <Link to="/">Home</Link>
        <Link to="/reminders">Medication Reminders</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/reminders" element={<MedicationReminderPage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
      </Routes>
    </div>
  );
}
