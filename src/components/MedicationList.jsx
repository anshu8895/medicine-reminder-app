import { useState } from "react";

export default function MedicationList({ reminders, onDelete, onEdit, onMarkTaken }) {
  if (reminders.length === 0) return <p>No reminders yet.</p>;

  return (
    <ul>
      {reminders.map(r => (
        <ReminderItem
          key={r.id}
          reminder={r}
          onDelete={onDelete}
          onEdit={onEdit}
          onMarkTaken={onMarkTaken}
        />
      ))}
    </ul>
  );
}

function formatIndianDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-IN");
}

function ReminderItem({ reminder, onDelete, onEdit, onMarkTaken }) {
  const [isEditing, setIsEditing] = useState(false);
  const [medicineName, setMedicineName] = useState(reminder.medicineName);
  const [medicineTime, setMedicineTime] = useState(reminder.medicineTime);

  function saveEdit() {
    onEdit(reminder.id, { medicineName, medicineTime });
    setIsEditing(false);
  }

  if (reminder.taken) {
    return (
      <li>
        <strong>{reminder.medicineName}</strong>
        <div style={{ fontSize: "0.9rem", color: "#555" }}>
          {formatIndianDate(reminder.date)} at {reminder.medicineTime}
        </div>
        <span style={{ color: "green", fontWeight: "bold", marginLeft: "10px" }}>
          Completed
        </span>
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
          <strong>{reminder.medicineName}</strong> at {reminder.medicineTime}
          <div style={{ display: "flex", gap: "6px" }}>
            {onMarkTaken && (
              <button onClick={() => onMarkTaken(reminder.id)}>
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


