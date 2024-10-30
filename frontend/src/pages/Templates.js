import React, { useEffect } from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import TemplateForm from '../components/TemplateForm';
import TemplateList from '../components/TemplateDetails';
import { useTemplatessContext } from '../hooks/useTemplateContext';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../components/Navbar';

const Template = () => {
  const { templates, dispatch } = useTemplatessContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTemplates = async () => {
      if (user) {
        const response = await fetch('/api/templates', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const json = await response.json();
        if (response.ok) {
          dispatch({ type: 'SET_TEMPLATES', payload: json });
        }
      }
    };

    fetchTemplates();
  }, [dispatch, user]);

  const handleSaveTemplate = async (newTemplate) => {
    const response = await fetch('/api/templates', {
      method: 'POST',
      body: JSON.stringify(newTemplate),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'CREATE_TEMPLATE', payload: json });
    }
  };

  const handleDeleteTemplate = async (templateId) => {
    const response = await fetch(`/api/templates/${templateId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      dispatch({ type: 'DELETE_TEMPLATE', payload: { _id: templateId } });
    }
  };

  const handleEditTemplate = async (updatedTemplate) => {
    const response = await fetch(`/api/templates/${updatedTemplate._id}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedTemplate),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (response.ok) {
      dispatch({ type: 'UPDATE_TEMPLATE', payload: json });
    }
  };

  return (
    <>
    <Navbar />
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={4}>
        {/* Header */}
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Manage Workout Templates
          </Typography>
        </Grid>

        {/* Form Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: '12px', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" gutterBottom>
              Create New Template
            </Typography>
            <TemplateForm onSaveTemplate={handleSaveTemplate} />
          </Paper>
        </Grid>

        {/* List Section */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3, borderRadius: '12px', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" gutterBottom>
              Available Templates
            </Typography>
            <TemplateList
              templates={templates}
              onDelete={handleDeleteTemplate}
              onEdit={handleEditTemplate}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </>
  );
};

export default Template;
