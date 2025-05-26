// import React and useContext hook from 'react'
import React, { useContext } from 'react'

// import components
import LayOut from '../../Components/LayOut/LayOut'
import ProductCard from '../../Components/Product/ProductCard'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';

// import context
import { DataContext } from '../../Components/DataProvider/DataProvider';

// import Link from react-router-dom
import {Link} from 'react-router-dom'

// import css
import styles from './Cart.module.css'

// import action type
import {Type} from '../../Utility/action.type'

// import icons
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";




function Cart() {

    // destructuring the basket and user from the context
    const [{ basket, user }, dispatch] = useContext(DataContext);


    // calculating the total price of the items in the basket
    // using reduce method to iterate over the basket and calculate the total price
    const total = basket.reduce((amount,item)=>{
        return  amount + (item.amount * item.price)
    },0)


    // function to increment the amount of the item in the basket
    const increment =(item)=>{
    dispatch({
        type:Type.ADD_TO_BASKET,
        item
    })
    }

    // function to decrement the amount of the item in the basket
    const decrement =(id)=>{
    dispatch({
        type :Type.REMOVE_FROM_BASKET,
        id
    })
    }




  return (

    <LayOut> 
     <section className={styles.container} >
      <div className={styles.cart__container}>


          <h2>Hello</h2>
          <h3>Your shopping basket </h3>
          <hr />


          {
            basket?.length==0?(
            <p>Opps ! No item in your cart</p>):(
              basket?.map((item,i)=>{
            return <section className={styles.cart_product}>
            <ProductCard
               key={i}
                 product={item}
                 renderDesc={true}
                 renderAdd={false}
                 flex={true}
               />
            
            <div className={styles.btn_container} >
                
                <button className={styles.btn} onClick={()=>increment(item)}>
                        <IoIosArrowUp size={20}/>
                </button>
                
                <span>{item.amount}</span>
                
                <button className={styles.btn} onClick={()=>decrement(item.id)}>
                        <IoIosArrowDown size={20}/>
                </button>
            </div>

                </section>
              })
            )
          }

      </div>




            {basket?.length !==0&&(
            <div className={styles.subtotal}>
                
                <div>
                    <p>Subtotal ({basket?.length} items)</p>
                    <CurrencyFormat amount={total}/>
                </div>

                <span>
                    <input type="checkbox" />
                    <small>This order contains a gift</small>
                </span>

                <Link to="/payments">Continue to checkout</Link>
                
            </div>

            )}
     </section>
    </LayOut>
  )
}

export default Cart