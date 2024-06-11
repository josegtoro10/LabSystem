import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import "../../styles/css/styles.css"
import Swal from "sweetalert2";

const FormEditPersonal = () => {
    const [codigo, setCodigo] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [cedula, setCedula] = useState("");
    const [sexo, setSexo] = useState("");
    const [edad, setEdad] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [cargo, setCargo] = useState("");
    const [turno, setTurno] = useState("");
    const [estatus, setEstatus] = useState("");
    const [fechaIngreso, setFechaIngreso] = useState("")
    const navigate = useNavigate();
    const { id } = useParams();



    useEffect(() => {
        const getPersonalById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/personal/${id}`
                );
                setCodigo(response.data.codigo);
                setCedula(response.data.cedula);
                setNombre(response.data.nombre);
                setApellido(response.data.apellido);
                setTelefono(response.data.telefono);
                setSexo(response.data.sexo);
                setEdad(response.data.edad);
                setDireccion(response.data.direccion);
                setCargo(response.data.cargo);
                setTurno(response.data.turno);
                setEstatus(response.data.estatus);
                setFechaIngreso(response.data.fechaIngreso);
            } catch (error) {
                if (error.response) {
                    console.error(error.response)
                }
            }
        };
        getPersonalById();
    }, [id]);

    const updatePersonal = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/personal/${id}`, {
                codigo: codigo,
                cedula: cedula,
                nombre: nombre,
                apellido: apellido,
                telefono: telefono,
                sexo: sexo,
                edad: edad,
                direccion: direccion,
                cargo: cargo,
                turno: turno,
                estatus: estatus,
                fechaIngreso: fechaIngreso,
            });
            navigate("/personal");
            Swal.fire({
                title: "Empleado Actualizado Exitosamente",
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
            <Link to="/personal" style={{ margin: '8px' }} className="button is-white mb-2">
                <IoArrowBackOutline style={{ fontSize: '30px' }} />
            </Link>
            <section className="hero">
                <div className="hero-body">
                    <div className="box">
                        <h1 className="title">Personal</h1>
                        <h2 className="subtitle">Actualizar Empleado</h2>
                        <form onSubmit={updatePersonal}>
                            <div className="field-body">
                                <div className="field">
                                    <label className="label">Codigo</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={codigo}
                                            onChange={(e) => setCodigo(e.target.value)}
                                            placeholder="Codigo del Empleado"
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Cedula</label>
                                    <div className="control">
                                        <input
                                            type="number"
                                            className="input"
                                            value={cedula}
                                            onChange={(e) => setCedula(e.target.value)}
                                            placeholder="Cedula del Empleado"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <label className="label">Nombre</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={nombre}
                                            onChange={(e) => setNombre(e.target.value)}
                                            placeholder="Nombre del Empleado"
                                        />
                                    </div>
                                </div>

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
                            </div>
                            <div className="field-body">
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

                                <div className="field">
                                    <label className="label">Sexo</label>
                                    <div className="control">
                                        <div className="select is-fullwidth">
                                            <select
                                                value={sexo}
                                                onChange={(e) => setSexo(e.target.value)}
                                            >
                                                <option value="">seleccione el sexo del empleado</option>
                                                <option value="Masculino">Masculino</option>
                                                <option value="Femenino">Femenino</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <label className="label">Edad</label>
                                    <div className="control">
                                        <input
                                            type="number"
                                            className="input"
                                            value={edad}
                                            onChange={(e) => setEdad(e.target.value)}
                                            placeholder="Edad del Empleado"
                                        />
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
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <label className="label">Cargo</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={cargo}
                                            onChange={(e) => setCargo(e.target.value)}
                                            placeholder="Dirección del Paciente"
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Turno</label>
                                    <div className="control">
                                        <div className="select is-fullwidth">
                                            <select
                                                value={turno}
                                                onChange={(e) => setTurno(e.target.value)}
                                            >
                                                <option value="">Seleccione el Turno</option>
                                                <option value="Mañana: 7am - 1pm">Mañana: 7am - 1pm</option>
                                                <option value="Tarde: 1pm -7pm">Tarde: 1pm -7pm</option>
                                                <option value="Noche: 7pm - 7am">Noche: 7pm - 7am</option>
                                                <option value="12 Hrs: 7am - 7pm">12 Hrs: 7am - 7pm</option>
                                                <option value="24 Hrs: 7am - 7am">24 Hrs: 7am - 7am</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="field-body">
                                <div className="field">
                                    <label className="label">Estatus</label>
                                    <div className="control">
                                        <div className="select is-fullwidth">
                                            <select
                                                value={estatus}
                                                onChange={(e) => setEstatus(e.target.value)}
                                            >
                                                <option value="">Seleccione el Estatus</option>
                                                <option value="Fijo">Fijo</option>
                                                <option value="Contratado">Contratado</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Fecha de Ingreso</label>
                                    <div className="control">
                                        <input
                                            type="date"
                                            className="input"
                                            value={fechaIngreso}
                                            onChange={(e) => setFechaIngreso(e.target.value)}
                                            placeholder="Fecha Ingreso Empleado"
                                        />
                                    </div>
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
                </div >
            </section >
        </div >
    );
};

export default FormEditPersonal;
