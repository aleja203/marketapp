import axios from 'axios';

const API_URL = "http://localhost:8080/market/productos";

const ProductoService = {
  // Método para obtener todos los productos
  getAllProductos: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Error al obtener los productos');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en la solicitud:', error);
      throw error;
    }
  },

  // 🚀 Método para obtener la imagen de la galería de un producto
  getImagenGaleria: async (codigo, nombreImagen) => {
    try {
      const url = `${API_URL}/${codigo}/galeria/${nombreImagen}`;
      console.log(`URL de la imagen: ${url}`);
  
      const response = await fetch(url, { method: 'GET' });
      const contentType = response.headers.get('Content-Type');
      console.log(`Response status: ${response.status} (${response.statusText})`);
      console.log(`Response Content-Type: ${contentType}`);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      if (!contentType || !contentType.startsWith('image/')) {
        throw new Error(`El servidor devolvió un tipo de contenido no válido: ${contentType}`);
      }
  
      const blob = await response.blob();
      if (!blob || !(blob instanceof Blob)) {
        console.error('El blob no es válido:', blob);
        throw new Error('La respuesta no es un Blob válido.');
      }
  
      let imageUrl = '';
      try {
        imageUrl = URL.createObjectURL(blob);
        console.log('Imagen de la galería obtenida:', imageUrl);
      } catch (error) {
        console.error('Error al crear la URL de la imagen:', error);
        throw new Error('No se pudo crear la URL de la imagen');
      }
      console.log('URL de la imagen antes de retornar:', imageUrl); // Esto verifica la URL justo antes de retornar
      return imageUrl;
  
    } catch (error) {
      console.error('Error al obtener la imagen de la galería:', error);
      throw error;
    }
  }
};

export default ProductoService;



