/**
 * Data model for a medication reminder
 */
export interface Reminder {
    /** Unique identifier (timestamp-based) */
    id: number;
    /** Name of the medication */
    medicineName: string;
    /** Scheduled time in HH:MM format (24-hour) */
    medicineTime: string;
    /** Date in ISO format (YYYY-MM-DD) */
    date: string;
    /** Whether the medication has been taken */
    taken: boolean;
}

/**
 * Data model for a snoozed alarm
 */
export interface SnoozedItem {
    /** Reminder ID that was snoozed */
    id: number;
    /** Snoozed alarm time in HH:MM format (24-hour) */
    time: string;
    /** Medicine name (for reference) */
    medicineName: string;
}

/**
 * Type alias for time strings in HH:MM format
 */
export type TimeString = string;

/**
 * Type alias for date strings in YYYY-MM-DD format
 */
export type DateString = string;
