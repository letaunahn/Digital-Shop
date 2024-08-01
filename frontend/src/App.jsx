import { Route, Routes } from "react-router-dom";
import {
  ActivatePage,
  BestSellingPage,
  CheckoutPage,
  EventsPage,
  FAQPage,
  HomePage,
  LoginPage,
  OrderSuccessPage,
  PaymentPage,
  ProductDetailsPage,
  ProductsPage,
  ProfilePage,
  SignupPage,
  TrackOrderPage,
  UserInboxPage,
} from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/userActions";
import {
  ShopActivate,
  ShopAllCoupons,
  ShopAllEvents,
  ShopAllOrders,
  ShopAllProducts,
  ShopAllRefunds,
  ShopCreate,
  ShopCreateEvents,
  ShopCreateProduct,
  ShopDashboardPage,
  ShopHomePage,
  ShopInboxPage,
  ShopLogin,
  ShopOrderDetails,
  ShopPreviewPage,
  ShopProductDetail,
  ShopSettingsPage,
  ShopWithdrawMoneyPage,
} from "./routes/ShopRoutes";
import ProtectedRoute from "./routes/ProtectedRoute";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import { loadSeller } from "./redux/actions/sellerActions";
import { getAllProducts } from "./redux/actions/productActions";
import { getAllEvents } from "./redux/actions/eventActions";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { server } from "./app";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApiKey();
  }, []);
  return (
    <>
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivatePage />}
        />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/best-selling" element={<BestSellingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <TrackOrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <UserInboxPage />
            </ProtectedRoute>
          }
        />

        {/*Shop Routes*/}
        <Route path="/shop-create" element={<ShopCreate />} />
        <Route
          path="/shop-activation/:activation_token"
          element={<ShopActivate />}
        />
        <Route path="/shop-login" element={<ShopLogin />} />
        <Route path="/dashboard" element={<ShopDashboardPage />} />
        <Route path="/shop/:id" element={<ShopHomePage />} />
        <Route path="/settings" element={<ShopSettingsPage />} />
        <Route
          path="/dashboard-create-product"
          element={<ShopCreateProduct />}
        />
        <Route path="/shop/preview/:id" element={<ShopPreviewPage/>}/>
        <Route path="/dashboard-products" element={<ShopAllProducts />} />
        <Route path="/dashboard-orders" element={<ShopAllOrders />} />
        <Route path="/dashboard-events" element={<ShopAllEvents />} />
        <Route path="/dashboard-refunds" element={<ShopAllRefunds />} />
        <Route path="/order/:id" element={<ShopOrderDetails />} />
        <Route path="/shop-product/:id" element={<ShopProductDetail/>}/>
        <Route path="/dashboard-create-event" element={<ShopCreateEvents />} />
        <Route
          path="/dashboard-withdraw-money"
          element={<ShopWithdrawMoneyPage />}
        />
        <Route path="/dashboard-messages" element={<ShopInboxPage />} />
        <Route path="/dashboard-coupons" element={<ShopAllCoupons />} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
