import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '@fontsource/bebas-neue'; 
import '@fontsource/oswald'; 
import Container from '@mui/material/Container';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import images from './image.js'; // Adjust this path according to where images.js is

import './LandingPage.css'; // Assuming you're using a CSS file for custom styles

export default function LandingPage() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl" disableGutters>
        <Box
          sx={{
            bgcolor: '#0D0D0D',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'row',
            padding: '20px',
            border: '2px solid #393D3F',
            accentColor: '#9cc4b2',
            overflow: 'hidden',
            zIndex:"2",
          }}
        >
          {/* Left Section: Text */}
          <Box
            sx={{
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingLeft: '80px',
              zIndex:"2",
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontFamily: 'Oswald, sans-serif',
                color: '#FFFFFF',
                fontSize: '8rem',
                fontWeight: 1000,
                textAlign: "left",
                zIndex:"2",
              }}
            >
              FitLifeCo
            </Typography>
            <Typography
              variant="h3"
              component="h3"
              sx={{
                fontFamily: 'Bebas Neue, sans-serif',
                color: '#00FFCC',
                fontSize: '3.5rem',
                fontWeight: 500,
                textAlign: "left",
                marginTop: '20px',
                zIndex:"2",
              }}
            >
              <b>Unleash yourself!</b><br />Be the best you can be!
            </Typography>
          </Box>

          {/* Right Section: Image Slider */}
          <Box
            sx={{
              width: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px',
              height: '100%',
              boxSizing: 'border-box',
              position: 'relative', // Allows dots to be positioned correctly
              paddingTop:"50px",
              zIndex:"2",
            }}
          >
            <Slider {...sliderSettings} style={{ width: '100%', height: '100%' }}>
              {images.map((image, index) => (
                <Box
                  key={index}
                  component="img"
                  src={image}
                  alt={`Slider image ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover', // Makes sure the image covers the entire slider without distortion
                    maxHeight: '715px', // Enforce a maximum height to prevent stretching
                    boxShadow: '0 12px 12px rgba(255, 255, 255,21)',
                    borderRadius: '30px',
                    zIndex:"2",
                  }}
                />
              ))}
            </Slider>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
