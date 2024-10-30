import React, { useState, useEffect } from 'react';
import {
  Card, CardContent, Typography, Button, TextField, Grid, LinearProgress, IconButton, Box, Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../components/Navbar';

const GoalsComponent = () => {
  const [goals, setGoals] = useState([{ exercise: '', targetLoad: '', targetReps: '' }]);
  const { user } = useAuthContext();
 
  const fetchGoals = async () => {
    try {
      const res = await axios.get('/api/user/goals', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setGoals(res.data);
      console.log(res.data);
    } catch (err) {
      console.error('Error fetching goals', err);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [user]);

  const handleInputChange = (index, field, value) => {
    const updatedGoals = [...goals];
    updatedGoals[index][field] = value;
    setGoals(updatedGoals);
  };

  const handleAddGoal = () => {
    setGoals([...goals, { exercise: '', targetLoad: '', targetReps: '' }]);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('/api/user/goals', { goals }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      fetchGoals();
    } catch (error) {
      console.error('Error submitting goals', error);
    }
  };

  const handleDelete = async (exercise) => {
    try {
      const res = await axios.delete(`/api/user/goals/${exercise}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setGoals(res.data.goals);
    } catch (err) {
      console.error('Error deleting goal', err);
    }
  };

  return (
    <>
    <Navbar />
    <Card sx={{ margin: 4, padding: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1565C0' }}>
          Workout Goals
        </Typography>

        <Grid container spacing={4} sx={{ marginTop: 2 }}>
          {goals.map((goal, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper elevation={4} sx={{ padding: 2, borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: '#1E88E5' }}>
                    {goal.exercise || 'New Goal'}
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    <strong>Target Load:</strong> {goal.targetLoad} kg
                  </Typography>
                  <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    <strong>Target Reps:</strong> {goal.targetReps}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={Math.random() * 100}
                    sx={{ height: 10, borderRadius: 5, marginBottom: 2 }}
                  />
                  <IconButton color="error" onClick={() => handleDelete(goal.exercise)}>
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Form for adding goals */}
        {goals.map((goal, index) => (
          <Box key={index} mt={4}>
            <Typography variant="h6" sx={{ color: '#42A5F5' }}>Goal {index + 1}</Typography>
            <TextField
              label="Exercise"
              value={goal.exercise}
              onChange={(e) => handleInputChange(index, 'exercise', e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              sx={{ marginBottom: 2 }}
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Target Load (kg)"
                  value={goal.targetLoad}
                  onChange={(e) => handleInputChange(index, 'targetLoad', e.target.value)}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Target Reps"
                  value={goal.targetReps}
                  onChange={(e) => handleInputChange(index, 'targetReps', e.target.value)}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>
        ))}

        <Box display="flex" justifyContent="flex-end" alignItems="center" mt={4}>
          <Button
            onClick={handleAddGoal}
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            sx={{ marginRight: 2 }}
          >
            Add Goal
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
          >
            Save Goals
          </Button>
        </Box>
      </CardContent>
    </Card>
    </>
  );
};

export default GoalsComponent;
