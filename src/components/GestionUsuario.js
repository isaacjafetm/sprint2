import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import '../styles/admin.css';
import Button from 'react-bootstrap/Button';

const roles = ['admin', 'tecnico', 'cliente'];

const GestionUsuario = ({ users, setUsers, successMessage, setSuccessMessage }) => {
    const [roleChanges, setRoleChanges] = useState({});
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [newUser, setNewUser] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        rol: 'cliente',
    });

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
        const confirmation = window.confirm('¿Estás seguro de que deseas eliminar el usuario?');
        if (confirmation) {
            try {
                // Desvincular bicicletas (set cli_id to NULL)
                const { error: bicicletasError } = await supabase
                    .from('bicicli')
                    .update({ cli_id: null })
                    .eq('cli_id', id);
    
                if (bicicletasError) {
                    throw new Error(`Error desvinculando bicicletas: ${bicicletasError.message}`);
                }
    
                // Desvincular citas (set cliente_id to NULL)
                const { error: citasError } = await supabase
                    .from('citas')
                    .update({ cliente_id: null })
                    .eq('cliente_id', id);
    
                if (citasError) {
                    throw new Error(`Error desvinculando citas: ${citasError.message}`);
                }
    
                // Eliminar el cliente de la tabla 'clientes'
                const { error: clienteError } = await supabase
                    .from('clientes')
                    .delete()
                    .eq('id', id);
    
                if (clienteError) {
                    throw new Error(`Error borrando usuario de clientes: ${clienteError.message}`);
                }
    
                // Actualizar la lista de usuarios localmente
                const updatedUsers = users.filter(user => user.id !== id);
                setUsers(updatedUsers);
    
                // Mostrar mensaje de éxito
                setSuccessMessage('Usuario eliminado exitosamente.');
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            } catch (error) {
                console.error(error.message);
                setSuccessMessage(`Error: ${error.message}`);
                setTimeout(() => {
                    setSuccessMessage('');
                }, 3000);
            }
        }
    };
    

    const handleAddUserSubmit = async (e, id) => {
        
        e.preventDefault();
        try{
        const { nombre, correo, telefono, rol, password } = newUser;
        const { data: signUpData } = await supabase.auth.signUp({
            email: correo, password: password
        });

        

        const { error } = await supabase
            .from('clientes')
            .insert([{ id: signUpData.user.id, nombre: nombre, correo: correo, telefono: telefono, rol: rol, contraseña: password }]);

        if (error) {
            console.error('Error adding user:', error);
            setSuccessMessage(`Error agregando usuario: ${error.message}`);
        } else {
      
            setSuccessMessage('Usuario agregado exitosamente.');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            setShowAddUserForm(false);
            setNewUser({ nombre: '', correo: '', telefono: '', rol: 'cliente' });
         
        }
        } catch (error) {
            console.error('Error during sign-up:', error);
            
        }
    };

    const handleTelefonoChange = (e) => {
        const { value } = e.target;
        const validPattern = /^[389][0-9]{0,7}$/;

        if (value === '' || validPattern.test(value)) {
            setNewUser({ ...newUser, telefono: value });
        } 
    };

    return (
        <div>
            <h3>Gestión de Usuarios</h3>
            <Button
                className="btn-dark-red"
                onClick={() => setShowAddUserForm(!showAddUserForm)}
            >
                {showAddUserForm ? 'Cancelar' : 'Agregar Nuevo Usuario'}
            </Button>
            {showAddUserForm && (
                <form onSubmit={handleAddUserSubmit}>
                    <div>
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            value={newUser.nombre}
                            onChange={(e) => setNewUser({ ...newUser, nombre: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="correo">Correo:</label>
                        <input
                            type="email"
                            id="correo"
                            value={newUser.correo}
                            onChange={(e) => setNewUser({ ...newUser, correo: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="telefono">Teléfono:</label>
                        <input
                            type="text"
                            id="telefono"
                            value={newUser.telefono}
                            onChange={handleTelefonoChange}
                            pattern="\d{8}" maxLength="8"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            required
                            minLength={6}
                        />
                    </div>
                    <div>
                        <label htmlFor="rol">Rol:</label>
                        <select
                            id="rol"
                            value={newUser.rol}
                            onChange={(e) => setNewUser({ ...newUser, rol: e.target.value })}
                        >
                            {roles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </div>
                    <Button type="submit" className="btn-dark-red">Agregar Usuario</Button>
                </form>
            )}
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
                                <Button
                                   className="btn-dark-red"
                                    onClick={() => handleRoleChangeButtonClick(user.id)}
                                    disabled={user.rol === 'admin' || !roleChanges[user.id] || roleChanges[user.id] === user.rol}
                                >
                                    Cambiar Rol
                                </Button>
                                <span>&nbsp;&nbsp;</span>
                                <Button
                                    className="btn-dark-red"
                                    disabled={user.rol === 'admin'}
                                    onClick={() => handleDeleteUser(user.id)}
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GestionUsuario;
