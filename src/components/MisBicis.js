import React from 'react';
import '../styles/misBicis.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {  } from '@fortawesome/free-solid-svg-icons';
// import { faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';
import CrearBici from './CrearBici.js';

function MisBicis() {
  return (
    <div className="mainBicis">
      <h2>Tus Bicicletas</h2>
      <h5>Aqui puedes agregar, actualizar o eliminar bicis de tu perfil.</h5>
      <div className="crearBike">
      <CrearBici />
      </div>
    </div>
  );
}

export default MisBicis;
