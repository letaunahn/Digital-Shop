import React from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineGift } from 'react-icons/ai'
import { MdOutlineLocalOffer } from 'react-icons/md'
import { FiPackage, FiShoppingBag } from 'react-icons/fi'
import { BiMessageSquareDetail } from 'react-icons/bi'

const AdminHeader = () => {
  return (
    <div>
        <div>
            <Link to="/"><img src="https://shopo.quomodothemes.website/assets/images/logo.svg" alt="" /></Link>
        </div>
        <div>
            <div>
                <Link><AiOutlineGift/></Link>
                <Link><MdOutlineLocalOffer/></Link>
                <Link><FiShoppingBag/></Link>
                <Link><FiPackage/></Link>
                <Link><BiMessageSquareDetail/></Link>
                <img src="" alt="" />
            </div>
        </div>
    </div>
  )
}

export default AdminHeader