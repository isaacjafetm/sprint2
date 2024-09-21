import React from 'react';
import '../styles/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {  } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="mainFooter">
      <div className="logoFooter">
        <img src="/images/yourBike.png" alt="YourBike logo" className='logoFoo'/>
      </div>
      <div className="socialsFooter">
        <a href="https://www.facebook.com/yourbikehn/">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://www.instagram.com/yourbiketrek/">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://www.tiktok.com/@yourbiketrek?_t=8nBPHtkfHx0&_r=1">
          <FontAwesomeIcon icon={faTiktok} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
