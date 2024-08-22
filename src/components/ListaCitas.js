import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; // Ajusta la importación según tu estructura

const ListaCitas = ({ setAppointments, successMessage, setSuccessMessage }) => {
    const [appointments, setLocalAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data, error } = await supabase
                    .from('citas')
                    .select('*');
                
                if (error) {
                    console.error('Error al obtener citas:', error);
                    setSuccessMessage('Error al obtener citas.');
                } else {
                    setLocalAppointments(data);
                }
            } catch (err) {
                console.error('Error inesperado:', err);
                setSuccessMessage('Error inesperado al obtener citas.');
            }
        };

        fetchAppointments();
    }, [setSuccessMessage]);

    const deleteAppointment = async (id) => {
        const confirmation = window.confirm('¿Estás seguro de que deseas eliminar esta cita?');
        if (confirmation) {
            try {
                const { error } = await supabase
                    .from('citas')
                    .delete()
                    .eq('id', id);
                
                if (error) {
                    console.error('Error al eliminar cita:', error);
                    setSuccessMessage('Error al eliminar cita.');
                } else {
                    const updatedAppointments = appointments.filter(appointment => appointment.id !== id);
                    setLocalAppointments(updatedAppointments);
                    setAppointments(updatedAppointments); // Actualiza el estado en el componente padre
                    setSuccessMessage(`Cita eliminada exitosamente.`);
                }
            } catch (err) {
                console.error('Error inesperado:', err);
                setSuccessMessage('Error inesperado al eliminar cita.');
            }

            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        }
    };

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
