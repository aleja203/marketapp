import React, { useEffect, useState } from "react";
import ProductoService from "../services/ProductoService";
import { useParams } from "react-router-dom";

export const Detail = () => {
  const [producto, setProducto] = useState({ galeria_imagenes: [] });
  const [imagenes, setImagenes] = useState([]); // Estado para la galería de imágenes
  const [indiceActual, setIndiceActual] = useState(0); // Estado para la imagen que se está mostrando actualmente
  const { codigo } = useParams();

  // Este useEffect obtiene los detalles generales del producto
  useEffect(() => {
    ProductoService.getAllProductos()
      .then((data) => {
        const productoEncontrado = data.find(
          (producto) => producto.codigo === codigo
        );
        console.log("Producto encontrado:", productoEncontrado); // Verifica si el producto existe
        setProducto(productoEncontrado || {}); // Establece el producto
      })
      .catch((error) => console.log("Error al cargar los productos", error));
  }, [codigo]);

  // Este useEffect obtiene las imágenes de la galería para el producto
  useEffect(() => {
    if (
      producto.codigo &&
      producto.galeriaImagenes &&
      producto.galeriaImagenes.length > 0
    ) {
      Promise.all(
        producto.galeriaImagenes.map((imagen) =>
          ProductoService.getImagenGaleria(producto.codigo, imagen.nombre)
            .then((data) => {
              if (typeof data === "string" && data.startsWith("blob:")) {
                return {
                  nombre: imagen.nombre,
                  url: data, // Almacena la URL
                };
              } else {
                console.error("El dato devuelto no es un Blob:", data);
                return null; // Devolvemos null para filtrar después
              }
            })
            .catch((error) => {
              console.error("Error al obtener la imagen de la galería:", error);
              return null; // Devolvemos null para filtrar después
            })
        )
      )
        .then((data) => {
          const blobsValidos = data.filter((item) => item !== null); // Filtrar los errores
          console.log("Galería de imágenes válidas:", blobsValidos);

          const imagenesURLs = blobsValidos
            .map((item) => {
              if (item.url) {
                return item.url; // Usar la URL que recibiste
              } else {
                console.error("El item.url no es válido:", item.url);
                return null;
              }
            })
            .filter((url) => url !== null);

          setImagenes(imagenesURLs);
        })
        .catch((error) => {
          console.error("Error global al cargar las imágenes", error);
        });
    }
  }, [producto.codigo, producto.galeriaImagenes]);
  // Se ejecuta cuando el código del producto cambia

  // Funciones para cambiar la imagen actual mediante los botones de flecha
  const imagenAnterior = () => {
    setIndiceActual((prevIndice) =>
      prevIndice === 0 ? imagenes.length - 1 : prevIndice - 1
    );
  };

  const imagenSiguiente = () => {
    setIndiceActual((prevIndice) =>
      prevIndice === imagenes.length - 1 ? 0 : prevIndice + 1
    );
  };

  console.log("URL de la imagen:", imagenes[indiceActual]);

  const agregarAlCarrito = (producto) => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carritoGuardado.find(item => item.id === producto.codigo);

    // Si el producto ya existe en el carrito, no lo agregamos de nuevo
    if (!productoExistente) {
      carritoGuardado.push(producto);
      localStorage.setItem('carrito', JSON.stringify(carritoGuardado));
      alert('Producto agregado al carrito con éxito');
    } else {
      alert('Este producto ya está en el carrito');
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Imagen y detalles del producto */}
        <div className="col-md-6 d-flex flex-column align-items-center">
          {imagenes.length > 0 && (
            <div className="position-relative text-center mb-3">
              <button
                className="btn btn-dark position-absolute top-50 start-0 translate-middle-y"
                onClick={imagenAnterior}
              >
                &#8592;
              </button>
  
              <img
                className="img-fluid rounded"
                src={imagenes[indiceActual]} // Usar las URLs de las imágenes
                alt="Imagen del producto"
                style={{
                  width: "100%", // Asegura que la imagen ocupe todo el ancho disponible
                  height: "250px", // Altura fija de la imagen
                  objectFit: "cover", // Asegura que la imagen se recorte y no se distorsione
                }}
              />
  
              <button
                className="btn btn-dark position-absolute top-50 end-0 translate-middle-y"
                onClick={imagenSiguiente}
              >
                &#8594;
              </button>
            </div>
          )}
        </div>
  
        {/* Descripción y precio del producto */}
        <div className="col-md-6 d-flex flex-column">
          <strong className="d-inline-block mb-2 text-success">
            {producto.etiqueta}
          </strong>
          <h3 className="mb-3 text-dark">{producto.nombre}</h3>
          <p className="mb-4">{producto.descripcion || "Sin descripción disponible."}</p>
  
          <h4 className="text-primary mb-4">Precio: ${producto.precioVenta?.toFixed(2) || "No disponible"}</h4>
        </div>
      </div>
  
      {/* Especificaciones técnicas */}
      <div className="row mt-4">
        <div className="col-md-12">
          <h5 className="text-dark">Especificaciones técnicas</h5>
          <ul className="list-group mt-2">
            {producto.especificaciones?.split(",").map((item, index) => (
              <li key={index} className="list-group-item">
                {item.trim()}
              </li>
            )) || <li className="list-group-item">Sin especificaciones</li>}
          </ul>
        </div>
      </div>
  
      {/* Botones de acción */}
      <div className="row mt-4">
        <div className="col-md-12 d-flex justify-content-center">
          <button 
            className="btn btn-success me-3" 
            onClick={() => agregarAlCarrito(producto)}
          >
            Agregar al carrito
          </button>
          {/* <button 
            className="btn btn-primary" 
            onClick={() => comprarAhora(producto)}
          >
            Comprar
          </button> */}
        </div>
      </div>
    </div>
  );
  
};
