import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Destinations from "../pages/Destinations";
import DestinationDetails from "../pages/DestinationDetails";
import AddDestination from "../pages/AddDestination";
import EditDestination from "../pages/EditDestination";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import ProtectedRoute from "./ProtectedRoute";
import Favorites from "../pages/Favorites";

function AppRoutes() {
 return (
   <Routes>
     <Route
       path="/"
       element={<Home />}
     />

     <Route
      path="/destinations"
      element={
        <ProtectedRoute>
          <Destinations />
        </ProtectedRoute>
      }
    />

     <Route
       path="/destinations/:id"
       element={<DestinationDetails />}
     />

     <Route
       path="/add-destination"
       element={<AddDestination />}
     />

     <Route
  path="/edit-destination/:id"
  element={
    <ProtectedRoute>
      <EditDestination />
    </ProtectedRoute>
  }
/>

    <Route
       path="/register"
       element={<Register />}
     />

    <Route
       path="/login"
       element={<Login />}
     />
    
    <Route
       path="/logout"
       element={<Logout />}
     />

     <Route
      path="/add-destination"
      element={
        <ProtectedRoute>
          <AddDestination />
        </ProtectedRoute>
      }
    />
    <Route
      path="/favorites"
      element={
        <ProtectedRoute>
          <Favorites />
        </ProtectedRoute>
      }
    />


   </Routes>
 );
}

export default AppRoutes;