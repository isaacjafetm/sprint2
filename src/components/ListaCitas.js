import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Ajusta la importación según tu estructura

const ListaCitas = ({currentUser}) => {
    const [appointments, setLocalAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data, error } = await supabase
                    .from('citas')
                    .select('*');
                
                if (error) {
                    console.error('Error al obtener citas:', error);
                 } else {
                      // Filtrar citas según el rol del usuario
                      const filteredAppointments = currentUser.rol === 'admin'
                      ? data // Admin ve todas las citas
                      : data.filter(appointment => appointment.cliente_id === currentUser.id); // Cliente solo ve sus citas
                        setLocalAppointments(filteredAppointments);
                        
                        // Ahora obtener los nombres de los clientes para las citas
                    const clientesPromises = filteredAppointments.map(async (appointment) => {
                        if (appointment.cliente_id) {
                            const { data: cliente, error: clienteError } = await supabase
                                .from('clientes')
                                .select('nombre')
                                .eq('id', appointment.cliente_id)
                                .single(); // Obtener un solo cliente

                            if (clienteError) {
                                console.error(`Error al obtener el cliente con ID ${appointment.cliente_id}:`, clienteError);
                                return { ...appointment, clienteNombre: 'Error al obtener cliente' };
                            } else {
                                return { ...appointment, clienteNombre: cliente.nombre };
                            }
                        } else {
                            return { ...appointment, clienteNombre: 'Sin reservar' }; // Si no hay cliente asignado
                        }
                    });

                    const appointmentsWithClientes = await Promise.all(clientesPromises);
                    setLocalAppointments(appointmentsWithClientes);
                }
                
            } catch (err) {
                console.error('Error inesperado:', err);
             }
        };

        fetchAppointments();
    },  [currentUser] );

    return (
        <div>
            <h3>Lista de Citas</h3>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Reservada</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.clienteNombre}</td>
                            <td>{appointment.fecha}</td>
                            <td>{appointment.hora}</td>
                            <td>{appointment.reservada ? 'Sí' : 'No'}</td>
                            {/* Se eliminó la columna de acciones */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaCitas;
