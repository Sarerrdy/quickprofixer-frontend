import React from 'react';
import { TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * Props for the DateTab component.
 */
interface DateTabProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

/**
 * DateTab component allows users to pick a date and time for the service.
 * - Uses react-datepicker for date/time selection.
 * - Uses Material UI TextField for custom input.
 * - Uses Tailwind CSS for layout and spacing.
 */
const DateTab: React.FC<DateTabProps> = ({ selectedDate, setSelectedDate }) => {
  // Minimum date/time: 2 hours from now
  const minDate = new Date(Date.now() + 2 * 60 * 60 * 1000);

  /**
   * Returns the minimum selectable time for the given date.
   * If the date is today, restrict to minDate; otherwise, midnight.
   */
  const getMinTime = (date: Date) => {
    if (date.toDateString() === minDate.toDateString()) {
      return minDate;
    }
    return new Date(date.setHours(0, 0, 0, 0));
  };

  /**
   * Returns the maximum selectable time for the given date (end of day).
   */
  const getMaxTime = (date: Date) => {
    return new Date(date.setHours(23, 59, 59, 999));
  };

  // Use selectedDate or minDate for picker
  const pickerDate = selectedDate || minDate;

  return (
    <div>
      {/* Section label */}
      <label className="flex justify-center text-xl mb-4 p-2">
        Pick date and time you want the service rendered
      </label>
      {/* Centered date picker */}
      <div className="flex justify-center">
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => {
            if (date) setSelectedDate(date);
          }}
          showTimeSelect
          dateFormat="Pp"
          minDate={minDate}
          minTime={getMinTime(pickerDate)}
          maxTime={getMaxTime(pickerDate)}
          customInput={<TextField label="Select Date and Time" sx={{ minWidth: 260 }} />}
          // No inline style used; Material UI sx prop for input width
        />
      </div>
    </div>
  );
};

export default DateTab;