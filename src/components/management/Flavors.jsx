import React, { useState } from 'react';
import useFlavors from '../hooks/useFlavors';
import '../../styles/Flavors.css'

const Flavors = () => {
  const { flavors, setFlavors, loading } = useFlavors();
  const [editingFlavorId, setEditingFlavorId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [newFlavorName, setNewFlavorName] = useState('');

  const handleEditClick = (flavor) => {
    setEditingFlavorId(flavor.id);
    setEditingName(flavor.name);
  };

  const handleSaveClick = (flavorId) => {
    fetch(`http://localhost:3000/flavors/${flavorId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwtToken')}`
      },
      body: JSON.stringify({ name: editingName }),
    })
      .then(response => response.json())
      .then(() => {
        setFlavors(flavors.map(flav =>
          flav.id === flavorId ? { ...flav, name: editingName } : flav
        ));
        setEditingFlavorId(null);
      })
      .catch(error => console.error("There was an error updating the flavor!", error));
  };

  const handleDeleteClick = (flavorId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this flavor?');
    if (confirmDelete) {
      fetch(`http://localhost:3000/flavors/${flavorId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('jwtToken')}`
        }
      })
        .then(() => {
          setFlavors(flavors.filter(cat => cat.id !== flavorId));
        })
        .catch(error => console.error("There was an error deleting the flavor!", error));
    }
  };

  const handleCreateClick = () => {
    fetch('http://localhost:3000/flavors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwtToken')}`
      },
      body: JSON.stringify({
        flavor: {
          name: newFlavorName
        }
      }),
    })
      .then(response => response.json())
      .then(newFlavor => {
        if (newFlavor && newFlavor.flavor.id) {
          setFlavors([...flavors, newFlavor.flavor]);
        }
        setNewFlavorName('');
      })
      .catch(error => console.error("There was an error creating the flavor!", error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flavors-container">
      <h1>Flavors</h1>
      <div className="create-flavor">
        <input
          type="text"
          placeholder="New Flavor Name"
          value={newFlavorName}
          onChange={(e) => setNewFlavorName(e.target.value)}
        />
        <button onClick={handleCreateClick}>
          Create Flavor
        </button>
      </div>
      <table className="flavors-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flavors.map(flavor => (
            <tr key={flavor.id}>
              <td>
                {editingFlavorId === flavor.id ? (
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                ) : (
                  flavor.name
                )}
              </td>
              <td>
                {editingFlavorId === flavor.id ? (
                  <button onClick={() => handleSaveClick(flavor.id)} className="save-button">Save</button>
                ) : (
                  <button onClick={() => handleEditClick(flavor)} className="edit-button">Edit</button>
                )}
                <button onClick={() => handleDeleteClick(flavor.id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default Flavors;


