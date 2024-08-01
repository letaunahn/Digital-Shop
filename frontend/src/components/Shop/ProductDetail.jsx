import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/productActions";

const ProductDetail = ({ data }) => {
  const dispatch = useDispatch();
  const [select, setSelect] = useState(0);
  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
  }, [data]);
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] md:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full md:flex">
              <div className="w-full md:w-1/2">
                <img
                  src={`${data.images[select].url}`}
                  className="w-[80%] flex justify-center"
                  alt=""
                />

                <div className="w-full flex">
                  {data &&
                    data.images.map((i, index) => (
                      <>
                        <div>
                          <img
                            src={`${i.url}`}
                            alt=""
                            className="h-[200px] overflow-hidden mr-3 mt-3 cursor-pointer"
                            onClick={() => setSelect(index)}
                          />
                        </div>
                      </>
                    ))}
                </div>
              </div>
              <div className="w-full md:w-1/2 pt-5 pl-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p className="text-justify text-sm">{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? data.originalPrice + "$" : null}
                  </h3>
                </div>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    Available in stock: {data.stock}
                  </h4>
                </div>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    Sold out: {data.sold_out}
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
          <br />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 md:px-10 py-2 rounded">
      <div className="w-full flex justify-evenly border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
            onClick={() => setActive(1)}>
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className="text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer md:text-[20px]"
            onClick={() => setActive(2)}>
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line text-justify">
            {data.description}
          </p>
        </>
      ) : null}
      {active === 2 ? (
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews.map((item, index) => (
              <>
                <div className="w-full flex my-2">
                  <img
                    src={`${backend_url}${item.user.avatar}`}
                    className="w-[50px] h-[50px] rounded-full"
                    alt=""
                  />
                  <div className="pl-2">
                    <div className="w-full flex items-center">
                      <h1 className="font-[500] mr-3">{item.user.name}</h1>
                      <Ratings rating={item?.rating} />
                    </div>
                    <p>{item.comment}</p>
                  </div>
                </div>
              </>
            ))}
          <div>
            {data && data.reviews.length === 0 && (
              <h5>No Reviews have for this product</h5>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetail;
