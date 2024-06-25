// GestionCombos.js
import React, { useState, useEffect } from 'react';
import '../styles/gestionCombos.css'; // Importa el archivo CSS

const GestionCombos = ({ setSuccessMessage }) => {
    const [combos, setCombos] = useState([]);
    const [newCombo, setNewCombo] = useState({ nombre: '', descripcion: '', precio: '' });

    useEffect(() => {
        fetchCombos();
    }, []);

    const fetchCombos = () => {
        const storedCombos = JSON.parse(localStorage.getItem('combos')) || [];
        setCombos(storedCombos);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCombo({ ...newCombo, [name]: value });
    };

    const createCombo = () => {
        const newComboList = [...combos, { ...newCombo, id: Date.now() }];
        setCombos(newComboList);
        localStorage.setItem('combos', JSON.stringify(newComboList));
        setNewCombo({ nombre: '', descripcion: '', precio: '' });
        setSuccessMessage('Combo creado exitosamente.');
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

   /* const deleteCombo = (id) => {
        const updatedCombos = combos.filter(combo => combo.id !== id);
        setCombos(updatedCombos);
        localStorage.setItem('combos', JSON.stringify(updatedCombos));
        setSuccessMessage('Combo eliminado exitosamente.');
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };*/

    return (
        <div className="gestion-combos">
            <h3>Crear Nuevo Combo</h3>
            <div className="form-group">
                <label htmlFor="nombre">Nombre del Combo</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre del Combo"
                    value={newCombo.nombre}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="descripcion">Descripción del Combo</label>
                <textarea
                    id="descripcion"
                    name="descripcion"
                    placeholder="Descripción del Combo"
                    value={newCombo.descripcion}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="precio">Precio</label>
                <input
                    type="number"
                    id="precio"
                    name="precio"
                    placeholder="Precio del Combo"
                    value={newCombo.precio}
                    onChange={handleInputChange}
                />
            </div>
            <button onClick={createCombo}>Crear Combo</button>
        </div>
    );
};

export default GestionCombos;
