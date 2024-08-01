import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import CreateEvent from '../../components/Shop/CreateEvent'

const ShopCreateEvents = () => {
  return (
    <div>
        <DashboardHeader/>
        <div className='w-full flex justify-between'>
            <div className='w-[60px] md:w-[250px]'>
                <DashboardSideBar active={6}/>
            </div>
            <div className='w-full justify-center items-center flex'>
                <CreateEvent/>
            </div>
        </div>
    </div>
  )
}

export default ShopCreateEvents