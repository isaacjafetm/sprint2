// src/components/TechnicianDashboard.js
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../styles/technicianDashboard.css';
import Calendar from './Calendar';
import ListaCitas from './ListaCitas';

const TechnicianDashboard = ({ appointments, setAppointments, calendarEvents, setCalendarEvents, successMessage, setSuccessMessage }) => {
    return (
        <div className="technician-dashboard-container">
            <h2>Panel de Técnico</h2>
            <Tabs>
                <TabList>
                    <Tab>Calendario</Tab>
                    <Tab>Lista de Citas</Tab>
                </TabList>

                <TabPanel>
                    <div className="technician-calendar-container">
                        <Calendar events={calendarEvents} />
                    </div>
                </TabPanel>
                
                <TabPanel>
                    <div className="technician-appointments-container">
                        <ListaCitas 
                            appointments={appointments} 
                            setAppointments={setAppointments} 
                            successMessage={successMessage}
                            setSuccessMessage={setSuccessMessage}
                            setCalendarEvents={setCalendarEvents}
                        />
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TechnicianDashboard;
