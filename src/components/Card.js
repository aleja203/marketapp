import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ producto }) => {
  // Desestructuración de las propiedades de producto
  const { codigo, nombre, descripcion, precioVenta, imagenPrincipal } = producto; // Cambiar 'id' por 'codigo'

  return (
<div className="col">
  <div className="card shadow-sm h-100"> {/* h-100 aplicada para altura uniforme */}
    {/* Imagen principal del producto */}
{/* img-fluid aplicada para que la imagen se adapte */}
<img
  src={`http://localhost:8080/market/productos/${codigo ? codigo : ''}/imagen-principal`} 
  alt={nombre} 
  onError={(e) => (e.target.src = "https://via.placeholder.com/150?text=Sin+Imagen")}
  className="bd-placeholder-img card-img-top img-fluid" 
/>
    <div className="card-body d-flex flex-column"> {/* flex-column para ajustar el contenido verticalmente */}
      <h5 className="card-title">{nombre}</h5>
      <p className="card-text">{descripcion}</p>
      <div className="mt-auto"> {/* mt-auto empuja el siguiente div hacia abajo para ocupar todo el espacio disponible */}
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">Código: {codigo}</small> {/* Mostrar código en lugar de id */}
          <strong className="text-primary">${precioVenta}</strong>
        </div>
        {/* Enlace para ver más detalles */}
        <div className="btn-group mt-3"> {/* mt-3 para separar botones del texto */}
          <Link to={`/details/${codigo}`} className="btn btn-sm btn-outline-secondary"> {/* Cambiar id por codigo */}
            Ver más
          </Link>
          <button type="button" className="btn btn-sm btn-outline-secondary">
            Comprar
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export { Card };

