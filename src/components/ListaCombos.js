// ListaCombos.js
import React, { useEffect, useState } from 'react';
import '../styles/listaCombos.css';

const ListaCombos = ({ currentUser }) => {
    const [combos, setCombos] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [editingCombo, setEditingCombo] = useState(null);
    const [editedCombo, setEditedCombo] = useState({ nombre: '', descripcion: '', precio: '' });

    useEffect(() => {
        fetchCombos();
    }, []);

    const fetchCombos = () => {
        const storedCombos = JSON.parse(localStorage.getItem('combos')) || [];
        setCombos(storedCombos);
    };

    const deleteCombo = (id) => {
        const updatedCombos = combos.filter(combo => combo.id !== id);
        setCombos(updatedCombos);
        localStorage.setItem('combos', JSON.stringify(updatedCombos));
        setSuccessMessage('Combo eliminado exitosamente.');
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    const handleEdit = (combo) => {
        setEditingCombo(combo.id);
        setEditedCombo({ nombre: combo.nombre, descripcion: combo.descripcion, precio: combo.precio });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCombo({ ...editedCombo, [name]: value });
    };

    const saveEdit = (id) => {
        const updatedCombos = combos.map(combo => (combo.id === id ? { ...editedCombo, id } : combo));
        setCombos(updatedCombos);
        localStorage.setItem('combos', JSON.stringify(updatedCombos));
        setEditingCombo(null);
        setSuccessMessage('Combo actualizado exitosamente.');
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    return (
        <div className="lista-combos-container">
            <h2>Lista de Combos</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            {combos.map(combo => (
                <div key={combo.id} className="combo-card">
                    <div className="combo-details">
                        {editingCombo === combo.id ? (
                            <>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={editedCombo.nombre}
                                    onChange={handleInputChange}
                                    className="combo-input"
                                    placeholder="Nombre"
                                />
                                <textarea
                                    name="descripcion"
                                    value={editedCombo.descripcion}
                                    onChange={handleInputChange}
                                    className="combo-textarea"
                                    placeholder="Descripción"
                                />
                                <input
                                    type="number"
                                    name="precio"
                                    value={editedCombo.precio}
                                    onChange={handleInputChange}
                                    className="combo-input"
                                    placeholder="Precio"
                                />
                            </>
                        ) : (
                            <>
                                <h3>{combo.nombre}</h3>
                                <p>{combo.descripcion}</p>
                                <p>Precio: {combo.precio}</p>
                            </>
                        )}
                    </div>
                    <div className="actions">
                        {currentUser && currentUser.rol === 'admin' ? (
                            editingCombo === combo.id ? (
                                <>
                                    <button onClick={() => saveEdit(combo.id)}>Guardar</button>
                                    <button onClick={() => setEditingCombo(null)}>Cancelar</button>
                                </>
                            ) : (
                                <>
                                    <button onClick={() => handleEdit(combo)}>Editar</button>
                                    <button className="delete-button" onClick={() => deleteCombo(combo.id)}>Eliminar</button>
                                </>
                            )
                        ) : (
                            <button onClick={() => console.log('Reservar combo', combo.id)}>Reservar</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListaCombos;
