import React, { useState, useEffect } from "react";
import axios from "axios";

const CrearSubRubro = () => {
  const [nombre, setNombre] = useState("");
  const [rubros, setRubros] = useState([]);
  const [selectedRubro, setSelectedRubro] = useState("");

  // Cargar los rubros desde el backend
  useEffect(() => {
    axios.get("http://localhost:8080/market/rubros")
      .then((response) => {
        setRubros(response.data);
      })
      .catch((error) => console.error("Error cargando los rubros:", error));
  }, []);

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const subRubroData = { nombre, rubroId: selectedRubro };

    // Enviar el subrubro al backend
    axios.post("http://localhost:8080/market/subrubros", subRubroData)
      .then((response) => {
        console.log("SubRubro creado:", response.data);
        alert("SubRubro creado exitosamente!");
        setNombre("");
        setSelectedRubro("");
      })
      .catch((error) => console.error("Error creando subrubro:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear SubRubro</h2>

      <label>Nombre del SubRubro:</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <label>Seleccionar Rubro:</label>
      <select
        value={selectedRubro}
        onChange={(e) => setSelectedRubro(e.target.value)}
        required
      >
        <option value="">Seleccione un Rubro</option>
        {rubros.map((rubro) => (
          <option key={rubro.id} value={rubro.id}>
            {rubro.nombre}
          </option>
        ))}
      </select>

      <button type="submit">Crear SubRubro</button>
    </form>
  );
};

export default CrearSubRubro;
