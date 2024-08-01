import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from '../../app';

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const {cart} = useSelector((state) => state.cart)
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = () => {
    if(address1 === "" || address2 === "" || zipCode === "" || country === "" || province === ""){
        toast.error("Please choose your delivery address!")
    } else {
        const shippingAddress = {
            address1,
            address2,
            zipCode,
            country,
            province
        }

        const orderData = {
            cart, totalPrice, subTotalPrice, shipping, discountPrice, shippingAddress, user
        }

        localStorage.setItem("latestOrder", JSON.stringify(orderData))
        navigate("/payment")
    }
  }

  const subTotalPrice = cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0)
  const shippingTotal = subTotalPrice * 0.1
  const shipping = parseFloat(shippingTotal.toFixed(2))
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;
      if (res.data.couponCode !== null) {
        const isCouponValid =
          cart && cart.filter((item) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast.error("Coupon code is not valid for this shop");
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode("");
        }
      }
      if (res.data.couponCode === null) {
        toast.error("Coupon code doesn't exists!");
        setCouponCode("");
      }
    });
  };

  const discountPercentage = couponCodeData ? discountPrice : ""
  const totalPrice = couponCodeData ? (subTotalPrice + shipping - discountPercentage).toFixed(2) : (subTotalPrice + shipping).toFixed(2)


  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] lg:w-[70%] block md:flex">
        <div className="w-full md:w-[65%]">
          <ShippingInfo
            user={user}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            country={country}
            setCountry={setCountry}
            province={province}
            setProvince={setProvince}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
          />
        </div>
        <div className="w-full md:w-[35%] md:mt-0 mt-8">
            <CartData shipping={shipping} handleSubmit={handleSubmit} totalPrice={totalPrice} subTotalPrice={subTotalPrice} couponCode={couponCode} setCouponCode={setCouponCode} discountPercentage={discountPercentage}/>
        </div>
      </div>
      <div onClick={paymentSubmit} className={`${styles.button} w-[150px] md:w-[280px] mt-10`}>
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  setCountry,
  province,
  setProvince,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
  phoneNumber,
  setPhoneNumber,
}) => {
  return (
    <div className="w-full md:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-1/2">
            <label htmlFor="name" className="block pb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={user && user.name}
              required
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="email" className="block pb-2">
              Email Address
            </label>
            <input
              type="email"
              value={user && user.email}
              name="email"
              required
              className={`${styles.input}`}
            />
          </div>
        </div>
        <div className="w-full flex pb-3">
          <div className="w-1/2">
            <label className="block pb-2" htmlFor="phoneNumber">
              Phone Number
            </label>
            <input
              type="text"
              value={user && user.phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              name="phoneNumber"
              required
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-1/2">
            <label className="block pb-2" htmlFor="zipCode">
              Zip Code
            </label>
            <input
              type="text"
              value={zipCode}
              name="zipCode"
              onChange={(e) => setZipCode(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>
        <div className="w-full flex pb-3">
          <div className="w-1/2">
            <label className="block pb-2" htmlFor="country">
              Country
            </label>
            <select
              value={country}
              name="country"
              onChange={(e) => setCountry(e.target.value)}
              required
              className="w-[95%] border h-[40px] rounded-md">
              <option className="block pb-2" value="">
                Choose your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <>
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  </>
                ))}
            </select>
          </div>
          <div className="w-1/2">
            <label className="block pb-2" htmlFor="province">
              Province
            </label>
            <select
              name="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              required
              className="w-[95%] border h-[40px]  rounded-md">
              <option value="">Choose your province</option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <>
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  </>
                ))}
            </select>
          </div>
        </div>
        <div className="w-full flex pb-3">
          <div className="w-1/2">
            <label className="block pb-2" htmlFor="address1">Address 1</label>
            <input
              type="address"
              required
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              className={`${styles.input} w-[95%]`}
            />
          </div>
          <div className="w-1/2">
            <label className="block pb-2" htmlFor="address2">Address 2</label>
            <input
              type="address"
              required
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              className={`${styles.input}`}
            />
          </div>
        </div>
      </form>
      <h5 className="text-[18px] cursor-pointer inline-block" onClick={() => setUserInfo(!userInfo)}>Choose from saved address</h5>
      {userInfo && (
        <>
          <div>
            {user.addresses.map((item, index) => (
              <>
                <div className="w-full flex mt-1">
                  <input
                  className="mr-3"
                    type="checkbox"
                    value={item.addressType}
                    onClick={() =>
                      setAddress1(item.address1) ||
                      setAddress2(item.address2) ||
                      setZipCode(item.zipCode) ||
                      setCountry(item.country) ||
                      setProvince(item.province)
                    }
                  />
                  <h2>{item.addressType}</h2>
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const CartData = ({handleSubmit, totalPrice, shipping, subTotalPrice, couponCode, setCouponCode, discountPercentage}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
        <div className="flex justify-between">
            <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
            <h5 className="text-[18px] font-[600]">${subTotalPrice}</h5>
        </div>
        <br />
        <div className="flex justify-between">
            <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping:</h3>
            <h5 className="text-[18px] font-[600]">${shipping}</h5>
        </div>
        <br />
        <div className="flex justify-between border-b pb-3">
            <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
            <h5 className="text-[18px] font-[600]">{discountPercentage ? "- $" + discountPercentage : "0"}</h5>
        </div>
        <h5 className="text-[18px] font-[600] text-end pt-3">${totalPrice}</h5>
        <br />
        <form onSubmit={handleSubmit}>
            <input type="text" className={`${styles.input} h-[40px] pl-2`} placeholder="Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)}/>
            <input className="w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-sm mt-8 cursor-pointer" type="submit" required value="Apply code"/>
        </form>
    </div>
  );
};

export default Checkout;
