import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../styles/technicianDashboard.css'; // Importa el nuevo CSS
import ChatComponent from './ChatComponent'; // Importa el componente de chat
import { supabase } from '../supabaseClient'; // Conexión a Supabase

const TechnicianDashboard = () => {
    const [customers, setCustomers] = useState([]); // Lista de clientes
    const [selectedCustomer, setSelectedCustomer] = useState(null); // Cliente seleccionado para el chat
    const [unreadMessages, setUnreadMessages] = useState({}); // Mensajes no leídos por cliente
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser')); // Obtener el técnico actual

    // Obtener lista de clientes
    useEffect(() => {
        const fetchCustomers = async () => {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('rol', 'cliente'); // Solo obtener clientes

            if (error) {
                console.error('Error fetching customers:', error);
            } else {
                setCustomers(data);
            }
        };

        fetchCustomers();
    }, []);

    // Obtener mensajes no leídos para cada cliente
    useEffect(() => {
        const fetchUnreadMessages = async () => {
            const { data, error } = await supabase
                .from('messages')
                .select('sender_id, read')
                .eq('recipient_id', currentUser.id)
                .eq('read', false); // Mensajes no leídos

            if (error) {
                console.error('Error fetching unread messages:', error);
            } else {
                // Contar los mensajes no leídos por cliente
                const unreadCount = {};
                data.forEach((message) => {
                    unreadCount[message.sender_id] = (unreadCount[message.sender_id] || 0) + 1;
                });
                setUnreadMessages(unreadCount);
            }
        };

        fetchUnreadMessages();
    }, [currentUser.id]);

    return (
        <div className="technician-dashboard-container">
            <h2>Panel de Técnico</h2>
            <Tabs>
                <TabList>
                    <Tab>Calendario</Tab>
                    <Tab>Chat con Clientes</Tab> {/* Nueva pestaña para el chat */}
                </TabList>

                <TabPanel>
                    {/* Aquí puedes agregar tu componente de Calendario */}
                    <p>Aquí va el calendario del técnico</p>
                </TabPanel>

                <TabPanel>
                    <div className="chat-panel">
                        <div className="customer-list">
                            <h3>Clientes</h3>
                            <ul>
                                {customers.map((customer) => (
                                    <li 
                                        key={customer.id} 
                                        className={selectedCustomer === customer.id ? 'selected' : ''}
                                        onClick={() => setSelectedCustomer(customer.id)}
                                    >
                                        {customer.name}
                                        {unreadMessages[customer.id] > 0 && (
                                            <span className="unread-indicator">
                                                {unreadMessages[customer.id]} mensajes no leídos
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="chat-box">
                            {selectedCustomer ? (
                                <ChatComponent 
                                    currentUser={currentUser} 
                                    selectedCustomer={selectedCustomer} 
                                />
                            ) : (
                                <p>Selecciona un cliente para iniciar el chat</p>
                            )}
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TechnicianDashboard;
