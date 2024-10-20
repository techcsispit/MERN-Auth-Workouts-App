import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, Paper, Box } from '@mui/material';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
import { useAuthContext } from '../hooks/useAuthContext';
import { useTemplatessContext } from '../hooks/useTemplateContext';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';
import StreakTracker from '../components/StreakTracker';
// import RecentWorkoutsTable from '../components/RecentWorkoutsTable';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const Dashboard = () => {
  const { user } = useAuthContext();
  const { templates } = useTemplatessContext();

  const { workouts} = useWorkoutsContext();


const workoutData = workouts;
// console.log('workoutData',workoutData);

  // Line Chart Data (Performance Over Time)
// Assuming there's a date field in each workout, like `createdAt`
const dates = workoutData.map(workout => new Date(workout.createdAt).toLocaleDateString());
const totalWeights = workoutData.map(workout => workout.load * workout.reps);

const lineChartData = {
  labels: dates, // Array of dates from the workout data
  datasets: [
    {
      label: 'Total Weight Lifted (kg)',
      data: totalWeights, // Array of total weights lifted over time
      borderColor: 'rgba(75,192,192,1)',
      fill: false,
    },
  ],
};


const exerciseNames = workoutData.map(workout => workout.title);
const exerciseFrequency = exerciseNames.reduce((acc, title) => {
  acc[title] = (acc[title] || 0) + 1;
  return acc;
}, {});

const barChartData = {
  labels: Object.keys(exerciseFrequency), // Exercise names
  datasets: [
    {
      label: 'Exercise Frequency',
      data: Object.values(exerciseFrequency), // Count of how many times each exercise is performed
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
    },
  ],
};


const workoutComposition = { upperBody: 0, lowerBody: 0, cardio: 0 };

workoutData.forEach(workout => {
  if (workout.title.toLowerCase().includes('bench') || workout.title.toLowerCase().includes('press')) {
    workoutComposition.upperBody += workout.reps;
  } else if (workout.title.toLowerCase().includes('squat')) {
    workoutComposition.lowerBody += workout.reps;
  } else {
    workoutComposition.cardio += workout.reps; // You can change this logic to fit your workout types
  }
});

const pieChartData = {
  labels: ['Upper Body', 'Lower Body', 'Cardio'],
  datasets: [
    {
      data: [workoutComposition.upperBody, workoutComposition.lowerBody, workoutComposition.cardio],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

const scatterChartData = {
    labels: workoutData.map(workout => workout.title),
    datasets: [
      {
        label: 'Reps vs Load',
        data: workoutData.map(workout => ({
          x: workout.reps,  // X-axis: Number of reps
          y: workout.load,  // Y-axis: Load (weight lifted)
        })),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <Container>

      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Workout Dashboard
          </Typography>
                  {/* Streak Tracker */}
        <Grid item xs={12} md={12}>
          <StreakTracker workouts={workouts} />
        </Grid>
        </Grid>

        {/* Line Chart for Performance */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h6" gutterBottom>
                Performance Over Time
              </Typography>
              <Line data={lineChartData} />
            </Box>
          </Paper>
        </Grid>

        {/* Bar Chart for Exercise Frequency */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h6" gutterBottom>
                Exercise Frequency
              </Typography>
              <Bar data={barChartData} />
            </Box>
          </Paper>
        </Grid>

        {/* Pie Chart for Workout Composition */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h6" gutterBottom>
                Workout Composition
              </Typography>
              <Pie data={pieChartData} />
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h6" gutterBottom>
                Reps vs Load
              </Typography>
              <Line data={scatterChartData} type="scatter" />
            </Box>
          </Paper>
        </Grid>
        </Grid>
    </Container>
  );
};

export default Dashboard;
