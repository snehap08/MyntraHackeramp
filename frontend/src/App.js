import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import ProductList from './components/ProductList';
import Dashboard from './components/Dashboard';
import SearchPage from './components/Search';
import Wishlist from './components/Wishlist';
import ProductDescription from './components/ProductDescription';
import Cart from './components/Cart';
import View from './components/ViewHistory';
import Trending from './components/TrendingPage';
import SustainabilityPage from './components/Sustainability';
import CollectionPage from './components/CollectionPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:productId" element={<ProductDescription />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/trend" element={<Trending />} />
        <Route path="/view" element={<View />} />
        <Route path="/sustainability" element={<SustainabilityPage />} />
        <Route path="/collection" element={<CollectionPage />} />
      </Routes>
    </Router>
  );
};

export default App;
