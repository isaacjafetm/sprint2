// src/components/CustomerDashboard.js
import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CrearBicis from './CrearBici';
import MisBicis from './MisBicis';
import ListaCombos from './ListaCombos';
import CustomerCalendar from './CustomerCalendar'; // Importa el componente del calendario
import '../styles/admin.css';

const CustomerDashboard = () => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const storedAppointments = localStorage.getItem('appointments');
        if (storedAppointments) {
            setAppointments(JSON.parse(storedAppointments));
        }
    }, []);

    return (
        <div className="admin-container">
            <h2>Panel de Cliente</h2>
            <Tabs>
                <TabList>
                    <Tab>Reservar Cita</Tab>
                    <Tab>Mis Bicis</Tab>
                    <Tab>Crear Bicis</Tab>
                    <Tab>Lista de Combos</Tab>
                </TabList>

                <TabPanel>
                    <CustomerCalendar appointments={appointments} />
                </TabPanel>
                <TabPanel>
                    <MisBicis clienteId={currentUser.id} />
                </TabPanel>
                <TabPanel>
                    <CrearBicis clienteId={currentUser.id} />
                </TabPanel>
                <TabPanel>
                    <ListaCombos currentUser={currentUser} />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default CustomerDashboard;
