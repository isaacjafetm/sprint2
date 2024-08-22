import React, { useState } from 'react';
import { supabase } from '../supabaseClient'; // Ajusta la importación según tu estructura

const GestionCitas = ({ appointments, setAppointments, successMessage, setSuccessMessage }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [rangeStart, setRangeStart] = useState('');
    const [rangeEnd, setRangeEnd] = useState('');
    const [hours, setHours] = useState(['09:00']); // Cambié esto para usar un valor por defecto simple
    const [selectedDays, setSelectedDays] = useState([0, 1, 2, 3, 4]); // Lunes(0) -> Viernes(4)

    const addAppointment = async () => {
        const isDuplicate = appointments.some(appointment =>
            appointment.fecha === date && appointment.hora === time
        );
        if (isDuplicate) {
            setSuccessMessage('Error: Ya existe una cita en esa fecha y hora.');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            return;
        }

        const newAppointment = {
            fecha: date,
            hora: time,
            reservada: false,
            cliente_id: null,  // Aquí se puede asignar el id del cliente si se tiene
            motivo: null       // Este campo puede ser opcional o se puede completar en la UI
        };

        // Guardar en la base de datos
        try {
            const { error } = await supabase
                .from('citas')
                .insert([newAppointment]);

            if (error) {
                console.error('Error al agregar la cita:', error);
                setSuccessMessage('Error al agregar la cita.');
            } else {
                setAppointments([...appointments, newAppointment]);
                setSuccessMessage(`Cita agregada para el ${date} a las ${time}.`);
            }
        } catch (err) {
            console.error('Error inesperado:', err);
            setSuccessMessage('Error inesperado al agregar la cita.');
        }

        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);

        setDate('');
        setTime('');
    };

    const generateAutomaticAppointments = async () => {
        const start = new Date(rangeStart);
        const end = new Date(rangeEnd);
        const newAppointments = [];

        const uniqueHours = Array.from(new Set(hours));

        for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
            const dayOfWeek = day.getDay();
            if (selectedDays.includes(dayOfWeek)) {
                const dayString = day.toISOString().split('T')[0];
                uniqueHours.forEach(timeSlot => {
                    const isDuplicate = appointments.some(appointment =>
                        appointment.fecha === dayString && appointment.hora === timeSlot
                    );
                    if (!isDuplicate) {
                        newAppointments.push({
                            fecha: dayString,
                            hora: timeSlot,
                            reservada: false,
                            cliente_id: null,
                            motivo: null
                        });
                    }
                });
            }
        }

        try {
            const { error } = await supabase
                .from('citas')
                .insert(newAppointments);

            if (error) {
                console.error('Error al generar citas:', error);
                setSuccessMessage('Error al generar citas.');
            } else {
                setAppointments([...appointments, ...newAppointments]);
                setSuccessMessage('Citas generadas automáticamente para el rango de días seleccionado.');
            }
        } catch (err) {
            console.error('Error inesperado:', err);
            setSuccessMessage('Error inesperado al generar citas.');
        }

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
