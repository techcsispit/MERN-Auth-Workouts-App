import React, { useEffect, useState } from 'react';
import { Typography, Paper, Box, Grid } from '@mui/material';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';

dayjs.extend(isToday);
dayjs.extend(isYesterday);

const StreakTracker = ({ workouts }) => {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  useEffect(() => {
    if (workouts.length > 0) {
      const sortedWorkouts = [...workouts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      calculateStreaks(sortedWorkouts);
    }
  }, [workouts]);

  const calculateStreaks = (sortedWorkouts) => {
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 1;

    for (let i = 0; i < sortedWorkouts.length; i++) {
      const workoutDate = dayjs(sortedWorkouts[i].createdAt);

      // Calculate current streak
      if (i === 0 && workoutDate.isToday()) {
        currentStreak += 1;
      } else if (i === 0 && workoutDate.isYesterday()) {
        currentStreak += 1;
      } else if (i > 0) {
        const prevWorkoutDate = dayjs(sortedWorkouts[i - 1]?.createdAt);
        if (prevWorkoutDate.diff(workoutDate, 'day') === 1) {
          currentStreak += 1;
          tempStreak += 1;
        } else {
          tempStreak = 1; // Reset temp streak
        }
      }

      // Update longest streak
      longestStreak = Math.max(longestStreak, tempStreak);
    }

    setCurrentStreak(currentStreak);
    setMaxStreak(longestStreak);
  };

  return (
    <>
    <div style={{display:'flex',gap:'1vw'}}>
     <Grid item xs={12} md={6}>
      <Paper elevation={3}>
        <Box p={2}>
          <Typography variant="h6" gutterBottom>
            Current Streak
          </Typography>
          <Typography variant="h4" color="primary">
            {currentStreak} {currentStreak === 1 ? 'Day' : 'Days'}
          </Typography>
        </Box>
      </Paper>
      </Grid>
      <Grid item xs={12} md={6}>

      <Paper elevation={3} >
        <Box p={2}>
          <Typography variant="h6" gutterBottom>
            Max Streak
          </Typography>
          <Typography variant="h4" color="secondary">
            {maxStreak} {maxStreak === 1 ? 'Day' : 'Days'}
          </Typography>
        </Box>
      </Paper>
      </Grid>
      </div>
    </>
  );
};

export default StreakTracker;
