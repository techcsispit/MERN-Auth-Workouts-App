import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button, Paper, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const TemplateList = ({ templates, onDelete }) => {
    console.log('templates',templates);
    
  return (
    <div>
      {templates.map((template, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{template.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
          <Typography variant="h6" gutterBottom>
  Exercises:
</Typography>
<Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
  {template.exercises.map((exercise, idx) => (
    <Box
      key={idx}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottom="1px solid #ccc"
      padding="8px 0"
    >
      <Typography variant="subtitle1" component="span">
        {exercise.title}
      </Typography>
      <Typography variant="body2" component="span" color="textSecondary">
        {exercise.load} kg, {exercise.reps} reps
      </Typography>
    </Box>
  ))}
</Paper>
            {/* <Button color="primary" onClick={() => onEdit(template)}>
              Edit
            </Button> */}
            <Button color="secondary" onClick={() => onDelete(template._id)}>
              Delete
            </Button>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default TemplateList;
