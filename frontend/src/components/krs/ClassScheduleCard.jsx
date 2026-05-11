export default function ClassScheduleCard({ schedules = [] }) {
  return (
    <div className="schedule-card">
      <h4>Class Schedule</h4>
      {schedules.length === 0 ? (
        <p>No schedule information.</p>
      ) : (
        <ul>
          {schedules.map((schedule, index) => (
            <li key={index}>
              Day {schedule.day_of_week} | {schedule.start_time} - {schedule.end_time} | {schedule.room}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
