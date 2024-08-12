import { useState, useEffect } from 'react';

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/categories', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('jwtToken')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  return { categories, setCategories, loading };
};

export default useCategories;
