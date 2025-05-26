// import React from 'react'
import React, { useContext }  from 'react'

// import material ui 
import Rating from '@mui/material/Rating'

// import components
import CurrencyFormat from '../CurrencyFormat/CurrencyFormat'

// import css
import styles from './Product.module.css'

// importing Link from react-router-dom
import {Link} from 'react-router-dom'

// importing the context
import { DataContext } from '../DataProvider/DataProvider'

// importing action type
import {Type} from '../../Utility/action.type'




function ProductCard({product,flex,renderDesc,renderAdd}) {

    // destructuring the product
    const { 
        image, 
        title, 
        id, 
        rating, 
        price,
        description} = product;
    

    const [state,dispatch]=useContext(DataContext)
      
     

    // function to add the item to the cart
    // this function will be called when the user clicks on the add to cart button
    const addToCart = ()=>{
        dispatch({
            type:Type.ADD_TO_BASKET,
            item:{
                image, title, id, rating, price,description
            }
        })
      }
  


  return (
    <div  
    className={`${styles.card__container} ${flex?styles.product__flexed : ''}`}>

        <Link to={`/products/${id}`}>
            <img src={image} alt="" className={styles.img_container}/>
        </Link>


        <div>
            {/* title */}
            <h3>{title}</h3>

            {/* description */}
            {renderDesc && <div style={{maxWidth:"750px"}}>{description}</div>}


            <div className={styles.rating}>
                 {/* rating */}
                 <Rating value={rating?.rate} precision={0.1}/>
                  {/*count  */}
                  <small>{rating?.count}</small>

            </div>


            <div>
                {/* price */}
                <CurrencyFormat amount={price}/>
            </div>

            
      {
        renderAdd &&   <button className={styles.button} onClick={addToCart} >
        add to cart
        </button>
      }
     
   
    
   
       
        </div>



    </div>
  )
}

export default ProductCard