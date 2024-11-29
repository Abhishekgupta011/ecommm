import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData } from "./Component/Slices/CartSlice";

// Lazy load components
const Navbar = lazy(() => import("./Component/Layout/Navbar"));
const Home = lazy(() => import("./Component/Pages/Home"));
const Store = lazy(() => import("./Component/Pages/Store"));
const About = lazy(() => import("./Component/Pages/About"));
const Footer = lazy(() => import("./Component/Layout/Footer"));
const ContactUs = lazy(() => import("./Component/Pages/ContactUs"));
const Cart = lazy(() => import("./Component/Cart/Cart"));
const Review = lazy(() => import("./Component/Pages/Review"));
const LoginPage = lazy(() => import("./Component/AuthPage/LoginPage"));

function App() {
  //const authCtx = useContext(AuthContextApi);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Redirect users to the login page if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      console.log(isLoggedIn);
      console.log("useeffect running");
    }
  }, [isLoggedIn, navigate]);

 // Fetch cart data when the user is logged in
 useEffect(() => {
  if (isLoggedIn) {
    const modifiedMail = localStorage.getItem("modifiedMail");
    dispatch(fetchCartData(modifiedMail));
  }
}, [dispatch, isLoggedIn]);

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        {isLoggedIn && <Navbar />}
        <main>
          <Routes>
            {/* Login Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/store" element={<Store />} />
                <Route path="/store/:productId" element={<Review />} />
              </>
            ) : (
              // Redirect all other routes to login
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
          </Routes>
        </main>
        {isLoggedIn && <Footer />}
      </Suspense>
    </div>
  );
}

export default App;
