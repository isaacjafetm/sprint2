import React, { useState, useEffect } from 'react';
import '../styles/productos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {supabase}  from '../supabaseClient';

function Productos () {
  const prods = [
    {
      id: 1,
      nombre: "termo Trek",
      precio: 800,
      cantidad: 30,
      img: "https://p.vitalmtb.com/photos/features/2050/title_image/s1600_Leatt2018_BikeDBX_8901_ChrisLaue_656882.jpg?VersionId=_lWWPlR_wJqBMAFX4I1H6qhqT04cjStP"
    },
    {
      id: 2,
      nombre: "Casco",
      precio: 2300,
      cantidad: 24,
      img: "https://p.vitalmtb.com/photos/features/2050/title_image/s1600_Leatt2018_BikeDBX_8901_ChrisLaue_656882.jpg?VersionId=_lWWPlR_wJqBMAFX4I1H6qhqT04cjStP"
    },
    {
      id: 3,
      nombre: "Rodilleras",
      precio: 1200,
      cantidad: 15,
      img: "https://p.vitalmtb.com/photos/features/2050/title_image/s1600_Leatt2018_BikeDBX_8901_ChrisLaue_656882.jpg?VersionId=_lWWPlR_wJqBMAFX4I1H6qhqT04cjStP"
    },
    {
      id: 4,
      nombre: "Tenis 5",
      precio: 1700,
      cantidad: 9,
      img: "https://p.vitalmtb.com/photos/features/2050/title_image/s1600_Leatt2018_BikeDBX_8901_ChrisLaue_656882.jpg?VersionId=_lWWPlR_wJqBMAFX4I1H6qhqT04cjStP"
    },
    {
      id: 5,
      nombre: "Guantes Trek",
      precio: 500,
      cantidad: 25,
      img: "https://p.vitalmtb.com/photos/features/2050/title_image/s1600_Leatt2018_BikeDBX_8901_ChrisLaue_656882.jpg?VersionId=_lWWPlR_wJqBMAFX4I1H6qhqT04cjStP"
    },
    {
      id: 6,
      nombre: "Anteojos de sol",
      precio: 1500,
      cantidad: 10,
      img: "https://p.vitalmtb.com/photos/features/2050/title_image/s1600_Leatt2018_BikeDBX_8901_ChrisLaue_656882.jpg?VersionId=_lWWPlR_wJqBMAFX4I1H6qhqT04cjStP"
    },
  ];

  return (
    <div className="gridProd-container">
      <div className="actualGridProd">
        {prods.map((producto) => (
          <div className="actualProd" key={producto.id}>
            <img src={producto.img} alt="imagen de producto" />
            <div className="prodInfo">
              <h5 className="prodNam">{producto.nombre}</h5>
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