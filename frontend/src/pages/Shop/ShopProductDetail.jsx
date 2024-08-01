import React, { useEffect, useState } from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import Footer from '../../components/Layout/Footer'
import ProductDetail from '../../components/Shop/ProductDetail'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ShopProductDetail = () => {
    const {id} = useParams()
    const [data, setData] = useState(null)
    const {allProducts} = useSelector((state) => state.products)

    useEffect(() => {
        const data = allProducts && allProducts.find((i) => i._id === id)
        setData(data)
    }, [allProducts])

  return (
    <div>
        <DashboardHeader/>
        <ProductDetail data={data}/>
        <Footer/>
    </div>
  )
}

export default ShopProductDetail