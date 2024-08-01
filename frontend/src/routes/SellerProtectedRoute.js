
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";
import { useNavigate } from "react-router-dom";

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSeller } = useSelector((state) => state.seller);
  const navigate = useNavigate();
  if (isLoading === true) {
    return <Loader />;
  } else {
    if (!isSeller) {
      return navigate("/shop-login");
    }
    return children;
  }
};

export default SellerProtectedRoute;
