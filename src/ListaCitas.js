import React, { useCallback, useEffect } from 'react';

const ListaCitas = ({ appointments, setAppointments, successMessage, setSuccessMessage, setCalendarEvents }) => {
    
    const deleteAppointment = (index) => {
        const updatedAppointments = appointments.filter((_, i) => i !== index);
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
        setAppointments(updatedAppointments);
        setSuccessMessage('Cita eliminada exitosamente.');
        
        // Actualiza los eventos del calendario
        updateCalendarEvents(updatedAppointments);
        
        // Limpiar el mensaje de éxito después de 3 segundos
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    const updateCalendarEvents = useCallback((appointments) => {
        const events = appointments.map(appointment => ({
            title: appointment.customerName || 'Cita',
            start: new Date(`${appointment.date} ${appointment.time}`),
            end: new Date(`${appointment.date} ${appointment.time}`),
        }));
        setCalendarEvents(events);
    }, [setCalendarEvents]);

    const loadAppointmentsFromLocalStorage = useCallback(() => {
        const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
        setAppointments(storedAppointments);
        updateCalendarEvents(storedAppointments);
    }, [setAppointments, updateCalendarEvents]);

    useEffect(() => {
        loadAppointmentsFromLocalStorage();

        const handleStorageChange = (event) => {
            if (event.key === 'appointments') {
                loadAppointmentsFromLocalStorage();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [loadAppointmentsFromLocalStorage]);

    return (
        <div>
            <h3>Lista de Citas</h3>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Cliente</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length === 0 ? (
                        <tr>
                            <td colSpan="4">No hay citas programadas.</td>
                        </tr>
                    ) : (
                        appointments.map((appointment, index) => (
                            <tr key={index}>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{appointment.customerName || 'No reservada'}</td>
                                <td>
                                    <button onClick={() => deleteAppointment(index)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListaCitas;
