import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Grid, Box, Select, MenuItem, FormControl, InputLabel, Switch, Dialog, DialogTitle, DialogContent, Button, LinearProgress, Rating } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Equipment Data with details
const equipmentData = [
  { id: 1, name: "Dumbbells", imageUrl: "./images/Equipments/Dumbells.jpg", count: 0, details: "Dumbbells are versatile equipment for resistance training." },
  { id: 2, name: "Treadmill", imageUrl: "./images/Equipments/Tredmill.jpg", count: 0, details: "Treadmills provide an excellent cardiovascular workout." },
  { id: 3, name: "Bench Press", imageUrl: "./images/Equipments/Bench Press.jpg", count: 0, details: "Bench Press is perfect for building upper body strength." },
  { id: 4, name: "Kettlebells", imageUrl: "./images/Equipments/Kettlebells.jpg", count: 0, details: "Kettlebells are great for full-body functional workouts." },
  { id: 5, name: "Rowing Machine", imageUrl: "./images/Equipments/Rowing Machine.jpg", count: 0, details: "Rowing machines simulate rowing and provide a full-body workout." },
  { id: 6, name: "Stationary Bike", imageUrl: "./images/Equipments/Stationary Bike.jpg", count: 0, details: "Stationary bikes are ideal for low-impact cardio." },
  { id: 7, name: "Leg Press", imageUrl: "./images/Equipments/Leg Press.jpg", count: 0, details: "Leg Press helps in strengthening the lower body muscles." },
  { id: 8, name: "Pull-up Bar", imageUrl: "./images/Equipments/Pull-up Bar.jpg", count: 0, details: "Pull-up bars improve upper body strength and endurance." },
  { id: 9, name: "Medicine Ball", imageUrl: "./images/Equipments/Medicine Ball.jpg", count: 0, details: "Medicine Balls are excellent for core and strength training." },
  { id: 10, name: "Elliptical Machine", imageUrl: "./images/Equipments/Elliptical Machine.jpg", count: 0, details: "Elliptical machines provide a smooth, low-impact cardio workout." }
];

const GymEquipment = () => {
  const [equipment, setEquipment] = useState(equipmentData);
  const [darkMode, setDarkMode] = useState(true);
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [ratings, setRatings] = useState(equipmentData.map(item => ({ ...item, rating: 0 })));

  // Dark and light theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#0D0D0D' : '#f5f5f5',
        paper: darkMode ? '#1C1C1C' : '#fff',
      },
      text: {
        primary: darkMode ? '#E0E0E0' : '#333',
        secondary: darkMode ? '#FF4500' : '#1976d2',
      },
    },
    typography: {
      fontFamily: ['Roboto', 'Oswald', 'Montserrat', 'Bebas Neue', 'Poppins', 'Lato', 'Exo'].join(','),
      h6: { fontFamily: 'Oswald, sans-serif', fontWeight: 700, letterSpacing: 1 },
      body1: { fontFamily: 'Roboto, sans-serif', fontSize: '1rem' },
    },
  });

  // Increment count
  const handleIncrease = (id) => {
    const updatedEquipment = equipment.map((item) =>
      item.id === id ? { ...item, count: item.count + 1 } : item
    );
    setEquipment(updatedEquipment);
  };

  // Decrement count
  const handleDecrease = (id) => {
    const updatedEquipment = equipment.map((item) =>
      item.id === id && item.count > 0 ? { ...item, count: item.count - 1 } : item
    );
    setEquipment(updatedEquipment);
  };

  // Handle rating change
  const handleRatingChange = (id, newRating) => {
    const updatedRatings = ratings.map(item =>
      item.id === id ? { ...item, rating: newRating } : item
    );
    setRatings(updatedRatings);
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Filter equipment
  const filteredEquipment = equipment.filter(item => {
    if (filter === 'All') return true;
    if (filter === 'Cardio') return ['Treadmill', 'Stationary Bike', 'Rowing Machine', 'Elliptical Machine'].includes(item.name);
    if (filter === 'Strength') return ['Dumbbells', 'Bench Press', 'Leg Press', 'Kettlebells'].includes(item.name);
    return false;
  });

  // Modal handling
  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, padding: '20px', backgroundColor: theme.palette.background.default }}>
        {/* Light/Dark Mode Toggle */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4" color="text.primary">Gym Equipment</Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color="text.primary" mr={1}>Dark Mode</Typography>
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          </Box>
        </Box>

        {/* Category Filter */}
        <FormControl sx={{ mb: 3, minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select value={filter} onChange={handleFilterChange}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Cardio">Cardio</MenuItem>
            <MenuItem value="Strength">Strength</MenuItem>
          </Select>
        </FormControl>

        {/* Equipment Grid */}
        <Grid container spacing={3} justifyContent="center">
          {filteredEquipment.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} key={item.id}>
              <Card
                sx={{
                  maxWidth: 200,
                  backgroundColor: theme.palette.background.paper,
                  color: theme.palette.text.primary,
                  '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.3s ease-in-out', boxShadow: `0px 4px 20px ${theme.palette.text.secondary}` },
                }}
                onClick={() => handleOpen(item)}
              >
                <CardMedia component="img" alt={item.name} height="140" image={item.imageUrl} />
                <CardContent>
                  <Typography gutterBottom variant="h6">{item.name}</Typography>
                  <Box display="flex" justifyContent="center" alignItems="center">
                    <IconButton onClick={() => handleDecrease(item.id)} color="secondary">
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ margin: '0 10px' }}>{item.count}</Typography>
                    <IconButton onClick={() => handleIncrease(item.id)} color="secondary">
                      <AddIcon />
                    </IconButton>
                  </Box>

                  {/* Progress Tracker */}
                  <LinearProgress
                    variant="determinate"
                    value={(item.count / 10) * 100}
                    sx={{ mt: 2, backgroundColor: '#252525', '& .MuiLinearProgress-bar': { backgroundColor: theme.palette.text.secondary } }}
                  />

                  {/* Rating */}
                  <Rating
                    value={ratings.find(rating => rating.id === item.id)?.rating || 0}
                    onChange={(event, newValue) => handleRatingChange(item.id, newValue)}
                    sx={{ color: theme.palette.text.secondary, mt: 2 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Details Modal */}
        {selectedItem && (
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{selectedItem.name}</DialogTitle>
            <DialogContent>
              <Typography variant="body1">
                {selectedItem.details}
              </Typography>
            </DialogContent>
            <Button onClick={() => setOpen(false)} color="secondary">Close</Button>
          </Dialog>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default GymEquipment;
