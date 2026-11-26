import Calendar from "../Calendar/Calendar";
import PMList from "../PMList/PMList";

import { formatDate } from "../../Utils/pmDateUtils";

function PMCalendarSection({
  selectedDate,
  handleSelectedDate,
  selectedDateSchedules,
  getScheduleStatus,
  handleCompletePM,
  handleViewRecords,
  handleViewDetails,
  isScheduleCompleted,
  hasCurrentRecord
}) {
  return (
    <section className="pm-calendar-section">
      <h3>Maintenance Calendar</h3>

      <Calendar
        date={selectedDate}
        handleSelectedDate={handleSelectedDate}
      />

      <div className="pm-selected-date-section">
        <h4>Maintenance on {formatDate(selectedDate)}</h4>

        <PMList
          schedules={selectedDateSchedules}
          getScheduleStatus={getScheduleStatus}
          handleCompletePM={handleCompletePM}
          handleViewRecords={handleViewRecords}
          handleViewDetails={handleViewDetails}
          isScheduleCompleted={isScheduleCompleted}
          hasCurrentRecord={hasCurrentRecord}
        />
      </div>
    </section>
  );
}

export default PMCalendarSection;