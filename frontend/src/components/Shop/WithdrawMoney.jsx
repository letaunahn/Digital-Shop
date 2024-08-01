import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../../styles/styles';
import { toast } from 'react-toastify';
import { RxCross1 } from 'react-icons/rx';
import { AiOutlineDelete } from 'react-icons/ai';

const WithdrawMoney = () => {
  const [open, setOpen] = useState(false)
  const { seller } = useSelector((state) => state.seller)
  const [paymentMethod, setPaymentMethod] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState(50)

  const availableBalance = 50//seller?.availableBalance.toFixed(2)

  const error = () => {
    toast.error("You do not have enough balance to withdraw!")
  }

  return (
    <div className='w-full h-[90vh] p-8'>
      <div className='w-full bg-white h-full rounded flex items-center justify-center flex-col'>
        <h5 className='text-[20px] pb-4'>Available Balance: </h5>
        <div className={`${styles.button} text-white !h-[42px] !rounded`} onClick={()=> (availableBalance < 50 ? error() : setOpen(true))}
        >Withdraw</div>
      </div>
      {
        open && (
          <div className='w-full h-screen z-50 fixed top-0 left-0 flex items-center justify-center bg-[#0000004e]'>
            <div className={`w-[95%] md:w-1/2 bg-white shadow rounded ${paymentMethod ? "h-[80vh] overflow-y-scroll" : "h-[unset]"} min-h-[40vh] p-3`}>
              <div className='w-full flex justify-end'>
                <RxCross1 size={25} onClick={() => setOpen(false) || setPaymentMethod(false)} className='cursor-pointer'/>
              </div>
              {
                paymentMethod ? (
                  <div>
                    <h3 className='text-[22px] font-[Poppins] text-center font-[600]'>Add new withdraw method:</h3>
                  </div>
                ) : (
                  <>
                    <h3 className='text-[22px] font-[Poppins]'>Available Withdraw Methods:</h3>
                    <div>
                      <div className='md:flex w-full justify-between items-center'>
                        <div className='md:w-1/2'>
                          <h5>
                            Account Number:{" "}
                          </h5>
                          <h5>Bank Name:</h5>
                        </div>
                        <div className='md:w-1/2'>
                          <AiOutlineDelete size={25} className='cursor-pointer'/>
                        </div>
                      </div>
                      <br />
                      <h4>Available Balance: {availableBalance}</h4>
                      <br />
                      <div>
                        <input type="number" placeholder='Amount...' value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} className='md:w-[100px] w-full border md:mr-3 p-1 rounded'/>
                        <div className={`${styles.button} !h-[42px] text-white`}>Withdraw</div>
                      </div>
                    </div>
                  </>
                )
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default WithdrawMoney