
import React, { useState, useEffect } from 'react';
import '../styles/OrdenTrabajo.css';
import {supabase}  from '../supabaseClient';
import {Form} from 'react-bootstrap';


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
        telefono: '',
        valor: '',
        marca: '',
        servicios: [],
        comentarios: '',
        fechaRecibida: '',
        horaRecibida: '',
        recibidaPor: ''
    });


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        if (name === 'telefono') {
            // Regular expression to validate phone number: starts with 3, 9, or 8 and contains only numbers
            const validPattern = /^[398]\d*$/;
            
            // If the value matches the pattern or is empty (allow clearing the input), update the state
            if (value === '' || validPattern.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        }else if (name === 'valor') {
            const validPattern = /^[0-9]*$/;
            
            if (validPattern.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
            
        } else if (type === 'checkbox') {
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

    const [setOrdenes] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const fechaActual = new Date().toISOString().split('T')[0];
        const horaActual = new Date().toLocaleTimeString('en-US', { hour12: false });

        try {
            // Buscar el cli_id del cliente basado en el nombre ingresado
            const { data: clienteData, error: clienteError } = await supabase
                .from('clientes')
                .select('id')
                .eq('nombre', formData.cliente)
                .single();

            if (clienteError || !clienteData) {
                throw new Error('Cliente no encontrado');
            }

            const cli_id = clienteData.id;

            // Insertar la orden de trabajo con el cli_id del cliente
            const { error } = await supabase
                .from('ordentrabajo')
                .insert([
                    {
                        cli_id:cli_id, // Usar cli_id en lugar del nombre del cliente
                        autorizado: currentUser.nombre,
                        telefono: formData.telefono,
                        valor: formData.valor,
                        marca: formData.marca,
                        servicios: formData.servicios,
                        comentarios: formData.comentarios,
                        fecha: fechaActual,
                        hora: horaActual,
                        recibidaPor: currentUser.nombre,
                    },
                ])
                .select();

            if (error) {
                console.error('Error inserting data:', error);
            } else {
                setOrdenes((prevOrdenes) => [...prevOrdenes, formData]);
                alert('Orden de trabajo creada con éxito');
                setFormData({
                    cliente: '',
                    telefono: '',
                    valor: '',
                    marca: '',
                    servicios: [],
                    comentarios: '',
                });
            }
        } catch (error) {
            console.error('Error en la creación de la orden de trabajo:', error);
        }
    };
    
    

    return (
        <div id="form-container">
            <form id="order-form" onSubmit={handleSubmit}>
           <h2>Crear Orden de Trabajo</h2>
                <div className="firstFormGroup">
                    <Form.Group className="unDatoForm">
                    <Form.Label htmlFor="cliente">Nombre del Cliente:</Form.Label>
                    <Form.Control
                        type="text"
                        id="cliente"
                        name="cliente"
                        value={formData.cliente}
                        onChange={handleChange}
                        required
                    />
                    </Form.Group>

                    <Form.Group className="unDatoForm">
                    <Form.Label htmlFor="telefono">Teléfono:</Form.Label>
                    <Form.Control
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        pattern="\d{8}"
                        maxLength="8"
                        required
                    />
                    </Form.Group>
                </div>

                <div className="firstFormGroup">
                    <Form.Group className="unDatoForm">
                    <Form.Label htmlFor="marca">Marca de la Bicicleta:</Form.Label>
                    <Form.Control
                        type="text"
                        id="marca"
                        name="marca"
                        value={formData.marca}
                        onChange={handleChange}
                        required
                    />
                    </Form.Group>

                    <Form.Group className="unDatoForm">
                    <Form.Label htmlFor="valor">Valor a Cancelar:</Form.Label>
                    <Form.Control
                        type="number"
                        id="valor"
                        name="valor"
                        value={formData.valor}
                        onChange={handleChange}
                        min={0}
                        required
                        step={1}
                    />
                    </Form.Group>
                </div>

                <h3>Servicios a realizar</h3>
                <div className="serviciosComunes">
                    <h4>Servicios Comunes</h4>
                    <div className="servComun-checkboxes">
                        <label><input type="checkbox" name="servicios" value="combo-1" checked={formData.servicios.includes('combo-1')} onChange={handleChange} /> Combo #1</label>
                        <label><input type="checkbox" name="servicios" value="combo-2" checked={formData.servicios.includes('combo-2')} onChange={handleChange} /> Combo #2</label>
                        <label><input type="checkbox" name="servicios" value="combo-3" checked={formData.servicios.includes('combo-3')} onChange={handleChange} /> Combo #3</label>
                        <label><input type="checkbox" name="servicios" value="combo-1-ebike" checked={formData.servicios.includes('combo-1-ebike')} onChange={handleChange} /> Combo #1 EBIKE</label>
                        <label><input type="checkbox" name="servicios" value="combo-2-ebike" checked={formData.servicios.includes('combo-2-ebike')} onChange={handleChange} /> Combo #2 EBIKE</label>
                        <label><input type="checkbox" name="servicios" value="combo-3-ebike" checked={formData.servicios.includes('combo-3-ebike')} onChange={handleChange} /> Combo #3 EBIKE</label>
                    </div>
                </div>
                <div className="otrosServs">
                    <h4>Otros Servicios</h4>
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
                        <label><input type="checkbox" name="servicios" value="desenrayado-rin" checked={formData.servicios.includes('desenrayado-rin')} onChange={handleChange} /> Desenrayado rin</label>
                        <label><input type="checkbox" name="servicios" value="inst-sistema-tubeless" checked={formData.servicios.includes('inst-sistema-tubeless')} onChange={handleChange} /> Instalación sistema tubeless</label>
                        <label><input type="checkbox" name="servicios" value="inst-bote-liquido" checked={formData.servicios.includes('inst-bote-liquido')} onChange={handleChange} /> Instalación 1 bote líquido</label>
                        <label><input type="checkbox" name="servicios" value="inst-dropper" checked={formData.servicios.includes('inst-dropper')} onChange={handleChange} /> Instalación dropper</label>
                        <label><input type="checkbox" name="servicios" value="inst-masa-trasera" checked={formData.servicios.includes('inst-masa-trasera')} onChange={handleChange} /> Instalación masa trasera</label>
                        <label><input type="checkbox" name="servicios" value="inst-cambiador" checked={formData.servicios.includes('inst-cambiador')} onChange={handleChange} /> Instalación cambiador</label>
                        <label><input type="checkbox" name="servicios" value="inst-cadena" checked={formData.servicios.includes('inst-cadena')} onChange={handleChange} /> Instalación cadena</label>
                        <label><input type="checkbox" name="servicios" value="inst-cassette" checked={formData.servicios.includes('inst-cassette')} onChange={handleChange} /> Instalación cassette</label>
                        <label><input type="checkbox" name="servicios" value="inst-crank" checked={formData.servicios.includes('inst-crank')} onChange={handleChange} /> Instalación crank</label>
                        <label><input type="checkbox" name="servicios" value="inst-traccion" checked={formData.servicios.includes('inst-traccion')} onChange={handleChange} /> Instalación tracción</label>
                    </div>
                </div> 


                <label htmlFor="comentarios">Comentarios:</label>
                <textarea id="comentarios" name="comentarios" value={formData.comentarios} onChange={handleChange}></textarea>

                <button type="submit">Enviar</button>
            </form>
            
        </div>
        
        
    );
}

export default OrdenTrabajo;
