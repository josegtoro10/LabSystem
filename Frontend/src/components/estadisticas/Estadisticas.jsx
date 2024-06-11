import React, { useState, useEffect } from "react";
import salud2 from "../../styles/images/salud2.png"
import usePaciente from "../../hooks/PacienteId";
import useMuestra from "../../hooks/MuestraId";


const PacientesAtendidos = () => {
  const [rangoEdadSeleccionado, setRangoEdadSeleccionado] = useState('');
  const [sexoSeleccionado, setSexoSeleccionado] = useState('');
  const [datosMapeados, setDatosMapeados] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [sizePagina, setSizePagina] = useState(10);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const inicio = (paginaActual - 1) * sizePagina;
  const fin = inicio + sizePagina;
  const datosPaginados = datosMapeados.slice(inicio, fin);

  const { pacienteId } = usePaciente();

  const { muestraId } = useMuestra();
  
  const handlePageChange = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
  };

  const handlePageSizeChange = (event) => {
    setSizePagina(parseInt(event.target.value));
  };

  const mapearDatos = (muestraId, pacienteId) => {
    const pacientesMapeados = [];

    muestraId.forEach((muestra, index) => {
      const pacienteDelMuestra = pacienteId.find(
        (paciente) => paciente.id === muestra.pacienteId
      );

      if (pacienteDelMuestra) {
        const pacienteMapeado = {
          ...pacienteDelMuestra,
          fechasAtencion: muestra.fechaRecepcion,
        };
        pacientesMapeados.push({ ...pacienteMapeado, key: index });
      }
    });

    return pacientesMapeados;
  };


  useEffect(() => {
    const datosConFechas = mapearDatos(muestraId, pacienteId);
    setDatosMapeados(datosConFechas);
  }, [muestraId, pacienteId]);

  const filterOptions = () => {
    let filteredData = datosPaginados; 

    if (fechaInicio && fechaFin) {
      filteredData = filteredData.filter(dato => {
        const fechaAtencion = new Date(dato.fechasAtencion);
        return fechaAtencion >= new Date(fechaInicio) && fechaAtencion <= new Date(fechaFin);
      });
    }
    if (sexoSeleccionado) {
      filteredData = filteredData.filter(dato => {
        return dato.sexo === sexoSeleccionado || sexoSeleccionado === '';
      });
    }
    if (rangoEdadSeleccionado) {
      filteredData = filteredData.filter(dato => {
        if (rangoEdadSeleccionado === 'infante') {
          return dato.edad >= 0 && dato.edad <= 5;
        } else if (rangoEdadSeleccionado === 'nino') {
          return dato.edad >= 6 && dato.edad <= 12;
        } else if (rangoEdadSeleccionado === 'adolescente') {
          return dato.edad >= 13 && dato.edad <= 19;
        } else if (rangoEdadSeleccionado === 'adulto') {
          return dato.edad >= 20 && dato.edad <= 60;
        } else if (rangoEdadSeleccionado === 'adultoMayor') {
          return dato.edad >= 61;
        } else {
          return true;
        }
      });
    }
    return filteredData;
  };
  
  const handleClearDates = () => {
    setFechaInicio('');
    setFechaFin('');
    setSexoSeleccionado('');
    setRangoEdadSeleccionado('');
  };

  return (
    <div className="container">
      <p className="subtitle is-6 is-pulled-right">HOSPITAL GENERAL
        <br />
        "DR ISRAEL RANUAREZ BALZA"
        <br />
        San Juan de los Morros, Edo.Guárico</p>
      <img src={salud2} width="150" alt="salud2" />
      <h1 className="title">Estadísticas</h1>
      <h2 className="subtitle">Pacientes Atendidos</h2>
      <div className="field">
        <button className="button is-danger" onClick={handleClearDates}>Limpiar Filtros</button>
      </div>
      <div className="field-body">
        <div className="field">
          <div className="control">
            <div className="select is-multiple">
              <label className="label">Sexo:</label>
              <select value={sexoSeleccionado} onChange={(e) => setSexoSeleccionado(e.target.value)}>
                <option value="">Todos</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <div className="select is-multiple">
              <label className="label">Edad:</label>
              <select value={rangoEdadSeleccionado} onChange={(event) => setRangoEdadSeleccionado(event.target.value)}>
                <option value="">Todos</option>
                <option value="infante">Infante (0-5 años)</option>
                <option value="niño">Niño (6-12 años)</option>
                <option value="adolescente">Adolescente (13-19 años)</option>
                <option value="adulto">Adulto (20-60 años)</option>
                <option value="adultoMayor">Adulto Mayor (60 años en adelante)</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Fecha Inicio:</label>
          <input
            className="input"
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            style={{ width: '200px', height: '35px' }}
          />
        </div>
        <div className="field">
          <label className="label">Fecha Fin:</label>
          <input
            className="input"
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            style={{ width: '200px', height: '35px' }}
          />
        </div>
      </div>
      <table className="table is-narrow is-fullwidth">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Cedula</th>
            <th>Edad</th>
            <th>Sexo</th>
            <th>Fecha de Atención</th>
          </tr>
        </thead>
        <tbody>
          {filterOptions().map((dato, index) => (
            <tr key={dato + index}>
              <td>{dato.nombre}</td>
              <td>{dato.apellido}</td>
              <td>{dato.cedula}</td>
              <td>{dato.edad}</td>
              <td>{dato.sexo}</td>
              <td>{dato.fechasAtencion}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="button is-link" onClick={() => handlePageChange(paginaActual - 1)} disabled={paginaActual === 1}>
          Anterior
        </button>
        {[...Array(Math.ceil(datosMapeados.length / sizePagina))].map((_, i) => (
          <button key={i + 1} onClick={() => handlePageChange(i + 1)} className={i + 1 === paginaActual ? 'active button' : 'button'}>
            {i + 1}
          </button>
        ))}
        <button className="button is-link" onClick={() => handlePageChange(paginaActual + 1)} disabled={paginaActual === Math.ceil(datosMapeados.length / sizePagina)}>
          Siguiente
        </button>
      </div><br />
      <div className="field">
        <div className="select is-multiple">
          <select value={sizePagina} onChange={handlePageSizeChange}>
            <option value="10000000">Todos</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PacientesAtendidos;


