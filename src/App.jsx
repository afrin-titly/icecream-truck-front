// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import IceCreamList from './components/IceCreamList';
// import ItemDetails from './components/ItemDetails';
// import Login from './components/Login';
// import { CartProvider } from './contexts/CartContext';
// import ProtectedRoute from './components/ProtectedRoute';
// import './styles/App.css';
// import { FlashMessageProvider } from './contexts/FlashMessageContext';
// import Cart from './components/Cart';
// import { isLoggedIn } from './components/Auth';

// const AppContent = React.memo(() => (
//   <div className="App">
//     <Header />
//     <main>
//       <Routes>
//         <Route path="/" element={<IceCreamList />} />
//         <Route path="/items/:id" element={<ItemDetails />} />
//         <Route path="/login" element={isLoggedIn() ? <Navigate to="/" /> : <Login />} />
//         <Route path="/signup" element={isLoggedIn() ? <Navigate to="/" /> : <Login />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route
//           path="/protected"
//           element={
//             <ProtectedRoute>
//               {/* <Route path="/cart" element={<Cart />} /> */}
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </main>
//     <Footer />
//   </div>
// ));

// function App() {
//   return (
//     <FlashMessageProvider>
//       <CartProvider>
//         <Router>
//           <AppContent />
//         </Router>
//       </CartProvider>
//     </FlashMessageProvider>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import IceCreamList from './components/IceCreamList';
import ItemDetails from './components/ItemDetails';
import Login from './components/Login';
import { CartProvider } from './contexts/CartContext';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/App.css';
import { FlashMessageProvider } from './contexts/FlashMessageContext';
import Cart from './components/Cart';
import { isLoggedIn } from './components/Auth';
import ItemCreate from './components/ItemCreate';
import ItemEdit from './components/ItemEdit';

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
                <Route path="/login" element={isLoggedIn() ? <Navigate to="/" /> : <Login />} />
                <Route path="/signup" element={isLoggedIn() ? <Navigate to="/" /> : <Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/items/new" element={<ItemCreate />} />
                <Route path="/items/:id/edit" element={<ItemEdit />} />
                <Route
                  path="/protected"
                  element={
                    <ProtectedRoute>
                      {/* <SomeProtectedComponent /> */}
                    </ProtectedRoute>
                  }
                />
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
