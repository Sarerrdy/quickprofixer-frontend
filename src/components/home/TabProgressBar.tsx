import React from 'react';

interface TabProgressBarProps {
  value: number;
  labels: string[];
}

const TabProgressBar: React.FC<TabProgressBarProps> = ({ value, labels }) => {
  const progress = (value / (labels.length - 1)) * 100;

  return (
    <div className="relative w-3/4 h-12 my-2 mx-auto">
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-1/2" />
      <div className="absolute top-1/2 left-0 h-1 bg-blue-600 transform -translate-y-1/2" style={{ width: `${progress}%` }} />
      {labels.map((label, index) => {
        const left = (index / (labels.length - 1)) * 100;
        return (
          <div key={index} className="absolute top-1/2" style={{ left: `${left}%`, transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <div className={`w-6 h-6 rounded-full ${index <= value ? 'bg-blue-600' : 'bg-gray-300'} flex items-center justify-center text-white`}>
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