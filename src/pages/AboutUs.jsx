import React, { useState, useRef, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import { keyframes } from '@emotion/react';

// Define entrance animation
const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

function AboutUs() {
  const teamMembers = [
    { name: 'Tanmay Bhatkar', role: 'CEO' },
    { name: 'Mazin Bangi', role: 'CTO' },
    { name: 'Sahil Bangera', role: 'Lead Developer' },
    { name: 'Shannen Anthony', role: 'Project Manager' },
  ];

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement
  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div style={{
      backgroundColor: 'black',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      margin: 0,
      padding: 0,
    }} onMouseMove={handleMouseMove}>
      <Container
        maxWidth={false}
        sx={{
          flexGrow: 1,
          padding: '50px 20px',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            marginBottom: '30px',
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'white',
            animation: `${fadeInUp} 1s ease-out`
          }}
        >
          About Us
        </Typography>
        <Typography variant="body1" align="center" sx={{
          color: 'white',
          maxWidth: '800px',
          margin: '0 auto',
          animation: `${fadeInUp} 1s ease-out`,
          animationDelay: '0.5s',
          animationFillMode: 'backwards',
        }}>
          At FitLife, we believe that fitness and wellness should be accessible, enjoyable, and achievable for everyone. Founded by fitness enthusiasts who understand the challenges of staying motivated and consistent, we designed FitLife to be a comprehensive companion for all fitness levels. Our platform offers personalized workout and diet plans, progress tracking, expert guidance, and a supportive community to help you reach your goals. Whether you're starting your fitness journey or looking to take your performance to the next level, FitLife is here to support you every step of the way, making health a sustainable part of your daily life.
        </Typography>
        <div style={{ marginTop: '40px' }}>
          <Typography
            variant="h4"
            sx={{
              marginBottom: '30px',
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
              animation: `${fadeInUp} 1s ease-out`,
              animationDelay: '1s',
              animationFillMode: 'backwards',
            }}
          >
            Our Team
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} sx={{ animation: `${fadeInUp} 1s ease-out`, animationDelay: `${0.5 + index * 0.2}s`, animationFillMode: 'backwards' }}>
                <Card
                  sx={{
                    minHeight: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                    backgroundColor: 'white',  // Set card background to white
                    color: 'black',  // Set text color to black for contrast
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0px 0px 15px 5px rgba(255, 165, 0, 0.6)', // Orange glow effect
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      borderRadius: '12px', // Rounded corners for the profile picture
                      overflow: 'hidden',
                      '& img': {
                        display: 'block',
                        width: '100px',
                        height: '100px',
                        borderRadius: '12px', // Round the edges of the image itself
                        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                      },
                      '&:hover img': {
                        transform: 'scale(1.1)', // Slightly enlarge image on hover
                        boxShadow: '0px 0px 10px 5px rgba(255, 165, 0, 0.6)', // Orange glow around the image
                      },
                    }}
                  >
                    <img
                      src="/src/assets/man running.gif"
                      alt="Running Man"
                      style={{ marginBottom: '15px' }}
                    />
                  </Box>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ color: 'black', marginBottom: '5px' }}>
                      {member.name.split('').map((letter, letterIndex) => {
                        // Calculate hover effect based on cursor position
                        const letterRef = useRef(null);
                        useEffect(() => {
                          if (letterRef.current) {
                            const rect = letterRef.current.getBoundingClientRect();
                            const letterCenterX = rect.left + rect.width / 2;
                            const letterCenterY = rect.top + rect.height / 2;
                            const distance = Math.sqrt(
                              (mousePosition.x - letterCenterX) ** 2 +
                              (mousePosition.y - letterCenterY) ** 2
                            );
                            const hoverHeight = Math.max(0, 20 - distance / 10); // Adjust divisor for sensitivity
                            letterRef.current.style.transform = `translateY(-${hoverHeight}px)`;
                          }
                        }, [mousePosition]);

                        return (
                          <span key={letterIndex} ref={letterRef} style={{ display: 'inline-block', transition: 'transform 0.1s ease-out' }}>
                            {letter}
                          </span>
                        );
                      })}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'gray' }}>
                      {member.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Container>
    </div>
  );
}

export default AboutUs;