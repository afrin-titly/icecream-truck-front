import { useState, useEffect } from 'react';

const useFlavors = () => {
  const [flavors, setFlavors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/flavors', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwtToken')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setFlavors(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching flavors:", error);
        setLoading(false);
      });
  }, []);

  return { flavors, setFlavors, loading };
};

export default useFlavors;
