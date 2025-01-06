import React from 'react';
import { TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateTabProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

const DateTab: React.FC<DateTabProps> = ({ selectedDate, setSelectedDate }) => {
  return (
    <div>
      <label className="flex justify-center text-xl mb-4 p-2">Pick date and time you want the service rendered</label>
      <div className='flex justify-center'>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date | null) => {
            if (date) setSelectedDate(date);
          }}
          showTimeSelect
          dateFormat="Pp"
          customInput={<TextField label="Select Date and Time" />}
        />
      </div>
    </div>
  );
};

export default DateTab;