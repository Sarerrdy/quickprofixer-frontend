import React, { useRef, useEffect } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

interface TabProgressBarProps {
  value: number;
  labels: string[];
}

const BALL_SIZE = 32; // px

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

  // Calculate left position for each ball so first and last are at the edges
  const getLeft = (index: number) => {
    if (labels.length === 1) return '50%';
    if (index === 0) return `0%`;
    if (index === labels.length - 1) return `100%`;
    return `${(index / (labels.length - 1)) * 100}%`;
  };

  return (
    <div
      className={`relative h-20 my-2 mx-auto${isSmallScreen ? ' hide-scrollbar' : ''}`}
      style={{
        width: isSmallScreen ? '100%' : '75%',
        maxWidth: '100%',
        overflowX: isSmallScreen ? 'auto' : 'visible',
        WebkitOverflowScrolling: isSmallScreen ? 'touch' : undefined,
        scrollbarWidth: isSmallScreen ? 'none' : undefined, // Firefox
        msOverflowStyle: isSmallScreen ? 'none' : undefined, // IE 10+
        position: 'relative',
        minHeight: 80,
      }}
    >
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
      {/* Progress background line */}
      <div
        style={{
          position: 'absolute',
          top: BALL_SIZE / 2,
          left: BALL_SIZE / 2,
          right: BALL_SIZE / 2,
          height: 4,
          background: '#d1d5db', // gray-300
          zIndex: 1,
        }}
      />
      {/* Progress active line */}
      <div
        style={{
          position: 'absolute',
          top: BALL_SIZE / 2,
          left: BALL_SIZE / 2,
          width: `calc(${progress}% * (100% - ${BALL_SIZE}px) / 100)`,
          height: 4,
          background: '#2563eb', // blue-600
          zIndex: 2,
          transition: 'width 0.3s',
        }}
      />
      {/* Balls only, no labels */}
      {labels.map((_, index) => {
        const left = getLeft(index);
        return (
          <div
            key={index}
            ref={el => (stepRefs.current[index] = el)}
            style={{
              position: 'absolute',
              top: 0,
              left,
              transform:
                index === 0
                  ? 'translateX(0%)'
                  : index === labels.length - 1
                  ? 'translateX(-100%)'
                  : 'translateX(-50%)',
              width: BALL_SIZE,
              zIndex: 3,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: BALL_SIZE,
                height: BALL_SIZE,
                borderRadius: '50%',
                background: index <= value ? '#2563eb' : '#d1d5db',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 600,
                fontSize: 16,
                margin: '0 auto',
                boxShadow: index === value ? '0 0 0 4px #2563eb33' : undefined,
                transition: 'background 0.3s, box-shadow 0.3s',
              }}
            >
              {index + 1}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TabProgressBar;












// import React, { useRef, useEffect } from 'react';
// import { useTheme, useMediaQuery } from '@mui/material';

// interface TabProgressBarProps {
//   value: number;
//   labels: string[];
// }

// const BALL_SIZE = 32; // px, increased for better touch and alignment
// const LABEL_MIN_WIDTH = 80; // px, to prevent overlap on small screens

// const TabProgressBar: React.FC<TabProgressBarProps> = ({ value, labels }) => {
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//   const progress = (value / (labels.length - 1)) * 100;

//   // Refs for each step
//   const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

//   // Scroll active step into view on small screens
//   useEffect(() => {
//     if (isSmallScreen && stepRefs.current[value]) {
//       stepRefs.current[value]?.scrollIntoView({
//         behavior: 'smooth',
//         inline: 'center',
//         block: 'nearest',
//       });
//     }
//   }, [value, isSmallScreen]);

//   // Calculate left position for each ball so first and last are at the edges
//   const getLeft = (index: number) => {
//     if (labels.length === 1) return '50%';
//     if (index === 0) return `0%`;
//     if (index === labels.length - 1) return `100%`;
//     return `${(index / (labels.length - 1)) * 100}%`;
//   };

//   return (
//     <div
//       className={`relative h-20 my-2 mx-auto${isSmallScreen ? ' hide-scrollbar' : ''}`}
//       style={{
//         width: isSmallScreen ? '100%' : '75%',
//         maxWidth: '100%',
//         overflowX: isSmallScreen ? 'auto' : 'visible',
//         WebkitOverflowScrolling: isSmallScreen ? 'touch' : undefined,
//         scrollbarWidth: isSmallScreen ? 'none' : undefined, // Firefox
//         msOverflowStyle: isSmallScreen ? 'none' : undefined, // IE 10+
//         position: 'relative',
//         minHeight: 80,
//       }}
//     >
//       <style>
//         {`
//           .hide-scrollbar::-webkit-scrollbar {
//             display: none;
//           }
//         `}
//       </style>
//       {/* Progress background line */}
//       <div
//         style={{
//           position: 'absolute',
//           top: BALL_SIZE / 2,
//           left: BALL_SIZE / 2,
//           right: BALL_SIZE / 2,
//           height: 4,
//           background: '#d1d5db', // gray-300
//           zIndex: 1,
//         }}
//       />
//       {/* Progress active line */}
//       <div
//         style={{
//           position: 'absolute',
//           top: BALL_SIZE / 2,
//           left: BALL_SIZE / 2,
//           width: `calc(${progress}% * (100% - ${BALL_SIZE}px) / 100)`,
//           height: 4,
//           background: '#2563eb', // blue-600
//           zIndex: 2,
//           transition: 'width 0.3s',
//         }}
//       />
//       {/* Balls and labels */}
//       {labels.map((label, index) => {
//         const left = getLeft(index);
//         return (
//           <div
//             key={index}
//             ref={el => (stepRefs.current[index] = el)}
//             style={{
//               position: 'absolute',
//               top: 0,
//               left,
//               transform:
//                 index === 0
//                   ? 'translateX(0%)'
//                   : index === labels.length - 1
//                   ? 'translateX(-100%)'
//                   : 'translateX(-50%)',
//               width: BALL_SIZE,
//               zIndex: 3,
//               textAlign: 'center',
//             }}
//           >
//             <div
//               style={{
//                 width: BALL_SIZE,
//                 height: BALL_SIZE,
//                 borderRadius: '50%',
//                 background: index <= value ? '#2563eb' : '#d1d5db',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 color: '#fff',
//                 fontWeight: 600,
//                 fontSize: 16,
//                 margin: '0 auto',
//                 boxShadow: index === value ? '0 0 0 4px #2563eb33' : undefined,
//                 transition: 'background 0.3s, box-shadow 0.3s',
//               }}
//             >
//               {index + 1}
//             </div>
//             <div
//               style={{
//                 marginTop: 8,
//                 fontSize: 12,
//                 minWidth: LABEL_MIN_WIDTH,
//                 maxWidth: 100,
//                 whiteSpace: 'normal',
//                 wordBreak: 'break-word',
//                 marginLeft:
//                   index === 0
//                     ? 0
//                     : index === labels.length - 1
//                     ? -(LABEL_MIN_WIDTH - BALL_SIZE)
//                     : -(LABEL_MIN_WIDTH - BALL_SIZE) / 2,
//                 marginRight:
//                   index === 0
//                     ? -(LABEL_MIN_WIDTH - BALL_SIZE)
//                     : index === labels.length - 1
//                     ? 0
//                     : -(LABEL_MIN_WIDTH - BALL_SIZE) / 2,
//                 textAlign: 'center',
//                 overflow: 'hidden',
//                 textOverflow: 'ellipsis',
//                 padding: '0 2px',
//               }}
//             >
//               {label}
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default TabProgressBar;




