import React, { useState } from 'react';
import '../styles/agregarProducto.css';
import { supabase } from '../supabaseClient';

const AgregarProducto = () => {
  const [formDataAP, setFormDataAP] = useState({
    nombreProd: '',
    precioProd: '',
    descripProd: '',
    cantInvProd: ''
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

    // Insert product into Supabase
    const { data, error } = await supabase
      .from('productos')
      .insert([
        {
          nombreproducto: formDataAP.nombreProd,
          precio: parseFloat(formDataAP.precioProd),
          descripcion: formDataAP.descripProd,
          cantinventario: parseInt(formDataAP.cantInvProd)
        }
      ]);

    if (error) {
      console.error('Error adding product:', error.message);
    } else {
      console.log('Product added successfully:', data);
      // Optionally, reset the form or show a success message
      setFormDataAP({
        nombreProd: '',
        precioProd: '',
        descripProd: '',
        cantInvProd: ''
      });
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
          <label htmlFor="descripProd">Descripcion:</label>
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

          <button type="submit">Agregar</button>
        </div>
      </form>
    </div>
  );
};

export default AgregarProducto;
