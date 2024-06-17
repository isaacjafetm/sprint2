import React, { useState, useEffect } from 'react';
import '../styles/customer.css';

const CustomerDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
        setAppointments(storedAppointments);
    }, []);

    const handleBookAppointment = () => {
        if (appointments.includes(newAppointment)) {
            setErrorMessage('El horario ya está reservado.');
            setTimeout(() => setErrorMessage(''), 3000);
        } else {
            const updatedAppointments = [...appointments, newAppointment];
            setAppointments(updatedAppointments);
            localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
            setNewAppointment('');
        }
    };

    const handleDeleteAppointment = (appointment) => {
        const updatedAppointments = appointments.filter(a => a !== appointment);
        setAppointments(updatedAppointments);
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
    };

    return (
        <div className="customer-container">
            <h2>Servicios</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div className="appointment-form">
                <input
                    type="text"
                    value={newAppointment}
                    onChange={(e) => setNewAppointment(e.target.value)}
                    placeholder="Ingrese el horario de la cita"
                />
                <button onClick={handleBookAppointment}>Servicios</button>
            </div>
            <table className="appointment-table">
                <thead>
                    <tr>
                        <th>Horario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => (
                        <tr key={index}>
                            <td>{appointment}</td>
                            <td>
                                <button onClick={() => handleDeleteAppointment(appointment)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerDashboard;
