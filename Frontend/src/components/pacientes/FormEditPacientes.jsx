import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoArrowBackOutline  } from "react-icons/io5";
import "../../styles/css/styles.css"
import Swal from 'sweetalert2'

const FormEditPacientes = () => {
  const [noPoseeCedula, setNoPoseeCedula] = useState(false);
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sexo, setSexo] = useState("");
  const [edad, setEdad] = useState("");
  const [direccion, setDireccion] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const onChangeCheckBox = (event) => {
    setNoPoseeCedula(event.target.checked);
    if (event.target.checked) {
      actualizarCedula("No Posee"); 
    }
  };

  const habilitaInput = () => !noPoseeCedula;

  const actualizarCedula = (nuevoValor) => {
    setCedula(nuevoValor);
  };


  useEffect(() => {
    const getPacientesById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/pacientes/${id}`
        );
        setCedula(response.data.cedula);
        setNombre(response.data.nombre);
        setApellido(response.data.apellido);
        setTelefono(response.data.telefono);
        setSexo(response.data.sexo);
        setEdad(response.data.edad);
        setDireccion(response.data.direccion);
      } catch (error) {
        if (error.response) {
          console.error(error.response)
        }
      }
    };
    getPacientesById();
  }, [id]);

  const updatePacientes = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/pacientes/${id}`, {
        cedula: cedula,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        sexo: sexo,
        edad: edad,
        direccion: direccion,
      });
      navigate("/pacientes");
      Swal.fire({
        title: "Paciente Actualizado Exitosamente",
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
    <div className="container has-background-danger">
      <Link to="/pacientes" style={{margin:'8px'}} className="button is-white mb-2">
        <IoArrowBackOutline  style={{ fontSize: '30px' }} />
      </Link>
      <section className="hero">
        <div className="hero-body">
          <div className="box">
            <h1 className="title">Pacientes</h1>
            <h2 className="subtitle">Actualizar Paciente</h2>
            <form onSubmit={updatePacientes}>
              <div className="field-body">
                <div className="field">
                  <label className="label">Cedula</label>
                  <div className="control">
                    <input
                      type="number"
                      className="input"
                      disabled={!habilitaInput()}
                      value={cedula}
                      onChange={(event) => actualizarCedula(event.target.value)}
                      placeholder="Cedula del Paciente"
                    />
                  </div>

                  <div className="field">
                    <label className="checkbox">
                      <input type="checkbox" checked={noPoseeCedula} onChange={onChangeCheckBox} />
                      No posee Cedula
                    </label>
                  </div>

                </div>
                <div className="field">
                  <label className="label">Nombre</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Nombre del Paciente"
                    />
                  </div>
                </div>
              </div>

              <div className="field-body">
                <div className="field">
                  <label className="label">Apellido</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={apellido}
                      onChange={(e) => setApellido(e.target.value)}
                      placeholder="Apellido del Paciente"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Telefono</label>
                  <div className="control">
                    <input
                      type="number"
                      className="input"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="ejemplo: 0412300000"
                    />
                  </div>
                </div>
              </div>

              <div className="field-body">
                <div className="field">
                  <label className="label">Sexo</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select
                        value={sexo}
                        onChange={(e) => setSexo(e.target.value)}
                      >
                        <option value="">Seleccione el sexo del Paciente:</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Edad</label>
                  <div className="control">
                    <input
                      type="number"
                      className="input"
                      value={edad}
                      onChange={(e) => setEdad(e.target.value)}
                      placeholder="Edad del Paciente"
                    />
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Dirección</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    placeholder="Dirección del Paciente"
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-link">
                    Actualizar
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

export default FormEditPacientes;
