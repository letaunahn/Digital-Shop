import React, { useEffect } from "react";
import { AiOutlineArrowRight, AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getAllProductsShop } from "../../redux/actions/productActions";
import { getALlOrdersOfShop } from "../../redux/actions/orderActions";
import Loader from "../Layout/Loader";

const DashboardHero = () => {
  const dispatch = useDispatch();
  const { seller, isLoading } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllProductsShop(seller && seller._id));
    dispatch(getALlOrdersOfShop(seller && seller._id));
  }, [dispatch]);

  const availableBalance = seller && seller?.availableBalance?.toFixed(2);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.row.status === "Delivered"
          ? "text-[green]"
          : "text-[red]";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: " ",
      headerName: "",
      minWidth: 150,
      type: "number",
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/dashboard/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.status,
        total: "$" + item.totalPrice,
        itemsQty: item.cart.reduce((acc, item) => acc + item.qty, 0),
      });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-8">
          <h3 className="text-[22px] font-[Poppins] pb-2">Overview</h3>
          <div className="w-full block md:flex items-center justify-between">
            <div className="w-full  mb-4 md:max-w-[30%] min-h-[30vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
                  Account Balance{" "}
                  <span className="text-[16px]">(with 10% service charge)</span>
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                ${availableBalance}
              </h5>
              <Link to="/dashboard-withdraw-money">
                <h5 className="pt-4 pl-2 text-[#077f9c]">Withdraw Money</h5>
              </Link>
            </div>
            <div className="w-full mb-4 md:w-[30%] min-h-[30vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <MdBorderClear size={30} className="mr-2" fill="#00000085" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
                  All Orders
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {orders && orders.length}
              </h5>
              <Link to="/dashboard-orders">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Orders</h5>
              </Link>
            </div>
            <div className="w-full mb-4 md:w-[30%] min-h-[30vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
                  All Products
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {products && products.length}
              </h5>
              <Link to="/dashboard-products">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Product</h5>
              </Link>
            </div>
          </div>
          <br />
          <h3 className="text-[22px] font-[Poppins] pb-2">Latest Orders</h3>
          <div className="w-full min-h-[45vh] bg-white rounded">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={10}
              disableRowSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardHero;
