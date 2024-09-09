import React, { useEffect, useState } from 'react';
import '../styles/VistaBicis.css';
import { supabase } from '../supabaseClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrashCan, faBackward, faTrash, faComments } from '@fortawesome/free-solid-svg-icons';
import EditarBiciPopup from './EditarBiciPopup';



const VistaBicis = ({ clienteId }) => {
  const [bicicletas, setBicicletas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todas'); // Estado para el filtro seleccionado
  const [selectedBici, setSelectedBici] = useState(null);  
  const [showComentarios, setShowComentarios] = useState(false);
  const [comentarios, setComentarios] = useState({});
  const [busqueda, setBusqueda] = useState('');
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

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

        if(terminoBusqueda){
          query = query.ilike('cliente.nombre', `%${terminoBusqueda}%`);
        }

        const { data, error } = await query;
        if (error) {
          throw error;
        }

        if (terminoBusqueda) {
          // Filtra las bicicletas que tienen un dueño y cuyo nombre coincide con el término de búsqueda
          setBicicletas(data.filter(bici => bici.cliente && bici.cliente.nombre));
        } else {
          setBicicletas(data);
        }
      } catch (error) {
        console.error('Error fetching bicicletas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBicicletas();
  }, [filtro, terminoBusqueda]); // Vuelve a cargar datos cuando cambia el filtro

  useEffect(() => {
    const fetchComentarios = async (biciId) => {
      try {
        const { data, error } = await supabase
          .from('bicicli')
          .select('comentarios')
          .eq('id', biciId)
          .single();

        if (error) {
          throw error;
        }
        setComentarios({ [biciId]: data.comentarios || [] });
      } catch (error) {
        console.error('Error fetching comentarios:', error);
      }
    };

    if (selectedBici) {
      fetchComentarios(selectedBici.id);
    }
  }, [selectedBici]);

  //Funciones para actualizar
  const actualizarBici = (biciActualizada) => {
    setBicicletas(bicicletas.map(bici =>
      bici.id === biciActualizada.id ? biciActualizada : bici
    ));
  };

  const closePopup = () => {
    setSelectedBici(null);
    setShowComentarios(false);
  };


  //Funciones para eliminar
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

  const handleShowComentarios = (bici) => {
    setSelectedBici(bici);
    setShowComentarios(true);
  };

  const addComentario = async (biciId, comentario) => {
    /*setComentarios(prevComentarios => {
      const newComentarios = {
        ...prevComentarios,
        [biciId]: [...(prevComentarios[biciId] || []), comentario]
      };
      localStorage.setItem('comentarios', JSON.stringify(newComentarios)); // Guardar en localStorage
      return newComentarios;
    });*/
    try {
      const { data, error } = await supabase
        .from('bicicli')
        .update({ comentarios: [...(comentarios[biciId] || []), comentario] })
        .eq('id', biciId)
        .select('comentarios')
        .single();

      if(error){
        throw(error)
      }

      setComentarios({ [biciId]: data.comentarios || [] });
    } catch(error){
      console.log(error)
    }

  };

  const handleBusquedaKeyPress = (e) => {
    if (e.key === 'Enter') {
      setTerminoBusqueda(busqueda); // Solo actualiza el término de búsqueda cuando se presiona Enter
    }
  };

  if (loading) {
    return <p>Cargando información de bicicletas...</p>;
  }

  return (
    <div>
    <h1 id='tituloBicis'>Bicicletas</h1>     
    <div>
      <div className="filter-container">
        <label htmlFor="filtro" className="filtro-label">Filtrar por:</label>
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
        <div className="search-container">
          <label htmlFor="busqueda" className="busqueda-label">Buscar por nombre del dueño:</label>
          <input
            id="busqueda"
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyPress={handleBusquedaKeyPress}
            placeholder="Nombre del dueño"
          />
        </div>
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
                <td>
                  <div className="acciones" id={'originalAcc'+bicicleta.id}>
                    <button className='editAction'  title="Editar/Ver más" onClick={() => {
                      setShowComentarios(false); // Asegura que no se muestre el popup de comentarios
                      setSelectedBici(bicicleta)
                      }}>
                      <FontAwesomeIcon icon={faPenSquare} />
                    </button>
                    <button className='deleteAction' title="Borrar" onClick={() => confirmarEliminar(bicicleta.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                    <button className='commentAction' title="Comentarios" onClick={() => handleShowComentarios(bicicleta)}>
                      <FontAwesomeIcon icon={faComments} />
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
      {selectedBici && !showComentarios &&  (
        <EditarBiciPopup
          bici={selectedBici}
          closePopup={closePopup}
          actualizarBici={actualizarBici}
        />
      )}

      {selectedBici && showComentarios && (
        <div className="comentariosPopup">
          <h3>Comentarios para {selectedBici.nombre}</h3>
          <button onClick={closePopup}>Cerrar</button>
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
};

export default VistaBicis;
