import React, { useState, useEffect } from 'react';
import '../styles/ordenes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare, faTrashCan  } from '@fortawesome/free-solid-svg-icons';
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
                      <div className="acciones">
                        <a href="#" className='editAction'>
                          <FontAwesomeIcon icon={faPenSquare} />
                        </a>
                        <a href="#" className='deleteAction'>
                          <FontAwesomeIcon icon={faTrashCan} />
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