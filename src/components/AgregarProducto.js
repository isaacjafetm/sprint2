import React, { useState } from 'react';
import '../styles/agregarProducto.css';
import { supabase } from '../supabaseClient';

const AgregarProducto = () => {
  const [formDataAP, setFormDataAP] = useState({
    nombreProd: '',
    precioProd: '',
    descripProd: '',
    cantInvProd: '',
    urlImagen: '' // Campo para el enlace de la imagen
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataAP({
      ...formDataAP,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Insertar el producto en la tabla de productos con la URL de la imagen
      const { data, error: insertError } = await supabase
        .from('productos')
        .insert([{
          nombreproducto: formDataAP.nombreProd,
          precio: parseFloat(formDataAP.precioProd),
          descripcion: formDataAP.descripProd,
          cantinventario: parseInt(formDataAP.cantInvProd),
          url_imagen: formDataAP.urlImagen // Usa el enlace de la imagen
        }]);

      if (insertError) {
        throw insertError;
      }

      console.log('Producto agregado exitosamente:', data);

      // Limpiar el formulario
      setFormDataAP({
        nombreProd: '',
        precioProd: '',
        descripProd: '',
        cantInvProd: '',
        urlImagen: '' // Reiniciar el campo de imagen
      });
    } catch (error) {
      console.error('Error al agregar el producto:', error.message);
    }
  };

  return (
    <div className="agreProdCont">
      <form id="agreProd-form" onSubmit={handleSubmit} className="agreProd">
        <h3>Agregar producto</h3>
        <div className="datosAgreProd">
          <label htmlFor="nombreProd">Nombre del Producto:</label>
          <input 
            type="text" 
            id="nombreProd" 
            name="nombreProd" 
            value={formDataAP.nombreProd} 
            onChange={handleChange} 
            required 
          />

          <label htmlFor="precioProd">Precio del Producto:</label>
          <input 
            type="text" 
            id="precioProd" 
            name="precioProd" 
            value={formDataAP.precioProd} 
            onChange={handleChange} 
            required
          />

          <label htmlFor="descripProd">Descripción:</label>
          <textarea 
            id="descripProd" 
            name="descripProd" 
            value={formDataAP.descripProd} 
            onChange={handleChange} 
            required
          ></textarea>

          <label htmlFor="cantInvProd">Cantidad en Inventario:</label>
          <input 
            type="number" 
            id="cantInvProd" 
            name="cantInvProd" 
            value={formDataAP.cantInvProd} 
            onChange={handleChange} 
            required
          />

          <label htmlFor="urlImagen">URL de la Imagen:</label>
          <input 
            type="text" 
            id="urlImagen" 
            name="urlImagen" 
            value={formDataAP.urlImagen} 
            onChange={handleChange} 
            required
          />

          <button type="submit">Agregar</button>
        </div>
      </form>
    </div>
  );
};

export default AgregarProducto;
