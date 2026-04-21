import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

// Components
import Navbar from './components/core/Home/Navbar';
import ProductDetail from './components/feature/ProductDetail';

// Auth Components
import Login from './pages/Login';
import Signup from './components/core/Login/Signup';
import VerifyOtp from './components/core/Login/VerifyOtp';
import ForgotEmail from './components/core/Login/ForgotEmail';
import ForgotOtp from './components/core/Login/Forgot_otp'; // CamelCase suggested
import ForgotPass from './components/core/Login/Forgot_pass'; // CamelCase suggested

// Pages
import Home from './pages/Home';
import Profile from './components/core/User/Profile';
import NotFound from './pages/NotFound';
import SellerHome from './components/core/Seller/SellerHome';
import Seller from './pages/Seller.';
import SuccessStories from './components/core/Seller/SuccessStories';
import AddProduct from './components/core/Seller/AddProduct';
import AddToCart from './components/feature/AddToCart';
import Checkout from './components/feature/Checkout';
import Orders from './components/core/User/Orders';


function App() {
  const location = useLocation();

  return (
    <>
      <Toaster position="top-right" richColors />
      {
        !location.pathname.includes('/admin') && !location.pathname.includes('/seller') &&
        <Navbar />
      }

      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />

          {/* Forgot Password Flow */}
          <Route path="/forgot-password" element={<ForgotEmail />} />
          <Route path="/forgot-password/otp" element={<ForgotOtp />} />
          <Route path="/forgot-password/reset" element={<ForgotPass />} />

          {/* Feature Routes */}
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/addToCart" element={<AddToCart />} />
          <Route path="/checkout" element={<Checkout />} />


          {/* Seller Routes */}
          <Route path='/seller' element={<SellerHome />} />
          <Route path="/seller-login" element={<Login />} />
          <Route path="/seller/add-product" element={<AddProduct />} />
          <Route path='/seller-ad' element={<Seller />} />
          <Route path='/seller-ad/successs' element={<SuccessStories />} />


          {/* Admin Routes */}
          <Route path='/admin' element={<SellerHome />} />

          {/* 404 Catch-all (Optional but recommended) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;