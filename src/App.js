import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell} from '@fortawesome/free-solid-svg-icons';
import About from './components/About';
import Productos from './components/Productos';
import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import './styles/App.css';
import OrdenTrabajo from './components/OrdenTrabajo';
import OrdenesTrabajo from './components/OrdenesTrabajo';
import VistaBicis from './components/VistaBicis';
import ReservarCita from './components/ReservarCita';
import {supabase}  from './supabaseClient';
import Footer from './components/Footer';


function Home() {
  
  const [productos, setProductos] = useState([]);

    // Cargar productos desde Supabase
    useEffect(() => {
      const fetchProductos = async () => {
        const { data, error } = await supabase
          .from('productos') // Nombre de tu tabla de productos
          .select('nombreproducto, url_imagen'); // Selecciona solo los campos que necesitas
  
        if (error) {
          console.error('Error al obtener productos:', error);
        } else {
          setProductos(data);
        }
      };
  
      fetchProductos();
    }, []);
  
    // Función para seleccionar aleatoriamente productos
    const selectRandomProducts = (arr, count) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };
  
    // Seleccionar 5 productos para el slider y 3 para "Mejores Productos"
    const sliderProducts = selectRandomProducts(productos, 5);
    const bestProducts = selectRandomProducts(productos, 3);
  
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
          {sliderProducts.map((producto, index) => (
            <div className="slider-item" key={index}>
              <img
                src={producto.url_imagen}
                alt={producto.nombreproducto}
                className="slider-image"
              />
            </div>
          ))}
        </Slider>
      </div>

      <hr className="separator" />

      <div className="best-products">
        <h2>Mejores Productos</h2>
        <div className="product-grid">
          {bestProducts.map((producto, index) => (
            <Link to="" className="product-link" key={index}>
              <div className="product-box">
                <img
                  src={producto.url_imagen}
                  alt={producto.nombreproducto}
                  className="product-image"
                />
              </div>
            </Link>
          ))}
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
  const [notificaciones, setNotificaciones] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      setIsLoggedIn(true);
      setCurrentUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.rol === 'cliente') {
      fetchNotificaciones(currentUser.id);
    }
  }, [currentUser]);  

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Esta seguro de que quieres cerrar sesion?");
  if (confirmed) {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('loggedInUser');
    navigate('/');
  }
  };

  const fetchNotificaciones = async (cliId) => {
    try {
      const { data, error } = await supabase
        .from('notificaciones')
        .select('*')
        .eq('cli_id', cliId)
  
      if (error) {
        console.error('Error fetching notifications:', error);
      } else {
        setNotificaciones(data);  // Actualiza el estado con las notificaciones no vistas
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };  

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications); // Alternar mostrar/ocultar notificaciones
  };

  const markAsRead = async (id) => {
    try {
      const { error } = await supabase
        .from('notificaciones')
        .update({ visto: true })
        .eq('id', id);

      if (error) {
        console.error('Error marking notification as read:', error);
      } else {
        fetchNotificaciones(currentUser.id); // Refresca las notificaciones después de marcar como leídas
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Link to="/" title="HomePage" className="company-name-link">
        <img src="/images/YourBike.jpg" alt="Login" className="logo-image" />
        </Link>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {(!isLoggedIn || (currentUser && currentUser.rol === 'cliente')) && (
            <>
              <Link to="/about" onClick={() => setMenuOpen(false)}>Quienes Somos</Link>
              {/* <Link to="/stores" onClick={() => setMenuOpen(false)}>Tiendas</Link> */}
            </>
          )}
          <Link to="/productos" onClick={() => setMenuOpen(false)}>Productos</Link>
          {isLoggedIn && currentUser && currentUser.rol === 'admin' && (
            <>
              <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin</Link>
               <Link to="/OrdenTrabajo" onClick={() => setMenuOpen(false)}>Crear Orden de Trabajo</Link>
              {/*<Link to="/OrdenesTrabajo" onClick={() => setMenuOpen(false)}>Ordenes de Trabajo</Link>*/}
            </>
          )}
          {isLoggedIn && currentUser && currentUser.rol === 'cliente' && (
            <Link to="/customer-dashboard" onClick={() => setMenuOpen(false)}>Servicios</Link>
          )}
          {isLoggedIn && currentUser && currentUser.rol === 'tecnico' && (
            <>
               <Link to="/VistaBicis" onClick={() => setMenuOpen(false)}>Bicicletas</Link>
            </>
          )} 
          {isLoggedIn && currentUser && (currentUser.rol === 'admin' || currentUser.rol === 'tecnico')  && (
            <Link to="/OrdenesTrabajo" onClick={() => setMenuOpen(false)}>Ordenes de Trabajo</Link>
           )}


        </nav>
        <div className="App-header-right">
        {(isLoggedIn && (currentUser && currentUser.rol === 'cliente')) && (
          <>  
            <FontAwesomeIcon icon={faBell} onClick={toggleNotifications} className="notification-icon" />
              {showNotifications && (
                <div className="notifications-dropdown">
                  {notificaciones.length === 0 ? (
                    <p>No hay notificaciones</p>
                  ) : (
                    notificaciones.map((noti) => (
                      <div
                        key={noti.id}
                        className={`notification-item ${noti.visto ? 'read' : 'unread'}`}
                        onClick={() => markAsRead(noti.id)}
                      >
                        {!noti.visto && <span className="unread-dot"></span>}
                        <p>{noti.mensaje}</p>
                        <small>{noti.fecha} - {noti.hora}</small>
                      </div>
                    ))
                  )}
                </div>
              )}
          </>
        )}
          {isLoggedIn ? (
            <button onClick={handleLogout} title="LogOut" className="logout-button">
              <i className="bi bi-box-arrow-right"></i> {/* Bootstrap logout icon */}
            </button>
          ) : (
            <Link to="/login">
              <img src="/images/login.png" alt="Login" title="Login" className="login-image" />
            </Link>
          )}
        </div>

        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </header>
      <div className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setCurrentUser={setCurrentUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={isLoggedIn && currentUser && currentUser.rol === 'admin' ? <AdminDashboard currentUser={currentUser} /> : <Home />} />
          <Route path="/customer-dashboard" element={isLoggedIn && currentUser && currentUser.rol === 'cliente' ? <CustomerDashboard /> : <Home />} />
          <Route path="/OrdenTrabajo" element={isLoggedIn && currentUser && currentUser.rol === 'admin' ? <OrdenTrabajo /> : <Home />} />
          <Route path="/OrdenesTrabajo" element={isLoggedIn && currentUser && (currentUser.rol === 'admin' || currentUser.rol === 'tecnico' )? <OrdenesTrabajo /> : <Home />} />
          <Route path="/VistaBicis" element={isLoggedIn && currentUser && currentUser.rol === 'tecnico' ? <VistaBicis currentUser={currentUser}/> : <Home />} />
          {/* Add other routes as needed */}
          {/*
          <Route path="/OrdenesTrabajo" element={isLoggedIn && currentUser && currentUser.rol === 'admin' ? <OrdenesTrabajo /> : <Home />} />
          <Route path="/VistaBicis" element={isLoggedIn && currentUser && currentUser.rol === 'tecnico' ? <VistaBicis /> : <Home />} />*/}
          <Route path="/reservar-cita/:id" element={<ReservarCita currentUser={currentUser}/>} />        
          {/* Agregar otras rutas según sea necesario */}
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
