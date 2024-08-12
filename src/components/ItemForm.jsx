import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ItemForm.css';
import { useFlashMessage } from "../contexts/FlashMessageContext";

function ItemForm({ item, categories, flavors, onSubmit, formType }) {
  const [name, setName] = useState(item ? item.name : '');
  const [price, setPrice] = useState(item ? item.price : '');
  const [categoryId, setCategoryId] = useState(item ? item.category_id : '');
  const [flavorId, setFlavorId] = useState(item ? item.flavor?.id : '');
  const [stock, setStock] = useState(item ? item.stock : '');
  const addMessage = useFlashMessage();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const itemData = {
      item: {
        name,
        price,
        category_id: categoryId,
        flavor_id: flavorId,
        stock,
      }

    };

    onSubmit(itemData)
      .then(() => {
        navigate('/management/items');
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        addMessage("Error submitting form");
      });
  };

  return (
    <form className="item-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="flavor">Flavor</label>
        <select
          id="flavor"
          value={flavorId}
          onChange={(e) => setFlavorId(e.target.value)}
        >
          <option value="">Select Flavor</option>
          {flavors?.map((flavor) => (
            <option key={flavor.id} value={flavor.id}>
              {flavor.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          id="stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="submit-button">
        {formType === 'create' ? 'Create Item' : 'Update Item'}
      </button>
    </form>
  );
}

export default ItemForm;

