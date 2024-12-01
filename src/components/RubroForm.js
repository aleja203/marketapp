import React, { useState } from "react"; // Asegúrate de importar React y useState
import axios from "axios"; // Importar Axios para las solicitudes HTTP

const CrearRubro = () => {
  const [nombre, setNombre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/market/rubros", { nombre })
      .then((response) => {
        console.log("Rubro creado:", response.data);
        alert("Rubro creado exitosamente!");
        setNombre("");
      })
      .catch((error) => console.error("Error creando rubro:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group my-3">
        <label className="mb-2">Cargar Rubro</label>
        <br/>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Crear Rubro{" "}
      </button>
    </form>
  );
};

// Exporta el componente para que pueda ser utilizado en otros archivos
export default CrearRubro;
