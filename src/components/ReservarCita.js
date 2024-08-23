import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importa useParams y useNavigate
import { supabase } from '../supabaseClient'; // Ajusta la importación según tu estructura

const ReservarCita = () => {
    const { id } = useParams(); // Obtiene el ID de la cita desde los parámetros de la URL
    const [appointment, setAppointment] = useState(null);
    const navigate = useNavigate(); // Usa useNavigate para redirección

    useEffect(() => {
        // Fetch the appointment data from Supabase
        const fetchAppointment = async () => {
            const { data, error } = await supabase
                .from('citas')
                .select('*')
                .eq('id', id)
                .single(); // Obtiene solo un registro

            if (error) {
                console.error('Error al obtener la cita:', error);
            } else {
                setAppointment(data);
            }
        };

        fetchAppointment();
    }, [id]);

    const handleReserve = async () => {
        if (!appointment) return;

        const confirmation = window.confirm('¿Estás seguro de que deseas reservar esta cita?');
        if (confirmation) {
            // Actualiza la cita en la base de datos
            const { error } = await supabase
                .from('citas')
                .update({ reservada: true })
                .eq('id', id);

            if (error) {
                console.error('Error al reservar la cita:', error);
            } else {
                // Redirige al dashboard de clientes
                navigate('/customer-dashboard'); // Cambia esto según la lógica de redirección
            }
        }
    };

    if (!appointment) return <p>Cargando...</p>;

    return (
        <div>
            <h3>Reservar Cita</h3>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{appointment.fecha}</td>
                        <td>{appointment.hora}</td>
                        <td>
                            <button onClick={handleReserve}>Reservar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ReservarCita;
