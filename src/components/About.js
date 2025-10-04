import React from 'react';
import '../styles/About.css';

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h2>Quienes Somos</h2>
          <p>
              YourBike Es la mejor tienda de ciclismo en Honduras, la cual se especializa en la VENTA de bicicletas TREK, así como accesorios, ropa, repuestos y taller.
              <br />
              <br />
              <a href="https://maps.app.goo.gl/ovirx21yV1bocg3o9" target="_blank" rel="noopener noreferrer">
                Los Próceres, frente a Motomundo, Salida de Novacentro. 2 Piso.
              </a>
              <br />
              Teléfono: +504 9741-1751
              <br />
              Correo electronico: info@yourbikehonduras.com
          </p>

        </div>
        <div className="about-image">
          <img src="/images/local.jpg" alt="About Us" />
        </div>
      </div>
    </div>
  );
}

export default About;
