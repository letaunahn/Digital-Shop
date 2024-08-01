import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const TrackOrder = () => {

  const {user} = useSelector((state) => state.user)

  const { id } = useParams()

  const orders = [
    {
      _id: "7463hvbfbhfbrtr28820221",
      orderItems: [
        {
          name: "Iphone 14 Promax",
        },
      ],
      totalPrice: 120,
      status: "Processing",
    },
  ];

  const data = orders && orders.find((item) => item._id === id)
  return (
    <div className='w-full h-[80vh] flex justify-center items-center'>
      {" "}
      <>
        {data && data?.status === "Processing" ? (
          <h1 className='text-[20px]'>Your order is processing in shop.</h1>
        ): data?.status === "Transfered to delivery partner" ? (
          <h1 className='text-[20px]'>Your Order is on the way for delivery partner.</h1>
        ): data?.status === "Shipping" ? (
          <h1 className='text-[20px]'>Your Order is on the way with our delivery partner.</h1>
        ) : data?.status === "Received" ? (
          <h1 className='text-[20px]'>Your Order is in your address. Our Delivery man will deliver it.</h1>
        ) : data?.status === "On the way" ? (
          <h1 className='text-[20px]'>Our Delivery man is going to deliver your order.</h1>
        ) : data?.status === "Delivered" ? (
          <h1 className='text-[20px]'>Your order is delivered!</h1>
        ) : data?.status === "Processing refund" ? (
          <h1 className='text-[20px]'>Your refund is processing!</h1>
        ) : data?.status === "Refund Success" ? (
          <h1 className='text-[20px]'>Your refund is success!</h1>
        ) : null}
      </>
    </div>
  )
}

export default TrackOrder