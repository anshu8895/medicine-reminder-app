import { Reminder, SnoozedItem } from './models';

/**
 * Props for MedicationForm component
 */
export interface MedicationFormProps {
    /** Callback to add a new reminder */
    AddToList: (reminder: Omit<Reminder, 'id' | 'taken' | 'date'>) => void;
}

/**
 * Props for MedicationList component
 */
export interface MedicationListProps {
    /** Array of reminders to display */
    reminders: Reminder[];
    /** Callback to delete a reminder */
    onDelete: (id: number) => void;
    /** Optional callback to edit a reminder */
    onEdit?: ((id: number, update: Partial<Omit<Reminder, 'id'>>) => void) | undefined;
    /** Optional callback to mark reminder as taken */
    markAsTaken?: ((id: number) => void) | undefined;
    /** Optional array of snoozed items */
    snoozedItemIds?: SnoozedItem[] | undefined;
}

/**
 * Props for ReminderItem component (internal to MedicationList)
 */
export interface ReminderItemProps {
    /** The reminder to display */
    reminder: Reminder;
    /** Callback to delete the reminder */
    onDelete: (id: number) => void;
    /** Optional callback to edit the reminder */
    onEdit?: ((id: number, update: Partial<Omit<Reminder, 'id'>>) => void) | undefined;
    /** Optional callback to mark as taken */
    markAsTaken?: ((id: number) => void) | undefined;
    /** Whether this reminder is currently snoozed */
    isSnoozed?: boolean | undefined;
}
