import React from 'react';
import { TextField } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateTabProps {
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
}

const DateTab: React.FC<DateTabProps> = ({ selectedDate, setSelectedDate }) => {
  // Minimum date/time: 2 hours from now
  const minDate = new Date(Date.now() + 2 * 60 * 60 * 1000);

  // Helper to get min/max time for the selected day
  const getMinTime = (date: Date) => {
    const now = new Date();
    if (date.toDateString() === minDate.toDateString()) {
      return minDate;
    }
    return new Date(date.setHours(0, 0, 0, 0));
  };

  const getMaxTime = (date: Date) => {
    return new Date(date.setHours(23, 59, 59, 999));
  };

  const pickerDate = selectedDate || minDate;

  return (
    <div>
      <label className="flex justify-center text-xl mb-4 p-2">
        Pick date and time you want the service rendered
      </label>
      <div className='flex justify-center'>
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
          customInput={<TextField label="Select Date and Time" />}
        />
      </div>
    </div>
  );
};

export default DateTab;










// import React from 'react';
// import { TextField } from '@mui/material';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// interface DateTabProps {
//   selectedDate: Date | null;
//   setSelectedDate: (date: Date | null) => void;
// }

// const DateTab: React.FC<DateTabProps> = ({ selectedDate, setSelectedDate }) => {
//   return (
//     <div>
//       <label className="flex justify-center text-xl mb-4 p-2">Pick date and time you want the service rendered</label>
//       <div className='flex justify-center'>
//         <DatePicker
//           selected={selectedDate}
//           onChange={(date: Date | null) => {
//             if (date) setSelectedDate(date);
//           }}
//           showTimeSelect
//           dateFormat="Pp"
//           customInput={<TextField label="Select Date and Time" />}
//         />
//       </div>
//     </div>
//   );
// };

// export default DateTab;