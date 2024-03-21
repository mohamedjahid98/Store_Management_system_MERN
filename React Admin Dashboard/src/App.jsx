import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import { useState } from 'react';
import './App.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Login from './Components/Login-Signup/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import StockView from "./Components/Stock/StockView";
import Category from "./Components/Category/Category";
import Productsdata from "./Components/Products/Productsdata";
import Createproducts from "./Components/Products/Createproducts";
import UpdateProducts from "./Components/Products/UpdateProducts";
import Users from "./Components/Users/Users";
import Orders from "./Components/Order/Orders";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const isAuthenticated = () => {
    return localStorage.getItem('email') !== null;
  };

  const ProtectedRoute = ({ element }) => {
    if (!isAuthenticated()) {
      return <Navigate to="/" />;
    }

    return element;
  };

  return (
    <div className="grid-container">
      <BrowserRouter>
        <InnerApp openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} isAuthenticated={isAuthenticated}
          ProtectedRoute={ProtectedRoute} /></BrowserRouter>
    </div>
  );
}

function InnerApp({ openSidebarToggle, OpenSidebar, isAuthenticated, ProtectedRoute }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <Routes>
      <Route path="/" element={<>{isLoginPage && isAuthenticated() ? <Navigate to="/home" /> : <Login />}</>}></Route>
      <Route path="/home" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Home /></>} />}></Route>
      <Route path="/category" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Category /></>} />}></Route>
        <Route path="/products" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Productsdata /></>} />}></Route>
        <Route path="/products/create" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Createproducts /></>} />}></Route>
        <Route path="/products/update/:id" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <UpdateProducts /></>} />}></Route>
        <Route path="/users" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Users /></>} />}></Route>   
        <Route path="/orders" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Orders /></>} />}></Route>         
      <Route path="/stock-view" element={<ProtectedRoute element={<><Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <StockView /></>} />}></Route>
    </Routes>
  );
}

export default App;
