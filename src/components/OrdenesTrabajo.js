import React, { useState, useEffect } from 'react';
import '../styles/ordenes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrashCan, faBackward, faTrash, faCheck  } from '@fortawesome/free-solid-svg-icons';
import {supabase}  from '../supabaseClient';

function OrdenesTrabajo() {
  const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const [ordenes, setOrdenes] = useState([]);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('ordentrabajo')
        .select('*, cliente:cli_id (nombre)');

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
      }
    }
  }

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
                <td>{orden.cliente ? orden.cliente.nombre : 'Sin dueño'}</td>
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
                <td>{orden.cliente ? orden.cliente.nombre : 'Sin dueño'}</td>
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
    </div>
  );
}


export default OrdenesTrabajo;


// <button onClick={() => deleteOrden(orden.id)}>Eliminar</button>
