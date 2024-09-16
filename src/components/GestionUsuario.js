import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const roles = ['admin', 'tecnico', 'cliente'];

const GestionUsuario = ({ users, setUsers, successMessage, setSuccessMessage }) => {
    const [roleChanges, setRoleChanges] = useState({});

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
            console.error('Error borrando usuario de clientes:', clienteError);
            setSuccessMessage(`Error borrando usuario de clientes: ${clienteError.message}`);
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        } else {
            const updatedUsers = users.filter(user => user.id !== id);
            setUsers(updatedUsers);

            setSuccessMessage(`Usuario eliminado exitosamente.`);
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
        }
    };

    return (
        <div>
            <h3>Gestión de Usuarios</h3>
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
                                <button
                                    onClick={() => handleRoleChangeButtonClick(user.id)}
                                    disabled={user.rol === 'admin'}
                                >
                                    Cambiar Rol
                                </button>
                                <span>&nbsp;&nbsp;</span>
                                <button
                                    disabled={user.rol === 'admin'}
                                    onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GestionUsuario;
