import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   const token = localStorage.getItem('token');
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         token ? <Component {...props} /> : <Navigate to="/login" />
//       }
//     />
//   );
// };

const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check if the user is authenticated
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to="/" />
  );

  // return <Route {...rest} element={isAuthenticated ? element : <Navigate to={"/"} />} />
  // if (!isAuthenticated) {
  //   // If the user is not authenticated, redirect them to the login page
  //   return <Navigate to="/login" />;
  // }
  //
  // // If the user is authenticated, render the element (passed Route component)
  // return component;
};



export default PrivateRoute;
