import { useState, FormEvent, ChangeEvent } from "react";
import type { MedicationFormProps } from "../types";

export default function MedicationForm({ AddToList }: MedicationFormProps) {
    const [medicineName, setMedicineName] = useState<string>('');
    const [medicineTime, setMedicineTime] = useState<string>('');

    function handleSubmit(e: FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        if (!medicineName.trim() || !medicineTime) {
            alert('Please enter a valid medicine name and time!');
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => setMedicineName(e.target.value)}
            />
            <input
                type="time"
                value={medicineTime}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setMedicineTime(e.target.value)}
            />
            <button type="submit">Add Reminder</button>
        </form>
    );
}
