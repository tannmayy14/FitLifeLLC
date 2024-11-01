import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

function AboutUs() {
  const teamMembers = [
    { name: 'Tanmay Bhatkar', role: 'CEO' },
    { name: 'Mazin Bangi', role: 'CTO' },
    { name: 'Sahil Bangera', role: 'Lead Developer' },
    { name: 'Shannen Anthony', role: 'Project Manager' },
  ];

  return (
    <div style={{
      backgroundColor: 'black',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      margin:0,
      padding: 0,
    }}>
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
          sx={{ marginBottom: '30px', fontWeight: 'bold', textAlign: 'center', color: 'white' }}
        >
          About Us
        </Typography>
        <Typography variant="body1" align="center" sx={{ color: 'white', maxWidth: '800px', margin: '0 auto' }}>
        At FitLife, we believe that fitness and wellness should be accessible, enjoyable, and achievable for everyone. Founded by fitness enthusiasts who understand the challenges of staying motivated and consistent, we designed FitLife to be a comprehensive companion for all fitness levels. Our platform offers personalized workout and diet plans, progress tracking, expert guidance, and a supportive community to help you reach your goals. Whether you're starting your fitness journey or looking to take your performance to the next level, FitLife is here to support you every step of the way, making health a sustainable part of your daily life.</Typography>
        <div style={{ marginTop: '40px' }}>
          <Typography
            variant="h4"
            sx={{ marginBottom: '30px', fontWeight: 'bold', textAlign: 'center', color: 'white' }}
          >
            Our Team
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    minHeight: '300px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '20px',
                    backgroundColor: '#1a1a1a',
                    color: 'white',
                  }}
                >
                  <img
                    src="/src/assets/man running.gif"
                    alt="Running Man"
                    style={{ height: '100px', width: '100px', marginBottom: '15px' }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ color: 'white' }}>
                      {member.name}
                    </Typography>
                    <Typography color="textSecondary">{member.role}</Typography>
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