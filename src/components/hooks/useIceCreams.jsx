import { useEffect, useState } from 'react';

const useIceCreams = () => {
  const [iceCreams, setIceCreams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/items')
      .then((response) => response.json())
      .then((data) => {
        setIceCreams(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching ice cream data:', error);
        setLoading(false);
      });
  }, []);

  return { iceCreams, loading };
};

export default useIceCreams;
