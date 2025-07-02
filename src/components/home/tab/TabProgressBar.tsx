import React, { useRef, useEffect } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

interface TabProgressBarProps {
  value: number;
  labels: string[];
}

const TabProgressBar: React.FC<TabProgressBarProps> = ({ value, labels }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const progress = (value / (labels.length - 1)) * 100;

  // Refs for each step
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll active step into view on small screens
  useEffect(() => {
    if (isSmallScreen && stepRefs.current[value]) {
      stepRefs.current[value]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [value, isSmallScreen]);

  return (
    <div
      className={`relative h-12 my-2 mx-auto${isSmallScreen ? ' hide-scrollbar' : ''}`}
      style={{
        width: isSmallScreen ? '100%' : '75%',
        maxWidth: '100%',
        overflowX: isSmallScreen ? 'auto' : 'visible',
        WebkitOverflowScrolling: isSmallScreen ? 'touch' : undefined,
        scrollbarWidth: isSmallScreen ? 'none' : undefined, // Firefox
        msOverflowStyle: isSmallScreen ? 'none' : undefined, // IE 10+
        position: 'relative',
      }}
    >
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2" />
      <div
        className="absolute top-1/2 left-0 h-1 bg-blue-600 transform -translate-y-1/2"
        style={{ width: `${progress}%` }}
      />
      {labels.map((label, index) => {
        const left = (index / (labels.length - 1)) * 100;
        return (
          <div
            key={index}
            ref={el => (stepRefs.current[index] = el)}
            className="absolute top-1/2"
            style={{
              left: `${left}%`,
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              minWidth: 60,
            }}
          >
            <div
              className={`w-6 h-6 rounded-full ${
                index <= value ? 'bg-blue-600' : 'bg-gray-300'
              } flex items-center justify-center text-white`}
            >
              {index + 1}
            </div>
            <div className="mt-1 text-xs">{label}</div>
          </div>
        );
      })}
    </div>
  );
};

export default TabProgressBar;





// import React from 'react';

// interface TabProgressBarProps {
//   value: number;
//   labels: string[];
// }

// const TabProgressBar: React.FC<TabProgressBarProps> = ({ value, labels }) => {
//   const progress = (value / (labels.length - 1)) * 100;

//   return (
//     <div className="relative w-3/4 h-12 my-2 mx-auto">
//       <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2" />
//       <div className="absolute top-1/2 left-0 h-1 bg-blue-600 transform -translate-y-1/2" style={{ width: `${progress}%` }} />
//       {labels.map((label, index) => {
//         const left = (index / (labels.length - 1)) * 100;
//         return (
//           <div key={index} className="absolute top-1/2" style={{ left: `${left}%`, transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
//             <div className={`w-6 h-6 rounded-full ${index <= value ? 'bg-blue-600' : 'bg-gray-300'} flex items-center justify-center text-white`}>
//               {index + 1}
//             </div>
//             <div className="mt-1 text-xs">{label}</div>
//           </div>
//         );
//       })}
//     </div> 
//   );
// };

// export default TabProgressBar;