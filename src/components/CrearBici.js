// CrearBici.js
import React from 'react';
import '../styles/crearBici.css'; // Ajusta la ruta según la estructura de tu proyecto
import { supabase } from '../supabaseClient'; // Ajusta la importación según tu estructura

function CrearBicis() {
  const submitCrearBici = async (e) => {
    e.preventDefault();

    // Gather form data
    const formData = new FormData(e.target);

    const newBici = {
      modelo: formData.get('modeloBici'),
      nombre: formData.get('nombreBici'),
      marco: formData.get('marcoBici'),
      amor: formData.get('amortiguadorBici'),
      horquilla: formData.get('horquillaBici'),
      cambiador: formData.get('cambiadorBici'),
      maneta: formData.get('manetadeCambioBici'),
      brackett: formData.get('bottomBracketBici'),
      casette: formData.get('cassetteBici'),
      cadena: formData.get('cadenaBici'),
      crank: formData.get('cranckBici'),
      frenos: formData.get('frenosBici'),
      ruedas: formData.get('ruedasBici'),
      llantas: formData.get('llantasBici'),
      eje: formData.get('ejePasanteBici'),
      stem: formData.get('stemBici'),
      timon: formData.get('timonBici'),
      asiento: formData.get('asientoBici'),
      dropper: formData.get('dropperAsientoBici'),
    };

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('bicicli')
      .insert([newBici]);

    if (error) {
      console.error('Error inserting data: ', error);
    } else {
      console.log('Data inserted successfully: ', data);
      e.target.reset(); // Clear form inputs
    }
  };

  return (
    <div className="mainCrearBici">
      <h1>Crear bicicleta</h1>
      <form onSubmit={submitCrearBici}>
        <div className="formGroup">
          <h4 className="titulo-SubGrupoBici">Info Principal</h4>
          <div className="unaPreg1">
            <label className="unLabel" htmlFor="modeloBici">Modelo:</label>
            <input type="text" id="modeloBici" name="modeloBici" className="unInput" placeholder="Ingrese modelo..." />
          </div>
          <div className="unaPreg1">
            <label className="unLabel" htmlFor="nombreBici">Nombre:</label>
            <input type="text" id="nombreBici" name="nombreBici" className="unInput" placeholder="Ingrese nombre..." />
          </div>
        </div>
        <div className="formGroup">
          <h4 className="titulo-SubGrupoBici">Cuadro Principal</h4>
          <div className="unaPreg2">
            <label htmlFor="marcoBici">Marco:</label>
            <textarea id="marcoBici" name="marcoBici" placeholder="Ingrese todo sobre el MARCO de la bici..." />
          </div>
          <div className="unaPreg2">
            <label htmlFor="amortiguadorBici">Amortiguador trasero:</label>
            <textarea id="amortiguadorBici" name="amortiguadorBici" placeholder="Ingrese todo sobre el AMORTIGUADOR TRASERO de la bici..." />
          </div>
          <div className="unaPreg2">
            <label htmlFor="horquillaBici">Horquilla delantera:</label>
            <textarea id="horquillaBici" name="horquillaBici" placeholder="Ingrese todo sobre el HORQUILLA DELANTERA de la bici..." />
          </div>
        </div>
        <div className="formGroup">
          <h4 className="titulo-SubGrupoBici">Transmisión</h4>
          <div className="unaPreg2">
            <label htmlFor="cambiadorBici">Cambiador:</label>
            <textarea id="cambiadorBici" name="cambiadorBici" placeholder="Ingrese todo sobre el CAMBIADOR de la bici..." />
          </div>
          <div className="unaPreg2">
            <label htmlFor="manetadeCambioBici">Maneta de cambiador:</label>
            <textarea id="manetadeCambioBici" name="manetadeCambioBici" placeholder="Ingrese todo sobre la MANETA DE CAMBIADOR de la bici..." />
          </div>
          <div className="unaPreg2">
            <label htmlFor="bottomBracketBici">Bottom bracket:</label>
            <textarea id="bottomBracketBici" name="bottomBracketBici" placeholder="Ingrese todo sobre el BOTTOM BRACKET de la bici..." />
          </div>
          <div className="unaPreg2">
            <label htmlFor="cassetteBici">Cassette:</label>
            <textarea id="cassetteBici" name="cassetteBici" placeholder="Ingrese todo sobre el CASSETTE de la bici..." />
          </div>
          <div className="unaPreg2">
            <label htmlFor="cadenaBici">Cadena:</label>
            <textarea id="cadenaBici" name="cadenaBici" placeholder="Ingrese todo sobre la CADENA de la bici..." />
          </div>
          <div className="unaPreg2">
            <label htmlFor="cranckBici">Crank:</label>
            <textarea id="cranckBici" name="cranckBici" placeholder="Ingrese todo sobre el CRANK de la bici..." />
          </div>
        </div>
        <div className="formGroup">
          <h4 className="titulo-SubGrupoBici">Frenos</h4>
          <div className="unaPreg2">
            <label htmlFor="frenosBici">Frenos:</label>
              <textarea id="frenosBici" name="frenosBici" placeholder="Ingrese todo sobre los FRENOS de la bici..." />
          </div>
        </div>
        <div className="formGroup">
          <h4 className="titulo-SubGrupoBici">Ruedas</h4>
          <div className="unaPreg2">
            <label htmlFor="ruedasBici">Ruedas:</label>
            <textarea id="ruedasBici" name="ruedasBici" placeholder="Ingrese todo sobre las RUEDAS de la bici..." />
          </div>
          <div className="unaPreg2">
            <label htmlFor="llantasBici">Llantas:</label>
            <textarea id="llantasBici" name="llantasBici" placeholder="Ingrese todo sobre las LLANTAS de la bici..." />
          </div>
          <div className="unaPreg2">
            <label htmlFor="ejePasanteBici">Eje pasante:</label>
            <textarea id="ejePasanteBici" name="ejePasanteBici" placeholder="Ingrese todo sobre el EJE PASANTE de la bici..." />
          </div>
        </div>
        <div className="formGroup">
          <h4 className="titulo-SubGrupoBici">Manubrio</h4>
          <div className="unaPreg2">
            <label htmlFor="stemBici">Stem:</label>
            <textarea id="stemBici" name="stemBici" placeholder="Ingrese todo sobre el STEM de la bici..." />
          </div>
          <div className="unaPreg2">
            <label htmlFor="timonBici">Timón:</label>
            <textarea id="timonBici" name="timonBici" placeholder="Ingrese todo sobre el TIMÓN de la bici..." />
          </div>
        </div>
        <div className="formGroup">
          <h4 className="titulo-SubGrupoBici">Asiento</h4>
          <div className="unaPreg2">
            <label htmlFor="asientoBici">Asiento:</label>
            <textarea id="asientoBici" name="asientoBici" placeholder="Ingrese todo sobre el ASIENTO de la bici..." />
          </div>
          <div className="unaPreg2">
            <label htmlFor="dropperAsientoBici">Dropper asiento:</label>
            <textarea id="dropperAsientoBici" name="dropperAsientoBici" placeholder="Ingrese todo sobre el DROPPER ASIENTO de la bici..." />
          </div>
        </div>
        <button type="submit" className="sbmtBICI">Crear bicicleta</button>
      </form>
    </div>
  );
}

export default CrearBicis;
