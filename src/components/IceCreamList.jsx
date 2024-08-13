import React from 'react';
import IceCreamItem from './IceCreamItem';
import useIceCreams from './hooks/useIceCreams';
import '../styles/IceCreamList.css';
import placeholder from '../assets/placeholder.avif'

function IceCreamList() {
  const { iceCreams, loading } = useIceCreams();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="icecream-list">
      {iceCreams.map((icecream) => (
        <IceCreamItem
          key={icecream.id}
          id={icecream.id}
          name={icecream.name}
          price={icecream.price}
          flavor={icecream.flavor?.name}
          image={placeholder}
        />
      ))}
    </div>
  );
}

export default IceCreamList;
