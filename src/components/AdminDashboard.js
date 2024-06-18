import React, { useState, useEffect } from 'react';
import '../styles/admin.css';
import {supabase} from '../supabaseClient';

const roles = ['admin', 'tecnico', 'cliente']; // Lista de roles disponibles

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [roleChanges, setRoleChanges] = useState({});
    const [appointments, setAppointments] = useState([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            let { data: clientes, error } = await supabase
                .from('clientes')
                .select('id, nombre, correo, telefono, rol');

            if (error) {
                console.error('Error fetching users:', error);
            } else {
                setUsers(clientes);
            }
        };

        fetchUsers();

        const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
        setAppointments(storedAppointments);
    }, []);

    const handleRoleSelection = (id, newRole) => {
        setRoleChanges({
            ...roleChanges,
            [id]: newRole
        });
    };

    const handleChangeRole = async (id, newRole) => {
        const updatedUsers = users.map(user =>
            user.id === id ? { ...user, rol: newRole } : user
        );
        setUsers(updatedUsers);

        const { error } = await supabase
            .from('clientes')
            .update({ rol: newRole })
            .eq('id', id);

        if (error) {
            console.error('Error updating role:', error);
        } else {
            setSuccessMessage(`Rol cambiado a ${newRole} exitosamente.`);
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        }
    };

    const handleRoleChangeButtonClick = (id) => {
        const newRole = roleChanges[id];
        if (newRole) {
            handleChangeRole(id, newRole);
        }
    };

    const handleDeleteUser = async (id) => {
        const { error: clienteError } = await supabase
            .from('clientes')
            .delete()
            .eq('id', id);
    
        if (clienteError) {
            console.error('Error deleting user from clientes:', clienteError);
            setSuccessMessage(`Error deleting user from clientes: ${clienteError.message}`);
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } else {
            // Update the local state if both deletions are successful
            const updatedUsers = users.filter(user => user.id !== id);
            setUsers(updatedUsers);
    
            setSuccessMessage(`Usuario eliminado exitosamente.`);
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        }
    };

    const addAppointment = () => {
        const newAppointment = { date, time, reserved: false };
        const updatedAppointments = [...appointments, newAppointment];
        setAppointments(updatedAppointments);
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
        setDate('');
        setTime('');
        setSuccessMessage(`Cita agregada para el ${date} a las ${time}.`);
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

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
        <div className="admin-container">
            <h2>Panel de Administración</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.nombre}</td>
                            <td>{user.correo}</td>
                            <td>{user.telefono}</td>
                            <td>
                                <select
                                    value={roleChanges[user.id] || user.rol}
                                    onChange={(e) => handleRoleSelection(user.id, e.target.value)}
                                >
                                    {roles.map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                {/* Botón para cambiar el rol */}
                                <button
                                    onClick={() => handleRoleChangeButtonClick(user.id)}
                                    disabled={user.rol === 'admin'} // Evita cambiar el rol del administrador
                                >
                                    Cambiar Rol
                                </button>
                                <span>&nbsp;&nbsp;</span>
                                {/* Botón para eliminar usuario */}
                                <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <h3>Gestión de Citas</h3>
            <div className="form-group">
                <label>Fecha:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Hora:</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <button onClick={addAppointment}>Añadir Cita</button>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => (
                        <tr key={index}>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
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

export default AdminDashboard;
