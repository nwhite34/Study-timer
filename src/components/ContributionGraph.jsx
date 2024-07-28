import React from 'react';

const ContributionGraph = ({ sessions }) => {
  // Generate an array of dates for the next year, starting from today
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 365; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  // Map sessions to dates
  const sessionDates = sessions.reduce((acc, session) => {
    const date = session.timestamp.toDate().toISOString().split('T')[0];
    if (!acc[date]) acc[date] = 0;
    acc[date] += session.duration / 60; // Duration in minutes
    return acc;
  }, {});

  // Define color levels
  const getColor = (count) => {
    if (count === 0) return '#ebedf0';
    if (count <= 30) return '#c6e48b';
    if (count <= 60) return '#7bc96f';
    if (count <= 90) return '#239a3b';
    return '#196127';
  };

  // Generate month labels dynamically based on the current date
  const getMonthLabels = () => {
    const monthLabels = [];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let today = new Date();
    let currentMonth = today.getMonth(); // Get the current month

    dates.forEach((date, index) => {
      const month = date.getMonth();
      if (month !== currentMonth && month !== 6) { // Skip July (index 6) to prevent overlap
        monthLabels.push({ month: months[month], x: (index / 7) * 21 }); // Adjust spacing to prevent overlapping
        currentMonth = month;
      }
    });

    return monthLabels;
  };

  const monthLabels = getMonthLabels();

  return (
    <div className="contribution-graph overflow-x-auto p-4">
      <svg width="1000" height="160" className="block md:w-full">
        {/* Month labels */}
        {monthLabels.map((label, index) => (
          <text key={index} x={label.x} y="15" className="text-xs fill-current text-gray-500" textAnchor="middle">
            {label.month}
          </text>
        ))}

        {/* Contribution squares */}
        {dates.map((date, index) => {
          const dayOfWeek = date.getDay();
          const week = Math.floor(index / 7);
          const count = sessionDates[date.toISOString().split('T')[0]] || 0;
          return (
            <rect
              key={date}
              x={week * 21} // Adjust spacing as needed
              y={(dayOfWeek + 2) * 21} // Adjusted to move below the month labels
              width="18"
              height="18"
              fill={getColor(count)}
            />
          );
        })}
      </svg>
    </div>
  );
};

export default ContributionGraph;
