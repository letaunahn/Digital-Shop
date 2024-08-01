import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardSideBar = ({ active }) => {
  return (
    <>
      <div className="w-full h-[90vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
        <div className="w-full flex items-center p-4">
          <Link to="/dashboard" className="w-full flex items-center">
            <RxDashboard
              size={30}
              color={`${active === 1 ? "#dc143c" : "#555"}`}
            />
            <h5
              className={`${
                active === 1 ? "text-[#dc143c]" : "text-[#555]"
              } hidden md:block pl-2 text-[18px] font-[400]`}>
              Dashboard
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link to="/dashboard-orders" className="w-full flex items-center">
            <FiShoppingBag
              size={30}
              color={`${active === 2 ? "#dc143c" : "#555"}`}
            />
            <h5
              className={`${
                active === 2 ? "text-[#dc143c]" : "text-[#555]"
              } hidden md:block pl-2 text-[18px] font-[400]`}>
              All Orders
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link to="/dashboard-products" className="w-full flex items-center">
            <FiPackage
              size={30}
              color={`${active === 3 ? "#dc143c" : "#555"}`}
            />
            <h5
              className={`${
                active === 3 ? "text-[#dc143c]" : "text-[#555]"
              } hidden md:block pl-2 text-[18px] font-[400]`}>
              All Products
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link
            to="/dashboard-create-product"
            className="w-full flex items-center">
            <AiOutlineFolderAdd
              size={30}
              color={`${active === 4 ? "#dc143c" : "#555"}`}
            />
            <h5
              className={`${
                active === 4 ? "text-[#dc143c]" : "text-[#555]"
              } hidden md:block pl-2 text-[18px] font-[400]`}>
              Create Product
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link to="/dashboard-events" className="w-full flex items-center">
            <MdOutlineLocalOffer
              size={30}
              color={`${active === 5 ? "#dc143c" : "#555"}`}
            />
            <h5
              className={`${
                active === 5 ? "text-[#dc143c]" : "text-[#555]"
              } hidden md:block pl-2 text-[18px] font-[400]`}>
              All Events
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link
            to="/dashboard-create-event"
            className="w-full flex items-center">
            <VscNewFile
              size={30}
              color={`${active === 6 ? "#dc143c" : "#555"}`}
            />
            <h5
              className={`${
                active === 6 ? "text-[#dc143c]" : "text-[#555]"
              } hidden md:block pl-2 text-[18px] font-[400]`}>
              Create Event
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link
            to="/dashboard-withdraw-money"
            className="w-full flex items-center">
            <CiMoneyBill
              size={30}
              color={`${active === 7 ? "#dc143c" : "#555"}`}
            />
            <h5
              className={`${
                active === 7 ? "text-[#dc143c]" : "text-[#555]"
              } hidden md:block pl-2 text-[18px] font-[400]`}>
              Withdraw Money
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link to="/dashboard-messages" className="w-full flex items-center">
            <BiMessageSquareDetail
              size={30}
              color={`${active === 8 ? "#dc143c" : "#555"}`}
            />
            <h5
              className={`${
                active === 8 ? "text-[#dc143c]" : "text-[#555]"
              } hidden md:block pl-2 text-[18px] font-[400]`}>
              Shop Inbox
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link to="/dashboard-coupons" className="w-full flex items-center">
            <AiOutlineGift
              size={30}
              color={`${active === 9 ? "#dc143c" : "#555"}`}
            />
            <h5
              className={`${
                active === 9 ? "text-[#dc143c]" : "text-[#555]"
              } hidden md:block pl-2 text-[18px] font-[400]`}>
              Discount Code
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link to="/dashboard-refunds" className="w-full flex items-center">
            <HiOutlineReceiptRefund
              size={30}
              color={`${active === 10 ? "#dc143c" : "#555"}`}
            />
            <h5
              className={`${
                active === 10 ? "text-[#dc143c]" : "text-[#555]"
              } hidden md:block pl-2 text-[18px] font-[400]`}>
              Refunds
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link to="/settings" className="w-full flex items-center">
            <CiSettings
              size={30}
              color={`${active === 11 ? "#dc143c" : "#555"}`}
            />
            <h5
              className={`${
                active === 11 ? "text-[#dc143c]" : "text-[#555]"
              } hidden md:block pl-2 text-[18px] font-[400]`}>
              Settings
            </h5>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashboardSideBar;
