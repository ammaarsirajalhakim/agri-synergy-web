// import { useState } from 'react'
import Login from './pages/LoginPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import Forgot from './pages/ForgotPage'
import MainDropship from './pages/MainDropship'
import SidebarProfile from './components/SidebarProfile'

import Kategori from './pages/admin/Kategori'
import Produk from './pages/admin/Produk'
import DetailSaldo from './pages/admin/Detailsaldo'
import Petalahan from './pages/admin/Petalahan'
import CalenderAdd from './pages/CalenderAdd'
import CalenderView from './pages/CalenderView'
import DropShipper from './pages/admin/DropShipper'
import Calender from './pages/Calender'
import CalenderEdit from './pages/CalenderEdit'
import MainChat from './pages/MainChat'
import ProductPage from './components/ProductPage'
import ProductDetail from "./components/ProductDetail";
import Checkout from './components/Checkout'
import "@fortawesome/fontawesome-free/css/all.min.css";
import OrderSuccess from './components/OrderSuccess'
import PetaLahan from './pages/PetaLahan'
import CommunityPage from './components/CommunityPage';
import YourThreadsPage from './components/YourThreadsPage';
import SavedPage from './components/SavedPage'
import OrderHistoryPage from './components/OrderHistoryPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/forgot' element={<Forgot />} />
        <Route path='/header' element={<Header />} />
        <Route path='/dropshipper' element={<MainDropship />} />
        <Route path='/sidebar' element={<SidebarProfile />} />

        <Route path='/kategori' element={<Kategori />} />
        <Route path='/produk' element={<Produk />} />
        <Route path='/detail-saldo' element={<DetailSaldo />} />
        <Route path='/peta-lahan' element={<Petalahan />} />
        <Route path='/drop-shipper' element={<DropShipper />} />
        <Route path='/calendaradd' element={<CalenderAdd />} />
        <Route path='/calendar' element={<Calender />} />
        <Route path='/calendarview' element={<CalenderView />} />
        <Route path='/calendaredit' element={<CalenderEdit />} />
        <Route path='/konsultasi' element={<MainChat />} />
        <Route path="/market" element={<ProductPage />} />
        <Route path="/detail/:id" element={<ProductDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/ordersuccses" element={<OrderSuccess />} />
        <Route path="/petalahan" element={<PetaLahan />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/your-threads" element={<YourThreadsPage />} />
        <Route path="/saved" element={<SavedPage />} />
        <Route path="/orderhistory" element={<OrderHistoryPage />} />
      </Routes>
    </Router>
  )
}

export default App
