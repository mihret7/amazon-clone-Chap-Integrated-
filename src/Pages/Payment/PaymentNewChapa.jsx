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

// importing chapa components
// import ChapaCheckout from '@chapa_et/inline.js';

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
  // using usecontext to get user, basket and popup data
  const [{ user, basket, popup }, dispatch] = useContext(DataContext);

  // calculating the total number of items in the basket
  const totalItem = basket?.reduce((amount, item) => {
    return amount + item.amount;
  }, 0);

  // calculating the total price of the items in the basket
  const total = basket.reduce((amount, item) => {
    return amount + item.amount * item.price;
  }, 0);

  // state to manage card error and processing state
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);


  const [checkout_url, setCheckout] = useState(null);

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
        url: `/payment/create?total=${total}`,
        data: {
          email: user?.email,
          first_name: user?.displayName?.split(" ")[0],
          last_name: user?.displayName?.split(" ")[1],
          return_url: "https://localhost:5173/orders-success",
        },
      });

      const checkoutUrl = response.data?.checkout_url;
      const tx_ref = response.data?.tx_ref;

      const orderDocRef = doc(
        collection(doc(db, "users", user.uid), "orders"),
        tx_ref
      );

      // Create a new document reference in the user's orders collection
      await setDoc(orderDocRef, {
        basket: basket,
        amount: total,
        created: new Date(),
      });

      if (!checkoutUrl) {
        dispatch({
          type: Type.SET_POPUP,
          message: "Failed to create payment intent. Please try again.",
        });
        setProcessing(false);
        return;
      }

      window.location.href = checkoutUrl;

      setProcessing(false);
      dispatch({
        type: Type.SET_POPUP,
        message: "Redirecting to Chapa payment...",
      });
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* header */}
      <div className={styles.payment__header}>Checkout ({totalItem}) items</div>
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

                {/* price */}
                <div className={styles.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order |</p> <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit" disabled={processing}>
                    {processing ? (
                      <ClipLoader size={20} color="#fff" />
                    ) : (
                      "Pay Now"
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