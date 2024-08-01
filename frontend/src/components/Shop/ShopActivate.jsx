import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { server } from '../../app'

const ShopActivate = () => {
    const {activation_token} = useParams()
    const [error, setError] = useState(false)

    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                  const res = await axios.post(`${server}/shop/activation`, {
                    activation_token,
                  });
                  console.log(res.data.message);
                } catch (error) {
                  console.log(error.response.data.message);
                  setError(true);
                }
              };
              activationEmail();
        }
    }, [activation_token])
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <>
        <p>Your account has been created successfully!</p>
        <Link to="/shop-login">Click to Login</Link>
        </>
      )}
    </div>
  )
}

export default ShopActivate