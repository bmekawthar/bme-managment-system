import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

function Calendar({ date, handleSelectedDate }) {
  return (
    <DayPicker
      mode="single"
      selected={date}
      onSelect={handleSelectedDate}
    />
  );
}

export default Calendar;