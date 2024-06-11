import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useHematologia from "../../hooks/Hematologia";
import usePaciente from "../../hooks/PacienteId";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const FormEditHematologia = () => {
    const [hemoglobina, setHemoglobina] = useState("");
    const [hematocrito, setHematocrito] = useState("");
    const [chcm, setChcm] = useState("");
    const [vsg, setVsg] = useState("");
    const [estatus, setEstatus] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState("");
    const [Muestras, setMuestras] = useState([]);
    const [muestra, setMuestra] = useState("");
    const [paciente, setPaciente] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const { pacienteId } = usePaciente();

    const { hematologia } = useHematologia();

    useEffect(() => {
        if (paciente) {
            axios.get(`http://localhost:5000/muestras/pacienteId/${paciente}`)
                .then(response => {
                    const muestrasFiltradas = response.data.filter(muestra => {
                        const muestraYaExiste = hematologia.some(hematologia => {
                            return hematologia.muestraId === muestra.id && hematologia.pacienteId === paciente
                        });
                        return !muestraYaExiste;
                    });
                    setMuestras(muestrasFiltradas);
                })
                .catch(error => console.error(error));
        } else {
            setMuestras([]);
        }
    }, [paciente, hematologia]);


    const handleEstatusChange = (event) => {
        const selectedEstatus = event.target.value;
        setEstatus(selectedEstatus);
        if (selectedEstatus === "No Entregado") {
            setFechaEntrega(null);
        }
    };

    useEffect(() => {
        const getHematologiaById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/resultados/hematologia/${id}`
                );
                setPaciente(response.data.paciente)
                setHemoglobina(response.data.hemoglobina);
                setHematocrito(response.data.hematocrito);
                setChcm(response.data.chcm);
                setVsg(response.data.vsg);
                setFechaEntrega(response.data.fechaEntrega);
                setEstatus(response.data.estatus);
                setMuestra(response.data.muestra);
            } catch (error) {
                if (error.response) {
                    console.error(error.response)
                }
            }
        };
        getHematologiaById();
    }, [id]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filterOptions = () => {
        const filteredOptions = pacienteId.filter((pacienteId) =>
            pacienteId.cedula.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filteredOptions;
    };

    const updateHematologia = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/resultados/hematologia/${id}`, {
                hemoglobina: hemoglobina,
                hematocrito: hematocrito,
                chcm: chcm,
                vsg: vsg,
                estatus: estatus,
                fechaEntrega: fechaEntrega,
                muestraId: muestra,
                pacienteId: paciente
            });
            navigate("/resultados/hematologia");
            Swal.fire({
                title: "Actualizado Exitosamente",
                text: "El resultado de hematologia",
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
            <Link to="/resultados/hematologia" style={{ margin: '8px' }} className="button is-white mb-2">
                <IoArrowBackOutline style={{ fontSize: '30px' }} />
            </Link>
            <section className="hero">
                <div className="hero-body">
                    <div className="box">
                        <h1 className="title">Examen de Hematologia</h1>
                        <h2 className="subtitle">Actualizar Resultado</h2>
                        <form onSubmit={updateHematologia} >
                            <div className="field">
                                <label className="label">Buscar Paciente por N° Cedula</label>
                                <div className="control">
                                    <input
                                        className="input"
                                        type="number"
                                        value={searchTerm}
                                        onChange={handleChange}
                                        style={{ width: '300px', height: '35px' }}
                                    />
                                </div>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <label className="label">Paciente</label>
                                    <div className="control">
                                        <div className="select is-multiple">
                                            <select value={paciente} onChange={(e) => setPaciente(e.target.value)} name="pacienteId">
                                                <option value="">Seleccione el Paciente</option>
                                                {filterOptions().map((pacienteId) => (
                                                    <option key={pacienteId.id} value={pacienteId.id}>
                                                        ID: {pacienteId.id}   Paciente: {pacienteId.nombre} {pacienteId.apellido} Cedula: {pacienteId.cedula}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Muestra</label>
                                    <div className="control">
                                        <div className="select is-multiple">
                                            <select value={muestra} name="muestra" onChange={(e) => setMuestra(e.target.value)} disabled={!paciente}>
                                                <option value="">Seleccione la Muestra a procesar:</option>
                                                {Muestras.map((Muestras) => {
                                                    if (Muestras.examen === "Hematología") {
                                                        return (
                                                            <option key={Muestras.id} value={Muestras.id}>
                                                                ID de la Muestra: {Muestras.id}   Tipo de Muestra: {Muestras.tipo} ID del Paciente: {Muestras.pacienteId}
                                                            </option>
                                                        );
                                                    } else {
                                                        return false
                                                    }
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <label className="label">Hemoglobina</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={hemoglobina}
                                            onChange={(e) => setHemoglobina(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Hematocritos</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={hematocrito}
                                            onChange={(e) => setHematocrito(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="field-body">
                                <div className="field">
                                    <label className="label">C.H.C.M</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={chcm}
                                            onChange={(e) => setChcm(e.target.value)}
                                        />
                                    </div>
                                </div>


                                <div className="field">
                                    <label className="label">V.S.G</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={vsg}
                                            onChange={(e) => setVsg(e.target.value)}
                                        />
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
                                                onChange={handleEstatusChange}
                                            >
                                                <option value="">Selecciona el estatus del Resultado</option>
                                                <option value="Entregado">Entregado</option>
                                                <option value="No Entregado">No Entregado</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {estatus === "Entregado" && (
                                    <div className="field">
                                        <label className="label">Fecha de Entrega</label>
                                        <div className="control">
                                            <input
                                                hid
                                                disabled={estatus !== "Entregado"}
                                                type="date"
                                                className="input"
                                                value={fechaEntrega}
                                                onChange={(e) => setFechaEntrega(e.target.value)}
                                                placeholder="Fecha en que se entrego el resultado"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div><br />


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
        </div >
    );
};

export default FormEditHematologia;
