import React, { useState } from 'react';
import '../styles/login.css';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';


const Login = ({ setIsLoggedIn, setCurrentUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Authenticate with Supabase Auth
             // eslint-disable-next-line
            const { data, error: signInError } = await supabase.auth.signInWithPassword({
                
                email: username,
                password: password
            });

            if (signInError) {
                setError(signInError.message);
                throw signInError;
            }

            // Fetch user details from 'clientes' table
            const { data: userDetails, error: fetchError } = await supabase
                .from('clientes')
                .select('*')
                .eq('correo', username)
                .single();

            if (fetchError) {
                setError('No se pudieron obtener los detalles del usuario.');
                throw fetchError;
            }

            alert('Inicio de sesión exitoso!');
            setIsLoggedIn(true);
            setCurrentUser(userDetails);
            localStorage.setItem('loggedInUser', JSON.stringify(userDetails));
            navigate('/');
        } catch (error) {
            console.error('Error during sign in:', error);
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div className="login-container">
        <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username" className="form-group">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="password" className="form-group">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            <Button variant="outline-danger" type="submit">Login</Button>
        </Form>
        <p className="register-link">
            ¿No tienes una cuenta? <Link to="/register">Regístrate Aquí</Link>
        </p>
        {error && <p className="error-message">{error}</p>}
    </div>
    );
};

export default Login;
