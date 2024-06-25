// AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../styles/admin.css';
import { supabase } from '../supabaseClient';
import GestionUsuario from './GestionUsuario';
import GestionCitas from './GestionCitas';
import ListaCitas from './ListaCitas';
import GestionCombos from './GestionCombos'; // Importa el nuevo componente
import ListaCombos from './ListaCombos'; // Importa el nuevo componente

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [appointments, setAppointments] = useState([]);

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

        const fetchAppointments = () => {
            const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
            setAppointments(storedAppointments);
        };

        fetchUsers();
        fetchAppointments();
    }, []);

    return (
        <div className="admin-container">
            <h2>Panel de Administración</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <Tabs>
                <TabList>
                    <Tab>Gestión de Usuarios</Tab>
                    <Tab>Gestión de Citas</Tab>
                    <Tab>Lista de Citas</Tab>
                    <Tab>Gestión de Combos</Tab>
                    <Tab>Lista de Combos</Tab>
                </TabList>

                <TabPanel>
                    <GestionUsuario
                        users={users}
                        setUsers={setUsers}
                        successMessage={successMessage}
                        setSuccessMessage={setSuccessMessage}
                    />
                </TabPanel>

                <TabPanel>
                    <GestionCitas
                        appointments={appointments}
                        setAppointments={setAppointments}
                        successMessage={successMessage}
                        setSuccessMessage={setSuccessMessage}
                    />
                </TabPanel>

                <TabPanel>
                    <ListaCitas
                        appointments={appointments}
                        setAppointments={setAppointments}
                        successMessage={successMessage}
                        setSuccessMessage={setSuccessMessage}
                    />
                </TabPanel>

                <TabPanel>
                    <GestionCombos
                        successMessage={successMessage}
                        setSuccessMessage={setSuccessMessage}
                    />
                </TabPanel>

                <TabPanel>
                    <ListaCombos
                        currentUser={{ rol: 'admin' }} // Pase la información del usuario actual para validación
                    />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default AdminDashboard;
