// importing react and hooks from react
import React, { useContext, useState } from "react";

// importing css module
import styles from "./Auth.module.css";

// importing Link from react-router-dom
import { Link, useNavigate, useLocation } from "react-router-dom";

// importing auth from firebase.js (from our config)
import { auth } from "../../Utility/firebase";

// importing firebase functions
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

// importing the context
import { DataContext } from "../../Components/DataProvider/DataProvider";

// importing clipLoader from react-spinners
import { ClipLoader } from "react-spinners";

function Auth() {
  // State to toggle between sign-in and sign-up forms
  const [isSignUp, setIsSignUp] = useState(false);

  // State variables for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // State variables for error messages and loading states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  // Using the context to get user data and dispatch function
  const [{ user }, dispatch] = useContext(DataContext);

  // Using useLocation to get the state from the previous page
  const navStateData = useLocation();

  // Destructuring message and redirect from the state
  const { message, redirect } = navStateData?.state || {};

  // Using useNavigate to redirect the user after signing in or signing up
  const navigate = useNavigate();

  // Function to handle authentication (sign-in or sign-up)
  const authHandler = (e) => {
    e.preventDefault();
    setError("");

    if (e.target.name === "signIn") {
      setLoading((prev) => ({ ...prev, signIn: true }));

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          dispatch({ type: "SET_USER", user: userCredential.user });
          setLoading((prev) => ({ ...prev, signIn: false }));
          navigate(redirect || "/");
          dispatch({
            type: "SET_POPUP",
            message: `Hello ${userCredential.user?.displayName?.split(" ")[0]}! Successfully logged In!`,
          });
        })
        .catch((error) => {
          setError(error.message.replace(/Firebase: /g, ""));
          setLoading((prev) => ({ ...prev, signIn: false }));
        });
    } else {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      setLoading((prev) => ({ ...prev, signUp: true }));

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          return updateProfile(user, {
            displayName: `${firstName.trim()} ${lastName.trim()}`,
          }).then(() => {
            dispatch({ type: "SET_USER", user: auth.currentUser });
            console.log("User created:", auth.currentUser);
            console.log("User display name:", auth.currentUser.displayName);
            setLoading((prev) => ({ ...prev, signUp: false }));
            navigate(redirect || "/");
            dispatch({
              type: Type.SET_POPUP,
              message: `Hello ${userCredential.user.displayName}! Successfully logged In!`,
            });
          });
        })
        .catch((error) => {
          setError(error.message.replace(/Firebase: /g, ""));
          setLoading((prev) => ({ ...prev, signUp: false }));
        });
    }
  };

  return (
    <section className={styles.login}>
      {/* Amazon logo */}
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="amazon logo"
        />
      </Link>

      {/* Authentication form */}
      <div className={styles.login__container}>
        {/* heading */}
        <h1>{isSignUp ? "Create Account" : "Sign In"}</h1>

        {/* Display message if provided */}
        {message && <small className={styles.message}>{message}</small>}

        <form action="">
          {isSignUp && (
            <>
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  id="firstName"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  id="lastName"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
            />
          </div>

          {isSignUp && (
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                id="confirmPassword"
                required
              />
            </div>
          )}

          <button
            type="submit"
            name={isSignUp ? "signUp" : "signIn"}
            onClick={authHandler}
            className={styles.login__signInButton}
          >
            {loading[isSignUp ? "signUp" : "signIn"] ? (
              <ClipLoader color="#000" size={20} />
            ) : isSignUp ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {!isSignUp && (
          <>
            <p className={styles.login__agreement}>
              By signing-in you agree to the Amazon Fake Clone Conditions of Use
              & Sale. Please see our <Link>Privacy Notice</Link>,{" "}
              <Link>our Cookies Notice</Link> and{" "}
              <Link>our Interest-Based Ads Notice</Link>.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setError("");
              }}
              className={styles.login__registerButton}
            >
              Create your Amazon account
            </button>
          </>
        )}

        {isSignUp && (
          <button
            type="button"
            onClick={() => {
              setIsSignUp(false);
              setError("");
            }}
            className={styles.login__registerButton}
          >
            Already have an account? Sign in
          </button>
        )}

        {error && <small className={styles.error}>{error}</small>}
      </div>
    </section>
  );
}

export default Auth;
