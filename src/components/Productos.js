import React, { useState, useEffect } from 'react';
import '../styles/productos.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {supabase}  from '../supabaseClient';

function Productos () {

  const [productos, setProductos] = useState([]);


  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase
        .from('productos')
        .select('*');

        if (error) {
          console.error('Error fetching data from productos:', error);
        } else {
          setProductos(data);
          // const filteredUserOrders = data.filter(order => order.asignado === currentUser.id);
          // setUserOrders(filteredUserOrders);
        }
    };
      fetchProductos();
    });

  return (
    <div className="gridProd-container">
      <div className="actualGridProd">
        {productos.map((producto) => (
          <div className="actualProd" key={producto.idproducto}>
            <img src="https://p.vitalmtb.com/photos/features/2050/title_image/s1600_Leatt2018_BikeDBX_8901_ChrisLaue_656882.jpg?VersionId=_lWWPlR_wJqBMAFX4I1H6qhqT04cjStP" alt="imagen de producto" />
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