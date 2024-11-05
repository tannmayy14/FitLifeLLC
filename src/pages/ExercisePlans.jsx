import React, { useState } from 'react';
import { fetchExercisePlan } from '../api';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const exercises = [
  { title: 'Cardio Blast', description: 'Boost your endurance', image: './Exercise plans images/Cardio.jpg', videoLink: 'https://www.youtube.com/watch?v=uBVREI0eJPI' },
  { title: 'Strength Training', description: 'Increase muscle mass and strength with weight lifting.', image: './Exercise plans images/strength training.jpeg', videoLink: 'https://www.youtube.com/watch?v=lQOAidOej7E' },
  { title: 'Push Pull Legs', description: 'A balanced workout routine focusing on push, pull, and leg exercises.', image: './Exercise plans images/ppl.jpeg', videoLink: 'https://www.youtube.com/watch?v=lQOAidOej7E' },
  { title: 'HIIT Workout', description: 'High-intensity interval training to burn fat quickly.', image: './Exercise plans images/hiit.jpeg', videoLink: 'https://www.youtube.com/watch?v=J212vz33gU4' },
  { title: 'Core Strengthening', description: 'Build core strength with targeted abdominal exercises.', image: './Exercise plans images/core strength.avif', videoLink: 'https://www.youtube.com/watch?v=core_strengthening_video' },
  { title: 'Yoga', description: 'Improve flexibility and reduce stress with yoga routines.', image: './Exercise plans images/yoga.jpeg', videoLink: 'https://www.youtube.com/watch?v=s2NQhpFGIOg' },
];

function ExercisePlans() {
  const [open, setOpen] = useState(false);
  const [exerciseData, setExerciseData] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [selectedVideoLink, setSelectedVideoLink] = useState('');

  const handleCardClick = async (title, videoLink) => {
    const data = await fetchExercisePlan(title);
    console.log("Fetched Exercise Plan Data:", data);
    setExerciseData(data);
    setSelectedTitle(title);
    setSelectedVideoLink(videoLink);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePrint = () => {
    const printContent = document.getElementById('printable-area');
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h1 { color: #FF4500; }
            h2 { color: #1C1C1C; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #FFBF00; color: #1C1C1C; }
          </style>
        </head>
        <body>
          <h1>${selectedTitle}</h1>
          <h2>Exercise Plan Details</h2>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: '50px', padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#FF4500', fontWeight: 'bold' }}>
        Our Exercise Plans
      </Typography>
      <Grid container spacing={4}>
        {exercises.map((exercise, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card onClick={() => handleCardClick(exercise.title, exercise.videoLink)} sx={{
              cursor: 'pointer',
              boxShadow: 3,
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6,
              }
            }}>
              <CardMedia component="img" height="150" image={exercise.image} alt={exercise.title} />
              <CardContent sx={{ backgroundColor: '#1C1C1C', color: 'white' }}>
                <Typography variant="h5" sx={{ color: '#FFBF00', fontWeight: 'bold' }}>{exercise.title}</Typography>
                <Typography variant="body2" sx={{ marginBottom: '10px' }}>{exercise.description}</Typography>
                <a href={exercise.videoLink} target="_blank" rel="noopener noreferrer" style={{ color: '#FF4500', textDecoration: 'underline' }}>
                  Watch Video
                </a>
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
            maxHeight: '80vh',
            overflowY: 'auto',
            borderRadius: '8px',
            boxShadow: 24,
          }}
        >
          <div id="printable-area">
            <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', color: '#FF4500', fontWeight: 'bold' }}>
              {selectedTitle} Details
            </Typography>
            {exerciseData.length > 0 ? (
              <TableContainer sx={{ border: '1px solid #ddd', borderRadius: '4px' }}>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>
                      {exerciseData[0]?.map((heading, i) => (
                        <TableCell key={i} sx={{ fontWeight: 'bold', color: '#1C1C1C', backgroundColor: '#FFBF00' }}>
                          {heading}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {exerciseData.slice(1).map((row, i) => (
                      <TableRow key={i} sx={{ backgroundColor: 'black' }}>
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
          </div>
          <button
            style={{
              backgroundColor: '#FF4500',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              margin: '20px auto',
              display: 'block',
              transition: 'background-color 0.3s ease',
            }}
            onClick={handlePrint}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#FFBF00'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FF4500'}
          >
            Print
          </button>
        </Box>
      </Modal>
    </Container>
  );
}

export default ExercisePlans;
