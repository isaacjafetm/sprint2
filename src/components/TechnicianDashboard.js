// src/components/TechnicianDashboard.js
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import '../styles/technicianDashboard.css'; // Importa el nuevo CSS
import Calendar from './Calendar';

const TechnicianDashboard = () => {
    return (
        <div className="technician-dashboard-container">
            <h2>Panel de Técnico</h2>
            <Tabs>
                <TabList>
                    <Tab>Calendario</Tab>
                </TabList>

                <TabPanel>
                    <div className="technician-calendar-container">
                        <Calendar />
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TechnicianDashboard;
