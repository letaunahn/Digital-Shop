import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getALlOrdersOfShop } from "../../redux/actions/orderActions";
import axios from "axios";
import { backend_url, server } from "../../app";
import { toast } from "react-toastify";
import { BsFillBagFill } from "react-icons/bs";
import styles from "../../styles/styles";

const OrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getALlOrdersOfShop(seller && seller._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Order updated!");
        navigate("/dashboard-orders");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/order-refund-success/${id}`,
        { status },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Order updated!");
        dispatch(getALlOrdersOfShop(seller && seller._id));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="#dc143c" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}>
            Order List
          </div>
        </Link>
      </div>
      <div className="w-full flex items-center pt-6 justify-between">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>
      <br />
      <br />
      {data?.cart.map((item, index) => (
        <>
          <div className="w-full flex items-start mb-5">
            <img
              className="w-[80px] h-[80px]"
              src={`${item.images[0].url}`}
              alt=""
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px]">
                ${item.discountPrice} x {item.qty}
              </h5>
            </div>
          </div>
        </>
      ))}
      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>${data.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full md:flex items-center">
        <div className="w-full md:w-2/3">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3">{data?.shippingAddress?.address1}</h4>
          <h4>{data?.shippingAddress?.address2}</h4>
          <h4>{data?.shippingAddress?.province}</h4>
          <h4>{data?.shippingAddress?.country}</h4>
          <h4>{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full md:w-1/3">
          <h4 className="pt-3 text-[20px] font-[600]">Payment Info:</h4>
          <h4>
            Status:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
        </div>
      </div>
      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
      {data?.status !== "Processing refund" &&
        data?.status !== "Refund Success" && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]">
            {[
              "Processing",
              "Transfered to delivery partner",
              "Shipping",
              "Received",
              "On the way",
              "Delivered",
            ]
              .slice(
                [
                  "Processing",
                  "Transfered to delivery partner",
                  "Shipping",
                  "Received",
                  "On the way",
                  "Delivered",
                ].indexOf(data?.status)
              )
              .map((option, index) => (
                <>
                  <option value={option} key={index}>
                    {option}
                  </option>
                </>
              ))}
          </select>
        )}
      {data?.status === "Processing refund" ||
      data?.status === "Refund Success" ? (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[200px] mt-2 border h-[35px] rounded-[5px]">
          {["Processing refund", "Refund Success"]
            .slice(
              ["Processing refund", "Refund Success"].indexOf(data?.status)
            )
            .map((option, index) => (
              <>
                <option value={option} key={index}>
                  {option}
                </option>
              </>
            ))}
        </select>
      ) : null}
      <div
        className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px]`}
        onClick={
          data?.status !== "Processing refund"
            ? orderUpdateHandler
            : refundOrderUpdateHandler
        }>
        Update Status
      </div>
    </div>
  );
};

export default OrderDetails;
