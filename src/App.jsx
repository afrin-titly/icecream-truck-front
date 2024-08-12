import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import IceCreamList from './components/IceCreamList';
import ItemDetails from './components/ItemDetails';
import Login from './components/Login';
import { CartProvider } from './contexts/CartContext';
import './styles/App.css';
import { FlashMessageProvider } from './contexts/FlashMessageContext';
import Cart from './components/Cart';
import { isLoggedIn, isTokenExpired } from './components/Auth';
import ItemCreate from './components/ItemCreate';
import ItemEdit from './components/ItemEdit';
import Management from './components/Management';
import Items from './components/management/Items';
import Categories from './components/management/Categories';
import Flavors from './components/management/Flavors';
import MonthlySummary from './components/management/MonthlySummary';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './components/Signup'

function App() {
  return (
    <FlashMessageProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<IceCreamList />} />
                <Route path="/items/:id" element={<ItemDetails />} />
                <Route path="/login" element={<ProtectedRoute element={<Login />} />} />
                {/* <Route path="/login" element={isLoggedIn() && !isTokenExpired() ? <Navigate to="/" /> : <Login />} /> */}
                <Route path="/signup" element={isLoggedIn() && !isTokenExpired() ? <Navigate to="/" /> : <Signup />} />
                {/* <Route path="/cart" element={<Cart />} />
                <Route path="/management" element={<Management />} />
                <Route path="/items/new" element={<ItemCreate />} />
                <Route path="/items/:id/edit" element={<ItemEdit />} />
                <Route path="/management/items" element={<Items />} />
                <Route path="/management/categories" element={<Categories />} />
                <Route path="/management/flavors" element={<Flavors />} />
                <Route path="/management/summary" element={<MonthlySummary />} /> */}

                <Route path="/management" element={<ProtectedRoute element={<Management />} adminOnly />} />
                <Route path="/cart" element={<ProtectedRoute element={<Cart />} />} />
                <Route path="/items/new" element={<ProtectedRoute element={<ItemCreate />} />} />
                <Route path="/items/:id/edit" element={<ProtectedRoute element={<ItemEdit />} />} />
                <Route path="/management/items" element={<ProtectedRoute element={<Items />} adminOnly />} />
                <Route path="/management/categories" element={<ProtectedRoute element={<Categories />} adminOnly />} />
                <Route path="/management/flavors" element={<ProtectedRoute element={<Flavors />} adminOnly />} />
                <Route path="/management/summary" element={<ProtectedRoute element={<MonthlySummary />} adminOnly />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </FlashMessageProvider>
  );
}

export default App;
