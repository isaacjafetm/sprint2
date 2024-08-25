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
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Reservada</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.id}</td>
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
