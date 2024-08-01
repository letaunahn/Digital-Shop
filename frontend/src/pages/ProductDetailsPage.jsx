import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { productData } from '../static/data'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import ProductDetails from '../components/Products/ProductDetails'
import SuggestedProduct from '../components/Products/SuggestedProduct'
import { useSelector } from 'react-redux'

const ProductDetailsPage = () => {
    const {id} = useParams()
    const [data, setData] = useState(null)
    const {allProducts} = useSelector((state) => state.products)
    const [searchParams] = useSearchParams()

    useEffect(() => {
        const data = allProducts && allProducts.find((i) => i._id === id)
        setData(data)
    }, [allProducts])


  return (
    <div>
        <Header/>
        <ProductDetails data={data}/>
        {
          data && <SuggestedProduct data={data}/>
        }
        <Footer/>
    </div>
  )
}

export default ProductDetailsPage