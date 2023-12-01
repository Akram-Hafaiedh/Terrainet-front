import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useLocation } from 'react-router-dom'
import Home from "./pages/Home"
import { Navigate } from 'react-router-dom';
import { useAuth } from "./hooks/useAuth"



function App() {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const shouldShowHeader = !(location.pathname === "/login" || location.pathname === "/register");

  return (
    <>
      {/* {shouldShowHeader && <Header />} */}


      {/* Routes that should not have the Header */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/"
          element={isLoggedIn ? (
            <>
              {shouldShowHeader && <Header />}
              <Home />
            </>
          ) : (
            <Navigate to="/login" />
          )
          }
        />
      </Routes>

    </>
  )
}

export default App
