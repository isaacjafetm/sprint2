import React, { useState, useEffect } from 'react';
import '../styles/customerappointment.css';
import { supabase } from '../supabaseClient';

const CustomerAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [bicicletas, setBicicletas] = useState([]);
    const [combos, setCombos] = useState([]);
    const [selectedBici, setSelectedBici] = useState({});
    const [selectedCombo, setSelectedCombo] = useState({});

    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
        setAppointments(storedAppointments);

        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (storedUser) {
            setCurrentUser(storedUser);
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            fetchBicicletas();
            fetchCombos();
        }
    }, [currentUser]);

    const fetchBicicletas = async () => {
        const { data, error } = await supabase
            .from('bicicli')
            .select('*');

        if (error) {
            console.error('Error fetching bicicletas:', error);
        } else {
            setBicicletas(data);
        }
    };

    const fetchCombos = async () => {
        const { data, error } = await supabase
            .from('combos')
            .select('*');

        if (error) {
            console.error('Error fetching combos:', error);
        } else {
            setCombos(data);
        }
    };

    const handleBiciChange = (index, value) => {
        setSelectedBici({ ...selectedBici, [index]: value });
    };

    const handleComboChange = (index, value) => {
        setSelectedCombo({ ...selectedCombo, [index]: value });
    };

    const reserveAppointment = (index) => {
        if (!selectedBici[index] || !selectedCombo[index]) {
            alert('Por favor seleccione una bicicleta y un combo.');
            return;
        }

        const updatedAppointments = [...appointments];
        updatedAppointments[index].reserved = true;
        updatedAppointments[index].biciId = selectedBici[index];
        updatedAppointments[index].comboId = selectedCombo[index];
        setAppointments(updatedAppointments);
        localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
        setSuccessMessage('Cita reservada con éxito');
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    return (
        <div className="appointment-list">
            <h2>Reservar Cita</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {appointments.length === 0 ? (
                <p>No hay citas disponibles.</p>
            ) : (
                appointments.map((appointment, index) => (
                    <div key={index} className="appointment-item">
                        <h3>Cita {index + 1}</h3>
                        <p>Fecha: {appointment.date}</p>
                        <p>Hora: {appointment.time}</p>
                        {appointment.reserved ? (
                            <p>Esta cita ya está reservada.</p>
                        ) : (
                            <div className="appointment-actions">
                                <label>
                                    Seleccionar Bicicleta:
                                    <select value={selectedBici[index] || ''} onChange={(e) => handleBiciChange(index, e.target.value)}>
                                        <option value="">Seleccione una bicicleta</option>
                                        {bicicletas.map((bici) => (
                                            <option key={bici.id} value={bici.id}>{bici.modelo}</option>
                                        ))}
                                    </select>
                                </label>
                                <label>
                                    Seleccionar Combo:
                                    <select value={selectedCombo[index] || ''} onChange={(e) => handleComboChange(index, e.target.value)}>
                                        <option value="">Seleccione un combo</option>
                                        {combos.map((combo) => (
                                            <option key={combo.id} value={combo.id}>{combo.nombre}</option>
                                        ))}
                                    </select>
                                </label>
                                <button onClick={() => reserveAppointment(index)}>Reservar</button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default CustomerAppointments;
