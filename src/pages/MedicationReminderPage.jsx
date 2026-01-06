import MedicationForm from "../components/MedicationForm";
import MedicationList from "../components/MedicationList";
import useReminders from "../hooks/useReminders";
import useAlarmSound from "../hooks/useAlarmSound";
import { useEffect, useState, useRef } from "react";

export default function MedicationReminderPage() {
  const { play, stop, initiateSound } = useAlarmSound();
  const { reminders, addReminder, markAsTaken, editReminder, deleteReminder } = useReminders();

  const [dueReminder, setDueReminder] = useState(null);
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // useRef tracks the last dismissed time to prevent the alarm 
  // from re-triggering within the same minute.
  const lastDismissedTime = useRef(null);
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (!alarmEnabled) return;

    const checkReminders = () => {
      const currentTime = new Date().toTimeString().slice(0, 5); // "HH:MM"

      // Only trigger if we haven't already dismissed an alarm for this minute
      if (lastDismissedTime.current === currentTime) return;

      const due = reminders.find(r => r.medicineTime === currentTime);

      if (due && !dueReminder) {
        setDueReminder(due);
        play();
      }
    };

    // Check every second for better accuracy
    const interval = setInterval(checkReminders, 1000);
    return () => clearInterval(interval);
  }, [reminders, play, alarmEnabled, dueReminder]);

  const handleEnableAlarm = () => {
    initiateSound();
    setAlarmEnabled(true);
    setStatusMessage("Alarm system activated!");
    setTimeout(() => setStatusMessage(""), 3000);
  };

  const handlePopupOk = () => {
    const now = new Date();
    // Record the minute this was dismissed
    lastDismissedTime.current = now.toTimeString().slice(0, 5);

    stop();
    setDueReminder(null);
    markAsTaken(dueReminder.id);
  };

  const todayReminders = reminders.filter(
    r => r.date === today && r.taken === false
  );

  const historyReminders = reminders.filter(
    r => r.date !== today || r.taken === true
  );

  const totalCount = reminders.length;
  const takenCount = reminders.filter(r => r.taken).length;
  const totalAdherence = totalCount === 0 ? 0 : Math.round((takenCount / totalCount) * 100);

  const todaysTotal = reminders.filter(r => r.date === today).length;
  const todaysTaken = reminders.filter(r => r.date === today && r.taken).length;
  const todayAdherence = todaysTotal === 0 ? 0 : Math.round((todaysTaken / todaysTotal) * 100);


  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Medication Reminders</h2>

      {statusMessage && (
        <div style={{ color: "green", marginBottom: "10px" }}>{statusMessage}</div>
      )}

      <MedicationForm AddToList={addReminder} />

      <p><strong>Today’s Adherence:</strong> {todayAdherence}%</p>

      <h3>Today</h3>
      <MedicationList
        reminders={todayReminders}
        onDelete={deleteReminder}
        onEdit={editReminder}
      />

      <h3>History</h3>
      <MedicationList reminders={historyReminders} />

      <p><strong>Overall Adherence:</strong> {totalAdherence}%</p>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button
          onClick={handleEnableAlarm}
          disabled={alarmEnabled}
          style={{ backgroundColor: alarmEnabled ? "#ccc" : "#4CAF50", color: "white", padding: "10px" }}
        >
          {alarmEnabled ? "Alarm Active" : "Enable Alarm Sound"}
        </button>
        {/* <button onClick={stop} style={{ padding: "10px" }}>Stop Alarm</button> */}
      </div>

      {/* Due Reminder Popup */}
      {dueReminder && (
        <div style={popupOverlayStyle}>
          <div style={popupInnerStyle}>
            <h2 style={{ fontSize: "2rem" }}>⏰</h2>
            <h3>Time to take your medicine!</h3>
            <p style={{ fontSize: "1.2rem" }}><b>{dueReminder.medicineName}</b></p>
            <button
              onClick={handlePopupOk}
              style={{ padding: "10px 40px", fontSize: "1rem", cursor: "pointer" }}
            >
              I've taken it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const popupOverlayStyle = {
  position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
  background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center",
  justifyContent: "center", zIndex: 1000
};

const popupInnerStyle = {
  background: "white", padding: 40, borderRadius: 12,
  minWidth: 320, textAlign: "center", boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
};