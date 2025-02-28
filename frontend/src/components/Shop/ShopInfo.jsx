import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../app";
import styles from "../../styles/styles";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../Layout/Loader";
import { getAllProductsShop } from "../../redux/actions/productActions";

const ShopInfo = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(async () => {
    dispatch(getAllProductsShop(id));
    setIsLoading(true);
    await axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);
  const logoutHandler = async () => {
    axios
      .get(`${server}/shop/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/shop-login");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full py-5">
            <div className="w-full flex items-center justify-center">
              <img
                src={`${seller.avatar.url}`}
                className="w-[150px] h-[150px] object-cover rounded-full"
                alt=""
              />
            </div>
            <h3 className="text-center py-2 text-[20px]">{seller.name}</h3>
            <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
              {seller.description}
            </p>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Address</h5>
            <h4 className="text-[#000000a6]">{seller && seller.address}</h4>
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
            <h4 className="text-[#000000a6]">{averageRating}/5</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Join On</h5>
            <h4 className="text-[#000000a6]">
              {seller && seller.createdAt.slice(0, 10)}
            </h4>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <Link to="/settings">
                <div
                  className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
                  <span className="text-white">Edit Shop</span>
                </div>
              </Link>
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                onClick={logoutHandler}>
                <span className="text-white">Log Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default ShopInfo;
