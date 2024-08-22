import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configura la localización para Big Calendar
const localizer = momentLocalizer(moment);

const CustomerCalendar = ({ appointments }) => {
    const events = appointments.map(appointment => ({
        id: appointment.id,
        title: appointment.reserved ? 'Reservado' : 'Disponible',
        start: new Date(`${appointment.date}T${appointment.time}`),
        end: new Date(`${appointment.date}T${appointment.time}`),
        reserved: appointment.reserved
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

    return (
        <div style={{ height: 800, width: 1200 }}> {/* Ajuste de altura y ancho */}
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={eventStyleGetter}
                onSelectEvent={(event) => {
                    // Redirige a la página de reserva de citas
                    window.location.href = '/reservar-cita/';
                }}
                style={{ height: '100%', width: '100%' }} // Ajuste de altura y ancho
            />
        </div>
    );
};

export default CustomerCalendar;
