import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../app";
import {
  AiOutlineArrowRight,
  AiOutlineCamera,
  AiOutlineDelete,
} from "react-icons/ai";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { RxCross1 } from "react-icons/rx";
import { Country, State } from "country-state-city";
import {
  deleteUserAddress,
  updateUserAddress,
  updateUserInformation,
} from "../../redux/actions/userActions";
import { toast } from "react-toastify";
import axios from "axios";
import { getAllOrdersOfUser } from "../../redux/actions/orderActions";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber, password));
  };

  return (
    <div className="w-full">
      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            <div className="relative">
              <img
                src={`${user.avatar.url}`}
                className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt=""
              />
              <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input type="file" id="image" className="hidden" />
                <label htmlFor="image">
                  <AiOutlineCamera />
                </label>
              </div>
            </div>
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form aria-required={true} onSubmit={handleSubmit}>
              <div className="w-full md:flex block pb-3">
                <div className="w-full md:w-1/2">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:flex block pb-3">
                <div className="w-full md:w-1/2">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={phoneNumber}
                    className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label className="block pb-2">Enter your password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full flex justify-center">
                <input
                  type="submit"
                  value="Update"
                  required
                  className="w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-md mt-8 cursor-pointer"
                />
              </div>
            </form>
          </div>
        </>
      )}
      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {active === 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}

      {active === 7 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {active === 8 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const {orders} = useSelector((state) => state.order)
  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id))
  }, [])

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
            <Link to={`/user/order/${params.id}`}>
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
        itemsQty: item.cart.length,
      });
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const {orders} = useSelector((state) => state.order)
  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id))
  }, [])

  const eligibleOrders = orders && orders.filter((item) => item.status === "Processing refund")

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
            <Link to={`/user/order/${params.id}`}>
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

  eligibleOrders &&
    eligibleOrders.forEach((item) => {
      rows.push({
        id: item._id,
        status: item.status,
        total: "$" + item.totalPrice,
        itemsQty: item.cart.length,
      });
    });

  //const eligibleOrders = orders && orders.filter((item) => item.status === "Processing refund")
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const TrackOrder = () => {
  const {orders} = useSelector((state) => state.order)
  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id))
  }, [])

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
            <Link to={`/user/track/order/${params.id}`}>
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
        itemsQty: item.cart.length,
      });
    });

  //const eligibleOrders = orders && orders.filter((item) => item.status === "Processing refund")
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Payment Methods
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      <div className="w-full bg-white h-[70px] rounded-md flex items-center px-3 shadow justify-between pr-10">
        <div className="flex items-center">
          <img
            src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
            alt=""
          />
          <h5 className="pl-5 font-[600]">Lê Tuấn Anh</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6>1234 **** **** ****</h6>
          <h5 className="pl-6">08/2023</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete size={25} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form aria-required className="flex flex-col items-center" onSubmit={passwordChangeHandler}>
          <div className="w-full md:w-1/2 mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
              className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
            />
          </div>
          <div className="w-full md:w-1/2 mt-5">
            <label className="block pb-2">Enter your new password</label>
            <input
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
            />
          </div>
          <div className="w-full md:w-1/2 mt-5">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              className={`${styles.input} !w-[95%] mb-4 md:mb-0`}
            />
            <input
              type="submit"
              value="Update"
              required
              className="w-[95%] h-[40px] border-[#3a24db] border text-center text-[#3a24db] rounded-md mt-8 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addressType === "" || country === "" || province === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        updateUserAddress(
          country,
          province,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setProvince("");
      setAddress1("");
      setAddress2("");
      setZipCode("");
      setAddressType("");
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
  };
  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center">
          <div className="md:w-[40%] w-[50%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-[Poppins]">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required className="w-full" onSubmit={handleSubmit}>
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-md">
                      <option value="" className="block border pb-2">
                        Choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <>
                            <option
                              className="block pb-2"
                              key={item.isoCode}
                              value={item.isoCode}>
                              {item.name}
                            </option>
                          </>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Province</label>
                    <select
                      name=""
                      id=""
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-md">
                      <option value="" className="block border pb-2">
                        Choose your Province
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <>
                            <option
                              key={item.isoCode}
                              value={item.isoCode}
                              className="block pb-2">
                              {item.name}
                            </option>
                          </>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Zip Code</label>
                    <input
                      type="text"
                      className={`${styles.input}`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      className="w-[95%] h-[40px] border rounded-md"
                      onChange={(e) => setAddressType(e.target.value)}>
                      <option value="" className="block border pb-2">
                        Choose Your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <>
                            <option
                              className="block pb-2"
                              key={item.name}
                              value={item.name}>
                              {item.name}
                            </option>
                          </>
                        ))}
                    </select>
                  </div>
                  <div className="w-full pb-2">
                    <input
                      type="submit"
                      required
                      readOnly
                      className={`${styles.input} mt-5 cursor-pointer`}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          My Addresses
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}>
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <>
            <div
              className="w-full bg-white min-h-32 md:h-[70px] rounded-md flex items-center px-3 shadow justify-between pr-10 mb-5" /*key={index}*/
            >
              <div className="flex items-center">
                <h5 className="pl-5 font-[600]">{item.addressType}</h5>
              </div>
              <div className="pl-8 flex flex-col items-center">
                <h6 className="text-[12px] md:text-[unset]">
                  {item.address1}
                  {", "}
                  {item.province}
                  {", "}
                  {item.country}
                </h6>
                <h6 className="text-[12px] md:text-[unset]">
                  {item.address2}
                  {", "}
                  {item.province}
                  {", "}
                  {item.country}
                </h6>
              </div>
              <div className="pl-8 flex items-center">
                <h6 className="text-[12px] md:text-[unset]">
                  {user && user.phoneNumber}
                </h6>
              </div>
              <div className="min-w-[10%] flex items-center justify-between pl-8">
                <AiOutlineDelete
                  size={25}
                  className="cursor-pointer"
                  onClick={() => handleDelete(item)}
                />
              </div>
            </div>
          </>
        ))}
      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You do not have any saved address!
        </h5>
      )}
    </div>
  );
};

export default ProfileContent;
