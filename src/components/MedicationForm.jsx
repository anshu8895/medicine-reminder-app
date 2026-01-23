import { useState } from "react";


export default function MedicationForm({ AddToList }) {
    const [medicineName, setMedicineName] = useState('');
    const [medicineTime, setMedicineTime] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!medicineName.trim() || !medicineTime) {
            alert('Please enter a valid medicine name and time!')
            return;
        }

        AddToList({ medicineName, medicineTime });
        setMedicineName('');
        setMedicineTime('');
    }


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter medicine name"
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
            />
            <input
                type="time"
                value={medicineTime}
                onChange={(e) => setMedicineTime(e.target.value)}
            />
            <button type="submit">Add Reminder</button>
        </form>
    );
}