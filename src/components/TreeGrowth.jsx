// src/components/TreeGrowth.jsx
import React from 'react';

const TreeGrowth = ({ totalStudyTime }) => {
  const calculateHeight = () => {
    // Assuming totalStudyTime is in minutes
    return totalStudyTime * 2; // Adjust the multiplier to control growth rate
  };

  const treeHeight = calculateHeight();

  return (
    <div className="flex flex-col items-center mt-8">
      <svg width="100" height="200" viewBox="0 0 100 200">
        <rect
          x="45"
          y={200 - treeHeight}
          width="10"
          height={treeHeight}
          fill="brown"
        />
        <circle
          cx="50"
          cy={200 - treeHeight}
          r="20"
          fill="green"
        />
      </svg>
      <p className="text-center mt-4">Tree Growth</p>
    </div>
  );
};

export default TreeGrowth;
