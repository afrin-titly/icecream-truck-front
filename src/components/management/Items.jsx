import React from 'react';
import useIceCreams from '../hooks/useIceCreams';
import '../../styles/Items.css';
import {Link} from 'react-router-dom'
import { useFlashMessage } from "../../contexts/FlashMessageContext";

const Items = () => {
  const { iceCreams, loading } = useIceCreams();
  const addMessage = useFlashMessage();

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/items/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwtToken')}`
      }
    })
      .then((response) => {
        if (response.ok) {
          navigate('/');
          addMessage("Item deleted successfully");
        } else {
          console.error('Error deleting item');
          addMessage("Error deleting item");
        }
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
        addMessage("Error deleting item");
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="item-page">
      <h1>Ice Cream Items</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Flavor</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {iceCreams.map((icecream) => (
            <tr key={icecream.id}>
              <td>{icecream.id}</td>
              <td>{icecream.name}</td>
              <td>{icecream.price}¥</td>
              <td>{icecream.stock}</td>
              <td>{icecream.flavor?.name}</td>
              <td>
                <Link to={`/items/${icecream.id}/edit`} className="edit-button">
                  Edit
                </Link>
                <button className="delete-button" onClick={() => handleDelete(icecream.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to={`/items/new`} className="create-button"> Create Item </Link>
    </div>
  );
};

export default Items;
