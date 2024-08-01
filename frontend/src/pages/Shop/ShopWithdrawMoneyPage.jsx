import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import WithdrawMoney from '../../components/Shop/WithdrawMoney'

const ShopWithdrawMoneyPage = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className='w-full flex justify-between'>
        <div className='w-[60px] md:w-[250px]'>
          <DashboardSideBar active={7}/>
        </div>
        <WithdrawMoney/>
      </div>
    </div>
  )
}

export default ShopWithdrawMoneyPage