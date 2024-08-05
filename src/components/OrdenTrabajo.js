
import React, { useState, useEffect } from 'react';
import '../styles/OrdenTrabajo.css';
import {supabase}  from '../supabaseClient';

function OrdenTrabajo() {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (storedUser) {
            setCurrentUser(storedUser);
        }
    }, []);

    const [formData, setFormData] = useState({
        cliente: '',
        //personaAutorizada:  currentUser ? currentUser.nombre : '',
        telefono: '',
        /*hora: '',
        fecha: '',*/
        valor: '',
        marca: '',
        servicios: [],
        comentarios: '',
        propietario: '',
        fechaRecibida: '',
        horaRecibida: '',
        recibidaPor: ''
    });

    

    /*useEffect(() => {
        if (currentUser) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                personaAutorizada: currentUser.nombre
            }));
        }
    }, [currentUser]);*/


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData((prevData) => {
                if (checked) {
                    return { ...prevData, servicios: [...prevData.servicios, value] };
                } else {
                    return { ...prevData, servicios: prevData.servicios.filter((servicio) => servicio !== value) };
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const [ordenes, setOrdenes] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase
            .from('ordentrabajo')
            .insert([
                {
                    cliente: formData.cliente,
                    autorizado: currentUser.nombre,
                    telefono: formData.telefono,
                    //hora: formData.hora,
                    //fecha: formData.fecha,
                    valor: formData.valor,
                    marca: formData.marca,
                    servicios: formData.servicios,
                    comentarios: formData.comentarios,
                    propietario: formData.propietario,
                    fechaRec: formData.fechaRecibida,
                    horaRec: formData.horaRecibida,
                    recibidaPor: formData.recibidaPor
                }

            ])
            .select();
        
        if (error) {
            console.error('Error inserting data:', error);
        } else {
            
            setOrdenes(prevOrdenes => [...prevOrdenes, formData]);
            setFormData({
                cliente: '',
                telefono: '',
               /* hora: '',
                fecha: '',*/
                valor: '',
                marca: '',
                servicios: [],
                comentarios: '',
                propietario: '',
                fechaRecibida: '',
                horaRecibida: '',
                recibidaPor: ''
            });
        }
    };
    
    

    return (
        <div id="form-container">
            <form id="order-form" onSubmit={handleSubmit}>
                <h2>Orden de Trabajo</h2>
                <label htmlFor="cliente">Nombre del Cliente:</label>
                <input type="text" id="cliente" name="cliente" value={formData.cliente} onChange={handleChange} required />
                
                
                

                <label htmlFor="telefono">Teléfono:</label>
                <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} required />

                

                <label htmlFor="valor">Valor a Cancelar:</label>
                <input type="number" id="valor" name="valor" value={formData.valor} onChange={handleChange} required />

                <label htmlFor="marca">Marca de la Bicicleta:</label>
                <input type="text" id="marca" name="marca" value={formData.marca} onChange={handleChange} required />

                <h3>Servicios a realizar</h3>
                <div className="checkbox-group"> 
                <label><input type="checkbox" name="servicios" value="mant-cambios" checked={formData.servicios.includes('mant-cambios')} onChange={handleChange} /> Mant. de dos cambios</label>
                <label><input type="checkbox" name="servicios" value="mant-frenos" checked={formData.servicios.includes('mant-frenos')} onChange={handleChange} /> Mant. de dos frenos hidráulicos</label>
                <label><input type="checkbox" name="servicios" value="mant-bottom" checked={formData.servicios.includes('mant-bottom')} onChange={handleChange} /> Mant. de bottom</label>
                <label><input type="checkbox" name="servicios" value="mant-direccion" checked={formData.servicios.includes('mant-direccion')} onChange={handleChange} /> Mant. de dirección</label>             
                <label><input type="checkbox" name="servicios" value="mant-masa-delantera" checked={formData.servicios.includes('mant-masa-delantera')} onChange={handleChange} /> Mant. de masa delantera</label>
                <label><input type="checkbox" name="servicios" value="mant-masa-trasera" checked={formData.servicios.includes('mant-masa-trasera')} onChange={handleChange} /> Mant. de masa trasera</label>
                <label><input type="checkbox" name="servicios" value="mant-barras" checked={formData.servicios.includes('mant-barras')} onChange={handleChange} /> Mant. de barras de 150mm en delante</label>
                <label><input type="checkbox" name="servicios" value="inst-llanta-uno" checked={formData.servicios.includes('inst-llanta-uno')} onChange={handleChange} /> Inst. de una llanta o tubo</label>
                <label><input type="checkbox" name="servicios" value="inst-llanta-dos" checked={formData.servicios.includes('inst-llanta-dos')} onChange={handleChange} /> Inst. de dos llantas o tubos</label>
                <label><input type="checkbox" name="servicios" value="inst-asiento" checked={formData.servicios.includes('inst-asiento')} onChange={handleChange} /> Inst. de asiento</label>
                <label><input type="checkbox" name="servicios" value="inst-pedales" checked={formData.servicios.includes('inst-pedales')} onChange={handleChange} /> Inst. de pedales</label>
                <label><input type="checkbox" name="servicios" value="inst-grips" checked={formData.servicios.includes('inst-grips')} onChange={handleChange} /> Inst. de grips</label>
                <label><input type="checkbox" name="servicios" value="inst-stem" checked={formData.servicios.includes('inst-stem')} onChange={handleChange} /> Inst. de stem</label>
                <label><input type="checkbox" name="servicios" value="inst-cinta-timon" checked={formData.servicios.includes('inst-cinta-timon')} onChange={handleChange} /> Inst. de cinta timon ruta</label>
                <label><input type="checkbox" name="servicios" value="inst-timon" checked={formData.servicios.includes('inst-timon')} onChange={handleChange} /> Inst. de timon ruta o mtb</label>
                <label><input type="checkbox" name="servicios" value="reparacion-bloqueo" checked={formData.servicios.includes('reparacion-bloqueo')} onChange={handleChange} /> Reparación bloqueo de susp.</label>
                <label><input type="checkbox" name="servicios" value="enderezado-rin-leve" checked={formData.servicios.includes('enderezado-rin-leve')} onChange={handleChange} /> Enderezado de un rin daño leve</label>
                <label><input type="checkbox" name="servicios" value="enderezado-rin-grande" checked={formData.servicios.includes('enderezado-rin-grande')} onChange={handleChange} /> Enderezado de un rin daño grande</label>          
                <label><input type="checkbox" name="servicios" value="enderezado-patilla" checked={formData.servicios.includes('enderezado-patilla')} onChange={handleChange} /> Enderezado de patilla de cambiador</label>
                <label><input type="checkbox" name="servicios" value="enrayado-rin" checked={formData.servicios.includes('enrayado-rin')} onChange={handleChange} /> Enrayado de un rin</label>
                <label><input type="checkbox" name="servicios" value="cambio-rayo" checked={formData.servicios.includes('cambio-rayo')} onChange={handleChange} /> Cambio de rayo de rin</label>
                <label><input type="checkbox" name="servicios" value="ensamble-bicicleta" checked={formData.servicios.includes('ensamble-bicicleta')} onChange={handleChange} /> Ensamble de bicicleta</label>
                <label><input type="checkbox" name="servicios" value="limpieza" checked={formData.servicios.includes('limpieza')} onChange={handleChange} /> Limpieza</label>
                <label><input type="checkbox" name="servicios" value="ajustes-varios" checked={formData.servicios.includes('ajustes-varios')} onChange={handleChange} /> Ajustes varios</label>
                <label><input type="checkbox" name="servicios" value="purgado-freno" checked={formData.servicios.includes('purgado-freno')} onChange={handleChange} /> Purgado de un freno hidráulico</label>
                <label><input type="checkbox" name="servicios" value="combo-1" checked={formData.servicios.includes('combo-1')} onChange={handleChange} /> Combo #1</label>
                <label><input type="checkbox" name="servicios" value="combo-2" checked={formData.servicios.includes('combo-2')} onChange={handleChange} /> Combo #2</label>
                <label><input type="checkbox" name="servicios" value="combo-3" checked={formData.servicios.includes('combo-3')} onChange={handleChange} /> Combo #3</label>
                <label><input type="checkbox" name="servicios" value="desenrayado-rin" checked={formData.servicios.includes('desenrayado-rin')} onChange={handleChange} /> Desenrayado rin</label>
                <label><input type="checkbox" name="servicios" value="inst-sistema-tubeless" checked={formData.servicios.includes('inst-sistema-tubeless')} onChange={handleChange} /> Instalación sistema tubeless</label>
                <label><input type="checkbox" name="servicios" value="inst-bote-liquido" checked={formData.servicios.includes('inst-bote-liquido')} onChange={handleChange} /> Instalación 1 bote líquido</label>
                <label><input type="checkbox" name="servicios" value="inst-dropper" checked={formData.servicios.includes('inst-dropper')} onChange={handleChange} /> Instalación dropper</label>
                <label><input type="checkbox" name="servicios" value="inst-masa-trasera" checked={formData.servicios.includes('inst-masa-trasera')} onChange={handleChange} /> Instalación masa trasera</label>
                <label><input type="checkbox" name="servicios" value="inst-cambiador" checked={formData.servicios.includes('inst-cambiador')} onChange={handleChange} /> Instalación cambiador</label>
                <label><input type="checkbox" name="servicios" value="inst-cadena" checked={formData.servicios.includes('inst-cadena')} onChange={handleChange} /> Instalación cadena</label>
                <label><input type="checkbox" name="servicios" value="inst-cassette" checked={formData.servicios.includes('inst-cassette')} onChange={handleChange} /> Instalación cassette</label>
                <label><input type="checkbox" name="servicios" value="combo-1-ebike" checked={formData.servicios.includes('combo-1-ebike')} onChange={handleChange} /> Combo #1 EBIKE</label>
                <label><input type="checkbox" name="servicios" value="combo-2-ebike" checked={formData.servicios.includes('combo-2-ebike')} onChange={handleChange} /> Combo #2 EBIKE</label>
                <label><input type="checkbox" name="servicios" value="combo-3-ebike" checked={formData.servicios.includes('combo-3-ebike')} onChange={handleChange} /> Combo #3 EBIKE</label>
                <label><input type="checkbox" name="servicios" value="inst-crank" checked={formData.servicios.includes('inst-crank')} onChange={handleChange} /> Instalación crank</label>
                <label><input type="checkbox" name="servicios" value="inst-traccion" checked={formData.servicios.includes('inst-traccion')} onChange={handleChange} /> Instalación tracción</label>
                </div>
                 
                <label htmlFor="comentarios">Comentarios:</label>
                <textarea id="comentarios" name="comentarios" value={formData.comentarios} onChange={handleChange}></textarea>

                <label htmlFor="propietario">Propietario de la Bicicleta:</label>
                <input type="text" id="propietario" name="propietario" value={formData.propietario} onChange={handleChange} required />

                <label htmlFor="fechaRecibida">Fecha Recibida:</label>
                <input type="date" id="fechaRecibida" name="fechaRecibida" value={formData.fechaRecibida} onChange={handleChange} required />

                <label htmlFor="horaRecibida">Hora Recibida:</label>
                <input type="time" id="horaRecibida" name="horaRecibida" value={formData.horaRecibida} onChange={handleChange} required />

                <label htmlFor="recibidaPor">Recibida Por:</label>
                <input type="text" id="recibidaPor" name="recibidaPor" value={formData.recibidaPor} onChange={handleChange} required />

                <button type="submit">Enviar</button>
            </form>
            
        </div>
        
        
    );
}

export default OrdenTrabajo;
