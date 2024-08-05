import React, { useEffect, useState } from 'react';
import '../styles/VistaBicis.css';
import {supabase}  from '../supabaseClient';

const VistaBicis = () => {
  const [bicicletas, setBicicletas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBicicletas = async () => {
      try {
        const { data, error } = await supabase.from('bicicli').select('*');
        if (error) {
          throw error;
        }
        setBicicletas(data);
      } catch (error) {
        console.error('Error fetching bicicletas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBicicletas();
  }, []);

  if (loading) {
    return <p>Cargando información de bicicletas...</p>;
  }

  return (
    <div>
      <h1>Información de Bicicletas</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Modelo</th>
              <th>Nombre</th>
              <th>Marco</th>
              <th>Amortiguador</th>
              <th>Horquilla</th>
              <th>Cambiador</th>
              <th>Maneta</th>
              <th>Brackett</th>
              <th>Casette</th>
              <th>Cadena</th>
              <th>Crank</th>
              <th>Frenos</th>
              <th>Ruedas</th>
              <th>Llantas</th>
              <th>Ejes</th>
              <th>Stem</th>
              <th>Manillar</th>
              <th>Asiento</th>
              <th>Dropper</th>
            </tr>
          </thead>
          <tbody>
            {bicicletas.map((bicicleta) => (
              <tr key={bicicleta.id}>
                <td>{bicicleta.modelo}</td>
                <td>{bicicleta.nombre}</td>
                <td>{bicicleta.marco}</td>
                <td>{bicicleta.amortiguador}</td>
                <td>{bicicleta.horquilla}</td>
                <td>{bicicleta.cambiador}</td>
                <td>{bicicleta.maneta}</td>
                <td>{bicicleta.brackett}</td>
                <td>{bicicleta.casette}</td>
                <td>{bicicleta.cadena}</td>
                <td>{bicicleta.crank}</td>
                <td>{bicicleta.frenos}</td>
                <td>{bicicleta.ruedas}</td>
                <td>{bicicleta.llantas}</td>
                <td>{bicicleta.ejes}</td>
                <td>{bicicleta.stem}</td>
                <td>{bicicleta.timon}</td>
                <td>{bicicleta.asiento}</td>
                <td>{bicicleta.dropper}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VistaBicis;
