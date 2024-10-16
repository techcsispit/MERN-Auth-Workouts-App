import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { WorkoutContextProvider } from './context/WorkoutContext';
import './index.css';
import { TemplateContextProvider } from './context/TemplateContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <WorkoutContextProvider>
      <TemplateContextProvider>
    <App />
    </TemplateContextProvider>
    </WorkoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

