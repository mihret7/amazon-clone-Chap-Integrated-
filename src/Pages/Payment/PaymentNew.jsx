// importing react hooks
import React, { useContext, useState } from "react";

// importing styles
import styles from "./Payment.module.css";

// importing components
import LayOut from "../../Components/LayOut/LayOut";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";

// importing context
import { DataContext } from "../../Components/DataProvider/DataProvider";

// importing types
import { Type } from "../../Utility/action.type";

// importing stripe components
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// importing axios instance
import { axiosInstance } from "../../Api/axios";

// importing react-spinners
import { ClipLoader } from "react-spinners";

// importing firebase
import { db } from "../../Utility/firebase";

// Import the specific Firestore functions needed in this component
import { collection, doc, setDoc } from 'firebase/firestore';


// importing react-router-dom
import { useNavigate } from "react-router-dom";





function Payment() {
  const [{ user, basket, popup }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return (amount) + (item.amount);
  }, 0);

  const total = basket.reduce((amount, item) => {
    return (item.amount + amount) * (item.price );
  }, 0);
  
  const totalInt = parseInt(total);
  console.log(totalInt);
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${totalInt * 100}`,
      });

      const clientSecret = response.data?.clientSecret;

      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      
  // Get a reference to the specific order document path using the modular functions
  // doc(database, collectionPath, documentId)
  // or doc(documentReference, collectionPath, documentId) for subcollections

  const orderDocRef = doc(
    collection(doc(db, "users", user.uid), "orders"), // This builds the reference path
    paymentIntent.id                                 // This is the final doc ID
  );

  // Alternatively, build it step by step which can be clearer:
  // const userDocRef = doc(db, "users", user.uid);
  // const ordersCollectionRef = collection(userDocRef, "orders");
  // const orderDocRef = doc(ordersCollectionRef, paymentIntent.id);


  // Use the modular setDoc function to write the data
  await setDoc(orderDocRef, {
    basket: basket,
    amount: paymentIntent.amount,
    created: paymentIntent.created,
  });



        
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      dispatch({
            type: Type.SET_POPUP,
            message: "Payment successfully completed!",
          });
      navigate("/orders", { state: { msg: "you have placed new Order" } });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* header */}
      <div className={styles.payment__header}>
        Checkout ({totalItem}) items
      </div>
      {/* payment method */}
      <section className={styles.payment}>
        {/* address */}
        <div className={styles.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 Piassa</div>
            <div>Hawassa, Ethiopia</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={styles.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={styles.flex}>
          <h3>Payment methods</h3>
          <div className={styles.payment__card__container}>
            <div className={styles.payment__details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={styles.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={styles.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait ...</p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;