import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import ShopSettings from '../../components/Shop/ShopSettings'

const ShopSettingsPage = () => {
  return (
    <div>
        <DashboardHeader/>
        <div className='flex items-start justify-between w-full'>
            <div className='w-[60px] md:w-[250px]'>
                <DashboardSideBar active={11}/>
            </div>
            <ShopSettings/>
        </div>
    </div>
  )
}

export default ShopSettingsPage