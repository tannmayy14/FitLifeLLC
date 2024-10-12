import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['Exercise Plans', 'Customized Plans','Personal Trainer','Equipments','Pricing', 'About Us'];

function HomeNavbar() {
  return (
    <AppBar position="static" sx={{backgroundColor:"#1C1C1C"}}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo Section */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex'}, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'lato',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          {/* Navigation Links */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block',fontFamily: 'roboto', fontWeight:500}}
                href={`#${page.toLowerCase()}`}
              >
                {page}
              </Button>
            ))}
          </Box>

          {/* Profile Section */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="Profile" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default HomeNavbar;
