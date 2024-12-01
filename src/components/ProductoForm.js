import React, { useState, useEffect } from "react";
import axios from "axios";

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

  // Manejar cambios en el archivo de imagen
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      imagenPrincipal: e.target.files[0],
    });
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Crear el paquete JSON directamente desde formData
    const data = {
      codigo: formData.codigo,
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      etiqueta: formData.etiqueta,
      especificaciones: formData.especificaciones,
      estado: formData.estado,
      rubroId: formData.rubroId,
      subRubroId: formData.subRubroId,
      existencia: formData.existencia,
      costo: formData.costo,
      precioVenta: formData.precioVenta,
      imagenPrincipal: null, // Si necesitas manejar imágenes, se hará de forma distinta
    };
  
    // Enviar datos como JSON al backend
    axios
      .post("http://localhost:8080/market/productos", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        alert("Producto creado exitosamente!");
        // Limpiar formulario después de la respuesta exitosa
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
        });
        setSubRubros([]); // Limpiar subrubros después del envío
      })
      .catch((error) => console.error("Error creando el producto:", error));
  };

  return (
<form onSubmit={handleSubmit}>
  <h2>Crear Producto</h2>

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

  <div className="form-group">
    <label>Especificaciones:</label>
    <input
      type="text"
      name="especificaciones"
      value={formData.especificaciones}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  <div className="form-group">
    <label>Estado:</label>
    <input
      type="checkbox"
      name="estado"
      checked={formData.estado}
      onChange={handleChange}
    />
  </div>

  <div className="form-group">
    <label>Seleccionar Rubro:</label>
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

  <div className="form-group">
    <label>Seleccionar SubRubro:</label>
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

  <div className="form-group">
    <label>Precio Venta:</label>
    <input
      type="number"
      step="0.01"
      name="precioVenta"
      value={formData.precioVenta}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  <div className="form-group">
    <label>Imagen Principal:</label>
    <input
      type="file"
      name="imagenPrincipal"
      onChange={handleFileChange}
      className="form-control"
    />
  </div>

  <div className="form-group">
    <label>Galería de Imágenes:</label>
    <input
      type="file"
      name="galeriaImagenes"
      onChange={handleFileChange}
      multiple
      className="form-control"
    />
    <small className="form-text text-muted">Puedes seleccionar múltiples imágenes.</small>
  </div>

  <button type="submit" className="btn btn-primary">Crear Producto</button>
</form>

  );
};

export default ProductoForm;
