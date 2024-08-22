import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

// Configura la localización para Big Calendar
const localizer = momentLocalizer(moment);

const CustomerCalendar = ({ appointments }) => {
    const navigate = useNavigate(); // Usa useNavigate en lugar de useHistory

    
    const events = appointments.map(appointment => ({
        id: appointment.id,
        title: appointment.reservada ? 'Reservada' : 'Disponible',
        start: new Date(`${appointment.fecha}T${appointment.hora}`),
        end: new Date(new Date(`${appointment.fecha}T${appointment.hora}`).getTime() + 60 * 60 * 1000), // Añade 1 hora a la cita
        reserved: appointment.reservada
    }));

    const eventStyleGetter = (event) => {
        const style = {
            backgroundColor: event.reserved ? '#ff9999' : '#99ff99', // Rojo para reservado, verde para disponible
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: 'none'
        };
        return {
            style
        };
    };

    const handleEventClick = (event) => {
        // Redirige a la página de reserva de citas con el ID de la cita
        navigate(`/reservar-cita/${event.id}`);
    };

    return (
        <div style={{ height: 800, width: 1200 }}> {/* Ajuste de altura y ancho */}
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={eventStyleGetter}
                onSelectEvent={handleEventClick} // Cambiado para usar handleEventClick
                style={{ height: '100%', width: '100%' }} // Ajuste de altura y ancho
            />
        </div>
    );
};

export default CustomerCalendar;
