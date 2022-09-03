import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import React from 'react';
import './App.css';
import Display from './components/Display';
import FormDemo from './components/FormDemo';

function App() {

  return (
    <div>
    <FormDemo />
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: "6px 15px 0 10px" }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default App;


