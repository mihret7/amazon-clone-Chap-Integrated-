// importing React and necessary hooks
import React, { useContext, useEffect } from "react";

// importing useNavigate from react-router-dom
import { useNavigate } from "react-router-dom";

// importing context
import { DataContext } from "../DataProvider/DataProvider";
import Loader from "../Loader/Loader";



const ProtectedRoute = ({ children, message, redirect }) => {
 
  // using useNavigate to redirect the user
  const navigate = useNavigate();

  // using useContext to get the user data from DataContext
  const [{ user, loading }, dispatch] = useContext(DataContext);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", { state: { message, redirect } });
    }
  }, [user, loading, navigate, message, redirect]);

  if (loading) {
    // Show nothing or a loading spinner while auth initializes
    return <>
      <Loader/>
    </>;
  }

  return children;
};

export default ProtectedRoute;