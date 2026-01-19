import MedicationForm from "../components/MedicationForm";
import MedicationList from "../components/MedicationList";
import useReminders from "../hooks/useReminders";
import useAlarmSound from "../hooks/useAlarmSound";
import { useEffect, useState, useRef } from "react";

export default function MedicationReminderPage() {
  const { play, stop, initiateSound } = useAlarmSound();

  // Destructure the new snooze properties from the hook
  const {
    reminders,
    snoozedItemIds,
    clearSnooze,
    addReminder,
    markAsTaken,
    editReminder,
    deleteReminder,
    snoozeReminder
  } = useReminders();

  const [currReminder, setCurrReminder] = useState(null);
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [snoozeMinutes, setSnoozeMinutes] = useState(5);

  const lastDismissedTime = useRef(null);
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (!alarmEnabled) return;

    const checkReminders = () => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5);

      if (lastDismissedTime.current === currentTime) return;

      const originalDue = reminders.find(r =>
        r.medicineTime === currentTime &&
        !r.taken &&
        !snoozedItemIds.some(s => s.id === r.id)
      );

      const snoozedMatch = snoozedItemIds.find(s => s.time === currentTime);

      if ((originalDue || snoozedMatch) && !currReminder) {
        const targetId = originalDue ? originalDue.id : snoozedMatch.id;
        const reminderToDisplay = reminders.find(r => r.id === targetId);

        if (reminderToDisplay) {
          setCurrReminder(reminderToDisplay);
          clearSnooze(targetId);
          play();
        }
      }
    };

    const interval = setInterval(checkReminders, 1000);
    return () => clearInterval(interval);

  }, [reminders, alarmEnabled, currReminder, clearSnooze, snoozedItemIds, play]);

  const handleEnableAlarm = () => {
    initiateSound().then(() => {
      setAlarmEnabled(true);
      setStatusMessage("Alarm system activated!");
      setTimeout(() => setStatusMessage(""), 2000);
    });
  };

  const handleSnooze = () => {
    if (!currReminder || snoozeMinutes === 0) return;

    // Call the snooze logic from our custom hook
    snoozeReminder(currReminder.id, snoozeMinutes);

    lastDismissedTime.current = new Date().toTimeString().slice(0, 5);
    stop();
    setCurrReminder(null);
    setSnoozeMinutes(5);
  };

  const handlePopupOk = () => {
    if (!currReminder) return;
    lastDismissedTime.current = new Date().toTimeString().slice(0, 5);
    stop();
    setCurrReminder(null);
    markAsTaken(currReminder.id); 
  };

  // Adherence Calculations (same as before)
  const todayReminders = reminders.filter(r => r.date === today && !r.taken);
  const historyReminders = reminders.filter(r => r.date !== today || r.taken);

  // --- CALCULATIONS FOR OVERALL ADHERENCE ---
  const totalCount = reminders.length;
  const takenCount = reminders.filter(r => r.taken).length;
  const totalAdherence = totalCount === 0 ? 0 : Math.round((takenCount / totalCount) * 100);

  // --- CALCULATIONS FOR TODAY'S ADHERENCE ---
  const todaysTotal = reminders.filter(r => r.date === today).length;
  const todaysTaken = reminders.filter(r => r.date === today && r.taken).length;
  const todayAdherence = todaysTotal === 0 ? 0 : Math.round((todaysTaken / todaysTotal) * 100);
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Medication Reminders</h2>
      {statusMessage && <div style={{ color: "green", marginBottom: "10px" }}>{statusMessage}</div>}
      <MedicationForm AddToList={addReminder} />
      <p><strong>Today’s Adherence:</strong> {todayAdherence}%</p>

      <h3>Today</h3>
      <MedicationList
        reminders={todayReminders}
        onDelete={deleteReminder}
        onEdit={editReminder}
        markAsTaken={markAsTaken}
        snoozedItemIds={snoozedItemIds}
      />

      <h3>History</h3>
      <MedicationList
        reminders={historyReminders}
        onDelete={deleteReminder}
      />
      <p><strong>Overall Adherence:</strong> {totalAdherence}%</p>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleEnableAlarm} disabled={alarmEnabled}
          style={{ backgroundColor: alarmEnabled ? "#ccc" : "#4CAF50", color: "white", padding: "10px" }}>
          {alarmEnabled ? "Alarm Active" : "Enable Alarm Sound"}
        </button>
      </div>

      {currReminder && (
        <div className="popupOverlayStyle">
          <div className="popupInnerStyle">
            <h2 style={{ fontSize: "2rem" }}>⏰</h2>
            <h3>Time to take your medicine!</h3>
            <p><b>{currReminder.medicineName}</b></p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "15px", margin: "20px 0" }}>
              <button onClick={() => setSnoozeMinutes(m => m > 0 ? m - 5 : 0)} className="circleButtonStyle">-</button>
              <button onClick={handleSnooze} className="snoozeButtonStyle">Snooze for {snoozeMinutes} mins</button>
              <button onClick={() => setSnoozeMinutes(m => m + 5)} className="circleButtonStyle">+</button>
            </div>
            <button onClick={handlePopupOk} className="okButtonStyle">I've taken it</button>
          </div>
        </div>
      )}
    </div>
  );
}