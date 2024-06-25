// EditarBiciPopup.js
import React, { useState } from 'react';
import '../styles/editarBiciPopup.css';
import { supabase } from '../supabaseClient';

const EditarBiciPopup = ({ bici, closePopup, actualizarBici }) => {
    const [formValues, setFormValues] = useState({
        modelo: bici.modelo || '',
        nombre: bici.nombre || '',
        marco: bici.marco || '',
        amor: bici.amor || '',
        horquilla: bici.horquilla || '',
        cambiador: bici.cambiador || '',
        maneta: bici.maneta || '',
        brackett: bici.brackett || '',
        casette: bici.casette || '',
        cadena: bici.cadena || '',
        crank: bici.crank || '',
        frenos: bici.frenos || '',
        ruedas: bici.ruedas || '',
        llantas: bici.llantas || '',
        eje: bici.eje || '',
        stem: bici.stem || '',
        timon: bici.timon || '',
        asiento: bici.asiento || '',
        dropper: bici.dropper || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase
            .from('bicicli')
            .update(formValues)
            .eq('id', bici.id);

        if (error) {
            console.error('Error updating bicicleta:', error);
        } else {
            actualizarBici({ ...bici, ...formValues });
            closePopup();
        }
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>Editar Bicicleta</h2>
                <form onSubmit={handleSubmit} className="form-scrollable">
                    <div className="formGroup">
                        <label>Modelo:</label>
                        <input
                            type="text"
                            name="modelo"
                            value={formValues.modelo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formValues.nombre}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Marco:</label>
                        <textarea
                            name="marco"
                            value={formValues.marco}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Amortiguador trasero:</label>
                        <textarea
                            name="amor"
                            value={formValues.amor}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Horquilla delantera:</label>
                        <textarea
                            name="horquilla"
                            value={formValues.horquilla}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Cambiador:</label>
                        <textarea
                            name="cambiador"
                            value={formValues.cambiador}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Maneta de cambiador:</label>
                        <textarea
                            name="maneta"
                            value={formValues.maneta}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Bottom bracket:</label>
                        <textarea
                            name="brackett"
                            value={formValues.brackett}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Cassette:</label>
                        <textarea
                            name="casette"
                            value={formValues.casette}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Cadena:</label>
                        <textarea
                            name="cadena"
                            value={formValues.cadena}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Crank:</label>
                        <textarea
                            name="crank"
                            value={formValues.crank}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Frenos:</label>
                        <textarea
                            name="frenos"
                            value={formValues.frenos}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Ruedas:</label>
                        <textarea
                            name="ruedas"
                            value={formValues.ruedas}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Llantas:</label>
                        <textarea
                            name="llantas"
                            value={formValues.llantas}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Eje pasante:</label>
                        <textarea
                            name="eje"
                            value={formValues.eje}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Stem:</label>
                        <textarea
                            name="stem"
                            value={formValues.stem}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Timón:</label>
                        <textarea
                            name="timon"
                            value={formValues.timon}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Asiento:</label>
                        <textarea
                            name="asiento"
                            value={formValues.asiento}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="formGroup">
                        <label>Dropper asiento:</label>
                        <textarea
                            name="dropper"
                            value={formValues.dropper}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Guardar Cambios</button>
                    <button type="button" onClick={closePopup}>Cancelar</button>
                </form>
            </div>
        </div>
    );
};

export default EditarBiciPopup;
