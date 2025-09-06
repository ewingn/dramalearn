// ui/TimerDisplay.jsx
import React from 'react';

const TimerDisplay = ({ timeLeft, styles }) => (
  <div style={styles.timerDisplay}>
    ⏰ {timeLeft}s
  </div>
);

export default TimerDisplay;