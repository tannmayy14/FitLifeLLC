import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
// import './ExercisePlans.css';

// Example exercise data (You can replace these with your real exercise plans)
const exercises = [
  {
    title: 'Cardio Blast',
    description: 'Boost your endurance with intense cardio workouts.',
    image: './Exercise plans images/Cardio.jpg', 
  },
  {
    title: 'Strength Training',
    description: 'Increase muscle mass and strength with weight lifting.',
    image: './Exercise plans images/strength training.jpeg', // Replace with real image
  },
  {
    title: 'Push Pull Legs',
    description: 'A balanced workout routine focusing on push, pull, and leg exercises.',
    image: './Exercise plans images/ppl.jpeg', // Replace with real image
  },
  {
    title: 'HIIT Workout',
    description: 'High-intensity interval training to burn fat quickly.',
    image: './Exercise plans images/hiit.jpeg', // Replace with real image
  },
  {
    title: 'Core Strengthening',
    description: 'Build core strength with targeted abdominal exercises.',
    image: './Exercise plans images/core strength.avif', // Replace with real image
  },
  {
    title: 'Yoga Flexibility',
    description: 'Improve flexibility and reduce stress with yoga routines.',
    image: './Exercise plans images/yoga.jpeg', // New image for the additional card
  },
];

function ExercisePlans() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: '50px' }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Our Exercise Plans
      </Typography>
      <Grid container spacing={4}>
        {exercises.map((exercise, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                sx={{ height: 150 }}
                image={exercise.image}
                alt={exercise.title}
              />
              <CardContent>
                <Typography variant="h5" component="h3">
                  {exercise.title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {exercise.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ExercisePlans;
