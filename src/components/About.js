import React from 'react';
import '../styles/About.css';

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-text">
          <h2>Quienes Somos</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. Nulla facilisi. Donec volutpat, erat at vehicula luctus, nulla urna efficitur sapien, sit amet facilisis velit nibh ac massa. Nulla facilisi. Cras ut massa id felis lacinia sollicitudin. Proin non magna vel leo bibendum fermentum.
          </p>
        </div>
        <div className="about-image">
          <img src="./ISWproyecto/images/local.jpg" alt="About Us" />
        </div>
      </div>
    </div>
  );
}

export default About;
