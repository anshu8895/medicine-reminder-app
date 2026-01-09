# 🩺 Medication Reminder & Adherence Tracker

A modern health-tech web application to help users schedule medication reminders, receive timely alerts, and track medication adherence in a clinically meaningful way.

---

## ✨ Features

### Medication Scheduling
- Add, edit, and delete medication reminders
- Time-based scheduling (HH:MM)

### Smart Alarm Notifications & Snooze
- Plays an alarm sound at scheduled times
- Customizable snooze time (increase/decrease in 5-minute intervals)
- Prevents repeated alerts within the same minute
- Browser-safe audio initialization

### Mark as Taken Workflow
- Users can mark medications as taken
- Completed medications automatically move to history
- Completed entries are read-only (cannot be edited)

### Today vs History Views
- **Today:** Pending medications for the current date
- **History:** Completed medications with date & time context

### Medication Adherence Tracking
- Today’s Adherence (%)
- Overall Adherence (%)
- Metrics are derived dynamically (no redundant state)

### Data Persistence
- Reminders are stored in localStorage
- Data persists across browser sessions

---

## 🧠 Engineering Highlights

- Built using React functional components
- Custom hooks for business logic separation:
  - `useReminders` – reminder state & operations
  - `useAlarmSound` – audio and alarm side-effects
- Strict immutability and predictable state updates
- Derived state used instead of duplicating data
- Clear separation of:
  - Data
  - Side effects
  - Presentation logic

---

## 🛠 Tech Stack

- **Frontend:** React (Hooks)
- **Routing:** React Router
- **State Management:** React `useState`, derived state
- **Side Effects:** `useEffect`, `useRef`
- **Persistence:** Browser localStorage
- **Styling:** CSS / inline styles
- **Date Handling:** ISO dates with locale-aware formatting (en-IN)

---

## ⚠️ Disclaimer

This project is intended for demonstration and educational purposes only. It does not provide medical advice. Medication details are user-entered to avoid unsafe default dosing assumptions.

---

## 🚀 Getting Started

```bash
npm install
npm start
```

---

## 📸 Screenshots
<img width="1280" height="717" alt="Screenshot 2026-01-09 at 9 14 12 AM" src="https://github.com/user-attachments/assets/6afca12e-30ac-45a0-bd9d-e69c9d3cae9d" />
<img width="714" height="717" alt="Screenshot 2026-01-09 at 9 16 40 AM" src="https://github.com/user-attachments/assets/7cc7189b-3909-43d0-81aa-cfe8fa8a4f91" />
<img width="714" height="717" alt="Screenshot 2026-01-09 at 9 15 00 AM" src="https://github.com/user-attachments/assets/c95a314d-88ab-4e9c-8337-dcabac31c586" />

Screenshots of:
- Today vs History view
- Adherence percentage UI
- Alarm popup

---

## 📌 Why This Project?

Medication adherence is a critical healthcare problem. This project demonstrates how clinical concepts can be translated into robust frontend logic, making it relevant for health-tech product teams.

---

## 🔗 Links

- **Live Demo:** [medicine-reminder-app-eta.vercel.app/reminders](https://medicine-reminder-app-eta.vercel.app/reminders)
- **GitHub Repo:** [github.com/anshu8895/medicine-reminder-app](https://github.com/anshu8895/medicine-reminder-app)

---

## 🤝 Feedback

Feedback and suggestions are welcome. Open to health-tech roles.
