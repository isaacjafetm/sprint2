import React from 'react';

const saveAppointments = (appointments) => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
    console.log('Appointments saved:', appointments);
};

const ListaCitas = ({ appointments, setAppointments, successMessage, setSuccessMessage }) => {
    const deleteAppointment = (id) => {
        const confirmation = window.confirm('¿Estás seguro de que deseas eliminar esta cita?');
        if (confirmation) {
            const updatedAppointments = appointments.filter(appointment => appointment.id !== id);
            setAppointments(updatedAppointments);
            saveAppointments(updatedAppointments); // Utiliza la función saveAppointments
            setSuccessMessage(`Cita eliminada exitosamente.`);
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
                        <th>ID</th> {/* Añadido para mostrar la ID */}
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.id}</td> {/* Mostrando la ID */}
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.customerName ? 'Reservada' : 'Disponible'}</td>
                            <td>
                                <button onClick={() => deleteAppointment(appointment.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListaCitas;
