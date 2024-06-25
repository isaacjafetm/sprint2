// MisBicis.js
import React, { useState, useEffect } from 'react';
import '../styles/misBicis.css';
import { supabase } from '../supabaseClient';
import EditarBiciPopup from './EditarBiciPopup';

function MisBicis() {
  const [bicicletas, setBicicletas] = useState([]);
  const [selectedBici, setSelectedBici] = useState(null);

  useEffect(() => {
    fetchBicicletas();
  }, []);

  const fetchBicicletas = async () => {
    const { data, error } = await supabase
      .from('bicicli')
      .select('*');

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
            <button onClick={() => setSelectedBici(bici)}>Editar</button>
          </div>
        ))}
      </div>
      {selectedBici && (
        <EditarBiciPopup
          bici={selectedBici}
          closePopup={closePopup}
          fetchBicicletas={fetchBicicletas}
          actualizarBici={actualizarBici}
        />
      )}
    </div>
  );
}

export default MisBicis;
