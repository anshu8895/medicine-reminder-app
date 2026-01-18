import { useEffect, useState } from "react";

export default function useReminders() {
    const today = new Date().toISOString().slice(0, 10);

    // load saved Reminders
    const [reminders, setReminders] = useState(() => {
        const saved = localStorage.getItem('med_reminders');
        return saved ? JSON.parse(saved) : [];
    });

    // save reminders into the local storage
    useEffect(() => {
        localStorage.setItem('med_reminders', JSON.stringify(reminders));
    }, [reminders]);

    // add reminder
    function addReminder(reminder) {
        setReminders(prev => [
            ...prev,
            { id: Date.now(), taken: false, date: today, ...reminder }
        ]);
    }

    // Mark as taken
    function markAsTaken(id) {
        setReminders(prev =>
            prev.map(r => (r.id === id ? { ...r, taken: true } : r))
        );
    }

    // edit reminder
    function editReminder(id, update) {
        setReminders(prev =>
            prev.map(r => (r.id === id ? { ...r, ...update } : r))
        );
    }

    // delete reminder
    function deleteReminder(id) {
        setReminders(prev => prev.filter(r => r.id !== id));
    }

    return {
        reminders,
        addReminder,
        markAsTaken,
        editReminder,
        deleteReminder
    };
}
