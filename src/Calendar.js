// src/components/Calendar.js
import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/calendar.css';

const localizer = momentLocalizer(moment);

const Calendar = ({ events }) => {
    return (
        <div className="calendar-container">
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: '100%', width: '100%' }} // Asegura que el calendario ocupe todo el contenedor
            />
        </div>
    );
};

export default Calendar;
