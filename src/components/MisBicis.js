// MisBicis.js
import React, { useState, useEffect } from 'react';
import '../styles/misBicis.css';
import { supabase } from '../supabaseClient';
import EditarBiciPopup from './EditarBiciPopup';

function MisBicis({ clienteId }) { // Recibir clienteId como prop
  const [bicicletas, setBicicletas] = useState([]);
  const [selectedBici, setSelectedBici] = useState(null);
  const [comentarios, setComentarios] = useState({});
  const [showComentarios, setShowComentarios] = useState(false);

  useEffect(() => {
    if (clienteId) {
      fetchBicicletas(clienteId);
    }
  }, [clienteId]);

  const fetchBicicletas = async (clienteId) => {
    const { data, error } = await supabase
      .from('bicicli')
      .select('*')
      .eq('cli_id', clienteId);
      // Cargar comentarios desde localStorage
      const storedComentarios = localStorage.getItem('comentarios');
      if (storedComentarios) {
        setComentarios(JSON.parse(storedComentarios));
      }
    if (error) {
      console.error('Error fetching bicicletas:', error);
    } else {
      setBicicletas(data);
    }
  };

  const eliminarBici = async (id) => {
    const { error } = await supabase
      .from('bicicli')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting bicicleta:', error);
    } else {
      setBicicletas(bicicletas.filter(bici => bici.id !== id));
    }
  };

  const actualizarBici = (biciActualizada) => {
    setBicicletas(bicicletas.map(bici =>
      bici.id === biciActualizada.id ? biciActualizada : bici
    ));
  };

  const closePopup = () => {
    setSelectedBici(null);
    setShowComentarios(false);
  };

  const handleShowComentarios = (bici) => {
    setSelectedBici(bici);
    setShowComentarios(true);
  };

  const handleCloseComentarios = () => {
    setShowComentarios(false);
    setSelectedBici(null);
  };

  const addComentario = (biciId, comentario) => {
    setComentarios(prevComentarios => {
      const newComentarios = {
        ...prevComentarios,
        [biciId]: [...(prevComentarios[biciId] || []), comentario]
      };
      localStorage.setItem('comentarios', JSON.stringify(newComentarios)); // Guardar en localStorage
      return newComentarios;
    });
  };

  return (
    <div className="mainBicis">
      <h2>Tus Bicicletas</h2>
      <h5>Aqui puedes actualizar o eliminar bicis de tu perfil.</h5>
      <div className="listaBicis">
        {bicicletas.map((bici) => (
          <div key={bici.id} className="biciCard">
            <h3>{bici.nombre}</h3>
            <p>Modelo: {bici.modelo}</p>
            <button onClick={() => eliminarBici(bici.id)}>Eliminar</button>
            <button onClick={() => {
              setSelectedBici(bici);
              setShowComentarios(false); // Asegura que no se muestre el popup de comentarios
            }}>Editar</button>
            <button onClick={() => handleShowComentarios(bici)}>Comentarios</button>
          </div>
        ))}
      </div>
      {selectedBici && !showComentarios && (
        <EditarBiciPopup
          bici={selectedBici}
          closePopup={closePopup}
          fetchBicicletas={() => fetchBicicletas(clienteId)}
          actualizarBici={actualizarBici}
        />
      )}
      {showComentarios && selectedBici && (
        <div className="comentariosPopup">
          <h3>Comentarios para {selectedBici.nombre}</h3>
          <button onClick={handleCloseComentarios}>Cerrar</button>
          <ul>
            {(comentarios[selectedBici.id] || []).length > 0 ? (
              comentarios[selectedBici.id].map((comentario, index) => (
                <li key={index}>{comentario}</li>
              ))
            ) : (
              <li>No hay comentarios para esta bicicleta.</li>
            )}
          </ul>
          <textarea
            placeholder="Agregar un comentario"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.target.value.trim()) {
                addComentario(selectedBici.id, e.target.value.trim());
                e.target.value = '';
              }
            }}
          />
        </div>
      )}
    </div>
  );
}

export default MisBicis;
