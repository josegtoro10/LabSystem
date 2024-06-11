import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import usePaciente from "../../hooks/PacienteId";
import Swal from 'sweetalert2'

const FormAddMuestras = () => {
  const [tipo, setTipo] = useState('');
  const [examen, setExamen] = useState('');
  const [opcionesExamen, setOpcionesExamen] = useState([]);
  const [fechaRecepcion, setFechaRecepcion] = useState("");
  const [paciente, setPaciente] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const opcionesPorSeleccion = {
    Sangre: ['Hematología', 'Serología del VIH'],
    Orina: ['Examen de Orina'],
    Heces: ['Examen de Heces'],
  };


  const { pacienteId } = usePaciente();

  const handleSelect1Change = (event) => {
    const seleccion = event.target.value;
    setTipo(seleccion);
    setExamen('');
    setOpcionesExamen(opcionesPorSeleccion[seleccion] || []);
  };

  const handleSelect2Change = (event) => {
    setExamen(event.target.value);
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterOptions = () => {
    const filteredOptions = pacienteId.filter((pacienteId) =>
      pacienteId.cedula.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filteredOptions;
  };


  const saveMuestras = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/muestras", {
        tipo: tipo,
        examen: examen,
        fechaRecepcion: fechaRecepcion,
        pacienteId: paciente,
      });
      navigate("/muestras");
      Swal.fire({
        title: "Muestra Agregada Exitosamente",
        icon: "success"
      });
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: "error",
          title: "¡Error!",
          text: "Verifica los campos e intenta nuevamente!",
        });
        console.error(error.response)
      }
    }
  };


  return (
    <div className="container has-background-link">
      <Link to="/muestras" style={{ margin: '8px' }} className="button is-white mb-2">
        <IoArrowBackOutline style={{ fontSize: '30px' }} />
      </Link>
      <section className="hero">
        <div className="hero-body">
          <div className="box">
            <h1 className="title">Muestras</h1>
            <h2 className="subtitle">Agregar Nueva Muestra</h2>
            <form onSubmit={saveMuestras}>
              <div className="field-body">
                <div className="field">
                  <label className="label">Buscar Paciente por N° Cedula</label>
                  <div className="control">
                    <input
                      className="input"
                      type="number"
                      value={searchTerm}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Paciente</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select onChange={(e) => setPaciente(e.target.value)} name="pacienteId">
                        <option value="">Seleccione el paciente que se le procesara la muestra:</option>
                        {filterOptions().map((pacienteId) => (
                          <option key={pacienteId.id} value={pacienteId.id}>
                            Nombre del Paciente: {pacienteId.nombre} {pacienteId.apellido} cedula: {pacienteId.cedula}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field-body">
              <div className="field">
                  <label className="label">Tipo</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select value={tipo} onChange={handleSelect1Change}>
                        <option value="">Seleccione el tipo de muestra a procesar:</option>
                        <option value="Sangre">Sangre</option>
                        <option value="Orina">Orina</option>
                        <option value="Heces">Heces</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Examen</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select value={examen} onChange={handleSelect2Change} disabled={!tipo}>
                        <option value="">Seleccione el tipo de examen a procesar</option>
                        {opcionesExamen.map((opcion) => (
                          <option key={opcion} value={opcion}>
                            {opcion}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label">Fecha Recepcion</label>
                <div className="control">
                  <input
                    type="date"
                    className="input"
                    value={fechaRecepcion}
                    onChange={(e) => setFechaRecepcion(e.target.value)}
                    placeholder="Fecha en que se recibio la muestra"
                  />
                </div>
              </div><br />

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-danger">
                    Agregar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FormAddMuestras;
