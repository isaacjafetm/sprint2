import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../styles/admin.css';
import { supabase } from '../supabaseClient';
import GestionUsuario from './GestionUsuario';
import GestionCitas from './GestionCitas';
import ListaCitas from './ListaCitas';
import GestionCombos from './GestionCombos';
import ListaCombos from './ListaCombos';
import AdminPostForm from './AdminPostForm';  // Importa el formulario de creación de posts
import AdminPostList from './AdminPostList';  // Importa el nuevo componente de gestión de posts

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [posts, setPosts] = useState([]);

    // Fetch usuarios, citas y posts
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

        const fetchPosts = () => {
            const storedPosts = JSON.parse(localStorage.getItem('posts')) || [];
            setPosts(storedPosts);
        };

        fetchUsers();
        fetchAppointments();
        fetchPosts();
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
                    <Tab>Crear Post</Tab>
                    <Tab>Gestionar Posts</Tab> {/* Nueva pestaña para gestionar posts */}
                </TabList>

                {/* Pestaña de Gestión de Usuarios */}
                <TabPanel>
                    <GestionUsuario
                        users={users}
                        setUsers={setUsers}
                        successMessage={successMessage}
                        setSuccessMessage={setSuccessMessage}
                    />
                </TabPanel>

                {/* Pestaña de Gestión de Citas */}
                <TabPanel>
                    <GestionCitas
                        appointments={appointments}
                        setAppointments={setAppointments}
                        successMessage={successMessage}
                        setSuccessMessage={setSuccessMessage}
                    />
                </TabPanel>

                {/* Pestaña de Lista de Citas */}
                <TabPanel>
                    <ListaCitas
                        appointments={appointments}
                        setAppointments={setAppointments}
                        successMessage={successMessage}
                        setSuccessMessage={setSuccessMessage}
                    />
                </TabPanel>

                {/* Pestaña de Gestión de Combos */}
                <TabPanel>
                    <GestionCombos
                        successMessage={successMessage}
                        setSuccessMessage={setSuccessMessage}
                    />
                </TabPanel>

                {/* Pestaña de Lista de Combos */}
                <TabPanel>
                    <ListaCombos
                        currentUser={{ rol: 'admin' }} // Pase la información del usuario actual para validación
                    />
                </TabPanel>

                {/* Nueva Pestaña para Crear Post */}
                <TabPanel>
                    <AdminPostForm setPosts={setPosts} />
                </TabPanel>

                {/* Nueva Pestaña para Gestionar Posts */}
                <TabPanel>
                    <AdminPostList posts={posts} setPosts={setPosts} />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default AdminDashboard;
