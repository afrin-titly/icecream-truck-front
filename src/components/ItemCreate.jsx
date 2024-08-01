import React, { useState, useEffect } from 'react';
import ItemForm from './ItemForm';

function ItemCreate() {
  const [categories, setCategories] = useState([]);
  const [flavors, setFlavors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/categories', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwtToken')}`
      }
    })
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));

    fetch('http://localhost:3000/flavors', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwtToken')}`
      }
    })
      .then((response) => response.json())
      .then((data) => setFlavors(data))
      .catch((error) => console.error('Error fetching flavors:', error));
  }, []);

  const handleCreate = (itemData) => {
    return fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwtToken')}`
      },
      body: JSON.stringify(itemData)
    });
  };

  return (
    <div>
      <h2>Create Item</h2>
      <ItemForm categories={categories} flavors={flavors} onSubmit={handleCreate} formType="create" />
    </div>
  );
}

export default ItemCreate;
