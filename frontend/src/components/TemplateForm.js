import React, { useState } from 'react';
import { Button, TextField, IconButton, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const TemplateForm = ({ onSaveTemplate }) => {
  const [templateName, setTemplateName] = useState('');
  const [exercises, setExercises] = useState([{ title: '', load: 0, reps: 0 }]);

  const handleAddExercise = () => {
    setExercises([...exercises, { title: '', load: 0, reps: 0 }]);
  };

  const handleRemoveExercise = (index) => {
    const newExercises = exercises.filter((_, idx) => idx !== index);
    setExercises(newExercises);
  };

  const handleInputChange = (index, field, value) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveTemplate({ title: templateName, exercises });
    setTemplateName('');
    setExercises([{ title: '', load: 0, reps: 0 }]); // Reset form
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} padding={3}>
          <TextField
            fullWidth
            label="Template Name"
            variant="outlined"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            required
          />
        </Grid>

        {exercises.map((exercise, index) => (
          <Grid container spacing={2} padding={2} key={index}>
            <Grid item xs={12} sm={5}>
              <TextField
                fullWidth
                label="Exercise Title"
                variant="outlined"
                value={exercise.title}
                onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Load (kg)"
                type="number"
                variant="outlined"
                value={exercise.load}
                onChange={(e) => handleInputChange(index, 'load', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Reps"
                type="number"
                variant="outlined"
                value={exercise.reps}
                onChange={(e) => handleInputChange(index, 'reps', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              {exercises.length > 1 && (
                <IconButton onClick={() => handleRemoveExercise(index)}>
                  <RemoveIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddExercise}
          >
            Add Exercise
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Save Template
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default TemplateForm;
