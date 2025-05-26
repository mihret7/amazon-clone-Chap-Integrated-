// importing React and necessary hooks
import React, { useContext, useEffect } from "react";

// importing useNavigate from react-router-dom
import { useNavigate } from "react-router-dom";

// importing context
import { DataContext } from "../DataProvider/DataProvider";



const ProtectedRoute = ({ children, message, redirect }) => {
 
  // using useNavigate to redirect the user
  const navigate = useNavigate();

  // using useContext to get the user data from DataContext
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { message, redirect } });
    }
  }, [user]);



  return children;
};

export default ProtectedRoute;