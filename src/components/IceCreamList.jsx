// import React, { useEffect, useState } from 'react';
// import IceCreamItem from './IceCreamItem';
// import '../styles/IceCreamList.css';

// function IceCreamList() {
//   const [iceCreams, setIceCreams] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch('http://localhost:3000/items')
//       .then((response) => response.json())
//       .then((data) => {
//         setIceCreams(data);
//         console.log(data)
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching ice cream data:', error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="icecream-list">
//       {iceCreams.map((icecream) => (
//         <IceCreamItem
//           key={icecream.id}
//           name={icecream.name}
//           price={icecream.price}
//           flavor={icecream.flavor?.name}
//           image={icecream.image}
//         />
//       ))
//       }
//     </div>
//   );
// }

// export default IceCreamList;


import React, { useEffect, useState } from 'react';
import IceCreamItem from './IceCreamItem';
import '../styles/IceCreamList.css';

function IceCreamList() {
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="icecream-list">
      {iceCreams.map((icecream) => (
        <IceCreamItem
          key={icecream.id}
          id={icecream.id}
          name={icecream.name}
          price={icecream.price}
          flavor={icecream.flavor?.name}
          image={icecream.image}
        />
      ))}
    </div>
  );
}

export default IceCreamList;
