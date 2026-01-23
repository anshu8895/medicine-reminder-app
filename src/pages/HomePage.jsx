import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="page">
      <h2 className="page-title"> Welcome to your personal medication reminder app👋</h2>

      <p className="page-subtitle">
        Never miss a dose. Track your medicines, monitor adherence,
        and stay consistent for better health.
      </p>

      <div className="card">
        <h3>What you can do:</h3>
        <ul className="feature-list">
          <li>⏰ Set medication reminders</li>
          <li>✅ Mark medicines as taken</li>
          <li>📊 Track daily & overall adherence</li>
          <li>🔔 Get alarm notifications</li>
          <li>⏲️ Snooze your reminder</li>
        </ul>

        <Link to="/reminders" className="primary-btn">
          Go to Medication Reminders →
        </Link>
      </div>
    </div>
  );
}
