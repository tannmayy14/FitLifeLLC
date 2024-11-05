import React, { useState } from 'react';
import {
  Card, CardContent, CardMedia, Typography, IconButton, Grid, Box, Select, MenuItem, FormControl, InputLabel, Switch,
  Dialog, DialogTitle, DialogContent, Button, Snackbar, Badge, Rating
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";



const equipmentData = [
  { id: 1, name: "Dumbbells", imageUrl: "./images/Equipments/Dumbells.jpg", count: 0, category: "Strength", price: 500 },
  { id: 2, name: "Treadmill", imageUrl: "./images/Equipments/Tredmill.jpg", count: 0, category: "Cardio", price: 500 },
  { id: 3, name: "Bench Press", imageUrl: "./images/Equipments/Bench Press.jpg", count: 0, category: "Strength", price: 500 },
  { id: 4, name: "Kettlebells", imageUrl: "./images/Equipments/Kettlebells.jpg", count: 0, category: "Strength", price: 500 },
  { id: 5, name: "Rowing Machine", imageUrl: "./images/Equipments/Rowing Machine.jpg", count: 0, category: "Cardio", price: 500 },
  { id: 6, name: "Stationary Bike", imageUrl: "./images/Equipments/Stationary Bike.jpg", count: 0, category: "Cardio", price: 500 },
  { id: 7, name: "Leg Press", imageUrl: "./images/Equipments/Leg Press.jpg", count: 0, category: "Strength", price: 500 },
  { id: 8, name: "Pull-up Bar", imageUrl: "./images/Equipments/Pull-up Bar.jpg", count: 0, category: "Strength", price: 500 },
  { id: 9, name: "Medicine Ball", imageUrl: "./images/Equipments/Medicine Ball.jpg", count: 0, category: "Strength", price: 500 },
  { id: 10, name: "Elliptical Machine", imageUrl: "./images/Equipments/Elliptical Machine.jpg", count: 0, category: "Cardio", price: 500 },
  
  // Clothes
  { id: 11, name: "Workout T-shirt", imageUrl: "./images/Equipments/Workout Tshirt.jpg", count: 0, category: "Clothes", price: 500 },
  { id: 12, name: "Gym Shorts", imageUrl: "./images/Equipments/Gym Shorts.jpg", count: 0, category: "Clothes", price: 500 },
  { id: 13, name: "Training Shoes", imageUrl: "./images/Equipments/Training shoes.jpg", count: 0, category: "Clothes", price: 500 },
  { id: 14, name: "Sweatband", imageUrl: "./images/Equipments/Sweatband.jpg", count: 0, category: "Clothes", price: 500 },
  
  // Supplements
  { id: 15, name: "Creatine", imageUrl: "./images/Equipments/Creatine.jpg", count: 0, category: "Supplements", price: 500 },
  { id: 16, name: "Protein Powder", imageUrl: "./images/Equipments/Protein Powder.jpg", count: 0, category: "Supplements", price: 500 },
  { id: 17, name: "BCAA", imageUrl: "./images/Equipments/BCAA.jpg", count: 0, category: "Supplements", price: 500 },
  { id: 18, name: "Pre-Workout", imageUrl: "./images/Equipments/Pre Workout.jpg", count: 0, category: "Supplements", price: 500 },
  { id: 19, name: "Multivitamins", imageUrl: "./images/Equipments/Multivitamin.jpg", count: 0, category: "Supplements", price: 500 },
  { id: 20, name: "Omega-3", imageUrl: "./images/Equipments/Omega 3.jpg", count: 0, category: "Supplements", price: 500 }  
];

const GymEquipment = () => {
  const [equipment, setEquipment] = useState(equipmentData);
  const [darkMode, setDarkMode] = useState(true);
  const [filter, setFilter] = useState('All');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [ratings, setRatings] = useState(equipmentData.map(item => ({ id: item.id, rating: 0 })));
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);



  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: { default: darkMode ? '#0D0D0D' : '#f5f5f5' },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });

  const handleIncrease = (id) => {
    setEquipment(equipment.map(item => (item.id === id ? { ...item, count: item.count + 1 } : item)));
  };

  const handleDecrease = (id) => {
    setEquipment(equipment.map(item => (item.id === id && item.count > 0 ? { ...item, count: item.count - 1 } : item)));
  };

  const handleAddToCart = (item) => {
    if (item.count > 0) {
      const existingItem = cart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        setCart(cart.map(cartItem => cartItem.id === item.id ? { ...cartItem, count: cartItem.count + item.count } : cartItem));
      } else {
        setCart([...cart, { ...item }]);
      }
      setSnackbarOpen(true);
    }
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleCartOpen = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);

  // Update rating for each item
  const handleRatingChange = (id, newValue) => {
    setRatings(ratings.map(r => (r.id === id ? { ...r, rating: newValue } : r)));
  };

  async function initiateCheckout() {
    if (!user) {
      navigate('/signin');
      return;
  }
    try {
        console.log('Making request to server...'); // Debug log
        const response = await fetch('http://localhost:4000/api/create-cart-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              cart 
            }), // Send the cart array to the server
        });

        const data = await response.json();
        if (data.url) {
            // Redirect to Stripe checkout
            window.location.href = data.url;
        } else {
            console.error('Failed to create checkout session:', data.error);
            alert('Failed to initiate checkout. Please try again.');
        }
    } catch (error) {
        console.error('Error initiating checkout:', error);
        alert('An error occurred while initiating checkout.');
    }
}
    
  // Calculate total price in the cart
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.count), 0);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, padding: '20px', backgroundColor: theme.palette.background.default }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Gym Equipment</Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" mr={1}>Dark Mode</Typography>
            <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
            <IconButton onClick={handleCartOpen} color="secondary" sx={{ ml: 2 }}>
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Box>

        <FormControl sx={{ mb: 3, minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Cardio">Cardio</MenuItem>
            <MenuItem value="Strength">Strength</MenuItem>
            <MenuItem value="Clothes">Clothes</MenuItem>
            <MenuItem value="Supplements">Supplements</MenuItem>
          </Select>
        </FormControl>

        <Grid container spacing={3}>
          {equipment
            .filter(item => filter === 'All' || item.category === filter)
            .map(item => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Card
                  sx={{
                    maxWidth: 345,
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
                      border: '2px solid orange'
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.imageUrl}
                    alt={item.name}
                    style={{ objectFit: 'contain', height: 200 }}
                  />
                  <CardContent>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.category}</Typography>
                    <Typography variant="body2" color="text.primary">Price: ₹{item.price}</Typography>
                    <Box display="flex" justifyContent="center" mt={1}>
                      <IconButton onClick={() => handleDecrease(item.id)} size="small">
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body2">{item.count}</Typography>
                      <IconButton onClick={() => handleIncrease(item.id)} size="small">
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Box display="flex" justifyContent="center" mt={1}>
                      <Rating
                        value={ratings.find(r => r.id === item.id)?.rating || 0}
                        onChange={(event, newValue) => handleRatingChange(item.id, newValue)}
                      />
                    </Box>
                    <Button variant="outlined" color="secondary" onClick={() => handleAddToCart(item)} sx={{ mt: 1 }}>
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>

        <Dialog open={cartOpen} onClose={handleCartClose}>
          <DialogTitle>Shopping Cart</DialogTitle>
          <DialogContent>
            {cart.length === 0 ? (
              <Typography variant="body1">Your cart is empty</Typography>
            ) : (
              cart.map(item => (
                <Box key={item.id} display="flex" alignItems="center" justifyContent="space-between" mb={1}>
                  <Typography variant="body2">{item.name} x {item.count}</Typography>
                  <Typography variant="body2">Total: ₹{item.price * item.count}</Typography>
                  <IconButton onClick={() => handleRemoveFromCart(item.id)} size="small">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))
            )}
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography variant="h6">Total Price:</Typography>
              <Typography variant="h6">₹{totalPrice}</Typography>
            </Box>
            <Button onClick={handleCartClose} color="secondary" sx={{ mt: 2 }}>Close</Button>
            <Button onClick={initiateCheckout} color="secondary" sx={{ mt: 2 }}>
        Checkout (Total: {(totalPrice)})
      </Button>
          </DialogContent>
        </Dialog>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          message="Item added to cart"
        />
      </Box>
    </ThemeProvider>
  );
};

export default GymEquipment;
