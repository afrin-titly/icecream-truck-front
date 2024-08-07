import React from 'react';
import useIceCreams from '../hooks/useIceCreams';
import '../../styles/Items.css';
import {Link} from 'react-router-dom'

const Items = () => {
  const { iceCreams, loading } = useIceCreams();


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
              <td>{icecream.flavor?.name}</td>
              <td>
                <Link to={`/items/${1}/edit`} className="edit-button">
                  Edit
                </Link>
                <button className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Items;
