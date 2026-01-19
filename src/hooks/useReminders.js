import { useEffect, useState } from "react";

export default function useReminders() {
    const today = new Date().toISOString().slice(0, 10);

    // 1. Load saved Reminders
    const [reminders, setReminders] = useState(() => {
        const saved = localStorage.getItem('med_reminders');
        return saved ? JSON.parse(saved) : [];
    });

    // 2. Load saved Snoozed Item Objects (Contains {id, time})
    const [snoozedItemIds, setSnoozedItemIds] = useState(() => {
        const saved = localStorage.getItem('snoozed_item_ids');
        return saved ? JSON.parse(saved) : [];
    });

    // Sync Reminders to LocalStorage
    useEffect(() => {
        localStorage.setItem('med_reminders', JSON.stringify(reminders));
    }, [reminders]);

    // Sync Snoozed Items to LocalStorage
    useEffect(() => {
        localStorage.setItem('snoozed_item_ids', JSON.stringify(snoozedItemIds));
    }, [snoozedItemIds]);

    function addReminder(reminder) {
        setReminders(prev => [
            ...prev,
            { id: Date.now(), taken: false, date: today, ...reminder }
        ]);
    }

    function markAsTaken(id) {
        setReminders(prev =>
            prev.map(r => (r.id === id ? { ...r, taken: true } : r))
        );
        clearSnooze(id);
    }

    function editReminder(id, update) {
        setReminders(prev =>
            prev.map(r => (r.id === id ? { ...r, ...update } : r))
        );
        clearSnooze(id);
    }

    function deleteReminder(id) {
        setReminders(prev => prev.filter(r => r.id !== id));
        clearSnooze(id);
    }

    function snoozeReminder(id, minutes) {
        const now = new Date();
        now.setMinutes(now.getMinutes() + minutes);
        const snoozeTime = now.toTimeString().slice(0, 5);

        setSnoozedItemIds(prev => {
            const otherSnoozes = Array.isArray(prev) ? prev.filter(item => item.id !== id) : [];
            const reminder = reminders.find(r => r.id === id);
            return [...otherSnoozes, { id, time: snoozeTime, medicineName:reminder.medicineName }];
        });
    }

    function clearSnooze(id) {
        setSnoozedItemIds(prev =>
            Array.isArray(prev) ? prev.filter(item => item.id !== id) : []
        );
    }

    return {
        reminders,
        snoozedItemIds,
        addReminder,
        markAsTaken,
        editReminder,
        deleteReminder,
        snoozeReminder,
        clearSnooze 
    };
}