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
    const [phoneError, setPhoneError] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');



    const handleSubmit = async (event) => {
        event.preventDefault();
        //Validar contrasenas
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden!");
            return;
        }

        //Validar numeros de telefono
        if (phone.length !== 8) {
            setPhoneError('El número debe tener exactamente 8 dígitos');
            return;
        }

            // Validar nombre
        if (nameError) {
            return;
        }
    
        // Validar correo electrónico
        if (emailError) {
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

    //Funcion para validar numero de telefono
    const handlePhoneChange = (e) => {
        const input = e.target.value;
      
        // Solo permite números
        if (/^\d*$/.test(input)) {
          setPhone(input);
      
          // Valida que tenga exactamente 8 dígitos
          if (input.length !== 8 && input.length > 0) {
            setPhoneError('El número debe tener exactamente 8 dígitos');
          } else {
            setPhoneError('');
          }
        } else {
          setPhoneError('Solo se permiten números');
        }
      };

      //Funcion para validar nombre
      const handleNameChange = (e) => {
        const input = e.target.value;
        // Verifica que no tenga dígitos
        if (/^[A-Za-z\s]+$/.test(input)) {
          setName(input);
          setNameError('');
        } else {
          setNameError('El nombre no debe contener números');
        }
      };

      //Funcion para validar email
        const handleEmailChange = (e) => {
        const input = e.target.value;
        setUsername(input);
    
        // Verifica que el email tenga un formato válido: contiene "@" y termina en ".com"
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input) || !input.endsWith('.com')) {
          setEmailError('El correo debe ser válido y terminar en ".com"');
        } else {
          setEmailError('');
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
                onChange={handleNameChange}
                required
            />
            </Form.Group>
            {nameError && <p style={{ color: 'red' }}>{nameError}</p>}

            <Form.Group controlId="phone" className="mb-3">
                <Form.Label>Número Telefónico:</Form.Label>
                <Form.Control
                    type="text"
                    value={phone}
                    onChange={(e) => handlePhoneChange(e)}
                    required
                />
            </Form.Group>
                {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>} {/* Mensaje de error si aplica */}

                <Form.Group controlId="username" className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={username}
                        onChange={handleEmailChange}
                        required
                    />
                </Form.Group>
                {emailError && <p style={{ color: 'red' }}>{emailError}</p>}

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
