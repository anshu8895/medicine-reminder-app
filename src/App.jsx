import { Routes, Route, NavLink } from "react-router-dom";
import MedicationReminderPage from "./pages/MedicationReminderPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import "./App.css";


export default function App() {
  return (
    <div className="app-container">

      <nav className="nav">
        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>
        <NavLink to="/reminders" className="nav-link">
          Medication Reminders
        </NavLink>
        <NavLink to="/about" className="nav-link">
          About
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/reminders" element={<MedicationReminderPage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
      </Routes>
    </div>
  );
}
