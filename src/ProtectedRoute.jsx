// import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';

// // Protected route for premium features
// export const PremiumRoute = ({ children, user }) => {
//   const location = useLocation();
//   if (!user) {
//     return <Navigate to="/signin" state={{ from: location }} replace />;
//   }

//   // Check if user has premium subscription
//   if (!user.subscriptionStatus || user.subscriptionStatus !== 'premium') {
//     // Redirect to pricing while saving the attempted location
//     return <Navigate to="/pricing" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export const AuthRoute = ({ children, user }) => {
//     const location = useLocation();
  
//     if (!user) {
//       // Redirect to login while saving the attempted location
//       return <Navigate to="/signin" state={{ from: location }} replace />;
//     }
  
//     return children;
//   };
  
//   export default {
//     PremiumRoute,
//     AuthRoute
//   };
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Paywall from './pages/paywall'; // We'll create this next

// Protected route for premium features
export const PremiumRoute = ({ children, user }) => {
  const location = useLocation();
  
   // Render Paywall if the user is not logged in or lacks a premium subscription
   if (!user || !user.subscriptionStatus || user.subscriptionStatus !== 'premium') {
    return <Paywall user={user} currentPath={location.pathname} />;
  } 
  // if (!user) {
  //   return <Navigate to="/signin" state={{ from: location }} replace />;
  // }
  
  // // Check if user has premium subscription
  // if (!user.subscriptionStatus || user.subscriptionStatus !== 'premium') {
  //   // Instead of redirecting to pricing, render the PaywallPage
  //   return <Paywall user={user} currentPath={location.pathname} />;
  // }
  
  return children;
};

export const AuthRoute = ({ children, user }) => {
  const location = useLocation();
  
  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  
  return children;
};

export default {
  PremiumRoute,
  AuthRoute
};