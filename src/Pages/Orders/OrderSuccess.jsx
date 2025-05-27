import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import LayOut from "../../Components/LayOut/LayOut";

const OrderSuccess = () => {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {

    dispatch({ type: Type.EMPTY_BASKET });

    dispatch({
      type: Type.SET_POPUP,
      message: "Payment successful! Your order has been placed.",
    });

    const timer = setTimeout(() => {
      navigate("/orders");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  

  return (
    <LayOut>
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>🎉 Payment Successful!</h2>
        <p>Thank you for your purchase. Redirecting to your orders...</p>
      </div>
    </LayOut>
  );
};

export default OrderSuccess;
