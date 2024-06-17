import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import CustomerAppointments from './components/CustomerAppointments';
import './styles/App.css';
import MisBicis from './components/MisBicis';

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="home">
      <div className="slider-container">
        <Slider {...settings}>
          <div className="slider-item">
            <img src="./ISWproyecto/images/product1.png" alt="Product 1" className="slider-image" />
          </div>
          <div className="slider-item">
            <img src="./ISWproyecto/images/product2.png" alt="Product 2" className="slider-image" />
          </div>
          <div className="slider-item">
            <img src="./ISWproyecto/images/product3.jpg" alt="Product 3" className="slider-image" />
          </div>
          <div className="slider-item">
            <img src="./ISWproyecto/images/product4.jpg" alt="Product 4" className="slider-image" />
          </div>
          <div className="slider-item">
            <img src="./ISWproyecto/images/product5.jpg" alt="Product 5" className="slider-image" />
          </div>
        </Slider>
      </div>
      <hr className="separator" />
      <div className="best-products">
        <h2>Mejores Productos</h2>
        <div className="product-grid">
          <Link to="/product1" className="product-link">
            <div className="product-box">
              <img src="./ISWproyecto/images/product1.png" alt="Product 1" className="product-image" />
            </div>
          </Link>
          <Link to="/product2" className="product-link">
            <div className="product-box">
              <img src="./ISWproyecto/images/product2.png" alt="Product 2" className="product-image" />
            </div>
          </Link>
          <Link to="/product3" className="product-link">
            <div className="product-box">
              <img src="./ISWproyecto/images/product3.jpg" alt="Product 3" className="product-image" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      setIsLoggedIn(true);
      setCurrentUser(storedUser);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/" className="company-name-link">
          <h1 className="company-name">YOUR BIKE</h1>
        </Link>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/about" onClick={() => setMenuOpen(false)}>Quienes Somos</Link>
          <Link to="/certifications" onClick={() => setMenuOpen(false)}>Certificaciones</Link>
          <Link to="/contacts" onClick={() => setMenuOpen(false)}>Contactos</Link>
          <Link to="/stores" onClick={() => setMenuOpen(false)}>Tiendas</Link>
          <Link to="/equipment" onClick={() => setMenuOpen(false)}>Equipamiento</Link>
          {isLoggedIn && currentUser && currentUser.rol === 'admin' && (
            <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
          )}
          {isLoggedIn  && currentUser && currentUser.rol === 'cliente' && (
            <Link to="/customer-appointments" onClick={() => setMenuOpen(false)}>Reservar Cita</Link>
            
          )}
          {isLoggedIn  && currentUser && currentUser.rol === 'cliente' && (
            <Link to="/misBicis" onClick={() => setMenuOpen(false)}>Mis Bicis</Link>
            
          )}
        </nav>
        <div className="App-header-right">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logout-button">Logout</button>
          ) : (
            <Link to="/login">
              <img src="./ISWproyecto/images/login.png" alt="Login" className="login-image" />
            </Link>
          )}
          
        </div>
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={isLoggedIn && currentUser && currentUser.rol === 'admin' ? <AdminDashboard /> : <Home />} />
        <Route path="/customer-appointments" element={isLoggedIn && currentUser && currentUser.rol === 'cliente' ? <CustomerAppointments /> : <Home />} />
        <Route path="/misbicis" element={isLoggedIn && currentUser && currentUser.rol === 'cliente' ? <MisBicis /> : <Home />} />
        {/* Add other routes as needed */}
      </Routes>
    </div>
  );
}

export default App;
