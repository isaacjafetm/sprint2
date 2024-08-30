import React, { useState } from 'react';
import '../styles/agregarProducto.css';
import { supabase } from '../supabaseClient';

const AgregarProducto = () => {

  const [formDataAP, setFormDataAP] = useState({
    nombreProd: '',
    precioProd: -1,
    descripProd: '',
    cantInvProd: -1,
});

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

    // const { error } = await supabase
    //     .from('ordentrabajo')
    //     .insert([
    //         {
    //             nombreProd: formData.nombreProd,
    //             precioProd: formData.precioProd,
    //             descripProd: formData.descripProd,
    //             cantInvProd: formData.cantInvProd
    //         }

    //     ])
    //     .select();
    
    // if (error) {
    //     console.error('Error inserting data into crearProducto', error);
    // } else {
        
        // setOrdenes(prevOrdenes => [...prevOrdenes, formData]);
        // alert('Orden de trabajo creada con éxito'); // Mostrar mensaje de éxito
        // setFormData({
        //     cliente: '',
        //     telefono: '',
        //     valor: '',
        //     marca: '',
        //     servicios: [],
        //     comentarios: '',
        // });
    // }
// };

  return (
    <div className="agreProdCont">
      <form id="agreProd-form" /*onSubmit={handleSubmit}*/ className="agreProd">
        <h3>Agregar producto</h3>
        <div className="datosAgreProd">
          <label htmlFor="nombreProd">Nombre del Producto:</label>
          <input type="text" id="nombreProd" name="nombreProd" /*value={formDataAP.nombreProd} onChange={handleChange}*/ required />
          <label htmlFor="precioProd">Nombre del Producto:</label>
          <input type="text" id="precioProd" name="precioProd" /*value={formDataAP.precioProd} onChange={handleChange}*/ />
          <label htmlFor="descripProd">Descripcion:</label>
          <textarea id="descripProd" name="descripProd" /*value={formDataAP.descripProd} onChange={handleChange}*/></textarea>

          <button type="submit">Agregar</button>
        </div>
      </form>
    </div>
  );
};

export default AgregarProducto;