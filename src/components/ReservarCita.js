import React, { useState } from 'react';

const saveAppointments = (appointments) => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
    console.log('Appointments saved:', appointments);
};

const ReservarCita = ({ appointments, setAppointments }) => {
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const handleReserve = (appointment) => {
        const confirmation = window.confirm('¿Estás seguro de que deseas reservar esta cita?');
        if (confirmation) {
            // Reservar la cita
            const updatedAppointments = appointments.map(appt => 
                appt.id === appointment.id ? { ...appt, reserved: true } : appt
            );
            setAppointments(updatedAppointments);
            saveAppointments(updatedAppointments); // Guarda las citas actualizadas

            // Redirigir al dashboard de clientes
            window.location.href = '/customer-dashboard'; // Cambia esto según la lógica de redirección
        }
    };

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
                    {appointments.map((appointment) => (
                        !appointment.reserved && (
                            <tr key={appointment.id}>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>
                                    <button onClick={() => handleReserve(appointment)}>Reservar</button>
                                </td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservarCita;
