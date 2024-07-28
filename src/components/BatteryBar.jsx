// src/components/BatteryBar.jsx
import React from 'react';

const BatteryBar = ({ percentage }) => {
  let color;
  if (percentage <= 10) {
    color = 'bg-red-500';
  } else if (percentage <= 30) {
    color = 'bg-orange-500';
  } else if (percentage <= 50) {
    color = 'bg-yellow-500';
  } else if (percentage <= 80) {
    color = 'bg-green-400';
  } else {
    color = 'bg-green-500';
  }

  return (
    <div className="w-full bg-gray-300 h-12 rounded-lg overflow-hidden">
      <div className={`${color} h-full`} style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default BatteryBar;
