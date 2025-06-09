import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";

// Components (can be loaded directly if they're small and critical)
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Mobile_Menu from "./pages/Mobile_Menu";
import Photoswipe from "./pages/Photoswipe";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const About_Us = lazy(() => import("./pages/About_Us"));
const Contact_Us = lazy(() => import("./pages/Contact_Us"));
const Order_Tracker = lazy(() => import("./pages/Order_Tracker"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Shop = lazy(() => import("./pages/Shop"));
const Terms_Condition = lazy(() => import("./pages/Terms_Condition"));
const Product_Detail = lazy(() => import("./pages/Product_Detail"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Order_Success = lazy(() => import("./pages/Order_Success"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin Pages
const Login = lazy(() => import("./admin/pages/Login"));
const Register = lazy(() => import("./admin/pages/Register"));
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const Vehicles = lazy(() => import("./admin/pages/Vehicles"));
const Edit_Profile = lazy(() => import("./admin/pages/Edit_Profile"));
const Order_History = lazy(() => import("./admin/pages/Order_History"));
const Order_Detail = lazy(() => import("./admin/pages/Order_Detail"));
const Change_Password = lazy(() => import("./admin/pages/Change_Password"));

function App() {
  return (
    <>
      <div className="site">
        <Router>
          <Navbar />
          <Suspense fallback={<Loader />}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about_us" element={<About_Us />} />
              <Route path="/contact_us" element={<Contact_Us />} />
              <Route path="/order_tracker" element={<Order_Tracker />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/terms_condition" element={<Terms_Condition />} />
              <Route path="/:title" element={<Product_Detail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order_success" element={<Order_Success />} />

              {/* Admin */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/edit_profile" element={<Edit_Profile />} />
              <Route path="/order_history" element={<Order_History />} />
              <Route path="/order_detail/:orderNo" element={<Order_Detail />} />
              <Route path="/change_password" element={<Change_Password />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </Router>
      </div>
      <Mobile_Menu />
      <div
        id="quickview-modal"
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      ></div>
      <Photoswipe />
    </>
  );
}

export default App;
