import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemForm from './ItemForm';

function ItemEdit() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [flavors, setFlavors] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/items/${id}`)
      .then((response) => response.json())
      .then((data) => setItem(data))
      .catch((error) => console.error('Error fetching item:', error));

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
  }, [id]);

  const handleEdit = (itemData) => {
    return fetch(`http://localhost:3000/items/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwtToken')}`
      },
      body: JSON.stringify(itemData)
    });
  };

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Edit Item</h2>
      <ItemForm item={item} categories={categories} flavors={flavors} onSubmit={handleEdit} formType="edit" />
    </div>
  );
}

export default ItemEdit;
