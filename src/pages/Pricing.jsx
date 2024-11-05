//pricing V2
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Grid, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Box,
  Container
} from '@mui/material';
import { Home, Crown } from 'lucide-react';
import { getAuth } from "firebase/auth";
import { useAuthState } from 'react-firebase-hooks/auth';

const PricingPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [serverStatus, setServerStatus] = useState(null);
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();

    // Test server connection on component mount
    useEffect(() => {
        const testServer = async () => {
            try {
                const response = await fetch('http://localhost:4000/test');
                const data = await response.json();
                setServerStatus(data.message);
                console.log('Server status:', data.message);
            } catch (error) {
                console.error('Server connection error:', error);
                setServerStatus('Server connection failed');
            }
        };
        testServer();
    }, []);

    const handleFreeSubscription=async () => {
        navigate('/');
    };

    const handlePaidSubscription = async () => {
        if (!user) {
            navigate('/signin');
            return;
        }

        setIsLoading(true);
        try {
            console.log('Making request to server...'); // Debug log
            const response = await fetch('http://localhost:4000/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.uid
                }),
            });

            console.log('Response received:', response.status); // Debug log

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || `HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Checkout data:', data); // Debug log

            if (data.url) {
                window.location.href = data.url;
            } else {
                throw new Error('No checkout URL received');
            }
        } catch (error) {
            console.error('Checkout Error:', error);
            alert(`Payment setup failed: ${error.message}\nPlease check if the server is running at http://localhost:4000`);
        } finally {
            setIsLoading(false);
        }
    };

    // Add this debug information to your rendered component
    const debugInfo = process.env.NODE_ENV === 'development' && (
        <Box mt={2} p={2} bgcolor="grey.100" borderRadius={1}>
            <Typography variant="body2" color="textSecondary">
                Debug Info:
                <br />
                Server Status: {serverStatus || 'Checking...'}
                <br />
                User ID: {user?.uid || 'Not logged in'}
            </Typography>
        </Box>
    );


    if (!user) {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" p={3}>
        <Typography variant="h5" gutterBottom>
          Please sign in to view pricing
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => {
            console.log('Button clicked!'); // Check if this logs
            navigate('/signin');
                }}
          sx={{ mt: 2 }}
        >
          Sign In
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box py={6}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Choose Your Plan
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {/* Free Tier */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h4" component="h2" gutterBottom>
                  Free Plan
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  Basic features for everyone
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Home size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Basic workout plans" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Home size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Community support" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Home size={20} />
                    </ListItemIcon>
                    <ListItemText primary="Progress tracking" />
                  </ListItem>
                </List>

                <Typography variant="h4" align="center" sx={{ my: 2 }}>
                  ₹0/month
                </Typography>

                <Button 
                  variant="outlined"
                  fullWidth
                  onClick={handleFreeSubscription}
                  sx={{ mt: 2 }}
                >
                  Continue with Free
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* Premium Tier */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              height: '100%',
              border: '2px solid',
              borderColor: 'primary.main'
            }}>
              <CardContent>
                <Typography variant="h4" component="h2" color="primary" gutterBottom>
                  Premium Plan
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  Advanced features for serious fitness enthusiasts
                </Typography>
                
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Crown size={20} color="#3f51b5" />
                    </ListItemIcon>
                    <ListItemText primary="All Free features" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Crown size={20} color="#3f51b5" />
                    </ListItemIcon>
                    <ListItemText primary="Customized Diet plans" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Crown size={20} color="#3f51b5" />
                    </ListItemIcon>
                    <ListItemText primary="Personal training sessions" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Crown size={20} color="#3f51b5" />
                    </ListItemIcon>
                    <ListItemText primary="Priority support" />
                  </ListItem>
                </List>

                <Typography variant="h4" color="primary" align="center" sx={{ my: 2 }}>
                  ₹500/month
                </Typography>

                <Button 
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handlePaidSubscription}
                  disabled={isLoading}
                  sx={{ mt: 2 }}
                >
                  {isLoading ? 'Processing...' : 'Upgrade to Premium'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default PricingPage;