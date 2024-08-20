import React, { useEffect, useState } from 'react';
import '../styles/VistaBicis.css';
import { supabase } from '../supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrashCan, faBackward, faTrash  } from '@fortawesome/free-solid-svg-icons';


const VistaBicis = () => {
  const [bicicletas, setBicicletas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todas'); // Estado para el filtro seleccionado

  useEffect(() => {
    const fetchBicicletas = async () => {
      setLoading(true); // Inicia la carga
      try {
        let query = supabase.from('bicicli').select('*, cliente:cli_id (nombre)');

        if (filtro === 'enTaller') {
          query = query.eq('entaller', true);
        } else if (filtro === 'fueraTaller') {
          query = query.eq('entaller', false);
        }

        const { data, error } = await query;
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
  }, [filtro]); // Vuelve a cargar datos cuando cambia el filtro

  const confirmarEliminar = (id) => {
    const divConf = document.getElementById('confElim'+id);
    divConf.classList.remove("hidden");
    divConf.classList.add("acciones");
    const divOriginal = document.getElementById('originalAcc'+id);
    divOriginal.classList.remove("acciones");
    divOriginal.classList.add("hidden");
  };

  const desconfirmarEliminar = (id) => {
    const divConf = document.getElementById('confElim'+id);
    divConf.classList.remove("acciones");
    divConf.classList.add("hidden");
    const divOriginal = document.getElementById('originalAcc'+id);
    divOriginal.classList.remove("hidden");
    divOriginal.classList.add("acciones");
  };

  const deleteBici = async (id) => {
    if (!id) {
        console.error('Invalid ID provided for deletion:', id);
        return;
    }

    const { error } = await supabase
        .from('bicicli')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting data:', error);
    } else {
        console.log('Bike deleted successfully.');
        setBicicletas(prevBicicletas => prevBicicletas.filter(bicicleta => bicicleta.id !== id));
    }
  }

  if (loading) {
    return <p>Cargando información de bicicletas...</p>;
  }

  return (
    <div>
      <h1>Información de Bicicletas</h1>
      <div>
        <label htmlFor="filtro">Filtrar por:</label>
        <select
          id="filtro"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="todas">Mostrar todas las bicis</option>
          <option value="enTaller">Bicis en taller</option>
          <option value="fueraTaller">Bicis fuera del taller</option>
        </select>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Dueño</th>
              <th>Modelo</th>
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
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {bicicletas.map((bicicleta) => (
              <tr key={bicicleta.id}>
                <td>{bicicleta.cliente ? bicicleta.cliente.nombre : 'Sin dueño'}</td>
                <td>{bicicleta.modelo}</td>
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
                <td>
                  <div className="acciones" id={'originalAcc'+bicicleta.id}>
                    <button className='editAction' onClick={() => {/* tu lógica de edición aquí */}}>
                      <FontAwesomeIcon icon={faPenSquare} />
                    </button>
                    <button className='deleteAction' onClick={() => confirmarEliminar(bicicleta.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                  <div className="hidden" id={'confElim'+bicicleta.id}>
                    <button className='backwards' onClick={() => desconfirmarEliminar(bicicleta.id)}>
                      <FontAwesomeIcon icon={faBackward} />
                    </button>
                    <button className='deleteAction' onClick={() => deleteBici(bicicleta.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VistaBicis;
