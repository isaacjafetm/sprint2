import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const AppointmentsContext = createContext();

export const useAppointments = () => {
    return useContext(AppointmentsContext);
};

export const AppointmentsProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        try {
            const { data: appointmentsData, error } = await supabase
                .from('appointments')
                .select('*');

            if (error) {
                console.error('Error fetching appointments:', error);
            } else {
                setAppointments(appointmentsData);
                localStorage.setItem('appointments', JSON.stringify(appointmentsData));
            }
        } catch (error) {
            console.error('Unexpected error fetching appointments:', error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    return (
        <AppointmentsContext.Provider value={{ appointments, setAppointments, fetchAppointments }}>
            {children}
        </AppointmentsContext.Provider>
    );
};
