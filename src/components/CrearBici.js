import React from 'react';
import '../styles/crearBici.css';
import {supabase} from '../supabaseClient'; // Adjust the path based on your file structure

function CrearBicis() {
  const submitCrearBici = async (e) => {
    e.preventDefault();

    // Gather form data
    const modeloBici = document.getElementById('modeloBici').value;
    const nombreBici = document.getElementById('nombreBici').value;
    const marcoBici = document.getElementById('marcoBici').value;
    const amortiguadorBici = document.getElementById('amortiguadorBici').value;
    const horquillaBici = document.getElementById('horquillaBici').value;
    const cambiadorBici = document.getElementById('cambiadorBici').value;
    const manetadeCambioBici = document.getElementById('manetadeCambioBici').value;
    const bottomBracketBici = document.getElementById('bottomBracketBici').value;
    const cassetteBici = document.getElementById('cassetteBici').value;
    const cadenaBici = document.getElementById('cadenaBici').value;
    const cranckBici = document.getElementById('cranckBici').value;
    const frenosBici = document.getElementById('frenosBici').value;
    const ruedasBici = document.getElementById('ruedasBici').value;
    const llantasBici = document.getElementById('llantasBici').value;
    const ejePasanteBici = document.getElementById('ejePasanteBici').value;
    const stemBici = document.getElementById('stemBici').value;
    const timonBici = document.getElementById('timonBici').value;
    const asientoBici = document.getElementById('asientoBici').value;
    const dropperAsientoBici = document.getElementById('dropperAsientoBici').value;

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('bicicli')
      .insert([
        {
          modelo: modeloBici,
          nombre: nombreBici,
          marco: marcoBici,
          amor: amortiguadorBici,
          horquilla: horquillaBici,
          cambiador: cambiadorBici,
          maneta: manetadeCambioBici,
          brackett: bottomBracketBici,
          cassette: cassetteBici,
          cadena: cadenaBici,
          crank: cranckBici,
          frenos: frenosBici,
          ruedas: ruedasBici,
          llantas: llantasBici,
          eje: ejePasanteBici,
          stem: stemBici,
          timon: timonBici,
          asiento: asientoBici,
          dropper: dropperAsientoBici,
        },
      ]);

    if (error) {
      console.error('Error inserting data: ', error);
    } else {
      console.log('Data inserted successfully: ', data);
    }

    // Clear form inputs
    document.getElementById('modeloBici').value = '';
    document.getElementById('nombreBici').value = '';
    document.getElementById('marcoBici').value = '';
    document.getElementById('amortiguadorBici').value = '';
    document.getElementById('horquillaBici').value = '';
    document.getElementById('cambiadorBici').value = '';
    document.getElementById('manetadeCambioBici').value = '';
    document.getElementById('bottomBracketBici').value = '';
    document.getElementById('cassetteBici').value = '';
    document.getElementById('cadenaBici').value = '';
    document.getElementById('cranckBici').value = '';
    document.getElementById('frenosBici').value = '';
    document.getElementById('ruedasBici').value = '';
    document.getElementById('llantasBici').value = '';
    document.getElementById('ejePasanteBici').value = '';
    document.getElementById('stemBici').value = '';
    document.getElementById('timonBici').value = '';
    document.getElementById('asientoBici').value = '';
    document.getElementById('dropperAsientoBici').value = '';
  };

  return (
    <div className="mainCrearBici">
      <h1>Crear bicicleta</h1>
      <form onSubmit={submitCrearBici}>
        <div className="formGroup">
          <h4 className="titulo-SubGrupoBici">Info Principal </h4>
          <div className="unaPreg1">
            <label className='unLabel'>Modelo: </label>
            <input type="text" id='modeloBici' className='unInput' placeholder='Ingrese modelo...' />
          </div>
          <div className="unaPreg1">
            <label className='unLabel'>Nombre:</label>
            <input type="text" id='nombreBici' className='unInput' placeholder='Ingrese nombre...' />
          </div>
        </div>
        <div className="formGroup">
          <h4 className="titulo-SubGrupoBici">Cuadro Principal </h4>
          <div className="unaPreg2">
            <label>Marco:</label>
            <textarea type="text" id='marcoBici' placeholder='Ingrese todo sobre el MARCO de la bici...' />
          </div>
          <div className="unaPreg2">
            <label>Amortiguador trasero:</label>
            <textarea type="text" id='amortiguadorBici' placeholder='Ingrese todo sobre el AMORTIGUADOR TRASERO de la bici...' />
          </div>
          <div className="unaPreg2">
            <label>Horquilla delantera:</label>
            <textarea type="text" id='horquillaBici' placeholder='Ingrese todo sobre el HORQUILLA DELANTERA de la bici...' />
          </div>
        </div>
        <div className="formGroup">
          <h4 className="titulo-SubGrupoBici">Transmision</h4>
          <div className="unaPreg2">
            <label>Cambiador:</label>
            <textarea type="text" id='cambiadorBici' placeholder='Ingrese todo sobre eL CAMBIADOR de la bici...' />
          </div>
          <div className="unaPreg2">
            <label>Maneta de cambiador:</label>
            <textarea type="text" id='manetadeCambioBici' placeholder='Ingrese todo sobre eL MANETA DE CAMBIADOR de la bici...' />
          </div>
          <div className="unaPreg2">
            <label>Bottom bracket:</label>
            <textarea type="text" id='bottomBracketBici' placeholder='Ingrese todo sobre eL BOTTOM BRACKET de la bici...' />
          </div>
          <div className="unaPreg2">
            <label>Cassette:</label>
            <textarea type="text" id='cassetteBici' placeholder='Ingrese todo sobre eL CASSETTE de la bici...' />
          </div>
          <div className="unaPreg2">
            <label>Cadena:</label>
            <textarea type="text" id='cadenaBici' placeholder='Ingrese todo sobre eL CADENA de la bici...' />
          </div>
          <div className="unaPreg2">
            <label>Crank:</label>
            <textarea type="text" id='cranckBici' placeholder='Ingrese todo sobre el CRANK de la bici...' />
          </div>
        </div>
        <div className="formGroup">
          <h4 className="titulo-SubGrupoBici">Frenos</h4>
          <div className="unaPreg2">
            <label>Frenos:</label>
            <textarea type="text" id='frenosBici' placeholder='Ingrese todo sobre los FRENOS de la bici...' />
          </div>
        </div>
        <div className="formGroup">
          <h4 className="titulo-SubGrupoBici">Ruedas</h4>
          <div className="unaPreg2">
            <label>Ruedas:</label>
            <textarea type="text" id='ruedasBici' placeholder='Ingrese todo sobre las RUEDAS de la bici...' />
          </div>
          <div className="unaPreg2">
            <label>Llantas:</label>
            <textarea type="text" id='llantasBici' placeholder='Ingrese todo sobre las LLANTAS de la bici...' />
          </div>
          <div className="unaPreg2">
            <label>Eje pasante:</label>
            <textarea type="text" id='ejePasanteBici' placeholder='Ingrese todo sobre el EJE PASANTE de la bici...' />
          </div>
        </div>
        <div className="formGroup">
          <h4 className="titulo-SubGrupoBici">Manubrio</h4>
          <div className="unaPreg2">
            <label>Stem:</label>
            <textarea type="text" id='stemBici' placeholder='Ingrese todo sobre el STEM de la bici...' />
          </div>
          <div className="unaPreg2">
            <label>Timon:</label>
            <textarea type="text" id='timonBici' placeholder='Ingrese todo sobre el TIMON de la bici...' />
          </div>
        </div>
        <div className="formGroup">
          <h4 className="titulo-SubGrupoBici">Asiento</h4>
          <div className="unaPreg2">
            <label>Asiento:</label>
            <textarea type="text" id='asientoBici' placeholder='Ingrese todo sobre el ASIENTO de la bici...' />
          </div>
          <div className="unaPreg2">
            <label>Dropper asiento:</label>
            <textarea type="text" id='dropperAsientoBici' placeholder='Ingrese todo sobre el DROPPER ASIENTO de la bici...' />
          </div>
        </div>
        <button type="submit" className="btnCrearBici">Crear bicicleta</button>
      </form>
    </div>
  );
}

export default CrearBicis;
