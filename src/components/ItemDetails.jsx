// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useCart } from '../contexts/CartContext';
// import '../styles/ItemDetails.css';

// function ItemDetails() {
//   const { id } = useParams();
//   const [item, setItem] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const { addToCart, isLoggedIn } = useCart();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(`http://localhost:3000/items/${id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setItem(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching item details:', error);
//         setLoading(false);
//       });
//   }, [id]);

//   const handleAddToCart = () => {
//     if (!isLoggedIn) {
//       navigate('/login');
//     } else {

//       addToCart(item, quantity);
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!item) {
//     return <p>Item not found</p>;
//   }

//   return (
//     <div className="item-details">
//       <img src={item.image} alt={item.name} />
//       <div className="details">
//         <h2>{item.name}</h2>
//         <h3>{item.flavor?.name}</h3>
//         <p>Price: ¥{item.price}</p>
//         <p>Description: {item.description}</p>
//         <div className="quantity-control">
//           <button onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}>-</button>
//           <span>{quantity}</span>
//           <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
//         </div>
//         <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
//       </div>
//     </div>
//   );
// }

// export default ItemDetails;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '../styles/ItemDetails.css';
import { useFlashMessage } from "../contexts/FlashMessageContext";
import { isLoggedIn } from './Auth';

function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const addMessage = useFlashMessage();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/items/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching item details:', error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    addToCart(item, quantity);
    addMessage("Item added to cart!");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!item) {
    return <p>Item not found</p>;
  }

  return (
    <div className="item-details">
      <img src={item.image} alt={item.name} />
      <div className="details">
        <h2>{item.name}</h2>
        <h3>{item.flavor?.name}</h3>
        <p>Price: ¥{item.price}</p>
        <p>Description: {item.description}</p>
        <div className="quantity-control">
          <button onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
        <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
}

export default ItemDetails;
