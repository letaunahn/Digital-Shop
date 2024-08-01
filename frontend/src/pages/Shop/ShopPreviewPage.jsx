import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { useParams } from "react-router-dom";
import axios from "axios";
import { server } from "../../app";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/productActions";
import ProductCard from "../../components/Route/ProductCard/ProductCard";
import Ratings from "../../components/Products/Ratings";
import { getAllEventsShop } from "../../redux/actions/eventActions";

const ShopPreviewPage = () => {
  const { id } = useParams();
  const [seller, setSeller] = useState({});
  const { products } = useSelector((state) => state.products);
  const {events} = useSelector((state) => state.events)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    dispatch(getAllEventsShop(id))
  }, [dispatch]);

  axios.get(`${server}/shop/get-shop-info/${id}`).then((res) => {
    setSeller(res.data.shop);
  })
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full md:flex py-10 justify-between">
        <div className="md:w-1/4 bg-[#fff] rounded-[4px] shadow-sm md:overflow-y-scroll md:h-[90vh] md:sticky top-10 left-0 z-10">
          <Info seller={seller} products={products} />
        </div>
        <div className="md:w-[72%] mt-5 md:mt-[unset] rounded-[4px]">
          <ProfileData products={products} events={events}/>
        </div>
      </div>
    </div>
  );
};

const Info = ({ seller, products }) => {
  return (
    <>
      <div>
        <div className="w-full py-5">
          <div className="w-full flex items-center justify-center">
            <img
              src={seller && seller?.avatar?.url}
              className="w-[150px] h-[150px] object-cover rounded-full"
              alt=""
            />
          </div>
          <h3 className="text-center py-2 text-[20px]">{seller.name}</h3>
          <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
            {}
          </p>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Address</h5>
          <h4 className="text-[#000000a6]">{seller.address}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Phone Number</h5>
          <h4 className="text-[#000000a6]">{seller && seller.phoneNumber}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Total Products</h5>
          <h4 className="text-[#000000a6]">{products && products.length}</h4>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Shop Rating</h5>
          <h4 className="text-[#000000a6]">{seller && seller.ratings}/5</h4>
        </div>
        <div className="p-3">
          <h5 className="font-[600]">Join On</h5>
          <h4 className="text-[#000000a6]">
            {seller && seller?.createdAt?.slice(0, 10)}
          </h4>
        </div>
      </div>
    </>
  );
};

const ProfileData = ({products, events}) => {
  const [active, setActive] = useState(1);
  const allReviews = products && products.map((product) =>
    product.reviews).flat()
  return (
    <>
        
      <div className="w-full">
        <div className="flex w-full items-center">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[20px] cursor-pointer pr-[20px] ${
                active === 1 ? "text-red-500" : ""
              }`}>
              Shop Products
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[20px] cursor-pointer pr-[20px] ${
                active === 2 ? "text-red-500" : ""
              }`}>
              Running Events
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[20px] cursor-pointer pr-[20px] ${
                active === 3 ? "text-red-500" : ""
              }`}>
              Shop Reviews
            </h5>
          </div>
        </div>
        
        <br />
        {active === 1 && (
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] mb-12 border-0">
            {products &&
              products.map((i, index) => (
                <ProductCard data={i} key={index} isShop={true} />
              ))}
          </div>
        )}
        {active === 2 && (
          <div className="w-full">
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] mb-12 border-0">
              {events &&
                events.map((i, index) => (
                  <ProductCard data={i} key={index} isShop={true} />
                ))}
            </div>
            {events && events.length === 0 && (
              <h5 className="w-full text-center py-5 text-[18px]">
                No Events have for this shop!
              </h5>
            )}
          </div>
        )}
        {active === 3 && (
          <div className="w-full">
            {allReviews &&
              allReviews.map((item, index) => (
                <>
                  <div className="w-full flex my-4">
                    <img
                      src={`${item.user.avatar.url}`}
                      className="w-[50px] h-[50px] rounded-full"
                      alt=""
                    />
                    <div className="pl-2">
                      <div className="flex w-full items-center">
                        <h1 className="font-[600] pr-2">{item.user.name}</h1>
                        <Ratings rating={item.rating} />
                      </div>
                      <p className="font-[400] text-[#000000a7]">
                        {item?.comment}
                      </p>
                      <p className="text-[#000000a7] text-[14px]">
                        {"2 days ago"}
                      </p>
                    </div>
                  </div>
                </>
              ))}
            {allReviews && allReviews.length === 0 && (
              <h5 className="w-full text-center py-5 text-[18px]">
                No Reviews have for this shop!
              </h5>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ShopPreviewPage;
