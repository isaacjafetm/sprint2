import React, { useState, useEffect } from 'react';
import '../styles/ordenes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrashCan, faBackward, faTrash, faCheck, faComment } from '@fortawesome/free-solid-svg-icons';
import {supabase}  from '../supabaseClient';

function OrdenesTrabajo() {
  const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const [ordenes, setOrdenes] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [selectedOrden, setSelectedOrden] = useState(null);
  const [showComentarios, setShowComentarios] = useState(false);
  const [observaciones, setObservaciones] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('ordentrabajo')
        .select('*');

        if (error) {
          console.error('Error fetching data:', error);
        } else {
          setOrdenes(data);
          const filteredUserOrders = data.filter(order => order.asignado === currentUser.id);
          setUserOrders(filteredUserOrders);
        }
    };
      fetchOrders();
    }, [currentUser]);

    //Lo hice como los comentarios de VistaBicis que hizo Gabriel -Jafet
    useEffect(() => {
      const fetchObservaciones = async (id) => {
        try {
          const { data, error } = await supabase
            .from('ordentrabajo')
            .select('observaciones')
            .eq('id', id)
            .single();
  
          if (error) {
            throw error;
          }
          setObservaciones({ [id]: data.observaciones || [] });
        } catch (error) {
          console.error('Error fetching comentarios:', error);
        }
      };
  
      if (selectedOrden) {
        fetchObservaciones(selectedOrden.id);
      }
    }, [selectedOrden]);


    const notifyClient = async (cliId, ordenId, mensaje) => {
      try {
        const { error } = await supabase
          .from('notificaciones')
          .insert([
            {
              cli_id: cliId,
              orden_id: ordenId,
              mensaje: mensaje,
            }
          ]);
    
        if (error) throw error;
    
        console.log('Notificación creada con éxito');
      } catch (error) {
        console.error('Error creando notificación:', error);
      }
    };
    

  const confirmarEliminar = (id) => {
    // e.preventDefault();
    console.log('quiere borrar' + id);
    const divConf = document.getElementById('confElim'+id);
    divConf.classList.remove("hidden");
    divConf.classList.add("acciones");
    const divOriginal = document.getElementById('originalAcc'+id);
    divOriginal.classList.remove("acciones");
    divOriginal.classList.add("hidden");
  };

  const desconfirmarEliminar = (id) => {
    console.log('no quiere borrar'+id);
    const divConf = document.getElementById('confElim'+id);
    divConf.classList.remove("acciones");
    divConf.classList.add("hidden");
    const divOriginal = document.getElementById('originalAcc'+id);
    divOriginal.classList.remove("hidden");
    divOriginal.classList.add("acciones");
  };

  const deleteOrden = async (id) => {
    if (!id) {
        console.error('Invalid ID provided for deletion:', id);
        return;
    }

    const { error } = await supabase
        .from('ordentrabajo')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Error deleting data:', error);
    } else {
        console.log('Order deleted successfully.');
        setOrdenes(prevOrdenes => prevOrdenes.filter(orden => orden.id !== id));
    }
  };

  const editOrden = async (id) => {
    const confirmation = window.confirm('¿Seguro de tomar esta orden de trabajo?');
    if(confirmation){
      const { error } = await supabase
      .from('ordentrabajo')
      .update({ Estado: 'En proceso', asignado: currentUser.id})
      .eq('id', id)
      .select()

      if(error){
        console.log(error)
      }else{
        const updatedOrdenes = ordenes.map(orden =>
          orden.id === id ? { ...orden, Estado: 'En proceso' } : orden
        );
        setOrdenes(updatedOrdenes);

        const orden = updatedOrdenes.find(o => o.id === id);
        if (orden) {
          const mensaje = `Su bicicleta está en proceso.`;
          notifyClient(orden.cli_id, id, mensaje);
        }
      }
    }
  }

  const terminar = async (id) => {
    const confirmation = window.confirm('¿Seguro de finalizar orden de trabajo?');
    if(confirmation){
      const { error } = await supabase
      .from('ordentrabajo')
      .update({ Estado: 'Finalizado'})
      .eq('id', id)
      .select()

      if(error){
        console.log(error)
      }else{
        const updatedOrdenes = ordenes.map(orden =>
          orden.id === id ? { ...orden, Estado: 'Finalizado' } : orden
        );
        const updatedUserOrdenes = userOrders.map(orden =>
          orden.id === id ? { ...orden, Estado: 'Finalizado' } : orden
        );
        setOrdenes(updatedOrdenes);
        setUserOrders(updatedUserOrdenes)

        const orden = updatedOrdenes.find(o => o.id === id);
        if (orden) {
          const mensaje = `Su bicicleta ya está lista para entregar.`;
          notifyClient(orden.cli_id, id, mensaje);
        }

      }
    }
  }

  const handleShowComentarios = (orden) => {
    setSelectedOrden(orden);
    setShowComentarios(true);
};

const addComentario = async (ordenId, comentario) => {
  if (!comentario.trim()) return;

  try {
    const { data, error } = await supabase
      .from('ordentrabajo')
      .update({ observaciones: [...(observaciones[ordenId] || []), comentario] })
      .eq('id', ordenId)
      .select('observaciones')
      .single();

    if (error) {
      throw error;
    }

    setObservaciones((prev) => ({
      ...prev,
      [ordenId]: data.observaciones || [],
    }));
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="ordenesContainer">
      <div className="ordenesList">
        <h1 id='tituloOrdenes'>Todas las Ordenes de Trabajo</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID orden</th>
              <th>Cliente</th>
              <th>Teléfono</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Servicios</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <tr key={orden.id}>
                <td>{orden.id}</td>
                <td>{orden.cliente}</td>
                <td>{orden.telefono}</td>
                <td>{orden.fecha}</td>
                <td>{orden.Estado}</td>
                <td>{orden.servicios.join(', ')}</td>
                <td>
                  <div className="acciones" id={'originalAcc'+orden.id}>
                    <button className='editAction' onClick={() => editOrden(orden.id)}
                      disabled = {orden.Estado !== 'Recibido'}>
                      <FontAwesomeIcon icon={faPenSquare} />
                    </button>
                    <button className='deleteAction' onClick={() => confirmarEliminar(orden.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                    <button className='commentAction' title="Comentarios" onClick={() => handleShowComentarios(orden)}>
                      <FontAwesomeIcon icon={faComment} />
                    </button>
                  </div>
                  <div className="hidden" id={'confElim'+orden.id}>
                    <button className='backwards' onClick={() => desconfirmarEliminar(orden.id)}>
                      <FontAwesomeIcon icon={faBackward} />
                    </button>
                    <button className='deleteAction' onClick={() => deleteOrden(orden.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ordenesList">
        <h2 id='tituloMisOrdenes'>Mis Ordenes de Trabajo</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>ID orden</th>
              <th>Cliente</th>
              <th>Teléfono</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Servicios</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map((orden) => (
              <tr key={orden.id}>
                <td>{orden.id}</td>
                <td>{orden.cliente}</td>
                <td>{orden.telefono}</td>
                <td>{orden.fecha}</td>
                <td>{orden.Estado}</td>
                <td>{orden.servicios.join(', ')}</td>
                <td>
                  <div className="acciones" id={'originalAcc'+orden.id}>
                    <button className='terminadoAction' onClick={() => terminar(orden.id)}>
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/*Otra vez, lo hice como lo hizo Gabriel en VistaBicis*/}
      {selectedOrden && showComentarios && (
        <div className="comentariosPopup">
          <h3>Observaciones para Orden #{selectedOrden.id}</h3>
          <button onClick={() => setShowComentarios(false)}>Cerrar</button>
          <ul>
            {(observaciones[selectedOrden.id] || []).length > 0 ? (
              observaciones[selectedOrden.id].map((comentario, index) => (
                <li key={index}>{comentario}</li>
              ))
            ) : (
              <li>No hay comentarios para esta orden.</li>
            )}
          </ul>
          {selectedOrden.asignado === currentUser.id && (
            <textarea
              placeholder="Agregar un comentario"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  addComentario(selectedOrden.id, e.target.value.trim());
                  e.target.value = '';
                }
              }}
            />
          )}
        </div>
      )}

    </div>
  );
}


export default OrdenesTrabajo;


// <button onClick={() => deleteOrden(orden.id)}>Eliminar</button>
