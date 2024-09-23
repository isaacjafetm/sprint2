import React, { useState, useEffect } from 'react';
import '../styles/productos.css';
import { supabase } from '../supabaseClient';

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase
        .from('productos')
        .select('*');

      if (error) {
        console.error('Error fetching data from productos:', error);
      } else {
        console.log('Datos de productos:', data); // Ver datos
        setProductos(data);
      }
    };
    fetchProductos();
  }, []);

  return (
    <div className="gridProd-container">
      <div className="actualGridProd">
        {productos.map((producto) => (
          <div className="actualProd" key={producto.idproducto}>
            <img src={producto.url_imagen || 'ruta/a/imagen/por/defecto.jpg'} alt="imagen de producto" />
            <div className="prodInfo">
              <h5 className="prodNam">{producto.nombreproducto}</h5>
              <p>
                <strong>Precio: {producto.precio}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Productos;
