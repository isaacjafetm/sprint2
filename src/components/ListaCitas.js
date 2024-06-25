import React from 'react';

const ListaCitas = ({ appointments, setAppointments, successMessage, setSuccessMessage }) => {
    const deleteAppointment = (index) => {
        const updatedAppointments = appointments.filter((_, i) => i !== index);
        setAppointments(updatedAppointments);
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
        setSuccessMessage(`Cita eliminada exitosamente.`);
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    return (
        <div>
            <h3>Lista de Citas</h3>
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
                    {appointments.map((appointment, index) => (
                        <tr key={index}>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.customerName || 'No reservada'}</td>
                            <td>
                                <button onClick={() => deleteAppointment(index)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaCitas;
