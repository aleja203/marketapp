// import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';

// const Carrito = () => {
//   const [carrito, setCarrito] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
//     setCarrito(carritoGuardado);
//   }, []);

//   const eliminarDelCarrito = (idProducto) => {
//     const nuevoCarrito = carrito.filter(
//       (producto) => producto.codigo !== idProducto
//     );
//     setCarrito(nuevoCarrito);
//     localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
//   };

//   const confirmarCompra = () => {
//     console.log("Compra confirmada:", carrito);
//     navigate('/pago', { state: { carrito } }); // Pasar carrito a la pantalla de pago
//   };

//   return (
//     <div>
//       <h2>🛒 Carrito de Compras</h2>

//       {carrito.length === 0 ? (
//         <p>No hay productos en el carrito.</p>
//       ) : (
//         <div>
//           {carrito.map((producto, index) => (
//             <div key={index} className="d-flex justify-content-between align-items-center mb-3">
//               <div className="d-flex align-items-center">
//                 <img
//                   src={`http://localhost:8080/market/productos/${producto.codigo}/imagen-principal`}
//                   alt={producto.nombre}
//                   style={{ width: "100px", height: "auto", marginRight: "10px" }}
//                 />
//                 <div>
//                   <strong>{producto.nombre}</strong> - ${producto.precioVenta}
//                   <p>{producto.descripcion}</p>
//                 </div>
//               </div>
//               <button className="btn btn-danger" onClick={() => eliminarDelCarrito(producto.codigo)}>
//                 Eliminar
//               </button>
//             </div>
//           ))}
//           <div className="d-flex justify-content-center">
//             <button className="btn btn-success mt-3" onClick={confirmarCompra}>
//               Confirmar compra
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Carrito;

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    // Asignar la propiedad 'cantidad' para cada producto, si no existe
    const carritoConCantidad = carritoGuardado.map(producto => ({
      ...producto,
      cantidad: producto.cantidad ?? 1 // Si cantidad no existe, se asigna 1
    }));
    setCarrito(carritoConCantidad);
  }, []);

  const actualizarCantidad = (codigo, cantidad) => {
    const nuevoCarrito = carrito.map(producto => 
      producto.codigo === codigo ? { ...producto, cantidad } : producto
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const eliminarDelCarrito = (idProducto) => {
    const nuevoCarrito = carrito.filter(
      (producto) => producto.codigo !== idProducto
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const confirmarCompra = () => {
    console.log("Compra confirmada:", carrito);
    navigate('/pago', { state: { carrito } }); // Pasar carrito a la pantalla de pago
  };

  return (
    <div>
      <h2>🛒 Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <div>
          {carrito.map((producto, index) => (
            <div key={index} className="d-flex justify-content-between align-items-center mb-3">
              <div className="d-flex align-items-center">
                <img
                  src={`http://localhost:8080/market/productos/${producto.codigo}/imagen-principal`}
                  alt={producto.nombre}
                  style={{ width: "100px", height: "auto", marginRight: "10px" }}
                />
                <div>
                  <strong>{producto.nombre}</strong> - ${producto.precioVenta}
                  <p>{producto.descripcion}</p>
                  <label htmlFor={`cantidad-${producto.codigo}`}>Cantidad:</label>
                  <input 
                    type="number" 
                    id={`cantidad-${producto.codigo}`} 
                    min="1" 
                    value={producto.cantidad} 
                    onChange={(e) => actualizarCantidad(producto.codigo, parseInt(e.target.value) || 1)} 
                    style={{ width: "50px", marginLeft: "10px" }}
                  />
                </div>
              </div>
              <button className="btn btn-danger" onClick={() => eliminarDelCarrito(producto.codigo)}>
                Eliminar
              </button>
            </div>
          ))}
          <div className="d-flex justify-content-center">
            <button className="btn btn-success mt-3" onClick={confirmarCompra}>
              Confirmar compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
