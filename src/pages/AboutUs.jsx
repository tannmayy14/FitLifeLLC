import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';

function AboutUs() {
  const teamMembers = [
    { name: 'John Doe', role: 'CEO' },
    { name: 'Jane Smith', role: 'CTO' },
    { name: 'Michael Brown', role: 'Lead Developer' },
    { name: 'Emily Davis', role: 'Project Manager' },
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
          We are a dynamic company focused on delivering high-quality products to our clients. Our mission is to innovate and constantly improve our processes to provide exceptional value to our customers.
        </Typography>
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