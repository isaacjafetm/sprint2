// src/components/CustomerAppointments.js
import React, { useState, useEffect } from 'react';
import '../styles/admin.css';

const CustomerAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
        setAppointments(storedAppointments);
    }, []);

    const reserveAppointment = (index) => {
        const updatedAppointments = appointments.map((appointment, i) =>
            i === index ? { ...appointment, reserved: true } : appointment
        );
        setAppointments(updatedAppointments);
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
        setSuccessMessage('Cita reservada exitosamente.');
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    return (
        <div className="admin-container">
            <h2>Reservar Cita</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.filter(appointment => !appointment.reserved).map((appointment, index) => (
                        <tr key={index}>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>
                                <button onClick={() => reserveAppointment(index)}>Reservar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerAppointments;
