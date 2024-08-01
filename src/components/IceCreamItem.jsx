import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/IceCreamItem.css';

function IceCreamItem({ id, name, price, flavor, image }) {
  return (
    <Link to={`/items/${id}`} className="icecream-item-link">
      <div className="icecream-item">
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <h3>{flavor}</h3>
        <p>Price: ¥{price}</p>
      </div>
    </Link>
  );
}

export default IceCreamItem;
