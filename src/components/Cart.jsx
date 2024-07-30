import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';
import { useFlashMessage } from '../contexts/FlashMessageContext';

function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const addMessage = useFlashMessage();

  const handleCheckout = async () => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      console.error('JWT token not found');
      return;
    }

    const purchaseData = {
      sales: cart.map((item) => ({
        item_id: item.id,
        flavor_id: item.flavor?.id ? item.flavor.id : null ,
        quantity: item.quantity,
      })),
      user: {
        user_id: 1, // FIX ME
      },
    };

    try {
      const response = await fetch('http://localhost:3000/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${jwtToken}`,
        },
        body: JSON.stringify(purchaseData),
      });

      const data = await response.json();
      if (!response.ok) {
        addMessage(`${data.message}`);
        console.log(`${data.error}`);
        return;
      }
      addMessage(data.message);
      clearCart();
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>Flavor: {item.flavor?.name}</p>
                <p>Price: ¥{item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <button onClick={clearCart}>Clear Cart</button>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
