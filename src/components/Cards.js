// import React, { useEffect, useState } from 'react'
// import { Card } from './Card'
// import RickAndMortyService from '../services/RickAndMorty.service';

// // const Cards = ({ mascotas }) => {
//   const Cards = () => {

//     const [productos, setProductos] = useState([]);
    
//     useEffect(() => {
//       RickAndMortyService.getAllCharacters()
//         .then((data) => setProductos(data.results))
//         .catch((error) => console.log(error));
      
//       }, [productos])


//     const cardsList = productos.map((m) => <Card producto={m} key={m.id}/>)
    
//   return (
//     <div className="album py-5 bg-body-tertiary">
//     <div className="container">

//       <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
//       {cardsList}

//       </div>
//     </div>
//   </div>
//   )
// }

// export { Cards };

import React, { useEffect, useState } from 'react';
import { Card } from './Card';
import ProductoService from '../services/ProductoService';

const Cards = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    ProductoService.getAllProductos()
      .then((data) => setProductos(data))
      .catch((error) => console.log('Error al cargar los productos', error));
  }, []); // [] para que solo se ejecute una vez al montar

  const cardsList = productos.map((producto) => (
    <Card producto={producto} key={producto.codigo} />
  ));

  return (
    <div className="album py-5 bg-body-tertiary">
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {cardsList}
        </div>
      </div>
    </div>
  );
};

export { Cards };
