// importing react from react
import React, { useContext, useState } from 'react'

// importing css
import styles from './Auth.module.css'


// importing Link from react-router-dom
import {Link, useNavigate, useLocation} from 'react-router-dom'




//importing auth from firebase.js (from our config)
import {auth} from '../../Utility/firebase'

// importing firebase functions
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'


// importing the context
import {DataContext} from '../../Components/DataProvider/DataProvider'

// importing clipLoader from react-spinners
import { ClipLoader } from 'react-spinners';





function Auth() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false
  });

  // using the context
  const [{user}, dispatch] = useContext(DataContext);

  // using useLocation to get the state from the previous page
  const navStateData = useLocation();
  const {message, redirect} = navStateData?.state || {};


  // using useNavigate to redirect the user to the home page after signing in or signing up
  const navigate = useNavigate();


  const authHandler = (e) => { 
      e.preventDefault();
      if(e.target.name === 'signIn') {
        setLoading({...loading, signIn: true});
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          dispatch({
            type: "SET_USER",
            user: userCredential.user
          });
          setLoading({...loading, signIn: false});
          navigate(redirect || '/');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const cleanedMessage = errorMessage.replace(/Firebase: /g, '');
          setError(cleanedMessage);
          setLoading({...loading, signIn: false});
        });

  } else {
     setLoading({...loading, signUp: true});
     createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          dispatch({
            type: "SET_USER",
            user: userCredential.user
          });
        setLoading({...loading, signUp: false});
        navigate(redirect || '/');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const cleanedMessage = errorMessage.replace(/Firebase: /g, '');
          setError(cleanedMessage);
          setLoading({...loading, signUp: false});
        });
  }

}

 
  
  return (
    <section className={styles.login}>
       

       {/* logo */}
       <Link to={'/'}>
           <img 
           src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" 
           alt='amazon logo' />
       </Link>


       {/* form */}
       <div className={styles.login__container}>

        


        <h1>Sign In</h1>
        {message && <small className={styles.message}>{message}</small>}
        

        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" />
          </div>

          <button 
          type='submit' 
          name='signIn'
          onClick={authHandler} 
          className={styles.login__signInButton}>
            {loading.signIn ? <ClipLoader color="#000" size={20} /> : "Sign In"}
            </button>

        </form>

        {/* agreement */}
        <p>
          By signing-in you agree to the Amazon Fake Clone Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>

        <button 
        type='submit' 
        name='signUp'
        onClick={authHandler} className={styles.login__registerButton}>
         {loading.signUp ? <ClipLoader color="#000" size={20} /> : "Create your Amazon account"}
         </button>


        {error && <small className={styles.error}> {error}</small>}
       </div>
        
    </section>
  )
}

export default Auth