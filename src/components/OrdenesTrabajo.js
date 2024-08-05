import React, { useState, useEffect } from 'react';
import '../styles/ordenes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrashCan, faBackward, faTrash  } from '@fortawesome/free-solid-svg-icons';
import {supabase}  from '../supabaseClient';

function OrdenesTrabajo() {

  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('ordentrabajo')
        .select('*');

        if (error) {
            console.error('Error fetching data:', error);
        } else {
            setOrdenes(data);
        }
    };
      fetchOrders();
    }, []);

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

  return (
   <div className="ordenesList">
    <h1 id='tituloOrdenes'>Ordenes de Trabajo</h1>
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
                    <td>Recibida</td>
                    <td>{orden.servicios.join(', ')}</td>
                    <td>
                      <div className="acciones" id={'originalAcc'+orden.id}>
                        <a href="#" className='editAction'>
                          <FontAwesomeIcon icon={faPenSquare} />
                        </a>
                        <a href="#" className='deleteAction' onClick={() => confirmarEliminar(orden.id)}>
                          <FontAwesomeIcon icon={faTrashCan} />
                        </a>
                      </div>
                      <div className="hidden" id={'confElim'+orden.id}>
                        <a href="#" className='backwards' onClick={() => desconfirmarEliminar(orden.id)}>
                          <FontAwesomeIcon icon={faBackward} />
                        </a>
                        <a href="#" className='deleteAction' onClick={() => deleteOrden(orden.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </a>
                      </div>
                    </td>
                  </tr>
              ))}
          </tbody>
      </table>
   </div>
  );
}

export default OrdenesTrabajo;


// <button onClick={() => deleteOrden(orden.id)}>Eliminar</button>