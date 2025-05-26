// import react and hooks from react
import React, { useEffect, useState } from 'react'

// import axios for api call
import axios from 'axios'

// import components
import ProductCard from './ProductCard'
import Loader from "../Loader/Loader"

// import css module
import styles from './Product.module.css'


function Product() {

    // state for products
    const [products, setProducts] = useState()
    // state for loading
    const [isLoading, setIsLoading] = useState(false)


    useEffect(() => {
      setIsLoading(true)
      axios.get('https://fakestoreapi.com/products')
      .then((res)=>{
        setProducts(res.data)
        setIsLoading(false)
      }).catch((err)=>{
        console.log(err)
        setIsLoading(false)
      })
    }, [])


    
  return (

  <>
  {
    isLoading?(<Loader/>) : ( 
    
    <section className={styles.products_container}>
      {
          products?.map((singleProduct)=>{
            return  <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id}/>
                })
      }
     </section>)
  }
  </>

  )
}

export default Product