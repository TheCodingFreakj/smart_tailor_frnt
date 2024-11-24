import React from 'react';
import { Paper, Box, Typography,Grid2 } from '@mui/material';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales Trend',
        data: [10, 20, 15, 30, 25, 40],
        fill: false,
        borderColor: '#6200ea',
        tension: 0.1,
      },
    ],
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Grid2 container spacing={3}>
        {/* Total Sales Widget */}
        <Grid2 xs={12} md={6}>
          <Typography variant="h6">Total Sales</Typography>
          <Box sx={{ backgroundColor: '#6200ea', color: 'white', padding: 2, borderRadius: 1 }}>
            <Typography variant="h5">$5000</Typography>
          </Box>
        </Grid2>

        {/* Conversion Rate Widget */}
        <Grid2 xs={12} md={6}>
          <Typography variant="h6">Conversion Rate</Typography>
          <Box sx={{ backgroundColor: '#03dac5', color: 'white', padding: 2, borderRadius: 1 }}>
            <Typography variant="h5">4.5%</Typography>
          </Box>
        </Grid2>

        {/* Sales Trend Chart */}
        <Grid2 xs={12}>
          <Typography variant="h6" gutterBottom>
            Sales Trend
          </Typography>
          <Line data={data} />
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default Dashboard;
