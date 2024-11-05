// import React from 'react';
// import { Box, Typography, Button } from '@mui/material';
// import { useLocation } from 'react-router-dom';

// const CartSuccess = () => {
//   const location = useLocation();
//   const cartData = new URLSearchParams(location.search).get('cart_data');
//   let cart = [];

//   // Check if cartData exists and parse it
//   if (cartData) {
//     try {
//       cart = JSON.parse(cartData);
//     } catch (error) {
//       console.error('Error parsing cart data:', error);
//       // Optionally handle parsing errors
//     }
//   }

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//         backgroundColor: 'background.default',
//       }}
//     >
//       <Box
//         sx={{
//           backgroundColor: 'primary.main',
//           color: 'primary.contrastText',
//           padding: 4,
//           borderRadius: 2,
//           textAlign: 'center',
//         }}
//       >
//         <Typography variant="h4" gutterBottom>
//           Order Successful
//         </Typography>
//         <Typography variant="body1" gutterBottom>
//           Thank you for your purchase!
//         </Typography>
//         {cart.length > 0 ? (
//           <Box mt={4}>
//             <Typography variant="h6" gutterBottom>
//               Your Order:
//             </Typography>
//             {cart.map((item) => (
//               <Typography key={item.name}>
//                 {item.name} x {item.count}
//               </Typography>
//             ))}
//           </Box>
//         ) : (
//           <Typography variant="body1" gutterBottom>
//             No cart data available.
//           </Typography>
//         )}
//         <Button
//           variant="contained"
//           color="secondary"
//           href="/"
//           sx={{ mt: 4 }}
//         >
//           Back to Home
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default CartSuccess;
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { keyframes } from '@emotion/react';

const slideUp = keyframes`
  0% {
    transform: translateY(100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const CartSuccess = () => {
  const location = useLocation();
  const cartData = new URLSearchParams(location.search).get('cart_data');
  let cart = [];

  // Check if cartData exists and parse it
  if (cartData) {
    try {
      cart = JSON.parse(cartData);
    } catch (error) {
      console.error('Error parsing cart data:', error);
      // Optionally handle parsing errors
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: 'linear-gradient(to bottom, #87CEEB, #ADD8E6)',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          padding: 8,
          borderRadius: 4,
          textAlign: 'center',
          animation: `${slideUp} 0.8s ease-out`,
        }}
      >
        <Typography variant="h2" gutterBottom>
          Thank you for shopping with us!
        </Typography>
        <Typography variant="h4" gutterBottom>
          Your Order is Successful
        </Typography>
        {cart.length > 0 ? (
          <Box mt={8}>
            <Typography variant="h5" gutterBottom>
              Your Order:
            </Typography>
            {cart.map((item) => (
              <Typography key={item.name} variant="h6">
                {item.name} x {item.count}
              </Typography>
            ))}
          </Box>
        ) : (
          <Typography variant="h5" gutterBottom>
            No cart data available.
          </Typography>
        )}
        <Button
          variant="contained"
          color="secondary"
          href="/"
          sx={{ mt: 8, px: 6, py: 2 }}
          component="a"
        >
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default CartSuccess;