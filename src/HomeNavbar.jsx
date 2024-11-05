import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import '@fontsource/oswald'; 
import AdbIcon from '@mui/icons-material/Adb';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const pages = [
    {name: 'Home', path:'/'},
    { name: 'Exercise Plans', path: '/exercise-plans' },
    { name: 'Customized Diet Plans', path: '/customized-plans' },
    { name: 'Personal Trainer', path: '/personal-trainer' },
    { name: 'Store', path: '/equipments' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About Us', path: '/about-us' }
];

function HomeNavbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [profileImageUrl, setProfileImageUrl] = React.useState("default-profile.jpg");
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        return () => unsubscribe();
      }, []);
      
      React.useEffect(() => {
        const fetchProfileImageUrl = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                try {
                    const docSnap = await getDoc(userDocRef);
                    if (docSnap.exists()) {
                        const imageUrl = docSnap.data().photoURL;
                        setProfileImageUrl(imageUrl || "default-profile.jpg");
                    }
                } catch (error) {
                    console.error("Error fetching profile image from Firestore:", error);
                    setProfileImageUrl("default-profile.jpg");
                }
            }
        };
        fetchProfileImageUrl();
      }, [user]);
    
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    
      const handleSignOut = async () => {
        try {
          await signOut(auth);
          handleClose();
          navigate('/');
          setProfileImageUrl("default-profile.jpg");
        } catch (error) {
          console.error('Error signing out: ', error);
        }
      };

  return (
    <AppBar position="static" sx={{backgroundColor:"#1C1C1C"}}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          {/* Logo Section */}
          <img src="./src/assets/man running.gif" alt="Running Man" style={{ height: '60px', marginRight: '-0px' }} />
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex'}, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Oswald',
              fontWeight: 1000,
              letterSpacing: '.5rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >FitLife
          </Typography>

          {/* Navigation Links */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            {pages.map((page) => (
              <Link
                key={page.name}
                to={page.path}
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'block',
                    fontFamily: 'Oswald',
                    fontWeight: 700,
                    padding: '10px 10px',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    letterSpacing: '.1rem',
                    transition: 'background-color.3s ease',
                    '&:hover': { backgroundColor: '#252525' },
                  }}
                >
                  {page.name}
                </Typography>
              </Link>
            ))}
          </Box>

          {/* Profile Section */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton 
              onClick={handleClick}
              sx={{ p: 0 }}
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
            <Avatar alt="Profile" src={profileImageUrl || "/static/images/avatar/2.jpg"} />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
            {/* {!user ? (
                <>
                  <MenuItem onClick={handleClose} component={Link} to="/signin">
                    <ListItemIcon>
                      <LoginIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Sign In</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleClose} component={Link} to="/signup">
                    <ListItemIcon>
                      <PersonAddIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Sign Up</ListItemText>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleClose} component={Link} to="/cart">
                    <ListItemIcon>
                      <ShoppingCartIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Cart</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={handleSignOut}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default HomeNavbar; */}
{user ? (
                <>
                  <MenuItem onClick={handleClose}>
                    <Typography>Welcome, {user.displayName || user.email}</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleSignOut}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Sign Out</ListItemText>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleClose} component={Link} to="/signin">Sign In</MenuItem>
                  <MenuItem onClick={handleClose} component={Link} to="/signup">Sign Up</MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default HomeNavbar;