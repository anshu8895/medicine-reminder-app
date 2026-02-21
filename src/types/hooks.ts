import { Reminder, SnoozedItem } from './models';

/**
 * Return type for the useReminders custom hook
 */
export interface UseRemindersReturn {
    /** All reminders (today and history) */
    reminders: Reminder[];
    /** Currently snoozed items */
    snoozedItemIds: SnoozedItem[];
    /** Today's adherence percentage (0-100) */
    todayAdherence: number;
    /** Overall adherence percentage (0-100) */
    totalAdherence: number;
    /** Add a new reminder for today */
    addReminder: (reminder: Omit<Reminder, 'id' | 'taken' | 'date'>) => void;
    /** Mark a reminder as taken */
    markAsTaken: (id: number) => void;
    /** Edit an existing reminder (cannot change ID) */
    editReminder: (id: number, update: Partial<Omit<Reminder, 'id'>>) => void;
    /** Delete a reminder */
    deleteReminder: (id: number) => void;
    /** Snooze a reminder for specified minutes */
    snoozeReminder: (id: number, minutes: number) => void;
    /** Clear snooze for a specific reminder */
    clearSnooze: (id: number) => void;
}

/**
 * Return type for the useAlarmSound custom hook
 */
export interface UseAlarmSoundReturn {
    /** Initialize audio context (must be called from user interaction) */
    initiateSound: () => Promise<void>;
    /** Play the alarm sound */
    play: () => void;
    /** Stop the alarm sound */
    stop: () => void;
}
