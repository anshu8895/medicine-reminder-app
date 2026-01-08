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
  const [snoozeMinutes, setSnoozeMinutes] = useState(5); // Default to 5 mins
  const [snoozedUntil, setSnoozedUntil] = useState(null);

  // useRef tracks the last dismissed time to prevent the alarm 
  // from re-triggering within the same minute.
  const lastDismissedTime = useRef(null);
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (!alarmEnabled) return;

    const checkReminders = () => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // "HH:MM"

      // 1. Safety Guard: Don't trigger if we just dismissed this exact minute
      if (lastDismissedTime.current === currentTime) return;

      // 2. Check original reminders
      const originalDue = reminders.find(r => r.medicineTime === currentTime);

      // 3. Check if the current time matches our Snooze target
      const isSnoozeDue = snoozedUntil === currentTime;

      // 4. Trigger if either is true, provided an alarm isn't already showing
      if ((originalDue || isSnoozeDue) && !dueReminder) {

        // If it's a snooze, we might not have the 'originalDue' object handy, 
        // so we find it or use a fallback name.
        const reminderToDisplay = originalDue || reminders.find(r => 
          r.medicineTime === reminders.find(rem => 
            rem.medicineName === dueReminder?.medicineName)?.medicineTime) || { medicineName: "Snoozed Medicine" };

        setDueReminder(reminderToDisplay);
        setSnoozedUntil(null);
        play();
      }
    };

    const interval = setInterval(checkReminders, 1000);
    return () => clearInterval(interval);
  }, [reminders, alarmEnabled, dueReminder, snoozedUntil, play]);


  // const handleEnableAlarm = () => {
  //   initiateSound();
  //   setAlarmEnabled(true);
  //   setStatusMessage("Alarm system activated!");
  //   setTimeout(() => setStatusMessage(""), 3000);
  // };

  const handleEnableAlarm = () => {
    initiateSound().then(() => {
      setAlarmEnabled(true);
      setStatusMessage("Alarm system activated!");
      setTimeout(() => setStatusMessage(""), 3000);
    });
  };

  // Increase snooze time
  const increaseSnooze = () => setSnoozeMinutes(prev => prev + 5);

  // Decrease snooze time (don't go below 0)
  const decreaseSnooze = () => setSnoozeMinutes(prev => (prev > 0 ? prev - 5 : 0));

  const handleSnooze = () => {
    if (!dueReminder || snoozeMinutes === 0) return;

    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);

    // Prevent the original minute from re-triggering immediately
    lastDismissedTime.current = currentTime;

    now.setMinutes(now.getMinutes() + snoozeMinutes);
    const snoozeTimeString = now.toTimeString().slice(0, 5); // e.g. "14:20"

    stop();
    setSnoozedUntil(snoozeTimeString);
    setDueReminder(null);
    setSnoozeMinutes(5);
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
      <MedicationList
        reminders={historyReminders}
        onDelete={deleteReminder}
      />

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
        <div className="popupOverlayStyle">
          <div className="popupInnerStyle">
            <h2 style={{ fontSize: "2rem" }}>⏰</h2>
            <h3>Time to take your medicine!</h3>
            <p style={{ fontSize: "1.2rem" }}><b>{dueReminder.medicineName}</b></p>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "15px",
              margin: "20px 0"
            }}>
              {/* Minus Button */}
              <button
                onClick={decreaseSnooze}
                className="circleButtonStyle"
                disabled={snoozeMinutes <= 0}
              > - </button>

              {/* Dynamic Snooze Button */}
              <button onClick={handleSnooze} className="snoozeButtonStyle">
                Snooze for {snoozeMinutes} mins
              </button>

              {/* Plus Button */}
              <button onClick={increaseSnooze} className="circleButtonStyle"> + </button>
            </div>
              <button onClick={handlePopupOk} className="okButtonStyle">
                I've taken it
              </button>

          </div>
        </div>
      )}
    </div>
  );
}