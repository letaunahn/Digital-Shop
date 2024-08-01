import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import AllEvents from '../../components/Shop/AllEvents'

const ShopAllEvents = () => {
  return (
    <div>
        <DashboardHeader/>
        <div className='flex justify-between w-full'>
            <div className='w-[60px] md:w-[250px]'>
                <DashboardSideBar active={5}/>
            </div>
            <div className='flex w-full justify-center'>
                <AllEvents/>
            </div>
        </div>
    </div>
  )
}

export default ShopAllEvents