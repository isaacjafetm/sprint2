// src/components/CustomerDashboard.js
import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CrearBicis from './CrearBici';
import MisBicis from './MisBicis';
import CustomerAppointments from './CustomerAppointments';
import ListaCombos from './ListaCombos'; // Importa el nuevo componente
import '../styles/admin.css';

const CustomerDashboard = () => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser')); // Suponiendo que la información del usuario está almacenada en el localStorage

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
                    <CustomerAppointments />
                </TabPanel>
                <TabPanel>
                    <MisBicis />
                </TabPanel>
                <TabPanel>
                    <CrearBicis />
                </TabPanel>
                <TabPanel>
                    <ListaCombos currentUser={currentUser} />
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default CustomerDashboard;
