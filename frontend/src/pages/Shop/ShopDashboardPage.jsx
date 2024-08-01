import React from 'react'
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader'
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar'
import DashboardHero from '../../components/Shop/DashboardHero'

const ShopDashboardPage = () => {
  return (
    <div>
      <DashboardHeader/>
      <div className='w-full flex'>
        <div className='flex items-start justify-between w-full'>
          <div className='w-[60px] md:w-[250px]'>          
            <DashboardSideBar active={1}/>
          </div>
          <DashboardHero/>
        </div>
      </div>
    </div>
  )
}

export default ShopDashboardPage