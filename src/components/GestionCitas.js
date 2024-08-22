import React, { useState } from 'react';

const defaultHours = ['09:00'];
const defaultDays = [0, 1, 2, 3, 4]; // Lunes(0) -> Viernes(4)

const saveAppointments = (appointments) => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
    console.log('Appointments saved:', appointments);
};

const GestionCitas = ({ appointments, setAppointments, successMessage, setSuccessMessage }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [rangeStart, setRangeStart] = useState('');
    const [rangeEnd, setRangeEnd] = useState('');
    const [hours, setHours] = useState(defaultHours);
    const [selectedDays, setSelectedDays] = useState(defaultDays);

    const addAppointment = () => {
        const isDuplicate = appointments.some(appointment =>
            appointment.date === date && appointment.time === time
        );
        if (isDuplicate) {
            setSuccessMessage('Error: Ya existe una cita en esa fecha y hora.');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            return;
        }

        const newAppointment = {
            id: Date.now(), // Genera un ID único basado en la fecha y hora actual
            date,
            time,
            reserved: false,
            customerName: ''
        };
        const updatedAppointments = [...appointments, newAppointment];
        setAppointments(updatedAppointments);
        saveAppointments(updatedAppointments);
        setDate('');
        setTime('');
        setSuccessMessage(`Cita agregada para el ${date} a las ${time}.`);
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    const generateAutomaticAppointments = () => {
        const start = new Date(rangeStart);
        const end = new Date(rangeEnd);
        const newAppointments = [];

        // Remover horas duplicadas
        const uniqueHours = Array.from(new Set(hours));

        for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
            const dayOfWeek = day.getDay();
            if (selectedDays.includes(dayOfWeek)) {
                const dayString = day.toISOString().split('T')[0];
                uniqueHours.forEach(timeSlot => {
                    const isDuplicate = appointments.some(appointment =>
                        appointment.date === dayString && appointment.time === timeSlot
                    );
                    if (!isDuplicate) {
                        newAppointments.push({
                            id: Date.now() + Math.random(), // Genera un ID único basado en la fecha, hora actual y un valor aleatorio
                            date: dayString,
                            time: timeSlot,
                            reserved: false,
                            customerName: ''
                        });
                    }
                });
            }
        }

        const updatedAppointments = [...appointments, ...newAppointments];
        setAppointments(updatedAppointments);
        saveAppointments(updatedAppointments);
        setSuccessMessage('Citas generadas automáticamente para el rango de días seleccionado.');
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    const handleHoursChange = (index, newHour) => {
        const updatedHours = [...hours];
        updatedHours[index] = newHour;
        setHours(updatedHours);
    };

    const handleAddHour = () => {
        setHours([...hours, '']);
    };

    const handleRemoveHour = (index) => {
        const updatedHours = hours.filter((_, i) => i !== index);
        setHours(updatedHours);
    };

    const handleDaysChange = (day) => {
        setSelectedDays(prevDays =>
            prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
        );
    };

    return (
        <div>
            <h3>Gestión de Citas</h3>
            <div className="form-group">
                <label>Fecha:</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Hora:</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <button onClick={addAppointment}>Añadir Cita</button>
            <hr />
            <h3>Generar Citas Automáticamente</h3>
            <div className="form-group">
                <label>Rango de Inicio:</label>
                <input type="date" value={rangeStart} onChange={(e) => setRangeStart(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Rango de Fin:</label>
                <input type="date" value={rangeEnd} onChange={(e) => setRangeEnd(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Horas:</label>
                {hours.map((hour, index) => (
                    <div key={index}>
                        <input
                            type="time"
                            value={hour}
                            onChange={(e) => handleHoursChange(index, e.target.value)} />
                        <button onClick={() => handleRemoveHour(index)}>Eliminar Hora</button>
                    </div>
                ))}
                <br />
                <button onClick={handleAddHour}>Agregar Hora</button>
            </div>
            <div className="form-group">
                <label>Días a Excluir:</label>
                <div>
                    {[0, 1, 2, 3, 4, 5, 6].map(day => (
                        <label key={day} style={{ display: 'inline-block', marginRight: '10px' }}>
                            <input
                                type="checkbox"
                                checked={!selectedDays.includes(day)}
                                onChange={() => handleDaysChange(day)}
                            />
                            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'][day]}
                        </label>
                    ))}
                </div>
            </div>
            <button onClick={generateAutomaticAppointments}>Generar Citas Automáticamente</button>
        </div>
    );
};

export default GestionCitas;
