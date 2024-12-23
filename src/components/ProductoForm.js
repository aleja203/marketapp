import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductoForm = () => {
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    descripcion: "",
    etiqueta: "",
    especificaciones: "",
    estado: true,
    rubroId: "",
    subRubroId: "",
    existencia: "",
    costo: "",
    precioVenta: "",
    imagenPrincipal: null,
    galeriaImagenes: [],
  });

  const [rubros, setRubros] = useState([]); // Lista de rubros
  const [subRubros, setSubRubros] = useState([]); // Lista de subrubros filtrados

  // Cargar rubros desde el backend al montar el componente
  useEffect(() => {
    axios
      .get("http://localhost:8080/market/rubros")
      .then((response) => setRubros(response.data))
      .catch((error) => console.error("Error cargando los rubros:", error));
  }, []);

  // Cargar subrubros cuando cambia el rubro seleccionado
  useEffect(() => {
    if (formData.rubroId) {
      axios
        .get(`http://localhost:8080/market/subrubros?rubroId=${formData.rubroId}`)
        .then((response) => setSubRubros(response.data))
        .catch((error) => console.error("Error cargando los subrubros:", error));
    } else {
      setSubRubros([]); // Si no hay rubro seleccionado, limpiar los subrubros
      setFormData((prev) => ({ ...prev, subRubroId: "" })); // Limpiar subrubro seleccionado
    }
  }, [formData.rubroId]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Manejar cambios en el archivo de imagen principal
const handleImagenPrincipalChange = (e) => {
  const file = e.target.files[0]; // Obtener el primer archivo seleccionado
  setFormData((prev) => ({
    ...prev,
    imagenPrincipal: file,
  }));
  if (file) {
    console.log("Imagen principal seleccionada:", file.name); // Imprimir el nombre del archivo
  }
};

  // Manejar cambios en la galería de imágenes
  const handleGaleriaChange = (event) => {
    const files = Array.from(event.target.files); // Convertir a array de archivos
    setFormData({
      ...formData,
      galeriaImagenes: files, // Almacenar los archivos seleccionados
    });
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear un nuevo objeto FormData
    const data = new FormData();

    // Añadir los campos del formulario
    data.append("codigo", formData.codigo);
    data.append("nombre", formData.nombre);
    data.append("descripcion", formData.descripcion);
    data.append("etiqueta", formData.etiqueta);
    data.append("especificaciones", formData.especificaciones);
    data.append("estado", formData.estado);
    data.append("rubroId", formData.rubroId);
    data.append("subRubroId", formData.subRubroId);
    data.append("existencia", formData.existencia);
    data.append("costo", formData.costo);
    data.append("precioVenta", formData.precioVenta);

    console.log("formData.imagenPrincipal antes del envío:", formData.imagenPrincipal);

    // Agregar la imagen principal si existe
    if (formData.imagenPrincipal) {
      data.append("imagenPrincipal", formData.imagenPrincipal);
      console.log("Archivo de imagen principal para enviar:", formData.imagenPrincipal.name);
    } else {
      console.log("No se seleccionó una imagen principal.");
    }

    // Agregar las imágenes de la galería si existen
    if (formData.galeriaImagenes.length > 0) {
      formData.galeriaImagenes.forEach((file, index) => {
        // data.append(`galeriaImagenes[${index}]`, file); // Usa un índice único para cada imagen
        data.append("galeriaImagenes", file); // Usa un índice único para cada imagen
        console.log(`Imagen de galería ${index + 1}:`, file.name);  // Log para cada archivo de la galería
      });
    } else {
      console.log("No se seleccionaron imágenes para la galería.");
    }

    // Enviar los datos usando FormData
axios
  .post("http://localhost:8080/market/productos", data) // No incluyas Content-Type
  .then((response) => {
    alert("Producto creado exitosamente!");
    setFormData({
      codigo: "",
      nombre: "",
      descripcion: "",
      etiqueta: "",
      especificaciones: "",
      estado: true,
      rubroId: "",
      subRubroId: "",
      existencia: "",
      costo: "",
      precioVenta: "",
      imagenPrincipal: null,
      galeriaImagenes: [],
    });
    setSubRubros([]); // Limpiar subrubros después del envío
  })
  .catch((error) => console.error("Error creando el producto:", error));

  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Crear Producto</h3>

      <div className="form-group">
        <label>Código:</label>
        <input
          type="text"
          name="codigo"
          value={formData.codigo}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <br />
      <div className="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <br />
      <div className="form-group">
        <label>Descripción:</label>
        <input
          type="text"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <br />
      <div className="form-group">
        <label>Etiqueta:</label>
        <input
          type="text"
          name="etiqueta"
          value={formData.etiqueta}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <br />
      <div className="form-group">
        <label>Especificaciones:</label>
        <input
          type="text"
          name="especificaciones"
          value={formData.especificaciones}
          onChange={handleChange}
          className="form-control"
          placeholder="Ingrese especificaciones separadas por comas"
        />
      </div>
      <br />
      <div className="form-group">
        <label>Activo:</label>
        <input
          type="checkbox"
          name="estado"
          checked={formData.estado}
          onChange={handleChange}
        />
      </div>
      <br />
      <div className="form-group">
        <label>Rubro:</label>
        <select
          name="rubroId"
          value={formData.rubroId}
          onChange={handleChange}
          required
          className="form-control"
        >
          <option value="">Seleccione un Rubro</option>
          {rubros.map((rubro) => (
            <option key={rubro.id} value={rubro.id}>
              {rubro.nombre}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div className="form-group">
        <label>SubRubro:</label>
        <select
          name="subRubroId"
          value={formData.subRubroId}
          onChange={handleChange}
          required
          disabled={!formData.rubroId} // Deshabilitar si no hay rubro seleccionado
          className="form-control"
        >
          <option value="">Seleccione un SubRubro</option>
          {subRubros.map((subRubro) => (
            <option key={subRubro.id} value={subRubro.id}>
              {subRubro.nombre}
            </option>
          ))}
        </select>
      </div>
      <br />
      <div className="form-group">
        <label>Existencia:</label>
        <input
          type="number"
          step="0.01"
          name="existencia"
          value={formData.existencia}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <br />
      <div className="form-group">
        <label>Costo:</label>
        <input
          type="number"
          step="0.01"
          name="costo"
          value={formData.costo}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <br />
      <div className="form-group">
        <label>Precio de Venta:</label>
        <input
          type="number"
          step="0.01"
          name="precioVenta"
          value={formData.precioVenta}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <br />
      <div className="form-group">
        <label>Imagen Principal:</label>
        <input
          type="file"
          name="imagenPrincipal"
          onChange={handleImagenPrincipalChange}
          className="form-control"
        />
      </div>
      <br />
      <div className="form-group">
        <label>Galería de Imágenes:</label>
        <input
          type="file"
          multiple
          name="galeriaImagenes"
          onChange={handleGaleriaChange}
          className="form-control"
        />
      </div>
      <br />
      <button type="submit" className="btn btn-primary">
        Crear Producto
      </button>
    </form>
  );
};

export default ProductoForm;
