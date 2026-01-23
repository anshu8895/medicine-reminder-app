import { useState } from "react";

export default function MedicationList({ reminders, onDelete, onEdit, markAsTaken, snoozedItemIds }) {
  if (reminders.length === 0) return <p>No reminders yet.</p>;

  return (
    <ul>
      {reminders.map(r => (
        <ReminderItem
          key={r.id}
          reminder={r}
          onDelete={onDelete}
          onEdit={onEdit}
          markAsTaken={markAsTaken}
          isSnoozed={snoozedItemIds?.some(s => s.id === r.id)}
        />
      ))}
    </ul>
  );
}

function ReminderItem({ reminder, onDelete, onEdit, markAsTaken, isSnoozed }) {
  const [isEditing, setIsEditing] = useState(false);
  const [medicineName, setMedicineName] = useState(reminder.medicineName);
  const [medicineTime, setMedicineTime] = useState(reminder.medicineTime);

  function saveEdit() {
    onEdit(reminder.id, { medicineName, medicineTime });
    setIsEditing(false);
  }
  
  function formatTime12h(time24) {
    const [hour, minute] = time24.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, "0")} ${ampm}`;
  }
  function formatDateShort(dateValue) {
    const d = new Date(dateValue);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  }

  if (reminder.taken) {
    return (
      <li>
        <div style={{ fontSize: "0.9rem", color: "#555" }}>
          <strong>{reminder.medicineName} </strong>
          {formatDateShort(reminder.date)} at {formatTime12h(reminder.medicineTime)}
        </div>
        <span style={{ color: "green", fontWeight: "bold", marginLeft: "10px" }}>
          Completed
        </span>
        <button onClick={() => onDelete(reminder.id)}>Delete</button>
      </li>
    );
  }

  return (
    <li>
      {isEditing ? (
        <>
          <input value={medicineName} onChange={e => setMedicineName(e.target.value)} />
          <input type="time" value={medicineTime} onChange={e => setMedicineTime(e.target.value)} />
          <div style={{ display: "flex", gap: "6px" }}>
            <button onClick={saveEdit} className="edit">Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div>
            <strong>{reminder.medicineName}</strong>
            {isSnoozed && <span style={{ marginLeft: "8px" }} title="Snooze Active">🔔</span>}
            <span> at {formatTime12h(reminder.medicineTime)}</span>
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            {markAsTaken && (
              <button className="takenBtn" onClick={() => markAsTaken(reminder.id)}>
                Mark as Taken
              </button>
            )}
            <button onClick={() => setIsEditing(true)} className="edit">Edit</button>
            <button onClick={() => onDelete(reminder.id)}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
}


