// import react and hooks from react
import React, { useEffect, useState } from 'react'

// import components
import LayOut from '../../Components/LayOut/LayOut'
import ProductCard from '../../Components/Product/ProductCard'
import Loader from '../../Components/Loader/Loader'

// import useParams from react-router-dom
import { useParams } from 'react-router-dom'

// import axios
import axios from 'axios'

// import endpoint
import { productUrl } from '../../Api/endPoints'


function ProductDetail() {

  // state for product
  const [product, setProduct] = useState({});

  // state for loading
  const [isLoading, setIsLoading] = useState(false)

  // get productId from useParams
  const {productId} = useParams()


  useEffect(() => {
    setIsLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=>{
      setProduct(res.data);
      setIsLoading(false)
    }).catch((err)=>{
      console.log(err)
      setIsLoading(false)
    })
  }, [])


  return (
    <LayOut> 
        {
        isLoading? (<Loader/>):(
        <ProductCard
            product={product}
            flex ={true}
            renderDesc={true}
            renderAdd={true}


        />)}
    </LayOut>
  )
}

export default ProductDetail