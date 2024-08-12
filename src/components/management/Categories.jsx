import React, { useState } from 'react';
import useCategories from '../hooks/useCategories';
import '../../styles/Categories.css'

const Categories = () => {
  const { categories, setCategories, loading } = useCategories();
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleEditClick = (category) => {
    setEditingCategoryId(category.id);
    setEditingName(category.name);
  };

  const handleSaveClick = (categoryId) => {
    fetch(`http://localhost:3000/categories/${categoryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwtToken')}`
      },
      body: JSON.stringify({ name: editingName }),
    })
      .then(response => response.json())
      .then(() => {
        setCategories(categories.map(cat =>
          cat.id === categoryId ? { ...cat, name: editingName } : cat
        ));
        setEditingCategoryId(null);
      })
      .catch(error => console.error("There was an error updating the category!", error));
  };

  const handleDeleteClick = (categoryId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (confirmDelete) {
      fetch(`http://localhost:3000/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('jwtToken')}`
        }
      })
        .then(() => {
          setCategories(categories.filter(cat => cat.id !== categoryId));
        })
        .catch(error => console.error("There was an error deleting the category!", error));
    }
  };

  const handleCreateClick = () => {
    fetch('http://localhost:3000/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwtToken')}`
      },
      body: JSON.stringify({
        category: {
          name: newCategoryName
        }
      }),
    })
      .then(response => response.json())
      .then(newCategory => {
        if (newCategory && newCategory.category.id) {
          setCategories([...categories, newCategory.category]);
        }
        setNewCategoryName('');
      })
      .catch(error => console.error("There was an error creating the category!", error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="categories-container">
      <h1>Categories</h1>
      <div className="create-category">
        <input
          type="text"
          placeholder="New Category Name"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button onClick={handleCreateClick}>
          Create Category
        </button>
      </div>
      <table className="categories-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>
                {editingCategoryId === category.id ? (
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                ) : (
                  category.name
                )}
              </td>
              <td>
                {editingCategoryId === category.id ? (
                  <button onClick={() => handleSaveClick(category.id)} className="save-button">Save</button>
                ) : (
                  <button onClick={() => handleEditClick(category)} className="edit-button">Edit</button>
                )}
                <button onClick={() => handleDeleteClick(category.id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default Categories;


