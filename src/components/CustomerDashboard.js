// src/components/CustomerDashboard.js
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CrearBicis from './CrearBici';
import MisBicis from './MisBicis';
import CustomerCalendar from './CustomerCalendar'; // Importa el componente del calendario
import '../styles/admin.css';
import { supabase } from '../supabaseClient'; // Ajusta la importación según tu estructura
import ListaCitas from './ListaCitas';


const CustomerDashboard = () => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const { data, error } = await supabase
                .from('citas')
                .select('*');

            if (error) {
                console.error('Error fetching appointments:', error);
            } else {
                setAppointments(data);
            }
        };

        fetchAppointments();
    }, []);

    return (
        <div className="admin-container">
            <h2>Panel de Cliente</h2>
            <Tabs>
                <TabList>
                    <Tab>Mis Bicis</Tab>
                    <Tab>Crear Bici</Tab>
                    <Tab>Mis citas</Tab>
                    <Tab>Reservar cita</Tab>
                </TabList>
                <TabPanel>
                    <MisBicis clienteId={currentUser.id} />
                </TabPanel>
                <TabPanel>
                    <CrearBicis clienteId={currentUser.id} />
                </TabPanel>
                <TabPanel>
                    <ListaCitas currentUser={currentUser} />
                </TabPanel>
                <TabPanel>
                    <CustomerCalendar appointments={appointments} />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default CustomerDashboard;
