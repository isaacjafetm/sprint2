// src/components/Register.js
import React, { useState } from 'react';
import '../styles/register.css';
import { useNavigate } from 'react-router-dom';
import {supabase}  from '../supabaseClient';
import { Form, Button} from 'react-bootstrap';


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

        
    };

    return (
        <div className="register-container">
            <h2 className="text-center">Registro</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name" className="mb-3">
                    <Form.Label>Nombre Completo:</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="phone" className="mb-3">
                    <Form.Label>Número Telefónico:</Form.Label>
                    <Form.Control
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="username" className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                </Form.Group>
                <Form.Group controlId="confirmPassword" className="mb-3">
                    <Form.Label>Confirmar Contraseña:</Form.Label>
                    <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                </Form.Group>
                <Button variant="outline-danger" type="submit" className="w-100">
                    Registrar
                </Button>
            </Form>
        </div>
    );
};

export default Register;
