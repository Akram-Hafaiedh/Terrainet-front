import Header from "./components/Header"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Home from "./pages/Home"
import { useAuth } from "./hooks/useAuth"
import Profile from "./pages/Profile"
import { useEffect } from "react"



function App() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn);
    console.log('location.pathname:', location.pathname);

    if (!isLoggedIn && location.pathname !== "/login" && location.pathname !== "/register") {
      console.log('Redirecting to login');
      navigate('/login');
      // Return null or some loading indicator while navigating
    }
  }, [isLoggedIn, navigate, location.pathname])


  const shouldShowHeader = !(location.pathname === "/login" || location.pathname === "/register");
  return (
    <>
      {shouldShowHeader && <Header />}


      {/* Routes that should not have the Header */}
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Routes for logged-in users */}
        {isLoggedIn && (
          <>
            {/* {shouldShowHeader && <Header />} */}
            <Route path="/" element={<Home />} />

            {/* Nested routes for logged-in users */}
            <Route path="/profile" element={<Profile />} />
            {/* Add more routes for the logged-in user */}
          </>
        )}

      </Routes>

    </>
  )
}

export default App
