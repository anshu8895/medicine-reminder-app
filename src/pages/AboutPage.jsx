export default function AboutPage() {
  return (
    <div className="page">
      <h2 className="page-title">About This App</h2>

      <div className="card">
        <p>
          This medication reminder app is designed to help individuals
          stay consistent with their treatment plans.
        </p>

        <p>
          Medication adherence is a critical factor in managing chronic
          conditions and improving long-term health outcomes.
        </p>

        <p>
          The app focuses on simplicity, clarity, and reliability, so
          reminders are easy to set and actions are easy to complete.
        </p>

        <p className="disclaimer">
          ⚠️ This app is a reminder tool and does not replace professional
          medical advice.
        </p>
      </div>
    </div>
  );
}
