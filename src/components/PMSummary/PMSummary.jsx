function PMSummary({ upcomingCount, dueCount, overdueCount }) {
  return (
    <div className="pm-summary">
      <div className="pm-summary-card">
        <h3>Upcoming</h3>
        <p>{upcomingCount}</p>
      </div>

      <div className="pm-summary-card">
        <h3>Due</h3>
        <p>{dueCount}</p>
      </div>

      <div className="pm-summary-card">
        <h3>Overdue</h3>
        <p>{overdueCount}</p>
      </div>
    </div>
  );
}

export default PMSummary;