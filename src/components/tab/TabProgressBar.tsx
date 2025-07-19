import React, { useRef, useEffect } from 'react';
import { useTheme, useMediaQuery, Box } from '@mui/material';

interface TabProgressBarProps {
  value: number;
  labels: string[];
}

const BALL_SIZE = 32; // px

const TabProgressBar: React.FC<TabProgressBarProps> = ({ value, labels }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const progress = (value / (labels.length - 1)) * 100;
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    <Box
      className="overflow-x-auto scrollbar-hide w-full px-4"
      sx={{
        backgroundColor: 'white',
        position: 'sticky',
        top: { xs: 56, md: 64 },
        zIndex: 9,
        minHeight: 80,
        maxWidth: { xs: '100vw', md: '65vw', lg: '50vw' },
        mx: 'auto',
      }}
    >
      <Box
        className="relative h-20 my-2 mx-auto w-full"
        sx={{
          minHeight: 80,
        }}
      >
        {/* Hide scrollbar for horizontal scroll */}
        <style>
          {`
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { scrollbar-width: none; -ms-overflow-style: none; }
          `}
        </style>
        {/* Progress background line */}
        <div
          className="absolute h-1 bg-gray-300 z-10"
          style={{
            top: BALL_SIZE / 2,
            left: BALL_SIZE / 2,
            right: BALL_SIZE / 2,
          }}
        />
        {/* Progress active line */}
        <div
          className="absolute h-1 bg-blue-600 z-20 transition-all"
          style={{
            top: BALL_SIZE / 2,
            left: BALL_SIZE / 2,
            width: `calc(${progress}% * (100% - ${BALL_SIZE}px) / 100)`,
          }}
        />
        {/* Step balls */}
        {labels.map((_, index) => (
          <div
            key={index}
            ref={el => (stepRefs.current[index] = el)}
            className="absolute text-center"
            style={{
              top: 0,
              left: getLeft(index),
              transform:
                index === 0
                  ? 'translateX(0%)'
                  : index === labels.length - 1
                  ? 'translateX(-100%)'
                  : 'translateX(-50%)',
              width: BALL_SIZE,
              zIndex: 30,
            }}
          >
            <div
              className={`flex items-center justify-center font-semibold mx-auto transition-all
                ${index <= value ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'}
                rounded-full`}
              style={{
                width: BALL_SIZE,
                height: BALL_SIZE,
                fontSize: 16,
                boxShadow: index === value ? '0 0 0 4px #2563eb33' : undefined,
              }}
            >
              {index + 1}
            </div>
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default TabProgressBar;