// src/components/Register.js
import React, { useState } from 'react';
import '../styles/register.css';
import { useNavigate } from 'react-router-dom';
import {supabase}  from '../supabaseClient';

const Register = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden!");
            return;
        }

        try{
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email: username,
                password: password
            });

            if (signUpError) {
                setError(signUpError.message);
                throw signUpError;
            }

            const { error: profileError } = await supabase
                .from('clientes') // Assuming you have a 'clientes' table to store additional user info
                .insert([{ id: signUpData.user.id, nombre: name, contraseña: password, correo: username, telefono: phone ,rol: "cliente"}]);

            if (profileError) {
                setError(profileError.message);
                throw profileError;
            }

            alert("Usuario creado exitósamente");
            navigate('/login');
         } catch (error) {
            console.error('Error during sign-up:', error);
            setError('Error al crear el usuario. Inténtalo de nuevo más tarde.');
        }

        

        /*const newUser = {
            name: name,
            phone: phone,
            username: username,
            password: password,
            role: 'customer', // Por defecto, los nuevos usuarios son clientes
        };

        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));*/

        
    };

    return (
        <div className="register-container">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre Completo:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Número Telefónico:</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Email:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default Register;
