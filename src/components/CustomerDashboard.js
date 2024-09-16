import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CrearBicis from './CrearBici';
import MisBicis from './MisBicis';
import CustomerCalendar from './CustomerCalendar';
import ListaCitas from './ListaCitas';
import ChatComponent from './ChatComponent';
import Forum from './Forum'; // Importa el componente del foro

const CustomerDashboard = () => {
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = () => {
            const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
            setAppointments(storedAppointments);
        };

        fetchAppointments();
    }, []);

    return (
        <div className="admin-container">
            <h2>Panel de Cliente</h2>
            <Tabs>
                <TabList>
                    <Tab>Foro</Tab> 
                    <Tab>Mis Bicis</Tab>
                    <Tab>Crear Bici</Tab>
                    <Tab>Mis citas</Tab>
                    <Tab>Reservar cita</Tab>
                    <Tab>Chat</Tab>
                </TabList>
                <TabPanel>
                    <Forum /> {/* Foro para los clientes */}
                </TabPanel>
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
                <TabPanel>
                    <ChatComponent currentUser={currentUser} />
                </TabPanel>    
            </Tabs>
        </div>
    );
};

export default CustomerDashboard;
