import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import usePaciente from "../../hooks/PacienteId";
import useHeces from "../../hooks/Heces"
import Swal from 'sweetalert2';

const FormAddHeces = () => {
    const [aspecto, setAspecto] = useState("");
    const [consistencia, setConsistencia] = useState("");
    const [color, setColor] = useState("");
    const [olor, setOlor] = useState("");
    const [moco, setMoco] = useState("");
    const [sangre, setSangre] = useState("");
    const [restosAlimenticios, setRestosAlimenticos] = useState("");
    const [microscopio, setMicroscopio] = useState("");
    const [otrosElementos, setOtrosElementos] = useState("");
    const [estatus, setEstatus] = useState("");
    const [fechaEntrega, setFechaEntrega] = useState(null);
    const [Muestras, setMuestras] = useState([]);
    const [muestra, setMuestra] = useState("");
    const [paciente, setPaciente] = useState("");
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const { pacienteId } = usePaciente();

    const { heces } = useHeces();

    useEffect(() => {
        if (paciente) {
            axios.get(`http://localhost:5000/muestras/pacienteId/${paciente}`)
                .then(response => {
                    const muestrasFiltradas = response.data.filter(muestra => {
                        const muestraYaExiste = heces.some(heces => {
                            return heces.muestraId === muestra.id && heces.pacienteId
                        });
                        return !muestraYaExiste;
                    });
                    setMuestras(muestrasFiltradas);
                })
                .catch(error => console.error(error));
        } else {
            setMuestras([]);
        }
    }, [paciente, heces]);


    const handleEstatusChange = (event) => {
        const selectedEstatus = event.target.value;
        setEstatus(selectedEstatus);
        if (selectedEstatus === "No Entregado") {
            setFechaEntrega(null);
        }
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

    const saveHeces = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/resultados/heces", {
                aspecto: aspecto,
                consistencia: consistencia,
                color: color,
                olor: olor,
                moco: moco,
                sangre: sangre,
                restosAlimenticios: restosAlimenticios,
                microscopio: microscopio,
                otrosElementos: otrosElementos,
                estatus: estatus,
                fechaEntrega: fechaEntrega,
                muestraId: muestra,
                pacienteId: paciente
            });
            navigate("/resultados/heces");
            Swal.fire({
                title: "Agregado Exitosamente",
                text: "El resultado de heces",
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
            <Link to="/resultados/heces" style={{ margin: '8px' }} className="button is-white mb-2">
                <IoArrowBackOutline style={{ fontSize: '30px' }} />
            </Link>
            <section className="hero">
                <div className="hero-body">
                    <div className="box">
                        <h1 className="title">Examen de Heces</h1>
                        <h2 className="subtitle">Agregar nuevo resultado</h2>
                        <form onSubmit={saveHeces}>
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
                                                    if (Muestras.examen === "Examen de Heces") {
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
                                    <label className="label">Aspecto</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={aspecto}
                                            onChange={(e) => setAspecto(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Consistencia</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={consistencia}
                                            onChange={(e) => setConsistencia(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="field">
                                    <label className="label">Color</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={color}
                                            onChange={(e) => setColor(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="field-body">
                                <div className="field">
                                    <label className="label">Olor</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={olor}
                                            onChange={(e) => setOlor(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Moco</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={moco}
                                            onChange={(e) => setMoco(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Sangre</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={sangre}
                                            onChange={(e) => setSangre(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="field-body">
                                <div className="field">
                                    <label className="label">Restos Alimenticios</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={restosAlimenticios}
                                            onChange={(e) => setRestosAlimenticos(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Microscopio</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={microscopio}
                                            onChange={(e) => setMicroscopio(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Otros Elementos</label>
                                    <div className="control">
                                        <input
                                            type="text"
                                            className="input"
                                            value={otrosElementos}
                                            onChange={(e) => setOtrosElementos(e.target.value)}
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

export default FormAddHeces;