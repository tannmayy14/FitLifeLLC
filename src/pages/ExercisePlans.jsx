// src/pages/ExercisePlans.jsx
import React, { useState } from 'react';
import { fetchExercisePlan } from '../api';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const exercises = [
  {
    title: 'Cardio Blast',
    description: 'Boost your endurance', 
    image: '/Exercise plans images/Cardio.png' 
  },
  { 
    title: 'Strength Training', 
    description: 'Increase muscle mass and strength with weight lifting.', 
    image: '/Exercise plans images/Strength Training.webp' },
  {
    title: 'Push Pull Legs',
    description: 'A balanced workout routine focusing on push, pull, and leg exercises.',
    image: 'public/Exercise plans images/Push Pull Legs.webp', // Replace with real image
  },
  {
    title: 'HIIT Workout',
    description: 'High-intensity interval training to burn fat quickly.',
    image: 'public/Exercise plans images/HIIT.webp', // Replace with real image
  },
  {
    title: 'Core Strengthening',
    description: 'Build core strength with targeted abdominal exercises.',
    image: 'public/Exercise plans images/Core Strengthening.webp', // Replace with real image
  },
  {
    title: 'Yoga',
    description: 'Improve flexibility and reduce stress with yoga routines.',
    image: 'public/Exercise plans images/Yoga.webp', // New image for the additional card
  },
];

function ExercisePlans() {
  const [open, setOpen] = useState(false);
  const [exerciseData, setExerciseData] = useState([]);

  const handleCardClick = async (title) => {
    const data = await fetchExercisePlan(title); // Fetch data based on the title clicked
    console.log("Fetched Exercise Plan Data:", data); // Log fetched data to see its structure
    setExerciseData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Our Exercise Plans
      </Typography>
      <Grid container spacing={4}>
        {exercises.map((exercise, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card onClick={() => handleCardClick(exercise.title)}>
              <CardMedia component="img" height="150" image={exercise.image} alt={exercise.title} />
              <CardContent>
                <Typography variant="h5">{exercise.title}</Typography>
                <Typography variant="body2">{exercise.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={open} onClose={handleClose}>
  <Box 
    sx={{ 
      maxWidth: '80%', 
      margin: 'auto', 
      marginTop: '5%', 
      padding: '20px', 
      bgcolor: 'white',
      maxHeight: '80vh', // Set a max height for the modal
      overflowY: 'auto',  // Enable vertical scrolling
      borderRadius: '8px', // Add rounded corners
      boxShadow: 24, // Add shadow for depth
    }}
  >
    <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', color: '#FF4500' }}>
      Exercise Plan Details
    </Typography>
    {exerciseData.length > 0 ? (
      <TableContainer sx={{ border: '1px solid #ddd', borderRadius: '4px' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: '#FFBF00' }}>
            <TableRow>
              {exerciseData[0]?.map((heading, i) => (
                <TableCell key={i} sx={{ fontWeight: 'bold', color: '#1C1C1C' }}>
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {exerciseData.slice(1).map((row, i) => (
              <TableRow key={i} sx={  { backgroundColor: 'black' } }>
                {row.map((cell, j) => (
                  <TableCell key={j} sx={{ padding: '16px', color: 'white' }}>
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <Typography>No data available</Typography>
    )}
  </Box>
</Modal>
    </Container>
  );
}

export default ExercisePlans;
