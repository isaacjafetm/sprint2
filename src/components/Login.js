import React, { useState } from 'react';
import '../styles/login.css';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

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
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
            <p className="register-link">
                ¿No tienes una cuenta? <Link to="/register">Regístrate Aquí</Link>
            </p>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Login;
