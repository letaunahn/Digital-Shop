import React, { useState } from "react";
import { useSelector } from "react-redux";
import { backend_url } from "../../app";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(seller.name);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipCode] = useState(seller && seller.zipCode);

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex w-full md:w-[80%] flex-col justify-center my-5">
        <div className="w-full flex items-center justify-center">
          <div className="relative">
            <img
              className="w-[200px] h-[200px] rounded-full object-cover cursor-pointer"
              src={`${backend_url}${seller.avatar}`}
              alt=""
            />
            <div className="w-[30px] h-[30px] bg-[#e3e9ee] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[10px] right-[15px]">
              <input type="file" id="image" className="hidden" />
              <label htmlFor="image">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
        </div>
        <form aria-required={true} className="flex flex-col items-center">
          <div className="w-full flex items-center flex-col md:w-3/4 mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Name</label>
            </div>
            <input
              type="text"
              placeholder={`${seller.name}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={`${styles.input} !w-[95%] pl-5`}
            />
          </div>
          <div className="w-full flex items-center flex-col md:w-3/4 mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Description</label>
            </div>
            <input
              type="text"
              placeholder={`${seller.description ? seller.description : "Enter your shop description"}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className={`${styles.input} !w-[95%] pl-5`}
            />
          </div>
          <div className="w-full flex items-center flex-col md:w-3/4 mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Address</label>
            </div>
            <input
              type="text"
              placeholder={`${seller.address}`}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className={`${styles.input} !w-[95%] pl-5`}
            />
          </div>
          <div className="w-full flex items-center flex-col md:w-3/4 mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop Phone Number</label>
            </div>
            <input
              type="text"
              placeholder={`${seller.phoneNumber}`}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className={`${styles.input} !w-[95%] pl-5`}
            />
          </div>
          <div className="w-full flex items-center flex-col md:w-3/4 mt-5">
            <div className="w-full pl-[3%]">
              <label className="block pb-2">Shop ZipCode</label>
            </div>
            <input
              type="text"
              placeholder={`${seller.zipCode}`}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              required
              className={`${styles.input} !w-[95%] pl-5`}
            />
          </div>
          <div className="w-full flex items-center flex-col md:w-3/4 mt-5">
            <input type="submit" value="Update Shop" className={`${styles.input} !w-[95%] mb-4`} required readOnly/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
