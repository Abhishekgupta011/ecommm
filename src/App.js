import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Suspense, lazy, useContext, useEffect } from "react";
import AuthContextApi from "./Component/Context/AuthContext";

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
  const authCtx = useContext(AuthContextApi);
  const navigate = useNavigate();

  // Redirect users to the login page if not authenticated
  useEffect(() => {
    if (!authCtx.isLoggedIn) {
      navigate("/login");
      console.log(authCtx.isLoggedIn);
      console.log('useeffect running');
    }
  }, [authCtx.isLoggedIn, navigate]);

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        {authCtx.isLoggedIn && <Navbar />}
        <main>
          <Routes>
            {/* Login Route */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            {authCtx.isLoggedIn ? (
              <>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact us" element={<ContactUs />} />
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
        {authCtx.isLoggedIn && <Footer />}
      </Suspense>
    </div>
  );
}

export default App;