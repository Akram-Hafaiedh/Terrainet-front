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
  const shouldShowHeader = !(location.pathname === "/login" || location.pathname === "/register");
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      // Return null or some loading indicator while navigating
    }
  }, [isLoggedIn, navigate])


  return (
    <>
      {shouldShowHeader && <Header />}


      {/* Routes that should not have the Header */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
